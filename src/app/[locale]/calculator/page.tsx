import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { LoanCalculator } from '@/components/LoanCalculator';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/calculator`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.calculator' });
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
      siteName: 'Money Line Solutions',
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

const calculatorHighlights = [
  {
    title: 'Flexible tenure',
    description: 'Simulate repayment terms from 1 to 10 years to match your cash-flow cycle.'
  },
  {
    title: 'Transparent rates',
    description: 'Preview instalments using our published headline rate before you engage an advisor.'
  },
  {
    title: 'Simple submission',
    description: 'Save your preferred figures then proceed to the online application in one click.'
  }
];

const documentationChecklist = [
  'Copy of NRIC (front & back)',
  'Latest 3 months bank statements',
  'Latest EPF statement or payslips',
  'SSM documents for business applicants',
  'Any existing loan statements (if consolidating)'
];

export default async function CalculatorPage({ params }: PageProps) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const applyHref = `/${locale}/apply`;
  const productsHref = `/${locale}/products`;

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              {tCommon('brand')}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Repayment Calculator
            </h1>
            <p className="text-lg text-slate-700">
              Estimate your monthly repayments instantly. Fine-tune the amount and tenure to see how
              our headline rate aligns with your budget.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-blue-200 px-4 py-2 text-blue-600">
                Interest rate from 4.88% p.a.
              </span>
              <span className="rounded-full border border-blue-200 px-4 py-2 text-blue-600">
                Loan size RM 5,000 – RM 100,000
              </span>
              <span className="rounded-full border border-blue-200 px-4 py-2 text-blue-600">
                Tenure up to 10 years
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {calculatorHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-white/90 p-5 text-sm text-slate-700 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  {item.title}
                </p>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div className="space-y-6 rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600">Before you calculate</h2>
          <p className="text-sm text-slate-600">
            Keep these documents ready if you plan to proceed with an application after running the
            numbers.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            {documentationChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
                >
                  &bull;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-5 text-sm text-slate-600">
            <p>
              Unsure which product fits best?{' '}
              <Link href={productsHref as any} className="font-semibold text-blue-600 hover:underline">
                Explore our loan portfolio
              </Link>{' '}
              or contact our advisor for a personalised review.
            </p>
          </div>
        </div>
        <LoanCalculator applyHref={applyHref} />
      </section>

      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-600 p-10 text-white shadow-xl shadow-blue-100">
        <h2 className="text-2xl font-semibold">Ready to secure your financing?</h2>
        <p className="mt-3 text-sm text-blue-100">
          Submit your application with your preferred figures. Our licensed advisor will validate
          eligibility and documentation within one business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={applyHref as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Proceed to application
          </Link>
          <Link
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Speak to an advisor
          </Link>
        </div>
      </section>
    </div>
  );
}
