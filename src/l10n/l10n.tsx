import { h } from 'preact';

let locale: Locale = null;
let localeCode: string = null;

export type Locale = { [_: string]: string | Localisation[] };
export type Localisation = { value: any, $?: RegExp };

export function setLocale(code: string, l10n: Locale) {
  localeCode = code;
  locale = l10n;
}

export function l10n(strings, ...args: any[]): string {
  const key = strings.join('%s');
  const l10n: string = getLocalisationValue(key, args);

    if (!l10n) {
      console.error(`[ERR] [l10n] [${localeCode}] Missing: ${key}`);
      return key;
    }

    // Split result into array by %n params.
    // '%3 and %1 or %2' into ["", "3", " and ", "1", " or ", "2", ""]
    const l10nArray: string[] = l10n.split(/%(\d+)/);
    for (let i = 1; i < l10nArray.length; i+=2) {
      const paramIdx: number = Number(l10nArray[i]);
      const paramVal: string = String(args[ paramIdx - 1 ]);
      l10nArray[i] = paramVal;
    }

    return l10nArray.join('');
}

export function _l10n(strings, ...args: any[]): h.JSX.Element {
  return <span dangerouslySetInnerHTML={{ __html: l10n(strings, args) || '' }}></span>
}

function getLocalisationValue(key: string, params: any[], delimiter = ','): string {
  const l10n: string | Localisation[] = locale[key];
  const paramsStr = params.join(delimiter);

  if (l10n && Array.isArray(l10n)) {
    for(const rule of l10n) {
      if (!rule.$ || rule.$.test(paramsStr)) {
        return rule.value;
      }
    }
  }
  if (typeof l10n === 'string') {
    return l10n;
  }

  return null;
}
