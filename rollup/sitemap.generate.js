module.exports = (urls, priorities) => {
  const date = new Date().toISOString();
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ];
  for (let i = 0; i < urls.length; i++) {
    sitemap.push('<url>');
    sitemap.push(`  <loc>${ urls[i] }</loc>`);
    sitemap.push(`  <lastmod>${ date }</lastmod>`);
    sitemap.push(`  <priority>${ priorities[i].toFixed(2) }</priority>`);
    sitemap.push('</url>');
  }
  sitemap.push('</urlset>');
  return sitemap.join('\n');
}
