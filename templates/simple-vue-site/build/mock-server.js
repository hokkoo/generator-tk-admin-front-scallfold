var express = require('express');
var path = require('path');
var loadMockData = require('./mock.js');
function startMockServer () {
	var app = express();
	var port = 3331;
	loadMockData(path.resolve(__dirname, '../_mock-data/'), app);
	app.listen(port, function () {
		console.log('server on : ' + port)
	});
	app.on('error', function (e) {
		console.log(e)
	})
}

startMockServer();

module.exports = startMockServer;