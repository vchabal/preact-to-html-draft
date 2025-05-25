const resolve = require('@rollup/plugin-node-resolve');
const discard = require('./plugins/discard.js');
const uglify = require('./plugins/uglify.js');
const tsc = require('./plugins/tsc.js');

module.exports = (watch, pages) => {
  const jsFiles = [];

  for (const page of pages) {
    // Replace template component with defined path
    const replace = {};
    replace[`./${page.template}-component`] = `./src/page/${page.path}/index.tsx`;

    // Create render config
    jsFiles.push({
      external: [ 'preact', 'preact/hooks' ],
      plugins: [ resolve(), tsc(replace), discard(/\.scss$/i), !watch && uglify() ],
      input: `./src/template/${page.template}.js.tsx`,
      output: {
        file: `./html/${page.path}/script.js`,
        format: 'iife',
        name: 'startup', //page.replace.replace(/.+\/(.+)/, '$1'),
        globals: {
          'preact': 'preactLib',
          'preact/hooks': 'preactLib'
        }
      },
    })
  }

  return jsFiles;
}
