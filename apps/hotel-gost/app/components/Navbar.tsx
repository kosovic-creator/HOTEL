"use client";

import { Button } from "@hotel/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { type Language } from "@/i18n/constants";
import { useSafeI18n } from "@/hooks/useSafeI18n";
import PWAInstallPrompt from "@/app/components/PWAInstallPrompt";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation("navbar");
  const { lang, setLang } = useSafeI18n();
  const [mounted, setMounted] = useState(false);
  const language = (mounted ? lang : i18n.language) as Language;
  const tr = (key: string) => t(key);

  const handleChangeLanguage = (lng: "en" | "sr") => {
    setLang(lng);
    setMenuOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="w-full bg-transparent px-4 py-3 flex justify-between items-center md:px-6 md:py-4 relative z-20 print:hidden">
      {/* Logo & desktop nav */}
      <div className="flex flex-row items-center gap-2 sm:gap-4" suppressHydrationWarning>
        <Link href="/" className="text-xl font-bold">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2" suppressHydrationWarning>
                <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            {mounted ? tr("footer_brand") : "M-HOTEL"}
              </h3>
        </Link>

        {/* Rooms link - mobile & desktop */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-amber-500 hover:text-amber-500 text-lg sm:text-base"
          suppressHydrationWarning
        >
          <Link href="/sobe">{mounted ? tr("rooms") : "Sobe"}</Link>
        </Button>

      </div>

      {/* Mobile nav sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg z-40 transform
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          sm:hidden
        `}
        style={{ willChange: "transform" }}
      >

      </div>

      {/* Overlay for sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile nav controls */}
      <div className="sm:hidden flex items-center gap-2" suppressHydrationWarning>
        <PWAInstallPrompt className="text-xs px-2" label={mounted ? tr("install_app") : "Install"} />
        {/* Language button for mobile - show only inactive language */}
        {mounted && language === "sr" ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleChangeLanguage("en")}
            className="px-2 py-1 text-lg font-medium text-gray-300 hover:text-gray-300"
          >
            <span role="img" aria-label="EN" className="text-3xl">
              🇬🇧
            </span>
          </Button>
        ) : mounted ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleChangeLanguage("sr")}
              className="px-2 py-1 text-lg font-medium text-gray-300 hover:text-gray-300"
            >
              <span role="img" aria-label="SR" className="text-3xl">
                🇲🇪
              </span>
            </Button>
        ) : null}

        {/* Hamburger icon */}
        <button
          className="flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={mounted ? tr("open_menu") : "Open menu"}
          suppressHydrationWarning
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-4" suppressHydrationWarning>
        <PWAInstallPrompt label={mounted ? tr("install_app") : "Install app"} />
        {/* Show only inactive language flag */}
        {mounted && language === "sr" ? (
          <Button
            variant="ghost"
            onClick={() => handleChangeLanguage("en")}
            className="flex items-center gap-1 text-2xl text-white hover:text-white cursor-pointer"
          >
            <span role="img" aria-label="EN" className="text-4xl">
              🇬🇧
            </span>
          </Button>
        ) : mounted ? (
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("sr")}
              className="flex items-center gap-1 text-2xl text-white hover:text-white cursor-pointer"
            >
              <span role="img" aria-label="MN" className="text-4xl">
                🇲🇪
              </span>
            </Button>
        ) : null}
      </div>
    </nav>
  );
}