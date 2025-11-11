import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/privacy`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Privacy Policy - Money Line Solutions',
    description: 'Learn how Money Line Solutions collects, uses, and protects your personal information in compliance with Malaysian privacy laws.',
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

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeStr } = await params;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Privacy Policy</h1>
          <p className="mt-4 text-slate-600">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Introduction</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Money Line Solutions (Money Line Solutions) ("we", "our", or "us") is committed to protecting your privacy
            and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our services.
          </p>
          <p className="mt-4 leading-relaxed text-slate-700">
            We comply with the Personal Data Protection Act 2010 (PDPA) of Malaysia and other applicable data
            protection regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Information We Collect</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">Personal Information</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                We may collect the following personal information:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
                <li>Full name and identification number (MyKad/Passport)</li>
                <li>Contact information (email address, phone number, mailing address)</li>
                <li>Date of birth and age</li>
                <li>Employment information and income details</li>
                <li>Bank account information</li>
                <li>Credit history and financial information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Automatically Collected Information</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">How We Use Your Information</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We use your personal information for the following purposes:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Processing loan applications and assessing creditworthiness</li>
            <li>Verifying your identity and conducting due diligence checks</li>
            <li>Communicating with you about your application and account</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Preventing fraud and ensuring security</li>
            <li>Improving our services and website functionality</li>
            <li>Sending promotional materials (only with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Information Sharing and Disclosure</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We may share your information with:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li><strong>Financial Institutions:</strong> Banks and lenders for loan processing</li>
            <li><strong>Credit Bureaus:</strong> For credit assessment purposes (CCRIS, CTOS)</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in operations</li>
            <li><strong>Legal Authorities:</strong> When required by law or court order</li>
            <li><strong>Professional Advisors:</strong> Legal and financial consultants</li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Data Security</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We implement appropriate technical and organizational measures to protect your personal information,
            including:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure servers and access controls</li>
            <li>Regular security audits and updates</li>
            <li>Employee training on data protection</li>
            <li>Confidentiality agreements with third parties</li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute
            security but strive to use commercially acceptable means to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Data Retention</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in
            this Privacy Policy, unless a longer retention period is required by law. Typically:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Active customer records: Duration of relationship + 7 years</li>
            <li>Loan application records: 7 years from application date</li>
            <li>Marketing data: Until you withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Your Rights</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Under the PDPA, you have the right to:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li><strong>Access:</strong> Request a copy of your personal data we hold</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Withdrawal:</strong> Withdraw consent for processing (where applicable)</li>
            <li><strong>Limit Processing:</strong> Request limitation on how we use your data</li>
            <li><strong>Data Portability:</strong> Request transfer of data to another service</li>
            <li><strong>Complaint:</strong> Lodge a complaint with the Personal Data Protection Commissioner</li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            To exercise these rights, contact us at hello@mypinjamcredit.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Cookies Policy</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We use cookies and similar technologies to enhance your browsing experience. You can control
            cookies through your browser settings. Note that disabling cookies may affect website functionality.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold text-slate-900">Types of Cookies We Use:</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
              <li><strong>Essential Cookies:</strong> Necessary for website operation</li>
              <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Third-Party Links</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Our website may contain links to third-party websites. We are not responsible for the privacy
            practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Children's Privacy</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Updates to This Policy</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with
            an updated revision date. Significant changes will be communicated via email or prominent notice
            on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">Contact Us</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact:
          </p>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-6">
            <p className="font-semibold text-slate-900">Money Line Solutions (Money Line Solutions)</p>
            <p className="mt-2 text-slate-700">
              Level M, M-01a, Wisma YNH, Kiara 163<br />
              8, Jalan Kiara, Mont Kiara<br />
              50480 Kuala Lumpur, Malaysia
            </p>
            <p className="mt-2 text-slate-700">
              <strong>Email:</strong> hello@mypinjamcredit.com<br />
              <strong>Phone:</strong> +60-16-7479368
            </p>
          </div>
        </section>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm text-slate-600">
            <strong>Acknowledgment:</strong> By using our website and services, you acknowledge that you have
            read and understood this Privacy Policy and agree to the collection, use, and disclosure of your
            personal information as described herein.
          </p>
        </div>
      </div>
    </div>
  );
}
