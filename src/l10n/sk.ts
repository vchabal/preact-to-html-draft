import { setLocale } from './l10n';

export * from './l10n';
export const code = 'sk';

setLocale(code, {
  'Hello World': 'Ahoj svet',
  'Click here': 'Klikaj tu',
  '%s clicks': [
    { value: 'Žiaden klik', $: /0/ },
    { value: '1 klik',      $: /1/ },
    { value: '%1 kliky',    $: /[2-4]/ },
    { value: '%1 klikov' },
  ]
});
