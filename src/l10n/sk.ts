import { setLocale, is, range } from './l10n';

export * from './l10n';
export const code = 'sk';

setLocale(code, {
  'Hello World': 'Ahoj svet',
  'Click here': 'Klikaj tu',
  '%s clicks': [
    { value: 'Žiaden klik', $: is(0) },
    { value: '1 klik',      $: is(1) },
    { value: '%1 kliky',    $: range(2,4) },
    { value: '%1 klikov' },
  ]
});
