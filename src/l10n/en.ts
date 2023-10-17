import { is, setLocale } from './l10n';

export * from './l10n';
export const code = 'en';

setLocale(code, {
  'Hello World': 'Hello World',
  'Click below': 'Click below ↓',
  '%s click counter': [
    { value: '1st click counter: ', $: is(1) },
    { value: '2nd click counter: ', $: is(2) }
  ],
  '%s clicks': [
    { value: 'No clicks', $: is(0) },
    { value: '1 click', $: is(1) },
    { value: '%1 clicks' },
  ]
});
