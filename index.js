/**
 * main
 *
 */
var RSSParser = require('./RSSparser.js');
var http = require('http');
var url  = require('url');
var Util = require('./util.js');

var server = http.createServer(function (req, res) {

	var param = url.parse(req.url, true).query;

	if (!param['source']) return res.end('lack of the source to parse');

	if (param['source']) {
		RSSParser(param['source'], function (err, rssJson) {
			if (err) return res.end('error');
			//var items = rssJson.rss.channel;
			var titles = '';
			var util = new Util(rssJson);
			var items = util.getItems();
			//res.end(JSON.stringify(items));
			console.log(items);
			items.forEach(function (item) {
				titles += "<a target='_blank' href='" + item.link + "'>" + item.title + "</a>" + "(" + item.pubDate + ")" + '<br>'
			});
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.write(titles);
			res.end();
		});
	}

});

server.on('error', function () {
	console.log('error');
});

server.listen(3000);

