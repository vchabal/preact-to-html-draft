const resolve = require('@rollup/plugin-node-resolve');
const discard = require('./plugins/discard.js');
const html = require('./plugins/html.js');
const tsc = require('./plugins/tsc.js');

module.exports = (watch, pages) => {
  const htmlPages = [];

  for (const page of pages) {
    // Replace template component with main one
    const replace = {};
    replace[`./${page.template}-component`] = `./src/page/${page.main}.tsx`;

    // Create render config
    htmlPages.push({
      plugins: [ resolve(), tsc(replace), discard(/\.scss$/i), html() ],
      input: `./src/template/${page.template}.html.tsx`,
      output: {
        file: `./html/${page.main}/index.html`,
        format: 'iife',
        name: 'html',
      },
    })
  }

  return htmlPages;
}
