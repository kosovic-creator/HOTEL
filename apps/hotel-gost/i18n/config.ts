/* eslint-disable @typescript-eslint/no-explicit-any */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Statički import prijevoda da izbgegnemo async probleme
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enSobe from './locales/en/sobe.json';
import enRezervacije from './locales/en/rezervacije.json';
import enOHotelu from './locales/en/o_hotelu.json';
import enGosti from './locales/en/gosti.json';

import srCommon from './locales/sr/common.json';
import srNavbar from './locales/sr/navbar.json';
import srSobe from './locales/sr/sobe.json';
import srRezervacije from './locales/sr/rezervacije.json';
import srOHotelu from './locales/sr/o_hotelu.json';
import srGosti from './locales/sr/gosti.json';

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    sobe: enSobe,
    rezervacije: enRezervacije,
    o_hotelu: enOHotelu,
    gosti: enGosti,
  },
  sr: {
    common: srCommon,
    navbar: srNavbar,
    sobe: srSobe,
    rezervacije: srRezervacije,
    o_hotelu: srOHotelu,
    gosti: srGosti,
  },
};

const namespaces = ['common', 'navbar', 'sobe', 'rezervacije', 'o_hotelu', 'gosti'];

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'sr',
      fallbackLng: 'sr',
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
    });
  // Postavi default jezik sa log-om
  if (typeof window !== 'undefined') {
    console.log('[i18n] Initialized on client with language:', i18n.language);
  }
}

export default i18n;
