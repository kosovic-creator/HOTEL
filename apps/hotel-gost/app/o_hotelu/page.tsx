'use client';

import React from 'react'
import { Footer } from '@/app/components/footer';
import { useTranslation } from 'react-i18next';

const OHotelu = () => {
  const { t } = useTranslation('o_hotelu');
  const tr = (key: string) => t(key);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-2xl text-center text-amber-500 space-y-5 px-4 py-8 rounded-lg shadow-lg">
          <p>{tr('description')}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OHotelu