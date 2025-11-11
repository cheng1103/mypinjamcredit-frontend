import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/terms`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Terms of Service - Money Line Solutions',
    description: 'Read the terms and conditions for using Money Line Solutions loan advisory services.',
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

export default async function TermsPage({ params }: PageProps) {
  const { locale: localeStr } = await params;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Terms of Service</h1>
          <p className="mt-4 text-slate-600">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
        <section>
          <h2 className="text-2xl font-semibold text-blue-600">1. Agreement to Terms</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            By accessing and using the services of Money Line Solutions (Money Line Solutions), you agree to be
            bound by these Terms of Service and all applicable laws and regulations. If you do not agree
            with any of these terms, you are prohibited from using our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">2. Services Description</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Money Line Solutions provides loan advisory and intermediary services connecting borrowers with
            licensed financial institutions. We do not directly provide loans but facilitate the loan
            application process.
          </p>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-slate-700">
              <strong>Important:</strong> Final loan approval is subject to the lending institution's
              assessment and criteria. We cannot guarantee loan approval.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">3. Eligibility Requirements</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            To use our services, you must:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Be at least 21 years of age</li>
            <li>Be a Malaysian citizen or permanent resident</li>
            <li>Have legal capacity to enter into binding contracts</li>
            <li>Provide accurate and complete information</li>
            <li>Not be subject to bankruptcy proceedings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">4. Application Process</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">4.1 Information Accuracy</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                You warrant that all information provided in your loan application is true, accurate,
                and complete. Providing false or misleading information may result in application
                rejection and potential legal consequences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">4.2 Documentation</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                You agree to provide all requested documentation within the specified timeframe.
                Failure to do so may result in application delays or rejection.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">4.3 Credit Checks</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                By submitting an application, you authorize us and our partner financial institutions
                to conduct credit checks through CCRIS, CTOS, or other credit bureaus.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">5. Fees and Charges</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            All fees and charges will be clearly disclosed before you enter into any loan agreement.
            These may include:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Interest charges (as per agreed rate)</li>
            <li>Processing fees (if applicable)</li>
            <li>Stamp duty (as required by law)</li>
            <li>Late payment charges (if applicable)</li>
            <li>Early settlement fees (if applicable)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            We do not charge fees for loan applications that are not approved.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">6. Loan Agreements</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Upon loan approval, you will enter into a separate loan agreement with the lending
            institution. You are responsible for reading and understanding all terms before signing.
            The loan agreement will govern your obligations as a borrower.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">7. Repayment Obligations</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">7.1 Timely Payment</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                You agree to repay the loan according to the schedule specified in your loan agreement.
                Late payments may result in additional charges and negatively impact your credit score.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">7.2 Default</h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Failure to meet repayment obligations may result in:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
                <li>Additional late payment fees</li>
                <li>Negative credit reporting</li>
                <li>Legal action for debt recovery</li>
                <li>Reporting to credit bureaus</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">8. Website Use</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            You agree not to:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the website's functionality</li>
            <li>Upload malicious code or viruses</li>
            <li>Harvest or collect user data without permission</li>
            <li>Impersonate another person or entity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">9. Intellectual Property</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            All content on this website, including text, graphics, logos, and software, is the property
            of Money Line Solutions or its licensors and is protected by Malaysian and international
            intellectual property laws.
          </p>
          <p className="mt-4 leading-relaxed text-slate-700">
            You may not reproduce, distribute, modify, or create derivative works without our express
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">10. Privacy and Data Protection</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Your use of our services is also governed by our Privacy Policy. By using our services,
            you consent to the collection and use of your information as described in the Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">11. Limitation of Liability</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            To the fullest extent permitted by law:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>We are not liable for loan approval or rejection decisions made by lenders</li>
            <li>We do not guarantee specific loan terms or interest rates</li>
            <li>We are not responsible for delays caused by third parties</li>
            <li>We are not liable for indirect, consequential, or punitive damages</li>
          </ul>
          <p className="mt-4 leading-relaxed text-slate-700">
            Our total liability shall not exceed the fees paid by you for our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">12. Disclaimer of Warranties</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Our services are provided "as is" without warranties of any kind, either express or implied.
            We do not warrant that our services will be uninterrupted, error-free, or secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">13. Indemnification</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            You agree to indemnify and hold harmless Money Line Solutions, its officers, directors, employees,
            and agents from any claims, damages, losses, or expenses arising from:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700">
            <li>Your violation of these Terms of Service</li>
            <li>Your violation of any laws or regulations</li>
            <li>Your provision of false or misleading information</li>
            <li>Your infringement of third-party rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">14. Termination</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We reserve the right to terminate or suspend your access to our services at any time,
            without notice, for conduct that we believe violates these Terms or is harmful to other
            users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">15. Governing Law</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            These Terms of Service are governed by the laws of Malaysia. Any disputes arising from
            these terms shall be subject to the exclusive jurisdiction of the Malaysian courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">16. Changes to Terms</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            We reserve the right to modify these Terms of Service at any time. Changes will be
            effective immediately upon posting to the website. Your continued use of our services
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">17. Severability</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            will be limited or eliminated to the minimum extent necessary so that these Terms will
            otherwise remain in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">18. Contact Information</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            For questions about these Terms of Service, please contact:
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
            <strong>Acknowledgment:</strong> By using our website and services, you acknowledge that
            you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
