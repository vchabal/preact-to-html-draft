import { h, render } from 'preact';

import '@src/l10n/sk';
import { Demo } from "@modules";

export default function init() {
  render(<Demo />, document.body);
}
