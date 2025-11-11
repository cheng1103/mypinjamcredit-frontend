import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Money Line Solutions Malaysia | Personal & SME Loans',
    template: '%s | Money Line Solutions'
  },
  description:
    'Licensed Malaysian loan consultancy offering personal, SME and working capital financing with transparent rates and bilingual support.',
  keywords: [
    'Money Line Solutions',
    'personal loan Malaysia',
    'SME financing',
    'licensed money lender',
    'loan advisor',
    'Money Line Solutions'
  ],
  authors: [{ name: 'Money Line Solutions' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Money Line Solutions',
    locale: 'en_MY',
    title: 'Money Line Solutions Malaysia | Personal & SME Loans',
    description:
      'Compare personal and SME loan options, discover flexible repayment plans, and apply in minutes with Money Line Solutions Malaysia.'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mypinjamcredit',
    title: 'Money Line Solutions Malaysia | Licensed Loan Advisor',
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
