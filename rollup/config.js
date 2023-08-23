const resolve = require('@rollup/plugin-node-resolve');
const uglify = require('./plugins/uglify.js');
const html = require('./plugins/html.js');
const tsc = require('./plugins/tsc.js');
const serve = require('rollup-plugin-serve');

const preactLib = {
  plugins: [ resolve(), tsc(), uglify() ],
  input: './src/preact.lib.ts',
  output: [{
    file: './html/js/preact.js',
    format: 'iife',
    name: 'preactLib',
  }],
}

const watchConfig = {
  contentBase: 'html',
  host: '0.0.0.0',
  port: '8080'
};

function toHtml(watch, pages) {
  const htmlPages = [];

  for (const page of pages) {
    htmlPages.push({
      plugins: [ resolve(), tsc(), html() ],
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

function toJs(watch, pages) {
  const jsFiles = [];

  for (const page of pages) {
    jsFiles.push({
      external: [ 'preact', 'preact/hooks' ],
      plugins: [ resolve(), tsc(), !watch && uglify() ],
      input: `./src/page/${page}.js.tsx`,
      output: {
        file: `./html/${page}.js`,
        format: 'iife',
        name: 'html',
        name: page.replace(/.+\/(.+)/, '$1'),
        globals: {
          'preact': 'preactLib.preact',
          'preact/hooks': 'preactLib.hooks'
        }
      },
    })
  }

  return jsFiles;
}

module.exports = (watch, pages) => {
  if (watch) {
    preactLib.plugins.push(serve(watchConfig));
  }

  console.info(`[inf] Building preact lib and ${pages.length} pages, watch:${watch}`);
  return [preactLib, ...toHtml(watch, pages), ...toJs(watch, pages)];
}
