import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/GoogleMap';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/contact`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.contact' });
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

const iconStyles =
  'flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600';

const phoneIcon = (
  <span className={iconStyles} aria-hidden>
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.8 3h2.2a1.6 1.6 0 0 1 1.6 1.4l0.5 2.8a1.7 1.7 0 0 1-.4 1.3l-1.5 1.6a10.8 10.8 0 0 0 4.1 4.1l1.6-1.5a1.7 1.7 0 0 1 1.3-.4l2.8 0.5A1.6 1.6 0 0 1 21 14.8V17a1.6 1.6 0 0 1-1.6 1.6H17C10.4 18.6 5.4 13.6 5.4 7V4.6A1.6 1.6 0 0 1 6.8 3Z" />
    </svg>
  </span>
);

const locationIcon = (
  <span className={iconStyles} aria-hidden>
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5a6 6 0 0 0-6 6c0 4.2 4.9 10.3 5.7 11.2a0.5 0.5 0 0 0 .6 0c0.8-0.9 5.7-7 5.7-11.2a6 6 0 0 0-6-6Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  </span>
);

const clockIcon = (
  <span className={iconStyles} aria-hidden>
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8.5v3.5l2.3 1.4" />
    </svg>
  </span>
);

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const phoneNumber = tCommon('contact.phone');
  const officeAddress = tCommon('contact.fullAddress');

  const contactMethods = [
    {
      title: 'Call us directly',
      description: 'Speak with a licensed loan advisor in English or Bahasa Melayu.',
      value: phoneNumber,
      href: `tel:${phoneNumber}`,
      icon: phoneIcon
    },
    {
      title: 'Visit our branch',
      description: officeAddress,
      value: 'Setia Alam, Selangor',
      href: `https://maps.google.com/?q=${encodeURIComponent(officeAddress)}`,
      icon: locationIcon
    },
    {
      title: 'Office hours',
      description: 'Individual consultations by appointment. Walk-ins welcome before 4pm.',
      value: 'Mon - Fri: 9am – 6pm · Sat: 9am – 1pm',
      href: '#contact-hours',
      icon: clockIcon
    }
  ];

  const serviceHighlights = [
    'Competitive fixed rate from 4.88% p.a. with transparent fee structure',
    '95% approval rate for qualified applicants with complete documentation',
    'Secure digital submission that protects your personal information',
    'Dedicated relationship manager assigned to every successfully funded loan',
    'Flexible repayment options aligned with your cash-flow cycle'
  ];

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              {tCommon('brand')}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Let’s plan your best-fit loan together
            </h1>
            <p className="text-lg text-slate-700">
              Our advisory team is ready to help you compare products, prepare documents, and lock in
              the fastest approval window.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {method.icon}
                <div>
                  <p className="text-sm font-semibold text-slate-700">{method.title}</p>
                  <p className="mt-1 text-base font-semibold text-blue-600">{method.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-6">
          <div id="contact-hours" className="rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-600">{tCommon('brand')}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">{tCommon('brandFull')}</p>
            <dl className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  Hotline
                </dt>
                <dd>
                  <a href={`tel:${phoneNumber}`} className="text-lg font-semibold text-blue-600 hover:underline">
                    {phoneNumber}
                  </a>
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  Email
                </dt>
                <dd className="text-slate-600">support@mypinjamcredit.com</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  Address
                </dt>
                <dd className="text-slate-600">{tCommon('contact.fullAddress')}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  Business hours
                </dt>
                <dd className="text-slate-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8">
            <h3 className="text-xl font-semibold text-blue-600">Why borrowers trust MyPinjam</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {serviceHighlights.map((highlight) => (
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
          </div>
        </div>

        <div className="h-[540px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
          <GoogleMap />
        </div>
      </section>

      <section className="rounded-3xl border border-blue-600/30 bg-gradient-to-r from-blue-600 to-sky-600 p-10 text-center text-white shadow-xl shadow-blue-200">
        <h2 className="text-3xl font-semibold">Ready to get started?</h2>
        <p className="mt-4 text-base text-blue-100">
          Submit your application and we will respond within one business day with next steps.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Apply for a loan
          </Link>
          <Link
            href={`/${locale}/products` as any}
            className="inline-flex items-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Explore products
          </Link>
        </div>
      </section>
    </div>
  );
}
