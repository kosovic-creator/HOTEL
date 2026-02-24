'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import srCommon from './locales/sr/common.json';
import srAuth from './locales/sr/auth.json';
import enSobe from './locales/en/sobe.json';
import srSobe from './locales/sr/sobe.json';
import srNavbar from './locales/sr/navbar.json';
import enNavbar from './locales/en/navbar.json';
import enRezervacije from './locales/en/rezervacije.json';
import srRezervacije from './locales/sr/rezervacije.json';
import srGosti from './locales/sr/gosti.json';
import enGosti from './locales/en/gosti.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    sobe: enSobe,
    navbar: enNavbar,
    rezervacije: enRezervacije,
    gosti: enGosti,
  },
  sr: {
    common: srCommon,
    auth: srAuth,
    sobe: srSobe,
    navbar: srNavbar,
    rezervacije: srRezervacije,
    gosti: srGosti,
  },
};

const namespaces = ['common', 'auth', 'sobe', 'navbar', 'rezervacije', 'gosti'];

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
}

export default i18n;
