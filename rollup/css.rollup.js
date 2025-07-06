const resolve = require('@rollup/plugin-node-resolve');
const css = require('./plugins/css.js');
const watchTarget = require('./plugins/watchTarget.js');

module.exports = (watch, pages) => {
  const cssFiles = [];

  for (const page of pages) {
    cssFiles.push({
      plugins: [ resolve(), css(watch), watch && watchTarget('./src') ],
      input: `./src/page/${page.path}/index.tsx`,
      output: {
        file: `./html/${page.path}/styles.css`
      },
    });
  }

  return cssFiles;
}
