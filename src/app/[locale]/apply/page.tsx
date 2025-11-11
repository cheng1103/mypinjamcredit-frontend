import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LeadForm } from '@/components/forms/LeadForm';
import { TrustBadges } from '@/components/TrustBadges';
import { QuickCalculator } from '@/components/QuickCalculator';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import type { Locale } from '@/types/locale';

type ApplyPageProps = { params: Promise<{ locale: string }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${baseUrl}/${locale}/apply`;

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.apply' });

  return {
    title: tSeo('title'),
    description: tSeo('description'),
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title: tSeo('title'),
      description: tSeo('description'),
      url: hrefForLocale(locale),
      type: 'website',
      siteName: 'Money Line Solutions',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY'
    },
    twitter: {
      title: tSeo('title'),
      description: tSeo('description'),
      card: 'summary_large_image'
    }
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  setRequestLocale(locale);

  const tForm = await getTranslations({ locale, namespace: 'form' });

  const applicationSteps = [
    {
      title: 'Share your details',
      description: 'Tell us more about your financing needs and preferred loan amount.'
    },
    {
      title: 'Advisor review',
      description: 'Our licensed team verifies your information within one business day.'
    },
    {
      title: 'Approval & disbursement',
      description: 'Sign the agreement digitally and receive funds in as fast as 24 hours.'
    }
  ];

  const supportHighlights = [
    'Secure encryption keeps your submission private and PDPA compliant.',
    'No commitment fees until you receive an approval decision from our advisors.',
    'All products adhere to Bank Negara Malaysia regulations and responsible lending policies.'
  ];

  return (
    <>
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

    <div className="space-y-12">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              {tForm('title')}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Submit your loan application in minutes
            </h1>
            <p className="text-lg text-slate-700">{tForm('description')}</p>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">
              How it works
            </h2>
            <ol className="mt-4 space-y-4 text-sm text-slate-700">
              {applicationSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800">{step.title}</p>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:gap-10 lg:grid-cols-[1fr,1.2fr,1fr]">
        {/* Trust Badges - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block space-y-6">
          <TrustBadges />
        </div>

        <div className="space-y-6 rounded-3xl border border-blue-200 bg-white/90 p-4 md:p-8 shadow-lg order-first lg:order-none">
          <h2 className="text-xl font-semibold text-blue-600">Before you begin</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>
              <span className="font-semibold text-slate-800">Required documents:</span> NRIC,
              three-month bank statements, latest EPF statement, or business registration (for SME).
            </li>
            <li>
              <span className="font-semibold text-slate-800">Eligibility:</span> Malaysian citizens
              aged 21-60 with minimum monthly income of RM2,500.
            </li>
            <li>
              <span className="font-semibold text-slate-800">Processing fee:</span> Payable only upon
              successful approval. No upfront charges.
            </li>
          </ul>
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-5 text-sm text-slate-700">
            <p>
              Need help with your paperwork?{' '}
              <Link href={`/${locale}/contact` as any} className="font-semibold text-blue-600 hover:underline">
                Book a consultation
              </Link>{' '}
              and we will guide you step-by-step.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Application Form */}
          <div className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-xl shadow-blue-100">
            <LeadForm />
          </div>

          {/* Quick Calculator */}
          <QuickCalculator />
        </div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
        <h2 className="text-xl font-semibold text-blue-600">Application assurance</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {supportHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600"
              >
                &bull;
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-500">
          By submitting this form you consent to Aurora Credit contacting you via phone, SMS, or
          email to process your application. Read our privacy policy for more details on how we
          protect your information.
        </p>
      </section>
    </div>
    </>
  );
}

