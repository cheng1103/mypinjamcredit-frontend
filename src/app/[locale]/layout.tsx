import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import FloatingContact from '@/components/FloatingContact';
import BackToTop from '@/components/BackToTop';
import { LiveNotification } from '@/components/LiveNotification';
import { Logo } from '@/components/Logo';
import { MobileMenu } from '@/components/MobileMenu';
import { Toaster } from '@/components/Toaster';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { WebVitals } from '@/components/WebVitals';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights} from '@vercel/speed-insights/next';
import type { Locale } from '@/types/locale';
import { getSeoCopy } from '@/lib/seo-content';
import { getSiteUrl } from '@/lib/siteUrl';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

const siteUrl = getSiteUrl();

type LayoutParams = { locale: string };

export async function generateMetadata({
  params
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = getSeoCopy(locale as Locale, 'home');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: [
      'pinjaman peribadi',
      'personal loan Malaysia',
      'licensed moneylender Malaysia',
      'pemberi pinjaman berlesen',
      'pinjaman segera',
      'pinjaman online Malaysia',
      'pinjaman perniagaan',
      'business loan Malaysia',
      'SME loan Malaysia',
      'pinjaman KPKT',
      'pinjaman peribadi KL',
      'pinjaman peribadi Selangor',
      'kredit peribadi Malaysia'
    ],
    authors: [{ name: 'MyPinjam Credit' }],
    creator: 'MyPinjam Credit',
    publisher: 'MyPinjam Credit',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ms: `${siteUrl}/ms`
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      url: `${siteUrl}/${locale}`,
      siteName: 'MyPinjam Credit',
      title,
      description,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'MyPinjam Credit - Licensed Moneylender Malaysia KPKT WL2684/14/02'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image.png']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: 'S2No0aIXoBfhoHVso3J3Zl5BVf8w0xr7It0wlg4jXTY'
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'MyPinjam Credit'
    }
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ms' }] satisfies LayoutParams[];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const organizationMessage = (messages as Record<string, unknown>)?.seo as
    | Record<string, unknown>
    | undefined;
  const organization = (organizationMessage?.organization ?? null) as
    | {
        name?: string;
        legalName?: string;
        url?: string;
        logo?: string;
        email?: string;
        telephone?: string;
        address?: string;
        sameAs?: string[];
      }
    | null;

  const organizationJsonLd = organization
    ? {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: organization.name ?? 'MyPinjam Credit',
        legalName: organization.legalName ?? 'MyPinjam Credit',
        url: organization.url ?? siteUrl,
        logo: organization.logo ? new URL(organization.logo, siteUrl).toString() : `${siteUrl}/logo.png`,
        email: organization.email ?? 'hello@mypinjamcredit.com',
        telephone: organization.telephone ?? '+60-11-24335406',
        address: organization.address ?? 'Level M, M-01a, Wisma YNH, Kiara 163, 8, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur',
        sameAs: organization.sameAs ?? []
      }
    : null;

  const navItems: Array<{ href: string; label: string }> = [
    { href: `/${locale}`, label: tCommon('nav.home') },
    { href: `/${locale}/about`, label: 'About' },
    { href: `/${locale}/products`, label: tCommon('nav.products') },
    { href: `/${locale}/calculator`, label: tCommon('nav.calculator') },
    { href: `/${locale}/faq`, label: 'FAQ' },
    { href: `/${locale}/blog`, label: 'Blog' },
    { href: `/${locale}/apply`, label: tCommon('nav.apply') },
    { href: `/${locale}/contact`, label: tCommon('nav.contact') }
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        className={`${geistSans.variable} ${geistMono.variable} relative text-slate-900 antialiased`}
      >
        {organizationJsonLd ? (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
        ) : null}
        <header className="sticky top-0 z-10 border-b border-sky-200/60 bg-white/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6 md:py-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 md:gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              aria-label="MyPinjam Credit Home"
            >
              <Logo size={48} className="md:w-16 md:h-16" priority />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wide text-blue-600 md:text-lg">
                  {tCommon('brand')}
                </span>
                <span className="text-[10px] font-semibold text-slate-700 md:text-xs">
                  {tCommon('brandFull')}
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-700" aria-label="Main navigation">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Suspense fallback={<div className="h-8 w-16" />}>
                <LanguageSwitcher />
              </Suspense>
              <MobileMenu navItems={navItems} />
            </div>
          </div>
        </header>
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 text-slate-800 md:px-6 md:py-12">
          <Breadcrumbs />
          {children}
        </main>
        <footer className="border-t border-sky-200/60 bg-white/70 py-6 md:py-8">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-6 grid gap-6 md:gap-8 md:grid-cols-3">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Logo size={48} />
                  <div>
                    <p className="font-bold text-blue-600">{tCommon('brand')}</p>
                    <p className="text-xs font-semibold text-slate-700">{tCommon('brandFull')}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{tCommon('tagline')}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Contact Us</h3>
                <p className="mb-1 text-sm text-slate-600">Phone: {tCommon('contact.phone')}</p>
                <p className="text-sm text-slate-600">{tCommon('contact.address')}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Quick Links</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-slate-600 transition hover:text-blue-600"
                  >
                    {tCommon('footer.privacy')}
                  </Link>
                  <Link
                    href={`/${locale}/terms`}
                    className="text-slate-600 transition hover:text-blue-600"
                  >
                    {tCommon('footer.terms')}
                  </Link>
                  <Link
                    href={`/${locale}/compliance`}
                    className="text-slate-600 transition hover:text-blue-600"
                  >
                    {tCommon('footer.compliance')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <p className="text-center text-xs text-slate-600">{tCommon('footer.disclaimer')}</p>
            </div>
          </div>
        </footer>

        {/* Floating Contact and Back to Top Buttons */}
        <FloatingContact />
        <BackToTop />

        {/* Live Notification Widget */}
        <LiveNotification />

        {/* Toast Notifications */}
        <Toaster />

        {/* Analytics and Monitoring */}
        <GoogleAnalytics />
        <WebVitals />
        <Analytics />
        <SpeedInsights />
      </div>
    </NextIntlClientProvider>
  );
}
