'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Base i18n configuration za obe aplikacije
 * Svaka aplikacija trebam da importuje i inicijalizuje sa svojim lokalama
 *
 * Korišćenje:
 *
 * import i18nConfig from '@hotel/config/i18n-client';
 * import i18n from 'i18next';
 * import enCommon from './locales/en/common.json';
 * // ... import other locales
 *
 * const resources = {
 *   en: { common: enCommon, ... },
 *   sr: { common: srCommon, ... },
 * };
 *
 * if (!i18n.isInitialized) {
 *   i18n
 *     .use(initReactI18next)
 *     .init(i18nConfig.getDefaultConfig(resources, ['common', '...']));
 * }
 */

export function getDefaultConfig(resources: any, namespaces: string[], defaultLang: string = 'sr') {
  return {
    lng: defaultLang,
    fallbackLng: defaultLang,
    supportedLngs: ['en', 'sr'],
    debug: false,
    ns: namespaces,
    defaultNS: 'common',
    resources,
    backend: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  };
}

export { initReactI18next };
export default i18n;
