// 模拟数据组装
var globFiles = require('glob-files');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var Mock = require('./util/mock.js');

console.log(__dirname)

function loadMockData (mockPath, app) {
	globFiles.aggregate({
		dirname: mockPath,
		filter: /(.+)\.(js|json)$/,
		flattenDirectories: true,
		keepDirectoryPath: true,
		identity: true,
		force: false,
		dontLoad: true
	}, function(err, files) {
		if(!err) {
			files.forEach(function (file) {
				var stat = fs.statSync(file);
				if(stat.isFile()) {
					fs.readFile(file, 'utf8', function (err, data) {
						if(!err) {
							try{
								data = JSON.parse(data);
								_.each(data, function (value, url) {
									app.all(url, function (req, res, next) {
										res.json(Mock.mock(value));
									});
								})
							} catch(err) {
								console.log('error at : ' + file);
								console.log(err);
								console.log('#############')
							}
						}
					});
				}
			})
		}
	});
}

module.exports = loadMockData;