const resolve = require('@rollup/plugin-node-resolve');
const uglify = require('./plugins/uglify.js');
const tsc = require('./plugins/tsc.js');

module.exports = (watch, pages) => {
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
