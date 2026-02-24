"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import i18n from "./config";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language, isSupportedLanguage } from "./locale.constants";

interface I18nContextType {
  language: Language;
  lang: Language; // Alias
  setLanguage: (lang: Language) => void;
  setLang: (lang: Language) => void; // Alias
  t?: (namespace: string, key: string) => string;
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
      if (isSupportedLanguage(decoded)) {
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

  const setLanguage = useCallback((nextLang: Language) => {
    setLangCookie(nextLang);
    if (i18n.language !== nextLang) {
      i18n.changeLanguage(nextLang);
    }
    setLanguageState(nextLang);
    // Removed router.refresh() to avoid loading state during language change
  }, []);

  useEffect(() => {
    // Clean up old 'locale' cookie if it exists (legacy cleanup)
    if (document.cookie.includes('locale=')) {
      document.cookie = 'locale=; path=/; max-age=0';
    }

    // On mount, read language from cookie and sync if different from initialLang
    const cookieLang = getCookieLanguage();

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

  const value = useMemo<I18nContextType>(() => {
    return {
      language,
      lang: language, // Alias
      setLanguage,
      setLang: setLanguage, // Alias
      t,
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
