const resolve = require('@rollup/plugin-node-resolve');
const css = require('./plugins/css.js');

module.exports = (watch, pages) => {
  const cssFiles = [];

  for (const page of pages) {
    cssFiles.push({
      plugins: [ resolve(), css(watch) ],
      input: `./src/page/${page}.html.tsx`,
      output: {
        file: `./html/${page}.css`
      },
    });
  }

  return cssFiles;
}
