const resolve = require('@rollup/plugin-node-resolve');
const css = require('./plugins/css.js');

module.exports = (watch, pages) => {
  const cssFiles = [];

  for (const page of pages) {
    cssFiles.push({
      plugins: [ resolve(), css(watch) ],
      input: `./src/page/${page.path}/index.tsx`,
      output: {
        file: `./html/${page.path}/styles.css`
      },
    });
  }

  return cssFiles;
}
