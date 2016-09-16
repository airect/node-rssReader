/**
 * router
 *
 */
var Router = require('router');
var router = Router();
var url = require('url');
var RSSParser = require('./RSSParser.js');
var Util = require('./util.js');
var api = Router();
router.use('/api/', api);

/**
 *
 */
api.get('/article_list', function (req, res) {

    var param = url.parse(req.url, true).query;

    if (!param['rss_address']) return res.end('lack of the source to parse');

    if (param['rss_address']) {
        RSSParser(param['rss_address'], function (err, rssJson) {
            if (err) return res.end('error');

            var titles = '';
            var util = new Util(rssJson);
            var items = util.getItems();

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



module.exports = router;

