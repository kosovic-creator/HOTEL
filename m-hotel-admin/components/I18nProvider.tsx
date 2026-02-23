"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import i18n from "@hotel/config/i18n-client";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language } from "@/lib/locale.constants";

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

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
}: {
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isHydrated, setIsHydrated] = useState(false);

  const setLang = useCallback((nextLang: Language) => {
    setLangCookie(nextLang);
    if (i18n.language !== nextLang) {
      i18n.changeLanguage(nextLang);
    }
    setLangState(nextLang);
  }, []);

  useLayoutEffect(() => {
    // On mount, read language from cookie
    const cookieLang = getCookieLanguage();

    // Ako je cookie postavljen na EN ali trebalo bi SR, resetuj na SR
    if (cookieLang === 'en' && DEFAULT_LANGUAGE === 'sr') {
      const langToUse = DEFAULT_LANGUAGE;
      if (i18n.language !== langToUse) {
        i18n.changeLanguage(langToUse);
      }
      setLangCookie(langToUse);
      setLangState(langToUse);
    } else {
      if (i18n.language !== cookieLang) {
        i18n.changeLanguage(cookieLang);
      }
      setLangCookie(cookieLang);
      setLangState(cookieLang);
    }
    setIsHydrated(true);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    return {
      lang,
        setLang,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
