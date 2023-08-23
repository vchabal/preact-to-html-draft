import render from 'preact-render-to-string';
import { h } from 'preact';

import { code, l10n } from '@l10n/sk';
import { Demo } from '@modules';
import { HeadMeta } from '@shared/cmp';

export default render(
  <html lang={code}>
    <head>
      <HeadMeta title={ l10n`Hello World` } />
    </head>
    <body>
      <Demo />
      <script src="../js/preact.js"></script>
      <script src="./index.js"></script>
      <script>index();</script>
    </body>
  </html>
);
