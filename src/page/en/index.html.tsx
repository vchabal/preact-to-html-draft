import render from 'preact-render-to-string';
import { h } from 'preact';

import { code, l10n } from '@l10n/en';
import { Demo } from '@modules';
import { HeadMeta } from '@shared/cmp';

export default render(
  <html lang={code}>
    <head>
      <HeadMeta title={ l10n`Hello World` } />
      <base href="../"/>
      <link rel="stylesheet" href="home/home.css"/>
    </head>
    <body>
      <Demo />
    </body>
  </html>
);
