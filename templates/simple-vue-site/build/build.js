var _ = require('lodash');
var argv = require('yargs').argv;
var express = require('express');
var webpack = require('webpack');
var path = require('path');
var proxy = require('http-proxy-middleware');
var saveStats = require('./saveStats.js');
var copy = require('copy');
var stringifyObject = require('stringify-object');
var bodyParser = require('body-parser')

/*
	1，webpack
		@生产
		@开发
		@hash + 路径替换
	2，服务器
		@静态
		@模拟数据
		@代理 => 真实环境
	3，webpack-services
		@代理请求
		@自动刷新
*/

/*
	TODO:
		，基于watchpack，动态编译：
			@新增的文件
		，优化编译，不用每一次都全部编译：
			@hard-source-webpack-plugin 
			@通过watch，自定义编译规则
	
*/
var replaceResourceByHash = require('./replaceResourceByHash.js');

const projectRoot = path.resolve(__dirname, '../')
const sourceDirectory = path.resolve(projectRoot, '_pages');
const targetDirectory = path.resolve(projectRoot, 'pages');

var webpackConfig = _.merge(require('./webpack.base.conf.js'), (argv.production ? require('./webpack.prod.conf.js') : require('./webpack.dev.conf.js')));
var compiler = webpack(webpackConfig);

if(!argv.production && argv.webpackDev) {
	doCopyFile(sourceDirectory + '/**/*.html' , targetDirectory);
}

if (argv.server) {
	var app = express();

	

	// serve pages
	app.use('/pages', express.static(path.resolve(__dirname, '../pages/')));
	app.use('/page', express.static(path.resolve(__dirname, '../page/')));
	app.use('/upload', express.static(path.resolve(__dirname, '../upload/')));


	if (argv.webpackDev) {
		// handle fallback for HTML5 history API
		app.use(require('connect-history-api-fallback')());
		// serve webpack bundle output
		app.use(require('webpack-dev-middleware')(compiler, {
			publicPath: '/assets/js/',
			stats: {
				colors: true,
				chunks: false
			}
		}));
	}

	app.use('/assets', express.static(path.resolve(__dirname, '../assets/')));
	app.use('/mock-data', express.static(path.resolve(__dirname, '../mock-data/')));

	if (argv.mock) {
		// app.use(bodyParser);
		var target;
		if(argv.mockServer) {
			target = argv.mockServer;
		} else {
			target = argv.realService ? 'http://localhost:8080' : 'http://localhost:3331';
		}
		var proxyConfig = {
			target: target,
			changeOrigin: true,
			logLevel: 'debug',
			autoRewrite: true,
			secure: false,
			// ssl: argv.ssl || false,
			onOpen: function () {
				console.log('open proxy : ... ' + JSON.stringify(arguments));
			},
			onProxyReq: function (proxyReq, req, res) {
				console.log('set header: proxyReg')
				proxyReq.setHeader('Access-Control-Allow-Origin', '*');
				// onProxyReq(proxyReq, req, res);
			},
			onError: function (proxyReq, req, res) {
				console.log('on error: ' + arguments[0]) ;
			}
		};

		function onProxyReq(proxyReq, req, res) {
			console.log('req proxy:' + req.method + ':' + req.body + ': ' + typeof req);
			// TODO 需要将参数进行传递
			if (req.method == "POST") {
				proxyReq.write('');
				proxyReq.end();
			}
		}

		app.use('/', proxy('/api', proxyConfig));
	}

	const port = argv.port || 3412;

	app.listen(port, function() {
		console.log('server on : ' + port)
	});

} else {
	compiler.run(compilerCallback)
}

function doCopyFile (src, target) {
	copy(src, target, function (err, file) {
		if(err) {
			console.log('copy file error: ' + err);
		} else {
			console.log('copy file success: \n')
			console.log(file);
		}
	});
}

var lastHash = null;
var options = {
	watch: false
}
var outputOptions = {
	json: true
};

function compilerCallback(err, stats) {
	if (!options.watch) {
		// Do not keep cache anymore
		compiler.purgeInputFileSystem();
	}
	if (err) {
		lastHash = null;
		console.error(err.stack || err);
		if (err.details) console.error(err.details);
		if (!options.watch) {
			process.on("exit", function() {
				process.exit(1); // eslint-disable-line
			});
		}
		return;
	}
	if (outputOptions.json) {
		process.stdout.write('save stats to file...');
		// 只保存assetsByChunkName 这个值
		stats = stats.toJson(outputOptions);
		stats = stats.assetsByChunkName;
		replaceResourceByHash(stats);
		saveStats(JSON.stringify(stats, null, 2)).then((filename) => {
			process.stdout.write('save file success: ' + filename);
		}, (err) => {
			process.stdout.write('save file error: \n' + JSON.stringify(err));
		})
		// process.stdout.write(stringifyObject(stats.toJson(outputOptions), null, 2) + "\n");
	} else if (stats.hash !== lastHash) {
		lastHash = stats.hash;
		process.stdout.write(stats.toString(outputOptions) + "\n");
	}
}




var webpackBasicConfig = require('./webpack.base.conf.js');

function build() {
	if (argv.production) {
		return buildProduction();
	} else {
		return buildDev();
	}
}

function buildDev() {
	var config = require('./webpack.dev.conf.js');
	_.merge({}, webpackBasicConfig, config);
	return webpack(config);
}

function buildProduction() {
	var config = require('./webpack.prod.conf.js');
	_.merge({}, webpackBasicConfig, config);
	return webpack(config);
}

function loadServer(config) {
	var app = require('./server.js')(config);
	return app;
}

function loadDevServer() {
	var app = loadServer();
	app.use(require('connect-history-api-fallback')())

	// serve webpack bundle output
	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	}));

	// enable hot-reload and state-preserving
	// compilation error display
	app.use(require('webpack-hot-middleware')(compiler));
}


function loadStatics() {
	var app = loadServer();
	app.use('/static', express.static('./src/assets'))
}

// 替换静态资源url
// 取webpack资源映射
// 加载html文件，匹配并替换
function replaceUrlInFile() {
	var files = [];
	files.forEach(function(file) {
		replaceUrl(file);
	})
}