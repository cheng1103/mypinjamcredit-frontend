import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/types/locale';
import Link from 'next/link';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/about`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'About Us - MyPinjam Credit | Licensed Loan Advisory',
    description: 'Learn about MyPinjam Credit, your trusted licensed loan services service in Malaysia. We provide transparent, customer-focused financing solutions.',
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title: 'About MyPinjam Credit',
      description: 'Licensed loan services service committed to transparent financing',
      url: hrefForLocale(locale),
      siteName: 'MyPinjam Credit',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website'
    }
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const milestones = [
    { year: '2018', event: 'Company founded with vision to democratize access to credit' },
    { year: '2019', event: 'Obtained full licensing from regulatory authorities' },
    { year: '2020', event: 'Served 1,000+ satisfied customers across Malaysia' },
    { year: '2022', event: 'Expanded product range to include business financing' },
    { year: '2024', event: 'Achieved RM 50M+ in total loans disbursed' }
  ];

  const values = [
    {
      title: 'Transparency',
      icon: '🔍',
      description: 'No hidden fees, no surprises. Every charge is clearly explained upfront so you can make informed decisions.'
    },
    {
      title: 'Customer First',
      icon: '❤️',
      description: 'Your financial wellbeing is our priority. We tailor solutions to your unique situation, not our bottom line.'
    },
    {
      title: 'Integrity',
      icon: '🛡️',
      description: 'We adhere strictly to Bank Negara Malaysia guidelines and industry best practices in every transaction.'
    },
    {
      title: 'Speed & Efficiency',
      icon: '⚡',
      description: 'Fast approval process and quick disbursement because we know your time and needs are important.'
    }
  ];

  const team = [
    {
      name: 'Howard Lee',
      role: 'Founder & Principal Advisor',
      credentials: 'Licensed Financial Advisor',
      bio: '15+ years experience in consumer finance. Committed to helping Malaysians achieve their financial goals through responsible lending.'
    },
    {
      name: 'Advisory Team',
      role: 'Licensed Loan Specialists',
      credentials: 'Bank Negara Certified',
      bio: 'Our team of experienced advisors provides personalized guidance throughout your loan journey.'
    }
  ];

  const certifications = [
    'Licensed under Money Lending Act 1951',
    'Registered with Ministry of Housing and Local Government',
    'Compliant with Bank Negara Malaysia guidelines',
    'Member of Association of Banks in Malaysia (ABM)'
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
            About MyPinjam Credit
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Your Trusted Partner in Financial Solutions
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Since 2018, MyPinjam Credit has been helping Malaysians access fair, transparent financing.
            We believe everyone deserves honest advice and competitive rates without hidden charges.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8">
          <div className="mb-4 text-4xl">🎯</div>
          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            To provide accessible, transparent, and responsible financing solutions that empower individuals
            and businesses to achieve their goals while maintaining the highest standards of customer service
            and regulatory compliance.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8">
          <div className="mb-4 text-4xl">🌟</div>
          <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            To be Malaysia's most trusted and customer-centric loan services service, recognized for our
            integrity, transparency, and commitment to helping people make sound financial decisions.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Our Core Values</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-sky-50/50 p-6 text-center"
            >
              <div className="mb-3 text-4xl">{value.icon}</div>
              <h3 className="text-lg font-semibold text-blue-600">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Our Journey</h2>
        <div className="mt-8 space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="flex gap-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {milestone.year}
                </div>
              </div>
              <div className="flex-1 pt-3">
                <p className="text-slate-700">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Meet Our Team</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Our licensed advisors bring decades of combined experience in consumer and commercial finance.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-8"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
                👤
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-600">{member.role}</p>
              <p className="mt-1 text-xs text-slate-500">{member.credentials}</p>
              <p className="mt-4 leading-relaxed text-slate-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-10">
        <h2 className="text-center text-3xl font-semibold text-slate-900">
          Licensed & Regulated
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          We operate under strict regulatory oversight to ensure your protection and peace of mind.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white p-4"
            >
              <div className="flex-shrink-0 text-2xl">✓</div>
              <p className="text-sm text-slate-700">{cert}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Why Choose MyPinjam Credit?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-sky-50/50 p-6">
            <div className="mb-3 text-3xl">📊</div>
            <h3 className="font-semibold text-blue-600">Transparent Pricing</h3>
            <p className="mt-2 text-sm text-slate-600">
              All fees and charges disclosed upfront. No hidden costs, no surprises.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-sky-50/50 p-6">
            <div className="mb-3 text-3xl">🚀</div>
            <h3 className="font-semibold text-blue-600">Fast Approval</h3>
            <p className="mt-2 text-sm text-slate-600">
              Get approval decisions within 24 hours and funds disbursed in 1-3 business days.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-sky-50/50 p-6">
            <div className="mb-3 text-3xl">💬</div>
            <h3 className="font-semibold text-blue-600">Personalized Service</h3>
            <p className="mt-2 text-sm text-slate-600">
              Dedicated advisors who understand your needs and provide tailored solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-600 p-10 text-center text-white shadow-xl shadow-blue-100">
        <h2 className="text-2xl font-semibold">Ready to experience the MyPinjam Credit difference?</h2>
        <p className="mt-3 text-blue-100">
          Join thousands of satisfied customers who trust us for their financing needs.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Apply Now
          </Link>
          <Link
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
