const fs = require('fs');
const preactLib = require('./lib.rollup.js');
const toHtml = require('./html.rollup.js');
const toJs = require('./js.rollup.js');
const css = require('./css.rollup.js');
const generateSitemap = require('./sitemap.generate.js');

module.exports = (watch, pages, siteSettings) => {
  console.info(`[inf] Building preact lib and ${pages.length} pages, watch:${watch}`);

  const sitemapUrls = pages.map(page => `${siteSettings.domain}${page.path}`);
  const sitemapPriorities = pages.map(page => page.sitemapPriority);
  fs.writeFileSync('./html/sitemap.xml', generateSitemap(sitemapUrls, sitemapPriorities), { encoding: 'utf-8' });

  return [
    preactLib(watch),
    ...toHtml(watch, pages),
    ...toJs(watch, pages),
    ...css(watch, pages)
  ];
}
