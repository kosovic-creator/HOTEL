'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import i18n from './config';
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language } from './locale.constants';

interface I18nContextType {
  language: Language;
  lang: Language; // Alias za admin kompatibilnost
  setLanguage: (lang: Language) => void;
  setLang: (lang: Language) => void; // Alias za admin kompatibilnost
  t: (namespace: string, key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const setLangCookie = (lang: Language) => {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=${maxAge}; samesite=lax`;
};

function getCookieLanguage(): Language {
  if (typeof document === 'undefined') return DEFAULT_LANGUAGE;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === LANGUAGE_COOKIE && value) {
      const decoded = decodeURIComponent(value);
      if (decoded === 'en' || decoded === 'sr') {
        return decoded as Language;
      }
    }
  }
  return DEFAULT_LANGUAGE;
}

export function I18nProvider({
  children,
  initialLang = DEFAULT_LANGUAGE,
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  const setLanguage = useCallback((nextLang: Language) => {
    setLangCookie(nextLang);
    setLanguageState(nextLang);
    if (i18n.isInitialized && i18n.language !== nextLang) {
      i18n.changeLanguage(nextLang);
    }
    router.refresh();
  }, [router]);

  useLayoutEffect(() => {
    // On mount, read language from cookie
    const cookieLang = getCookieLanguage();
    setLanguageState(cookieLang);

    if (i18n.isInitialized && i18n.language !== cookieLang) {
      i18n.changeLanguage(cookieLang);
    }
    setIsHydrated(true);
  }, []);

  const t = (namespace: string, key: string): string => {
    if (!i18n.isInitialized) return key;
    return i18n.t(key, { ns: namespace }) || key;
  };

  if (!isHydrated) {
    return children;
  }

  const value = useMemo<I18nContextType>(() => {
    return {
      language,
      lang: language, // Alias
      setLanguage,
      setLang: setLanguage, // Alias
      t,
    };
  }, [language, setLanguage, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
