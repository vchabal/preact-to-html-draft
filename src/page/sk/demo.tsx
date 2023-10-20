import { h, Fragment } from 'preact';
import { code } from '@l10n/sk';
import { ClickCounterDemo } from '@modules';
import './demo.scss';

export const lang = code;
export const head =
<Fragment>
  <title>Hey there</title>
</Fragment>;
export const body =
<Fragment>
  <ClickCounterDemo>Hey there!</ClickCounterDemo>
</Fragment>;
