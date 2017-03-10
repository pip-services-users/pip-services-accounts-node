/**
 * @file Users seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var UsersSenecaPlugin = require('../lib/src/run/UsersSenecaPlugin').UsersSenecaPlugin;
var plugin = new UsersSenecaPlugin();

module.exports = plugin.entry();