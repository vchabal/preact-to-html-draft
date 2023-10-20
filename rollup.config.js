const { rmSync, mkdirSync } = require('fs');
const config = require('./rollup/config.js');

rmSync('./html', { recursive: true, force: true });
mkdirSync('./html', { recursive: true });

module.exports = function ({ watch }) {
  return config(Boolean(watch), [
    // En pages
    { main: 'en/demo', template: 'page-default' },
    // Sk pages
    { main: 'sk/demo', template: 'page-default' },
  ]);
}
