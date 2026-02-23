import type { Language } from "@hotel/lib";

export type { Language };

export const LANGUAGE_COOKIE = "lang";
export const DEFAULT_LANGUAGE: Language = "sr";

export const isSupportedLanguage = (value: string | undefined): value is Language => {
  return value === "en" || value === "sr";
};
