'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDefaultConfig } from '@hotel/config/i18n-client';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enNavbar from './locales/en/navbar.json';
import enRezervacije from './locales/en/rezervacije.json';
import enGosti from './locales/en/gosti.json';
import enSobe from './locales/en/sobe.json';
import enOHotelu from './locales/en/o_hotelu.json';

import srCommon from './locales/sr/common.json';
import srAuth from './locales/sr/auth.json';
import srNavbar from './locales/sr/navbar.json';
import srRezervacije from './locales/sr/rezervacije.json';
import srGosti from './locales/sr/gosti.json';
import srSobe from './locales/sr/sobe.json';
import srOHotelu from './locales/sr/o_hotelu.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    navbar: enNavbar,
    rezervacije: enRezervacije,
    gosti: enGosti,
    sobe: enSobe,
    o_hotelu: enOHotelu,
  },
  sr: {
    common: srCommon,
    auth: srAuth,
    navbar: srNavbar,
    rezervacije: srRezervacije,
    gosti: srGosti,
    sobe: srSobe,
    o_hotelu: srOHotelu,
  },
};

const namespaces = ['common', 'auth', 'navbar', 'rezervacije', 'gosti', 'sobe', 'o_hotelu'];

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init(getDefaultConfig(resources, namespaces, 'sr'));
}

export default i18n;
