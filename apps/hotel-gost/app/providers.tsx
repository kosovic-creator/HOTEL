"use client";

import { type ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { DEFAULT_LANGUAGE, type Language } from "@/i18n/constants";

export function Providers({
  children,
  initialLang = DEFAULT_LANGUAGE,
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  return (
    <I18nProvider initialLang={initialLang}>
      {children}
    </I18nProvider>
  );
}
