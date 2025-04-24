import render from 'preact-render-to-string';
import { h } from 'preact';

import { lang, title, pageUrl, pageLocation, socialImg, head, body, keywords, description } from './page-default-component';

export default render(
  <html lang={ lang }>
    <head>
      <base href="/" />
      <meta charSet="UTF-8"/>
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
      <meta http-equiv="Expires" content="0"/>
      <meta http-equiv="Pragma" content="no-cache"/>

      <meta name="robots" content="index, follow"/>
      <meta name="keywords" content={ keywords }/>
      <meta name="description" content={ description }/>

      {/* Meta tags */}
      <meta property="og:title" content={ title }/>
      <meta property="og:description" content={ description }/>
      <meta property="og:image" content={ socialImg }/>
      <meta property="og:url" content={ pageUrl }/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:card" content="summary_large_image"></meta>

      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="shortcut icon" href="assets/svg/favicon.svg" type="image/svg+xml"/>
      <link rel="stylesheet" href="assets/fonts/fonts.css" />
      <link rel="stylesheet" href={ `${pageLocation}/styles.css` } />
      { head }
    </head>
    <body>
      { body }
      <script src="js/preact.js"></script>
      <script src={ `${pageLocation}/script.js`}></script>
      <script>startup();</script>
    </body>
  </html>
);
