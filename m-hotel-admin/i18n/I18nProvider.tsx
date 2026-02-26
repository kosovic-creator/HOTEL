'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import {
    DEFAULT_LANGUAGE,
    LANGUAGE_COOKIE,
    type Language,
    isSupportedLanguage,
} from '@/i18n/constants';

type I18nContextType = {
    language: Language;
  setLanguage: (lang: Language) => void;
    t: (namespace: string, key: string) => string;
    isHydrated: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getCookieLanguage(): Language {
    if (typeof document === 'undefined') {
        return DEFAULT_LANGUAGE;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${LANGUAGE_COOKIE}=`);
    const lang = parts.length === 2 ? parts.pop()?.split(';')[0] : undefined;
    return isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
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

    const setLanguage = useCallback((lang: Language) => {
        if (typeof document !== 'undefined') {
            document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
      setLanguageState(lang);
      if (i18n.language !== lang) {
          i18n.changeLanguage(lang);
      }
  }, []);

  useEffect(() => {
      const nextLang = getCookieLanguage() || initialLang;
    setIsHydrated(true);
      setLanguageState(nextLang);
      if (i18n.language !== nextLang) {
          i18n.changeLanguage(nextLang);
      }
  }, [initialLang]);

    const t = useCallback((namespace: string, key: string) => {
    return i18n.t(key, { ns: namespace }) || key;
  }, []);

  const value = useMemo<I18nContextType>(() => {
    return {
        language,
        setLanguage,
      t,
        isHydrated,
    };
  }, [language, setLanguage, t, isHydrated]);

    return (
        <I18nextProvider i18n={i18n}>
            <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
        </I18nextProvider>
    );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
      throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
