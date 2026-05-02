'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface PaymentStatusBadgeProps {
  status: string;
  className?: string;
}

export default function PaymentStatusBadge({
  status,
  className = ''
}: PaymentStatusBadgeProps) {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation('rezervacije');
  const tr = (key: string) => t(key);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const getStatusDisplay = (status: string) => {
    const normalizedStatus = status.toLowerCase();

    const statusMap: Record<string, { label: string; color: string; icon: string }> = {
      'pending': {
        label: tr('pending'),
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '⏳'
      },
      'confirmed': {
        label: tr('confirmed'),
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: '✓'
      },
      'paid': {
        label: tr('paid'),
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: '💳'
      },
      'cancelled': {
        label: tr('cancelled'),
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '❌'
      },
      'completed': {
        label: tr('completed'),
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: '🎉'
      },
      'payment_failed': {
        label: tr('payment_failed'),
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '⚠️'
      }
    };

    return statusMap[normalizedStatus] || {
      label: status,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: '❓'
    };
  };

  const statusInfo = getStatusDisplay(status);

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border
        ${statusInfo.color} ${className}
      `.trim()}
    >
      <span className="mr-1.5" role="img" aria-hidden="true">
        {statusInfo.icon}
      </span>
      {statusInfo.label}
    </span>
  );
}