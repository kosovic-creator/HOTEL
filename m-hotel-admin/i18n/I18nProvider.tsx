"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import i18n from "@hotel/config/i18n-client";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language, isSupportedLanguage } from "@hotel/config/i18n-constants";

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
  const router = useRouter();

  const setLanguage = useCallback((nextLang: Language) => {
    setLangCookie(nextLang);
    if (i18n.language !== nextLang) {
      i18n.changeLanguage(nextLang);
    }
    setLanguageState(nextLang);
    router.refresh();
  }, [router]);

  useLayoutEffect(() => {
    // Ensure i18n is always synced with initialLang at start
    if (i18n.language !== initialLang) {
      i18n.changeLanguage(initialLang);
    }

    // On mount, read language from cookie and sync if different
    const cookieLang = getCookieLanguage();

    if (cookieLang !== initialLang) {
      setLanguageState(cookieLang);
      if (i18n.language !== cookieLang) {
        i18n.changeLanguage(cookieLang);
      }
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
