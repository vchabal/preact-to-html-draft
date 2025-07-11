const resolve = require('@rollup/plugin-node-resolve');
const discard = require('./plugins/discard.js');
const html = require('./plugins/html.js');
const tsc = require('./plugins/tsc.js');
const watchTarget = require('./plugins/watchTarget.js');

module.exports = (watch, pages) => {
  const htmlPages = [];

  for (const page of pages) {
    // Replace template component with path one
    const replace = {};
    replace[`./${page.template}-component`] = `./src/page/${page.path}/index.tsx`;

    // Create render config
    htmlPages.push({
      plugins: [ resolve(), tsc(replace), discard(/\.scss$/i), html(), watch && watchTarget('./src') ],
      input: `./src/template/${page.template}.html.tsx`,
      output: {
        file: `./html/${page.path}/index.html`,
        format: 'iife',
        name: 'html',
      },
    })
  }

  return htmlPages;
}
