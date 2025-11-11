import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MyPinjam Credit Malaysia | Personal & SME Loans',
    template: '%s | MyPinjam Credit'
  },
  description:
    'Licensed Malaysian loan consultancy offering personal, SME and working capital financing with transparent rates and bilingual support.',
  keywords: [
    'MyPinjam Credit',
    'personal loan Malaysia',
    'SME financing',
    'licensed money lender',
    'loan advisor',
    'MyPinjam'
  ],
  authors: [{ name: 'MyPinjam Credit' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'MyPinjam Credit',
    locale: 'en_MY',
    title: 'MyPinjam Credit Malaysia | Personal & SME Loans',
    description:
      'Compare personal and SME loan options, discover flexible repayment plans, and apply in minutes with MyPinjam Credit Malaysia.'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mypinjamcredit',
    title: 'MyPinjam Credit Malaysia | Licensed Loan Advisor',
    description:
      'Transparent financing advisory in Malaysia for personal, SME and working capital loans.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
