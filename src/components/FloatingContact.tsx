'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappNumber = '60167479368'; // Remove + and spaces
  const whatsappMessage = encodeURIComponent('Hello! I would like to inquire about your loan services.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const phoneNumber = '+60-16-7479368';
  const email = 'hello@mypinjamcredit.com';

  return (
    <>
      {/* Backdrop - no blur for performance */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Button Group */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Expanded Options */}
        {isExpanded && (
          <div className="mb-4 flex flex-col gap-3">
            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-colors"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold">WhatsApp</div>
                <div className="text-xs opacity-90">Chat with us</div>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${phoneNumber}`}
              className="group flex items-center gap-3 rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg transition-colors"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold">Call Us</div>
                <div className="text-xs opacity-90">{phoneNumber}</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-3 rounded-full bg-slate-700 px-5 py-3 text-white shadow-lg transition-colors"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold">Email Us</div>
                <div className="text-xs opacity-90">Send message</div>
              </div>
            </a>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-200 ${
            isExpanded
              ? 'rotate-45 bg-slate-700'
              : 'bg-blue-600'
          }`}
          aria-label="Contact options"
        >
          {isExpanded ? (
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>

        {/* Pulse animation when not expanded */}
        {!isExpanded && (
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-400 opacity-75" />
        )}
      </div>
    </>
  );
}
