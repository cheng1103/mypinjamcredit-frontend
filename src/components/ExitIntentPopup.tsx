'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { WHATSAPP_NUMBER } from '@/lib/contact';
import { formatPhoneNumber, phonePattern } from '@/lib/phone';

const EXIT_INTENT_SOURCE = 'exit_intent_popup';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Disable on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      // Keep automatic exit-intent disabled on small screens, but still allow
      // the popup to be opened programmatically on mobile if needed.
      return;
    }

    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitPopupShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page (common exit intent)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  // Manage focus, body scroll lock and keyboard interactions when modal is visible
  useEffect(() => {
    if (!isVisible) return;

    // Lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the phone input if available, otherwise the close button
    const focusTarget = phoneInputRef.current ?? closeButtonRef.current;
    focusTarget?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }

      if (e.key === 'Tab') {
        // Basic focus trap: cycle between focusable elements inside modal
        const container = modalRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter(Boolean);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const normalizedPhone = formatPhoneNumber(phone);
      if (!phonePattern.test(normalizedPhone)) {
        setErrorMessage('Please enter a valid Malaysian phone number.');
        setIsSubmitting(false);
        return;
      }
      setErrorMessage(null);

      // Submit quick callback request
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Quick Callback Request',
          phone: normalizedPhone,
          loanAmount: 10000,
          loanType: 'PERSONAL_USE',
          leadSource: EXIT_INTENT_SOURCE
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setPhone('');
        toast.success('Request received — our loan officer will call you.');
        // keep modal open so user can optionally start a WhatsApp chat
        // auto-close after a short delay
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        // try to show backend error
        const errorData = await response.json().catch(() => ({}));
        const errorKey = (errorData && (errorData.error || errorData.errorKey)) || 'submission_failed';
        setErrorMessage('Failed to submit. Please try again.');
        toast.error(`Submission failed: ${errorKey}`);
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      setErrorMessage('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = (phoneToInclude?: string) => {
    const whatsappNumber = WHATSAPP_NUMBER;
    const userPhone = phoneToInclude ? `\nPhone: ${phoneToInclude}` : '';
    const message = encodeURIComponent(`Hi, I requested a callback from the website.${userPhone}`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
          className="relative w-full max-w-lg mx-4 rounded-3xl border border-blue-200 bg-white p-8 shadow-2xl animate-in slide-in-from-top duration-300"
        >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
                <h3 id="exit-popup-title" className="text-2xl font-bold text-slate-900 mb-2">
                  Wait! Before You Go...
                </h3>
              <p className="text-slate-600">
                Get a <span className="font-semibold text-blue-600">FREE callback</span> from our licensed loan officer within 30 minutes!
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-6 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No obligation - just expert advice</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Get personalized loan recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Find out your approval chances instantly</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="tel"
                  ref={phoneInputRef}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  pattern={phonePattern.source}
                  aria-invalid={errorMessage ? 'true' : 'false'}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errorMessage ? (
                  <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Requesting...' : 'Request FREE Callback'}
              </button>

              {/* WhatsApp chat button - allows immediate chat with our loan officer */}
              <button
                type="button"
                onClick={() => {
                  const normalized = phone ? formatPhoneNumber(phone) : undefined;
                  openWhatsApp(normalized);
                }}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-green-500 bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Chat on WhatsApp
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              We respect your privacy. Your information is secure.
            </p>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
            <p className="text-slate-600">
              Our loan officer will call you within 30 minutes. Thank you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
