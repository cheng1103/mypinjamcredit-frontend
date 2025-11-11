import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/compliance`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Regulatory Compliance - MyPinjam Credit',
    description: 'Learn about MyPinjam Credit\'s commitment to regulatory compliance and responsible lending practices in Malaysia.',
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    }
  };
}

export default async function CompliancePage({ params }: PageProps) {
  const { locale: localeStr } = await params;

  const regulations = [
    {
      title: 'Money Lenders Act 1951',
      description: 'We operate under a valid moneylending license issued by the Ministry of Housing and Local Government.',
      icon: '📜'
    },
    {
      title: 'Bank Negara Malaysia Guidelines',
      description: 'We comply with BNM\'s guidelines on responsible lending, consumer protection, and anti-money laundering.',
      icon: '🏦'
    },
    {
      title: 'Personal Data Protection Act 2010',
      description: 'We protect your personal data in accordance with PDPA requirements and best practices.',
      icon: '🔒'
    },
    {
      title: 'Anti-Money Laundering Act 2001',
      description: 'We have robust AML/CFT procedures to prevent financial crimes and terrorist financing.',
      icon: '🛡️'
    }
  ];

  const responsibleLending = [
    {
      title: 'Affordability Assessment',
      description: 'We thoroughly assess your ability to repay before approving any loan, considering your income, expenses, and existing obligations.'
    },
    {
      title: 'Transparent Pricing',
      description: 'All interest rates, fees, and charges are clearly disclosed upfront with no hidden costs.'
    },
    {
      title: 'Fair Treatment',
      description: 'We treat all customers fairly and do not discriminate based on race, religion, gender, or other protected characteristics.'
    },
    {
      title: 'Customer Education',
      description: 'We provide clear information about loan terms and help customers make informed financial decisions.'
    },
    {
      title: 'Debt Collection Practices',
      description: 'We follow ethical debt collection practices and never use harassment, intimidation, or violence.'
    },
    {
      title: 'Complaint Handling',
      description: 'We have a structured process for handling customer complaints promptly and fairly.'
    }
  ];

  const protections = [
    {
      title: 'Data Security',
      items: [
        'End-to-end encryption of sensitive data',
        'Secure servers with regular security updates',
        'Access controls and authentication',
        'Regular security audits and penetration testing'
      ]
    },
    {
      title: 'Privacy Protection',
      items: [
        'Minimal data collection (only what\'s necessary)',
        'Consent-based marketing communications',
        'Right to access and correct your data',
        'Secure data disposal procedures'
      ]
    },
    {
      title: 'Anti-Fraud Measures',
      items: [
        'Identity verification procedures',
        'Transaction monitoring systems',
        'Fraud detection algorithms',
        'Staff training on fraud prevention'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2">
            <span className="text-2xl">⚖️</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Regulatory Compliance
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Our commitment to ethical practices and regulatory compliance ensures your protection and peace of mind.
          </p>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">
          Regulatory Framework
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          We adhere to all applicable Malaysian laws and regulations governing financial services.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {regulations.map((reg) => (
            <div
              key={reg.title}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-6"
            >
              <div className="mb-3 text-4xl">{reg.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600">{reg.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-700">{reg.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Licensing Information */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-10">
        <h2 className="text-center text-3xl font-semibold text-slate-900">
          Licensing Information
        </h2>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-200 bg-white p-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">Company Name</p>
              <p className="mt-1 text-lg text-slate-900">MyPinjam Credit</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">Trading As</p>
              <p className="mt-1 text-lg text-slate-900">MyPinjam Credit</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">License Type</p>
              <p className="mt-1 text-lg text-slate-900">Moneylending License</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">Issued By</p>
              <p className="mt-1 text-lg text-slate-900">
                Ministry of Housing and Local Government, Malaysia
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">Registered Address</p>
              <p className="mt-1 text-lg text-slate-900">
                Level M, M-01a, Wisma YNH, Kiara 163<br />
                8, Jalan Kiara, Mont Kiara<br />
                50480 Kuala Lumpur, Malaysia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Lending */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">
          Responsible Lending Practices
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          We are committed to responsible lending that prioritizes your financial wellbeing.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {responsibleLending.map((practice) => (
            <div
              key={practice.title}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-sky-50/50 p-6"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{practice.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Protection */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-center text-3xl font-semibold text-slate-900">
          Customer Protection Measures
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {protections.map((protection) => (
            <div key={protection.title}>
              <h3 className="text-xl font-semibold text-blue-600">{protection.title}</h3>
              <ul className="mt-4 space-y-3">
                {protection.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-blue-600">▸</span>
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* AML/CFT */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-10">
        <h2 className="text-3xl font-semibold text-slate-900">
          Anti-Money Laundering & Counter Financing of Terrorism
        </h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          We maintain robust AML/CFT procedures to prevent our services from being used for
          illicit purposes:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-white p-6">
            <h3 className="font-semibold text-blue-600">Customer Due Diligence</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Identity verification for all customers</li>
              <li>• Enhanced due diligence for high-risk customers</li>
              <li>• Source of funds verification</li>
              <li>• Ongoing monitoring of customer relationships</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6">
            <h3 className="font-semibold text-blue-600">Suspicious Activity Reporting</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Transaction monitoring systems</li>
              <li>• Staff training on red flags</li>
              <li>• Reporting to Financial Intelligence Unit</li>
              <li>• Record keeping and audit trails</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Complaint Resolution */}
      <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-900">Complaint Resolution Process</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          If you have a complaint about our services, we are committed to resolving it fairly and promptly:
        </p>
        <div className="mt-6 space-y-4">
          <div className="flex gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Submit Your Complaint</h3>
              <p className="mt-1 text-sm text-slate-700">
                Email us at hello@mypinjamcredit.com or call +60-16-7479368
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Acknowledgment</h3>
              <p className="mt-1 text-sm text-slate-700">
                We will acknowledge your complaint within 1 business day
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Investigation</h3>
              <p className="mt-1 text-sm text-slate-700">
                We will investigate and respond within 14 business days
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">External Resolution</h3>
              <p className="mt-1 text-sm text-slate-700">
                If unsatisfied, you may escalate to Bank Negara Malaysia's Financial Ombudsman Service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-10">
        <h2 className="text-3xl font-semibold text-slate-900">Our Code of Conduct</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          We hold ourselves to the highest ethical standards:
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            'Act with integrity and honesty in all dealings',
            'Maintain professional competence and knowledge',
            'Treat all customers fairly and respectfully',
            'Avoid conflicts of interest',
            'Protect customer confidentiality',
            'Comply with all applicable laws and regulations',
            'Provide accurate and timely information',
            'Handle customer funds responsibly'
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white p-4"
            >
              <span className="mt-1 text-blue-600">✓</span>
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-600 p-10 text-white shadow-xl shadow-blue-100">
        <h2 className="text-2xl font-semibold">Questions About Compliance?</h2>
        <p className="mt-3 text-blue-100">
          Our compliance team is here to address your concerns and ensure transparency.
        </p>
        <div className="mt-6">
          <a
            href="mailto:hello@mypinjamcredit.com"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Contact Compliance Team
          </a>
        </div>
      </section>
    </div>
  );
}
