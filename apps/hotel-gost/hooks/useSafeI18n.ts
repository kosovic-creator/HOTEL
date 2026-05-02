"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function useSafeI18n() {
  const { language, setLanguage } = useI18n();
  return { lang: language, setLang: setLanguage };
}
