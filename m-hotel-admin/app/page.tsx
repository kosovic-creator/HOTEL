"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function Home() {
  const { t } = useI18n();
  const welcomeText = t?.("common", "welcome") ?? "welcome";
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">{welcomeText}</h1>
        </div>
      </div>
    </>
  );
}
