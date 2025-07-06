import { h, Fragment } from 'preact';
import { code } from '@l10n/sk';
import { ClickCounterDemo } from '@modules';
import './demo.scss';

export const title = 'Page title';
export const pageUrl = 'https://website/url';
export const pageLocation = '/sk/demo';
export const socialImg = '/a/link/to/social/header/img';
export const keywords = 'keywords,comma,separated,values';
export const description = 'A one sentence description about the website in general, in between 70 to 155 characters.';
export const lang = code;
export const head =
<Fragment>
  <title>Hey there!</title>
</Fragment>;
export const body =
<Fragment>
  <ClickCounterDemo>Hey there!</ClickCounterDemo>
</Fragment>;
