import { h, Fragment } from 'preact';
import { l10n, code } from '@l10n/en';
import { ClickCounterDemo } from '@modules';
import './demo.scss';

export const lang = code;
export const head =
<Fragment>
  <title>Hey there</title>
</Fragment>;
export const body =
<Fragment>
  <ClickCounterDemo>{ l10n`Click below` }</ClickCounterDemo>
</Fragment>;
