const resolve = require('@rollup/plugin-node-resolve');
const uglify = require('./plugins/uglify.js');
const serve = require('rollup-plugin-serve');
const tsc = require('./plugins/tsc.js');

const watchConfig = {
  contentBase: 'html',
  host: '0.0.0.0',
  port: '8080'
};

module.exports = (watch) => {
  return {
    plugins: [ resolve(), tsc(), uglify(), watch && serve(watchConfig) ],
    input: './src/preact.lib.ts',
    output: [{
      file: './html/js/preact.js',
      format: 'iife',
      name: 'preactLib',
    }]
  }
}
