import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/GoogleMap';
import { LeadForm } from '@/components/forms/LeadForm';
import { FadeInSection } from '@/components/FadeInSection';
import { CountUp } from '@/components/CountUp';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.home' });
  const title = tSeo('title');
  const description = tSeo('description');

  return {
    title,
    description,
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title,
      description,
      url: hrefForLocale(locale),
      siteName: 'MyPinjam Credit',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website'
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image'
    }
  };
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
  'Licensed credit facilitator with PDPA-compliant processes',
  'Dedicated advisor assigned once your form is submitted',
  'Transparent fee structure with no hidden handling charges',
  'Bilingual customer support (English & Bahasa Melayu)'
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

  return (
    <div className="space-y-8 md:space-y-16">
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-6 shadow-xl shadow-blue-100 md:rounded-3xl md:p-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-sky-400/20 to-transparent blur-3xl" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
            <p>{tCommon('tagline')}</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <FadeInSection>
        <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-6 text-white shadow-xl md:rounded-3xl md:p-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold md:text-3xl">Trusted by Thousands of Malaysians</h2>
          <p className="mt-2 text-sm text-blue-50 md:text-base">
            Real results from real people who chose MyPinjam Credit
          </p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-8 md:gap-8">
          <div className="text-center group">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 transition-transform group-hover:scale-110">
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
              <div className="rounded-full bg-white/20 p-4 transition-transform group-hover:scale-110">
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
              <div className="rounded-full bg-white/20 p-4 transition-transform group-hover:scale-110">
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
              <div className="rounded-full bg-white/20 p-4 transition-transform group-hover:scale-110">
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
          <LeadForm />
        </div>
      </section>
      </FadeInSection>

      {/* Customer Testimonials */}
      <FadeInSection delay={100}>
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

      <FadeInSection delay={200}>
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
  );
}
