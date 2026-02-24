"use client";
import { SessionProvider } from "next-auth/react";
import "@/i18n/config"; // Dodaj OVO ovde!
import { I18nProvider } from "@/i18n/I18nProvider";
import type { ReactNode } from "react";
import { type Language, DEFAULT_LANGUAGE } from "@/i18n/locale";

export function Providers({
  children,
  initialLang = DEFAULT_LANGUAGE,
}: {
    children: ReactNode;
    initialLang?: Language;
}) {
  return (
    <SessionProvider>
      <I18nProvider initialLang={initialLang}>{children}</I18nProvider>
    </SessionProvider>
  );
}