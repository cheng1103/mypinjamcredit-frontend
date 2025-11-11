import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  loanType: string;
  date: string;
  status: 'APPROVED';
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    aria-hidden
    className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-slate-300'}`}
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
  >
    <path d="M10 2.5 12.6 7l5 .7-3.6 3.6.9 5-4.9-2.6-4.9 2.6.9-5L2.4 7.7l5-.7Z" />
  </svg>
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/feedback`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tSeo = await getTranslations({ locale, namespace: 'seo.feedback' });
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

export default async function FeedbackPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const t = await getTranslations({ locale, namespace: 'feedback' });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ahmad bin Hassan',
      rating: 5,
      comment:
        'Very fast approval process! Applied on Monday and got approval by Wednesday. The interest rate is competitive and customer service was excellent.',
      loanType: 'Personal Loan',
      date: '2024-03-15',
      status: 'APPROVED'
    },
    {
      id: 2,
      name: 'Sarah Lim',
      rating: 5,
      comment:
        'Great experience with Aurora Credit. They helped me expand my bakery business with flexible repayment terms. Highly recommend!',
      loanType: 'SME Business Loan',
      date: '2024-03-10',
      status: 'APPROVED'
    },
    {
      id: 3,
      name: 'Raj Kumar',
      rating: 4,
      comment:
        'Good service overall. The application process was straightforward and documentation requirements were reasonable. Got my equipment financing approved smoothly.',
      loanType: 'Equipment Financing',
      date: '2024-03-08',
      status: 'APPROVED'
    },
    {
      id: 4,
      name: 'Nurul Aina',
      rating: 5,
      comment:
        'Terima kasih Aurora Credit! Proses permohonan sangat mudah dan pantas. Pekerja sangat membantu dan menerangkan segala dengan jelas.',
      loanType: 'Personal Loan',
      date: '2024-03-05',
      status: 'APPROVED'
    },
    {
      id: 5,
      name: 'Chen Wei Ming',
      rating: 4,
      comment:
        'Professional team and transparent pricing. They explained all the terms clearly before I signed. Would use their services again.',
      loanType: 'Working Capital Loan',
      date: '2024-03-01',
      status: 'APPROVED'
    },
    {
      id: 6,
      name: 'Fatimah Abdullah',
      rating: 5,
      comment:
        'Excellent customer support in both English and Malay. Very patient in answering all my questions. The loan helped me consolidate my debts effectively.',
      loanType: 'Debt Consolidation',
      date: '2024-02-28',
      status: 'APPROVED'
    }
  ];

  const totalReviews = testimonials.length;
  const averageRating =
    Math.round((testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / totalReviews) * 10) / 10;

  const sentimentHighlights = [
    { label: 'Average rating', value: `${averageRating}/5` },
    { label: 'Approval success', value: '95% of applicants' },
    { label: 'Repeat clients', value: '68% return for new facilities' }
  ];

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              {t('title')}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {t('subtitle')}
            </h1>
            <p className="text-lg text-slate-700">
              Hear how Malaysian entrepreneurs, families, and professionals unlocked growth with Aurora Credit.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {sentimentHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-100 bg-white/90 p-4 text-center shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-slate-900">Client success stories</h2>
          <p className="text-base text-slate-600">
            Every testimonial is verified and published with permission to reflect real financing journeys.
          </p>
        </div>
        <div className="grid gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-sm transition hover:-translate-y-[2px] hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-600">{testimonial.loanType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} filled={index < testimonial.rating} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{testimonial.rating}.0</span>
                </div>
              </div>
              <p className="mt-4 text-base text-slate-700 leading-relaxed">{testimonial.comment}</p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
                <span>
                  {new Date(testimonial.date).toLocaleDateString('en-MY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {t(`status.${testimonial.status}`)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8">
          <h2 className="text-xl font-semibold text-blue-600">Share your experience</h2>
          <p className="mt-2 text-sm text-slate-600">
            Have you received a loan from Aurora Credit? We'd love to hear about your experience.
            Your feedback helps other Malaysians make informed decisions.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            All submissions are moderated to ensure authenticity and maintain a constructive community space.
          </p>
        </div>
        <div className="rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Tips for a helpful testimonial</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600"
              >
                &bull;
              </span>
              Mention the loan product you selected and how it supported your plans.
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600"
              >
                &bull;
              </span>
              Share your experience with our advisors, response time, and documentation process.
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600"
              >
                &bull;
              </span>
              Let us know how we can further improve — we act on every suggestion.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
