import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { headers, cookies } from 'next/headers';
import type { Locale } from '@/types/locale';
import { getSiteUrl } from '@/lib/siteUrl';
import { isIndexingAllowed } from '@/lib/indexing';
import './globals.css';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MyPinjam Credit',
    template: '%s | MyPinjam Credit'
  },
  description:
    '💰 LULUS PANTAS! Pinjaman RM1K-RM500K untuk peribadi, SME & modal kerja. CTOS teruk & blacklist boleh mohon. 18% kadar rendah, tiada penjamin. Apply online 24/7, approved dalam 1 hari!',
  keywords: [
    'pinjaman peribadi Malaysia',
    'personal loan Malaysia',
    'pinjaman segera',
    'licensed moneylender Malaysia',
    'pemberi pinjaman berlesen KPKT',
    'pinjaman online Malaysia',
    'pinjaman peribadi online',
    'SME loan Malaysia',
    'pinjaman perniagaan',
    'business loan Malaysia',
    'pinjaman tanpa penjamin',
    'pinjaman blacklist CTOS',
    'MyPinjam Credit',
    'MyPinjam'
  ],
  authors: [{ name: 'MyPinjam Credit' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' }
    ],
    apple: '/logo.png',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'MyPinjam Credit',
    locale: 'ms_MY',
    title: 'MyPinjam Credit',
    description:
      'Apply personal loan & SME loan in Malaysia. Licensed moneylender KPKT WL2684/14/02. Approval in 24 hours, RM5,000 - RM200,000, no guarantor required.',
    images: [
      {
        url: '/logo.png',
        width: 192,
        height: 192,
        alt: 'MyPinjam Credit Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mypinjamcredit',
    title: 'MyPinjam Credit',
    description:
      'Licensed KPKT moneylender Malaysia. Personal, SME and working capital loans. 24-hour approval, transparent rates.',
    images: ['/logo.png']
  },
  robots: isIndexingAllowed()
    ? {
        index: true,
        follow: true
      }
    : {
        index: false,
        follow: false
      }
};



const supportedLocales: Locale[] = ['ms', 'en'];


const detectLocale = async (): Promise<Locale> => {
  const headerList = await headers();
  const nextIntlLocale = headerList.get('x-intl-locale');
  if (nextIntlLocale && supportedLocales.includes(nextIntlLocale as Locale)) {
    return nextIntlLocale as Locale;
  }

  const cookieStore = await cookies();
  const storedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (storedLocale && supportedLocales.includes(storedLocale as Locale)) {
    return storedLocale as Locale;
  }

  return 'ms';
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await detectLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
