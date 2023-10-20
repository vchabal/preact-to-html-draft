import render from 'preact-render-to-string';
import { h } from 'preact';

import { lang, head, body } from './page-default-component';

export default render(
  <html lang={ lang }>
    <head>
      <meta charSet="utf-8"/>
      <meta name="keywords" content=""/>
      <meta name="description" content=""/>
      <meta name="viewport" content=""/>
      <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="./styles.css"/>
      { head }
    </head>
    <body>
      { body }
      <script src="/js/preact.js"></script>
      <script src="./script.js"></script>
      <script>startup();</script>
    </body>
  </html>
);
