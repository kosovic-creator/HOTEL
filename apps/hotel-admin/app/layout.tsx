import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import PWARegister from "@/app/components/PWARegister";
import OfflineNotice from "@/app/components/OfflineNotice";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { getServerLanguage } from "@/i18n/i18n.server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | M-HOTEL Admin`,
    default: "M-HOTEL Admin",
  },
  description: "Aplikacija za upravljanje M-HOTEL sistemom",
  metadataBase: new URL("http://localhost:3000"),
  manifest: "/manifest.webmanifest",
  applicationName: "M-HOTEL Admin",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const lang = await getServerLanguage();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWARegister />
        <OfflineNotice />
        <Providers initialLang={lang}>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
