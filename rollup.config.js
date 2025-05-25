const { rmSync, mkdirSync } = require('fs');
const config = require('./rollup/config.js');

rmSync('./html', { recursive: true, force: true });
mkdirSync('./html', { recursive: true });

module.exports = function ({ watch }) {
  return config(Boolean(watch), [
    // En pages
    { path: '/en/demo/', template: 'page-default', sitemapPriority: 1 },
    // Sk pages
    { path: '/sk/demo/', template: 'page-default', sitemapPriority: 1 },
  ], {
    domain: 'https://sitemap.domain.com'
  });
}
