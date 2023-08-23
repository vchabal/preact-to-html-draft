const { rmSync, mkdirSync } = require('fs');
const config = require('./rollup/config.js');

rmSync('./html', { recursive: true, force: true });
mkdirSync('./html', { recursive: true });

module.exports = function ({ watch }) {
  return config(Boolean(watch), [
    // En pages
    'en/index',
    // Sk pages
    'sk/index',
  ]);
}
