import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import PWARegister from "@/app/components/PWARegister";
import OfflineNotice from "@/app/components/OfflineNotice";
import { Suspense } from "react";
import { Providers } from "./providers";
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
    template: `%s | M-HOTEL Gost`,
    default: "M-HOTEL Gost",
  },
  description: "Aplikacija za upravljanje M-HOTEL sistemom",
  metadataBase: new URL("http://localhost:4000"),
  manifest: "/manifest.webmanifest",
  applicationName: "M-HOTEL Gost",
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
  children: React.ReactNode;
}>) {
  const lang = await getServerLanguage();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hotel2.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <PWARegister />
        <OfflineNotice />
        <Providers initialLang={lang}>
          <Suspense fallback={null}>
            <div className="absolute top-0 left-0 right-0 z-50">
              <Navbar />
            </div>
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
