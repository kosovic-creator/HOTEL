'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import i18n from './config';

type Language = 'sr' | 'en';

interface I18nContextType {
  language: Language;
  lang?: Language; // Alias
  setLanguage: (lang: Language) => void;
  setLang?: (lang: Language) => void; // Alias
  t: (namespace: string, key: string) => string;
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getCookieLanguage(): Language {
  if (typeof document === 'undefined') return 'sr';
  const value = `; ${document.cookie}`;
  const parts = value.split('; lang=');
  const lang = parts.length === 2 ? parts.pop()?.split(';')[0] : undefined;
  return (lang === 'en' || lang === 'sr') ? lang : 'sr';
}

export function I18nProvider({
  children,
  initialLang = 'sr',
}: {
  children: ReactNode;
  initialLang?: Language;
  }) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [isHydrated, setIsHydrated] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    setLanguageState(lang);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    // Removed router.refresh() to avoid loading state during language change
  }, []);

  // On mount, read language from cookie and sync with i18n
  // Use useEffect instead of useLayoutEffect to avoid hydration mismatch
  useEffect(() => {
    // Clean up old 'locale' cookie if it exists (legacy cleanup)
    if (document.cookie.includes('locale=')) {
      document.cookie = 'locale=; path=/; max-age=0';
    }

    // Read language from cookie
    const cookieLang = getCookieLanguage();

    // Only update if different from initialLang (server-provided value)
    if (cookieLang !== initialLang) {
      setLanguageState(cookieLang);
      if (i18n.language !== cookieLang) {
        i18n.changeLanguage(cookieLang);
      }
    } else if (i18n.language !== initialLang) {
      // Ensure i18n is synced with initialLang
      i18n.changeLanguage(initialLang);
    }

    setIsHydrated(true);
  }, [initialLang]);

  const t = (namespace: string, key: string): string => {
    return i18n.t(key, { ns: namespace }) || key;
  };

  const value: I18nContextType = useMemo(() => {
    return {
      language,
      lang: language, // Alias
      setLanguage,
      setLang: setLanguage, // Alias
      t,
      isHydrated
    };
  }, [language, setLanguage, isHydrated]);

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
