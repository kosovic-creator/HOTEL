"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSafeI18n } from "@/hooks/useSafeI18n";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation("navbar");
  const { lang, setLang } = useSafeI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeLanguage = (lng: "en" | "sr") => {
    setLang(lng);
    router.refresh();
    setMenuOpen(false);
  };

  const handleprijava = () => {
    setMenuOpen(false);
    router.push("/prijava");
  };
  const handleSignOut = () => {
    setMenuOpen(false);
    setTimeout(() => {
      signOut({ callbackUrl: "/prijava" });
    }, 100);
  };

  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center md:px-6 md:py-4 relative z-20 print:hidden" suppressHydrationWarning>
      {/* Logo & desktop nav */}
      <div className="flex flex-col items-start gap-1">
        <Link href="/" className="text-xl font-bold">
          <span className="font-bold text-sm sm:text-base truncate ">
            <span className="text-black">⭕️ </span>
            <span className="text-black">{'M-HOTEL Admin'.slice(0, 7)}</span>
            <span className="text-red-600">{'M-HOTEL Admin'.slice(7)}</span>
          </span>
        </Link>
        <div className="hidden sm:block" suppressHydrationWarning>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sobe">{mounted ? t("rooms") : "Sobe"}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/rezervacije">{mounted ? t("reservations") : "Rezervacije"}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/gosti">{mounted ? t("guests") : "Gosti"}</Link>
          </Button>

        </div>

      </div>

      {/* Mobile nav sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          sm:hidden
        `}
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col h-full p-4" suppressHydrationWarning>
          {/* Close button */}
          <button
            className="self-end mb-4 text-2xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <Button variant="ghost" size="sm" asChild onClick={() => setMenuOpen(false)}>
            <Link href="/sobe">{mounted ? t("rooms") : "Sobe"}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild onClick={() => setMenuOpen(false)}>
            <Link href="/rezervacije">{mounted ? t("reservations") : "Rezervacije"}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild onClick={() => setMenuOpen(false)}>
            <Link href="/gosti">{mounted ? t("guests") : "Gosti"}</Link>
          </Button>

          {/* Auth buttons: show only one, with icon */}
          {mounted && status !== "loading" && (session?.user ? (
            <Button variant="ghost" onClick={handleSignOut} className="w-full flex items-center gap-2 mt-2">
              <FaSignOutAlt />
              {t("logout") || "Odjava"}
            </Button>
          ) : (
              <Button variant="ghost" onClick={handleprijava} className="w-full flex items-center gap-2 mt-2">
              <FaSignInAlt />
                {t("login") || "Prijava"}
            </Button>
          ))}
          {/* Language buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("en")}
              className={`flex items-center gap-1 ${mounted && lang === "en" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="English">🇬🇧</span> EN
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("sr")}
              className={`flex items-center gap-1 ${mounted && lang === "sr" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="Serbian">🇲🇪</span> MN
            </Button>
          </div>
        </div>
      </div>
      {/* Overlay for sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* Hamburger icon for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-4" suppressHydrationWarning>
        {/* Prikaz imena korisnika ako je prijavljen */}
        {mounted && status !== "loading" && session?.user && (
          <span className="text-gray-900 font-semibold mr-2">
            {session.user.name || session.user.email}
          </span>
        )}
        {/* Auth buttons: show only one, with icon */}
        {mounted && status !== "loading" && (session?.user ? (
          <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
            <FaSignOutAlt />
            {t("logout") || "Odjava"}
          </Button>
        ) : (
            <Button variant="ghost" onClick={handleprijava} className="flex items-center gap-2">
              <FaSignInAlt />
              {t("login") || "Prijava"}
            </Button>
        ))}
        {/* Language buttons */}
        <Button
          variant="ghost"
          onClick={() => handleChangeLanguage("en")}
          className={`flex items-center gap-1 ${mounted && lang === "en" ? "font-bold underline" : ""}`}
        >
          <span role="img" aria-label="English">🇬🇧</span> EN
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleChangeLanguage("sr")}
          className={`flex items-center gap-1 ${mounted && lang === "sr" ? "font-bold underline" : ""}`}
        >
          <span role="img" aria-label="Serbian">🇲🇪</span> MN
        </Button>
      </div>


    </nav>
  );
}