import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/GoogleMap';
import { LeadForm } from '@/components/forms/LeadForm';
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
      <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-6 shadow-xl shadow-blue-100 md:rounded-3xl md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-600 md:text-sm">{tCommon('brand')}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {tHero('headline')}
            </h1>
            <p className="text-base text-slate-700 md:text-lg">{tHero('subheadline')}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={applyHref as any}
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-500"
              >
                {tHero('ctaPrimary')}
              </Link>
              <Link
                href={`/${locale}/products` as any}
                className="inline-flex items-center rounded-full border border-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition hover:bg-blue-50"
              >
                {tHero('ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
            <p>{tCommon('tagline')}</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white shadow-lg md:rounded-3xl md:p-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold md:text-3xl">Trusted by Thousands of Malaysians</h2>
          <p className="mt-2 text-sm text-slate-300 md:text-base">
            Real results from real people who chose MyPinjam Credit
          </p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-8 md:gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold md:text-4xl lg:text-5xl">5,000+</div>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">Satisfied Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold md:text-4xl lg:text-5xl">RM 50M+</div>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">Loans Disbursed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold md:text-4xl lg:text-5xl">98%</div>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold md:text-4xl lg:text-5xl">24 hrs</div>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">Average Approval Time</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href as any}
            className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">
              {tHomeCards(`${card.key}.title`)}
            </p>
            <p className="mt-3 text-base text-slate-600">
              {tHomeCards(`${card.key}.description`)}
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
              {tCommon('actions.learnMore')} {'\u2192'}
            </span>
          </Link>
        ))}
      </section>

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
            className="inline-flex items-center rounded-full border border-blue-200 px-6 py-3 text-blue-600 transition hover:border-blue-400 hover:text-blue-700"
          >
            Launch repayment calculator
          </Link>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-600">
            Example purpose only — advisor will confirm your actual schedule
          </span>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="h-[600px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
          <GoogleMap />
        </div>
        <div className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-lg shadow-blue-100">
          <LeadForm />
        </div>
      </section>

      {/* Customer Testimonials */}
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
    </div>
  );
}
