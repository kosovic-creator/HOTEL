"use client";

import { useI18n } from "@/components/I18nProvider";

type Language = "en" | "sr";

const DEFAULT_CONTEXT = {
  lang: "sr" as Language,
  setLang: (lang: Language) => {
    // No-op fallback
  },
};

export function useSafeI18n() {
  try {
    return useI18n();
  } catch (error) {
    // If I18nProvider not available, return safe default
    return DEFAULT_CONTEXT;
  }
}
