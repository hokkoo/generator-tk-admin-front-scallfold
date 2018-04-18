/*
	 替换_page下的资源
	 	包括：
	 		.js 文件
	 目前只替换 _page 目录
*/
const dirTree = require('directory-tree');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const writeFile = require('write');

const projectRoot = path.resolve(__dirname, '../')
const sourceDirectory = path.resolve(projectRoot, '_pages');
const targetDirectory = path.resolve(projectRoot, 'pages');


console.log(projectRoot);
console.log(sourceDirectory)
console.log(targetDirectory)

// 测试用数据
const _stats = {
	"\\common\\bootstrap": "\\common\\bootstrap.8a637caed718ca7ddaa2.js",
	"\\common\\common": "\\common\\common.037b2e48075dbf846116.js",
	"\\express\\analysis": "\\express\\analysis.222fecf5c274f482d3b7.js",
	"\\express\\realtime": "\\express\\realtime.522cccc01b301c81fcef.js",
	"\\platform\\home": "\\platform\\home.2074837bc0854994ad4c.js",
	"\\platform\\userinfo": "\\platform\\userinfo.7e648b0a6a13bd6672b5.js",
	"\\storage\\analysis": "\\storage\\analysis.a4f762267ddff374e3da.js"
};

const prefix = '/assets/js/';

function resolvePrefix (str) {
	if(str.indexOf(prefix) === 0) {
		return str;
	} else {
		return prefix + str;
	}
}

function resolveDoubleSlash (str) {
	return str.replace(/\/+/g, '/');
}

function replaceResourceByHash (stats) {
	// 目前默认只替换 /assets/js/文件
	let statsObject = {};
	Object.keys(stats).map((statKey) => {
		let key = resolvePrefix(resolveSlash(resolveSuffix(statKey)));
		let value = resolvePrefix(resolveSlash(resolveSuffix(stats[statKey])));
		statsObject[resolveDoubleSlash(key)] = resolveDoubleSlash(value);
	});
	console.log(sourceDirectory)
	const entryMap = (function() {
		var map = {};
		dirTree(sourceDirectory, {}, (item, path) => {
			let name = getRelativePath(item.path, sourceDirectory);
			map[name] = item.path;
			console.log(name)
		});
		return map;
	})();

	console.log(entryMap);
	doReplaces(entryMap, statsObject).then(() => {
		console.log('replae success : ');
	}, (err) => {
		console.log('replace fail: ' + err);
	})
}


const fileOptions = {
	encoding: 'utf8'
};

let regTemplate = '(<\s.* sr\s*c=\s*[\'\"]\s*.*)(%p)([\'\"]\s*>\s*</script>)';

function doReplaces (files, stats) {
	return new Promise((resolve, reject) => {
		let data, reg, pathname;
		_.each(files, (filepath, filename) => {
			try {
				//console.log('start: ' + filepath + ' ----- ' + filename);
				data = fs.readFileSync(filepath, fileOptions);
				//console.log('readfile success: ' + data.length);
				_.each(stats, (value, key) => {
					console.log(value)
					key = placeholder(regTemplate, key);
					reg = new RegExp(key, 'gi');
					console.log('reg : ' + reg)
					data = data.replace(reg, (a1, a2, a3, a4) => {
						console.log('matched : ' + a1);
						return a2 + value + a4
					});
				});
				pathname = path.join(targetDirectory, filename);
				console.log('begin write file: ' + pathname);
				doWriteFile(pathname, data).then(() => {

				}, (err) => {
					reject(e);
				})
			} catch(e) {
				reject(e);
			}
		})
		resolve();
	})
}


function doWriteFile (pathname, data) {
	return writeFile(pathname, data, fileOptions)
}

const slashReg = /\\/g;


function resolveSlash (str) {
	return str.replace(slashReg, '/');
}

function resolveSuffix (src) {
	if(src.lastIndexOf('.js') === src.length - 3) {
		return src;
	} else {
		return src + '.js';
	}
}

function placeholder (str, value) {
	str = str || '';
	return str.replace('%p', value);
}

function getRelativePath (pathname, directory) {
	directory = path.normalize(directory);
	pathname = path.normalize(pathname);
	if(pathname.indexOf(directory) === 0) {
		return pathname.slice(directory.length);
	} else {
		return pathname;
	}
}


// replaceResourceByHash(_stats)
module.exports = replaceResourceByHash;