const resolve = require('@rollup/plugin-node-resolve');
const discard = require('./plugins/discard.js');
const html = require('./plugins/html.js');
const tsc = require('./plugins/tsc.js');

module.exports = (watch, pages) => {
  const htmlPages = [];

  for (const page of pages) {
    htmlPages.push({
      plugins: [ resolve(), tsc(), discard(/\.scss$/i), html() ],
      input: `./src/page/${page}.html.tsx`,
      output: {
        file: `./html/${page}.html`,
        format: 'iife',
        name: 'html',
      },
    })
  }

  return htmlPages;
}
