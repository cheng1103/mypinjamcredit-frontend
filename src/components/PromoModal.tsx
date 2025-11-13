'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface PromoModalProps {
  showAfterMs?: number;
}

export function PromoModal({ showAfterMs = 2000 }: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const t = useTranslations('modal');

  useEffect(() => {
    // Check if modal has been shown this session
    const modalShown = sessionStorage.getItem('promoModalShown');

    if (!modalShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('promoModalShown', 'true');
      }, showAfterMs);

      return () => clearTimeout(timer);
    }
  }, [showAfterMs]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slideUp overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <div className="relative h-4 w-4 overflow-hidden rounded-full ring-1 ring-green-700">
                <Image
                  src="/mypinjamcredit.jpeg"
                  alt="MyPinjam Credit"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h2 id="modal-title" className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            {t('headline')}
          </h2>

          {/* Description */}
          <p className="text-center text-sm text-slate-600 sm:text-base">
            {t('description')}
          </p>

          {/* Benefits List */}
          <ul className="space-y-2 pt-2">
            {['benefit1', 'benefit2', 'benefit3'].map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-slate-700">
                <div className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-green-500 mt-0.5">
                  <Image
                    src="/mypinjamcredit.jpeg"
                    alt="MyPinjam Credit"
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <a
              href="#form"
              onClick={closeModal}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {t('ctaPrimary')}
            </a>
            <button
              onClick={closeModal}
              className="flex-1 inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              {t('ctaSecondary')}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
