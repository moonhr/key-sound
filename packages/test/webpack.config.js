const mainConfigs = require("./webpack.main.config.js");
const rendererConfigs = require("./webpack.renderer.config.js");
const preloadConfigs = require("./webpack.preload.config.js");

module.exports = [mainConfigs, rendererConfigs, preloadConfigs];
