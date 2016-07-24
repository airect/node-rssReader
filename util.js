/**
 * util
 */
function Util (rssXml) {
     this.rssXml = rssXml;
}

/**
 * get a item
 * @param id
 */
Util.prototype.getOneItem = function (id) {
    var items = this.getItems();

    if (id > items.length - 1 || id < 0)  return [];

    return items[id];
};

/**
 * get tag item from rssXml
 * @return object
 */
Util.prototype.getItems = function () {
    return this.rssXml.rss.channel[0].item;
};

module.exports = Util;
