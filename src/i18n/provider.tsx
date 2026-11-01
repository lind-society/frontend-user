import * as React from 'react';
import { IntlProvider } from 'use-intl';

import { defaultLocale, Locale, locales } from '@/i18n/config';

import en from '../../messages/en.json';
import id from '../../messages/id.json';

const messages = { en, id } satisfies Record<Locale, unknown>;

const STORAGE_KEY = 'locale';

function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return locales.includes(stored as Locale)
      ? (stored as Locale)
      : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

const SetLocaleContext = React.createContext<(locale: Locale) => void>(
  () => undefined
);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(readStoredLocale);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this visit.
    }
  }, [locale]);

  return (
    <SetLocaleContext.Provider value={setLocale}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </SetLocaleContext.Provider>
  );
}

/** Switches the UI language and remembers it for the next visit. */
export function useSetLocale() {
  return React.useContext(SetLocaleContext);
}
