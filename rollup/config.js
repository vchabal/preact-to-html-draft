const preactLib = require('./lib.rollup.js');
const toHtml = require('./html.rollup.js');
const toJs = require('./js.rollup.js');
const css = require('./css.rollup.js');

module.exports = (watch, pages) => {
  console.info(`[inf] Building preact lib and ${pages.length} pages, watch:${watch}`);
  return [
    preactLib(watch),
    ...toHtml(watch, pages),
    ...toJs(watch, pages),
    ...css(watch, pages)
  ];
}
