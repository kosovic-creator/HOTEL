"use client";
import { SessionProvider } from "next-auth/react";
import "@/i18n/config"; // Dodaj OVO ovde!
import { I18nProvider } from "@/components/I18nProvider";
import type { ReactNode } from "react";

export function Providers({
  children,
}: {
    children: ReactNode;
}) {
  return (
    <SessionProvider>
      <I18nProvider>{children}</I18nProvider>
    </SessionProvider>
  );
}