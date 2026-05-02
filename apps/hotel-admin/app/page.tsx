"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const welcomeText = t("welcome");

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto py-8 text-center">
          {/* Render placeholder while hydrating to avoid hydration mismatch */}
          {mounted ? (
            <h1 className="text-3xl font-bold mb-4">{welcomeText}</h1>
          ) : (
            <h1 className="text-3xl font-bold mb-4">&nbsp;</h1>
          )}
        </div>
      </div>
    </>
  );
}
