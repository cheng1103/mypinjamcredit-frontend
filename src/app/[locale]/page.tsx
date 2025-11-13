import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/GoogleMap';
import { SimpleLeadForm } from '@/components/forms/SimpleLeadForm';
import { FadeInSection } from '@/components/FadeInSection';
import { CountUp } from '@/components/CountUp';
import { generateSEO, keywordSets } from '@/lib/seo';
import { generateLocalBusinessSchema, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/schemas';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.home' });

  return generateSEO({
    title: tSeo('title'),
    description: tSeo('description'),
    keywords: keywordSets.homepage,
    canonical: hrefForLocale(locale),
    locale,
    type: 'website'
  });
}

export const dynamic = 'force-static';

const loanAmounts = [5000, 10000, 20000, 30000, 50000, 75000, 100000] as const;

const baseMonthlyByTenure = {
  '12': 437,
  '24': 229,
  '36': 162,
  '48': 128,
  '60': 108
} as const;

const tenureColumns = [
  { key: '12', label: '12 months' },
  { key: '24', label: '24 months' },
  { key: '36', label: '36 months' },
  { key: '48', label: '48 months' },
  { key: '60', label: '60 months' }
] as const;

const currencyFormatter = new Intl.NumberFormat('en-MY', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const formatMonthly = (amount: number, tenureKey: keyof typeof baseMonthlyByTenure) => {
  const base = baseMonthlyByTenure[tenureKey];
  const scaled = (base * amount) / 5000;
  return `RM ${currencyFormatter.format(Math.round(scaled))}`;
};

const formatAmount = (value: number) => `RM ${currencyFormatter.format(value)}`;

const operatingAssurances = [
  'Licensed loan company with PDPA-compliant processes',
  'Dedicated loan officer assigned once your form is submitted',
  'Transparent fee structure with no hidden handling charges',
  'Support in 2 languages (English & Bahasa Melayu)'
];

export default async function HomePage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHomeCards = await getTranslations({ locale, namespace: 'home.cards' });

  const applyHref = `/${locale}/apply`;
  const calculatorHref = `/${locale}/calculator`;

  const cards = [
    { key: 'products', href: `/${locale}/products` },
    { key: 'calculator', href: calculatorHref },
    { key: 'community', href: `/${locale}/feedback` },
    { key: 'contact', href: `/${locale}/contact` }
  ] as const;

  // Generate structured data schemas
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="relative space-y-8 md:space-y-16">
      {/* Full Background Image */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage: 'url(/hero-bg-hd.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.75) contrast(1.15) saturate(1.1)'
          } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/15" />
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-blue-100 md:rounded-3xl md:p-10">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-600 md:text-sm">{tCommon('brand')}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {tHero('headline')}
            </h1>
            <p className="text-base text-slate-700 md:text-lg">{tHero('subheadline')}</p>
            <div className="flex flex-wrap gap-4" role="group" aria-label="Call to action buttons">
              <Link
                href={applyHref as any}
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Start loan application"
              >
                {tHero('ctaPrimary')}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${locale}/products` as any}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View loan product options"
              >
                {tHero('ctaSecondary')}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg">
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700 mb-1">VERIFIED</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Rakan Pinjaman Dipercayai di Malaysia
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  {tCommon('trust.since')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <FadeInSection>
        <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-sky-400/90 backdrop-blur-sm p-6 text-white shadow-xl md:rounded-3xl md:p-10">
        <div className="relative text-center">
          <h2 className="text-xl font-semibold md:text-3xl">Trusted by Thousands of Malaysians</h2>
          <p className="mt-2 text-sm text-blue-50 md:text-base">
            Real results from real people who chose MyPinjam Credit
          </p>
        </div>
        <div className="relative mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-8 md:gap-8">
          <div className="text-center group">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-8 w-8 text-white md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <CountUp end={5000} suffix="+" className="text-3xl font-bold md:text-4xl lg:text-5xl" />
            <p className="mt-2 text-xs text-blue-50 md:text-sm">Satisfied Customers</p>
          </div>
          <div className="text-center group">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-8 w-8 text-white md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-lg md:text-xl">RM</span>
              <CountUp end={50} suffix="M+" className="text-3xl font-bold md:text-4xl lg:text-5xl" />
            </div>
            <p className="mt-2 text-xs text-blue-50 md:text-sm">Loans Disbursed</p>
          </div>
          <div className="text-center group">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-8 w-8 text-white md:h-10 md:w-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
            <CountUp end={98} suffix="%" className="text-3xl font-bold md:text-4xl lg:text-5xl" />
            <p className="mt-2 text-xs text-blue-50 md:text-sm">Customer Satisfaction</p>
          </div>
          <div className="text-center group">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-8 w-8 text-white md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <CountUp end={24} suffix=" hrs" className="text-3xl font-bold md:text-4xl lg:text-5xl" />
            <p className="mt-2 text-xs text-blue-50 md:text-sm">Average Approval Time</p>
          </div>
        </div>
      </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="grid gap-6 md:grid-cols-2 md:gap-5 lg:gap-6 xl:grid-cols-4">
        {cards.map((card) => {
          const icons: Record<string, React.ReactNode> = {
            products: (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
            calculator: (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ),
            community: (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            ),
            contact: (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            )
          };

          return (
            <Link
              key={card.key}
              href={card.href as any}
              className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
            >
              <div className="mb-4 flex justify-between items-start">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 p-3 text-blue-600 transition-all group-hover:scale-110 group-hover:from-blue-100 group-hover:to-sky-100">
                  {icons[card.key]}
                </div>
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold transition-colors group-hover:text-blue-700">
                {tHomeCards(`${card.key}.title`)}
              </p>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {tHomeCards(`${card.key}.description`)}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                {tCommon('actions.learnMore')} <span className="transition-transform group-hover:translate-x-1">{'\u2192'}</span>
              </span>
            </Link>
          );
        })}
      </section>
      </FadeInSection>

      <FadeInSection delay={200}>
        <section className="rounded-3xl border border-blue-100 bg-white/95 p-10 shadow-lg">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-500">
            Example Instalments
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Sample repayments from RM 5,000 to RM 100,000
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-slate-600">
            Preview monthly instalments for popular loan amounts using the headline rate. Values are
            rounded to keep the table easy to read — confirm the exact quote with our advisor.
          </p>
        </header>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm text-slate-700">
            <thead>
              <tr className="rounded-t-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-sky-500 text-left text-white">
                <th className="p-4 text-base font-semibold">Loan amount</th>
                {tenureColumns.map((col) => (
                  <th key={col.key} className="p-4 text-center text-base font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loanAmounts.map((amount, rowIndex) => (
                <tr
                  key={amount}
                  className={`border-b border-slate-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  }`}
                >
                  <th className="p-4 text-left text-base font-semibold text-slate-800">
                    {formatAmount(amount)}
                  </th>
                  {tenureColumns.map((col) => (
                    <td key={col.key} className="p-4 text-center text-lg font-semibold text-blue-600">
                      {formatMonthly(amount, col.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href={calculatorHref as any}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-blue-200 px-6 py-3 text-blue-600 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          >
            Launch repayment calculator
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-600">
            Example purpose only — advisor will confirm your actual schedule
          </span>
        </div>
      </section>
      </FadeInSection>

      <FadeInSection delay={300}>
        <section className="grid gap-8 md:grid-cols-2">
        <div className="h-[600px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
          <GoogleMap />
        </div>
        <div className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-lg shadow-blue-100">
          <SimpleLeadForm />
        </div>
      </section>
      </FadeInSection>

      {/* Locations Section */}
      <FadeInSection delay={100}>
        <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-50 p-10 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">📍 Locations We Serve</h2>
            <p className="mt-2 text-slate-600">Licensed loan services across Malaysia's major cities</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                city: 'Kuala Lumpur',
                slug: 'kuala-lumpur',
                areas: 'Mont Kiara, KLCC, Bangsar, Damansara, Cheras, Kepong, Ampang',
                clients: '156+',
                icon: '🏙️',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                city: 'Penang',
                slug: 'penang',
                areas: 'Georgetown, Bayan Lepas, Bukit Mertajam, Butterworth, Tanjung Bungah',
                clients: '142+',
                icon: '🌊',
                color: 'from-emerald-500 to-green-500'
              },
              {
                city: 'Johor Bahru',
                slug: 'johor-bahru',
                areas: 'JB City, Nusajaya, Skudai, Pasir Gudang, Gelang Patah, Senai',
                clients: '189+',
                icon: '🌏',
                color: 'from-blue-500 to-indigo-500'
              }
            ].map((location) => (
              <Link
                key={location.slug}
                href={`/${locale}/locations/${location.slug}` as any}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{location.icon}</span>
                  <span className={`rounded-full bg-gradient-to-r ${location.color} px-3 py-1 text-xs font-bold text-white`}>
                    {location.clients} Clients
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {location.city}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {location.areas}
                </p>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  View {location.city} Services
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Can't find your city?{' '}
              <Link href={`/${locale}/contact` as any} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Contact us
              </Link>{' '}
              - we serve clients nationwide!
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Resources Section */}
      <FadeInSection delay={150}>
        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">📚 Helpful Resources</h2>
            <p className="mt-2 text-slate-600">Learn about loans, CTOS scores, and financial planning</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href={`/${locale}/blog/ctos-score-complete-guide-2025` as any}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">Popular Guide</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                CTOS Score Complete Guide 2025
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Everything you need to know about checking and improving your CTOS credit score in Malaysia
              </p>
              <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Read Guide →
              </div>
            </Link>

            <Link
              href={`/${locale}/faq` as any}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">❓</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">40+ Questions</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                Frequently Asked Questions
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Get answers to common questions about loans, eligibility, interest rates, and application process
              </p>
              <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                View All FAQs →
              </div>
            </Link>

            <Link
              href={`/${locale}/blog` as any}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">✍️</span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">5 Guides</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                Loan Guides & Articles
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Expert articles on personal loans, business loans, debt consolidation, and financial tips
              </p>
              <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Browse Blog →
              </div>
            </Link>

            <Link
              href={`/${locale}/reviews` as any}
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">4.8/5.0</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                Customer Reviews
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Read verified reviews from real customers who secured loans through MyPinjam Credit
              </p>
              <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Read Reviews →
              </div>
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* Customer Testimonials */}
      <FadeInSection delay={200}>
        <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">What Our Customers Say</h2>
          <p className="mt-2 text-slate-600">Real feedback from people who trusted us with their financing needs</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'Ahmad Hassan',
              role: 'Business Owner',
              text: 'MyPinjam Credit helped me expand my restaurant with a business loan. The process was smooth and the advisor was very professional. Highly recommended!',
              rating: 5
            },
            {
              name: 'Sarah Lim',
              role: 'Teacher',
              text: 'I needed a personal loan urgently for medical expenses. They approved my application within 24 hours and the funds were in my account in 2 days. Very grateful!',
              rating: 5
            },
            {
              name: 'Kumar Raj',
              role: 'IT Professional',
              text: 'Best loan service I\'ve used. No hidden fees, transparent pricing, and excellent customer support. The online calculator helped me plan my budget perfectly.',
              rating: 5
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6"
            >
              <div className="mb-3 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-700">"{testimonial.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </FadeInSection>

      <FadeInSection delay={250}>
        <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-10 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-600">Operational assurances</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {operatingAssurances.map((assurance) => (
            <div
              key={assurance}
              className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-700 shadow-sm"
            >
              <span
                aria-hidden
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
              >
                &bull;
              </span>
              <span>{assurance}</span>
            </div>
          ))}
        </div>
      </section>
      </FadeInSection>
    </div>
    </>
  );
}
