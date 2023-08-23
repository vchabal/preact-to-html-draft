import { setLocale } from './l10n';

export * from './l10n';
export const code = 'en';

setLocale(code, {
  'Hello World': 'Hello World',
  'Click here': 'Click here',
  '%s clicks': [
    { value: 'No clicks', $: /0/ },
    { value: '1 click', $: /1/ },
    { value: '%1 clicks' },
  ]
});
