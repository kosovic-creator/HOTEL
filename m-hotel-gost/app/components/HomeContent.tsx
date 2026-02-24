'use client';

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export default function HomeContent() {
  const { t } = useI18n();
  const tr = (key: string) => t('common', key);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 pt-20">
        <div className="text-center text-white max-w-3xl">
          {/* Logo/Title Area */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              M-HOTEL
            </h1>
            <div className="h-1 w-24 bg-linear-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-light mb-4 drop-shadow-lg leading-tight">
              {tr('home_luxury')}
            </h2>
            <p className="text-lg md:text-xl font-light drop-shadow-lg text-gray-200">
              {tr('home_blend')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/rezervacije"
              className="px-8 py-3 bg-linear-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {tr('home_book_now')}
            </Link>
            <button
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg"
            >
              {tr('home_learn_more')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
