import { setLocale, is, range } from './l10n';

export * from './l10n';
export const code = 'sk';

setLocale(code, {
  'Hello World': 'Ahoj svet',
  'Click below': 'Klikaj dole ↓',
  '%s click counter': [
    { value: 'Prve pocitadlo: ', $: is(1) },
    { value: 'Druhe pocitadlo: ', $: is(2) }
  ],
  '%s clicks': [
    { value: 'Žiaden klik', $: is(0) },
    { value: '1 klik',      $: is(1) },
    { value: '%1 kliky',    $: range(2,4) },
    { value: '%1 klikov' },
  ]
});
