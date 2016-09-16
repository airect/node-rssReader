/**
 * main
 *
 */
var RSSParser = require('./RSSParser.js');
var http = require('http');
var url  = require('url');
var Util = require('./util.js');
var router = require('./router.js');
var finalhandler = require('finalhandler');

var server = http.createServer(function (req, res) {
	router(req, res, finalhandler(req, res));
});


server.on('error', function () {
	console.log('error');
});

server.listen(3000);

