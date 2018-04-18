/**
* npm run dev -- --host 0.0.0.0 --port 8085
*/

var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var http = require('http')
var app = express()
var compiler = webpack(config)

var argv = require('yargs').argv
var host = argv.host || '127.0.0.1'
var port = argv.port || 3000

app.use('/static', express.static('./src/assets'))


app.listen(port, host, function (err) {
	if (err) {
		console.log(err)
		return
	}
});

