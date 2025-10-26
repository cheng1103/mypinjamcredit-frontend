import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/products`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.products' });
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

export default async function ProductsPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const t = await getTranslations({ locale, namespace: 'common' });

  const products = [
    {
      title: 'Personal Loan',
      amount: 'RM 5,000 - RM 150,000',
      rate: '6.5% - 12% p.a.',
      tenure: '1 - 7 years',
      features: [
        'No collateral required',
        'Fast approval within 24-48 hours',
        'Flexible repayment terms',
        'Early settlement allowed'
      ]
    },
    {
      title: 'SME Business Loan',
      amount: 'RM 50,000 - RM 500,000',
      rate: '7% - 14% p.a.',
      tenure: '1 - 10 years',
      features: [
        'Working capital financing',
        'Business expansion funding',
        'Equipment purchase loans',
        'Invoice financing available'
      ]
    },
    {
      title: 'Equipment Financing',
      amount: 'RM 20,000 - RM 300,000',
      rate: '6% - 11% p.a.',
      tenure: '2 - 7 years',
      features: [
        'Up to 90% financing',
        'New & used equipment',
        'Flexible down payment',
        'Quick processing'
      ]
    },
    {
      title: 'Working Capital Loan',
      amount: 'RM 30,000 - RM 200,000',
      rate: '8% - 15% p.a.',
      tenure: '6 months - 5 years',
      features: [
        'Revolving credit facility',
        'Overdraft protection',
        'Seasonal business support',
        'Cash flow management'
      ]
    }
  ];

  const highlights = [
    { label: 'Average Approval Time', value: '24 - 48 hours' },
    { label: 'Customer Satisfaction', value: '4.9 / 5 rating' },
    { label: 'Licensed Since', value: '2010' }
  ];

  const advisoryPoints = [
    'Personalised consultation with experienced loan advisors',
    'Seamless digital document submission and tracking',
    'Dedicated after-sales support throughout your tenure'
  ];

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
              {t('brand')}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Structured financing for every milestone
            </h1>
            <p className="text-lg text-slate-700">
              Explore a curated portfolio of consumer and commercial loans backed by transparent
              pricing, responsive support, and flexible repayment structures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/apply` as any}
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-500"
              >
                Start Application
              </Link>
              <Link
                href={`/${locale}/contact` as any}
                className="inline-flex items-center rounded-full border border-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition hover:bg-blue-50"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-center shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  {item.label}
                </dt>
                <dd className="mt-3 text-lg font-semibold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-slate-900">Loan Catalogue</h2>
          <p className="text-base text-slate-600">
            Select the facility that fits your growth plans. Each product includes guidance on
            documentation, compliance, and repayment structuring.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.title}
              className="group flex h-full flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-600">{product.title}</h3>

                <dl className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-700">Loan Amount</dt>
                    <dd>{product.amount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-700">Interest Rate</dt>
                    <dd>{product.rate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-700">Loan Tenure</dt>
                    <dd>{product.tenure}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                    Key Features
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-slate-600">
                        <span
                          aria-hidden
                          className="mr-2 mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600"
                        >
                          &bull;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                href={`/${locale}/apply` as any}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-blue-500"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Product Comparison Table */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Compare Our Loan Products</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Find the perfect loan for your needs by comparing key features side by side
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-blue-100">
                <th className="p-4 text-left text-sm font-semibold text-slate-900">Feature</th>
                <th className="p-4 text-center text-sm font-semibold text-blue-600">Personal Loan</th>
                <th className="p-4 text-center text-sm font-semibold text-blue-600">Business Loan</th>
                <th className="p-4 text-center text-sm font-semibold text-blue-600">Debt Consolidation</th>
                <th className="p-4 text-center text-sm font-semibold text-blue-600">Property Loan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-50">
                <td className="p-4 text-sm font-medium text-slate-700">Loan Amount</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 5K - 100K</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 50K - 500K</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 10K - 150K</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 100K - 1M</td>
              </tr>
              <tr className="border-b border-blue-50 bg-blue-50/30">
                <td className="p-4 text-sm font-medium text-slate-700">Interest Rate (p.a.)</td>
                <td className="p-4 text-center text-sm text-slate-600">From 4.88%</td>
                <td className="p-4 text-center text-sm text-slate-600">From 5.5%</td>
                <td className="p-4 text-center text-sm text-slate-600">From 5.2%</td>
                <td className="p-4 text-center text-sm text-slate-600">From 3.8%</td>
              </tr>
              <tr className="border-b border-blue-50">
                <td className="p-4 text-sm font-medium text-slate-700">Loan Tenure</td>
                <td className="p-4 text-center text-sm text-slate-600">1 - 10 years</td>
                <td className="p-4 text-center text-sm text-slate-600">1 - 7 years</td>
                <td className="p-4 text-center text-sm text-slate-600">1 - 10 years</td>
                <td className="p-4 text-center text-sm text-slate-600">5 - 35 years</td>
              </tr>
              <tr className="border-b border-blue-50 bg-blue-50/30">
                <td className="p-4 text-sm font-medium text-slate-700">Processing Time</td>
                <td className="p-4 text-center text-sm text-slate-600">1 - 2 days</td>
                <td className="p-4 text-center text-sm text-slate-600">3 - 5 days</td>
                <td className="p-4 text-center text-sm text-slate-600">2 - 3 days</td>
                <td className="p-4 text-center text-sm text-slate-600">7 - 14 days</td>
              </tr>
              <tr className="border-b border-blue-50">
                <td className="p-4 text-sm font-medium text-slate-700">Collateral Required</td>
                <td className="p-4 text-center text-sm text-slate-600">No</td>
                <td className="p-4 text-center text-sm text-slate-600">Optional</td>
                <td className="p-4 text-center text-sm text-slate-600">No</td>
                <td className="p-4 text-center text-sm text-slate-600">Yes (Property)</td>
              </tr>
              <tr className="border-b border-blue-50 bg-blue-50/30">
                <td className="p-4 text-sm font-medium text-slate-700">Min. Monthly Income</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 3,000</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 5,000</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 3,000</td>
                <td className="p-4 text-center text-sm text-slate-600">RM 5,000</td>
              </tr>
              <tr className="border-b border-blue-50">
                <td className="p-4 text-sm font-medium text-slate-700">Early Settlement</td>
                <td className="p-4 text-center text-sm text-slate-600">✓ No penalty</td>
                <td className="p-4 text-center text-sm text-slate-600">✓ No penalty</td>
                <td className="p-4 text-center text-sm text-slate-600">✓ No penalty</td>
                <td className="p-4 text-center text-sm text-slate-600">Terms apply</td>
              </tr>
              <tr className="bg-blue-50/30">
                <td className="p-4 text-sm font-medium text-slate-700">Best For</td>
                <td className="p-4 text-center text-sm text-slate-600">General expenses</td>
                <td className="p-4 text-center text-sm text-slate-600">Business expansion</td>
                <td className="p-4 text-center text-sm text-slate-600">Multiple debts</td>
                <td className="p-4 text-center text-sm text-slate-600">Property purchase</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}/calculator` as any}
            className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-500"
          >
            Use Loan Calculator
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8 lg:col-span-2">
          <h3 className="text-2xl font-semibold text-blue-600">Why clients choose Aurora Credit</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {advisoryPoints.map((point) => (
              <div key={point} className="rounded-xl border border-blue-100 bg-white/80 p-4">
                <p className="text-sm text-slate-600">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Every application is reviewed by licensed advisors who ensure alignment with Bank Negara
            Malaysia guidelines and responsible lending standards.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-white p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900">Need guidance?</h3>
          <p className="mt-2 text-sm text-slate-600">
            Share your financing goals and get a tailored recommendation within one business day.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-blue-600">Hotline:</span> {t('contact.phone')}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Email:</span> hello@mypinjamcredit.com
            </p>
          </div>
          <Link
            href={`/${locale}/contact` as any}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition hover:bg-blue-50"
          >
            Book a call
          </Link>
        </div>
      </section>
    </div>
  );
}
