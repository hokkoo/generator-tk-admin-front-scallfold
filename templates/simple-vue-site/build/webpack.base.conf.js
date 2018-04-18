var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var src = path.join(projectRoot, 'src')

const vueLoaderConfig = require('./vue-loader.conf')

const dirTree = require('directory-tree');
const entryMap = (function() {
	var map = {};
	var relativeDirectory = src + '/javascript/entry';
	dirTree(path.resolve(src, './javascript/entry'), {}, (item, path) => {
		let name = getRelativePath(item.path, relativeDirectory);
		name = name.replace(/\.js$/, '');
		map[name] = item.path;
		console.log(name)
	});
	return map;
})();

function getRelativePath(pathname, directory) {
	directory = path.normalize(directory);
	pathname = path.normalize(pathname);
	if (pathname.indexOf(directory) === 0) {
		return pathname.slice(directory.length);
	} else {
		return pathname;
	}
}

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: entryMap,
	output: {
		publicPath: '/assets/js/',
		path: path.resolve(__dirname, '../assets/js/'),
		filename: '[name].js'
	},
	resolve: {
		// extensions: ['.vue', '.js', '.json'],
		alias: {
			'@': resolve('src'),
			'@admin': resolve('src/plugin/vue-admin/client'),
			'@elementAdmin': resolve('src/plugin/vue-element-admin/src')
		}
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader',
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
				}
			}, 
			{
				test: /\.js$/,
				loader: 'babel?cacheDirectory',
				include: [resolve('src')]
			},
			{
				test: /\.tpl$/,
				loader: 'string'
			}, 
			{
				test: /\.(css|scss|sass)$/,
				loader: 'vue-style-loader!css-loader!sass-loader'
			}, 
			{
				test: /\.theme$/,
				loader: 'string!sass-loader'
			}, 
			{
				test: /\.json$/,
				loader: 'json'
			}, 
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				include: [resolve('src/icons')],
				options: {
					symbolId: 'icon-[name]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: '[name].[ext]?[hash:7]'
				}
			}
		]
	/*	rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					css: 'vue-style-loader!css-loader',
					scss: 'vue-style-loader!css-loader!sass-loader'
				}
			}
		}, {
			test: /\.css$/,
			use: ['vue-style-loader', 'css-loader']
		}, {
			test: /\.scss$/,
			use: ['vue-style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.theme$/,
			use: ['raw-loader', 'sass-loader']
		}]*/
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
}