import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/types/locale';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/faq`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Frequently Asked Questions - MyPinjam Credit',
    description: 'Find answers to common questions about our loan products, application process, requirements, and more.',
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title: 'FAQ - MyPinjam Credit',
      description: 'Get answers to your loan-related questions',
      url: hrefForLocale(locale),
      siteName: 'MyPinjam Credit',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website'
    }
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const faqCategories = [
    {
      title: 'Application Process',
      questions: [
        {
          q: 'How long does the application process take?',
          a: 'Our online application takes just 5-10 minutes to complete. Once submitted, our licensed advisor will review your application and respond within one business day with the approval decision or request for additional documents.'
        },
        {
          q: 'Can I apply online or do I need to visit an office?',
          a: 'You can complete the entire application process online through our secure platform. However, if you prefer face-to-face consultation or need assistance with documentation, we welcome you to visit our office in Mont Kiara, Kuala Lumpur.'
        },
        {
          q: 'What happens after I submit my application?',
          a: 'After submission: (1) You receive an instant confirmation email, (2) Our advisor reviews your application within 24 hours, (3) We may request additional documents if needed, (4) Upon approval, we prepare the loan agreement, (5) Funds are disbursed within 1-3 business days after signing.'
        }
      ]
    },
    {
      title: 'Eligibility & Requirements',
      questions: [
        {
          q: 'What are the basic eligibility criteria?',
          a: 'You must be: (1) A Malaysian citizen or permanent resident, (2) Between 21-65 years old, (3) Earning a minimum monthly income of RM 3,000, (4) Able to provide proof of income and identification documents.'
        },
        {
          q: 'What documents do I need to prepare?',
          a: 'Required documents include: MyKad (both sides), Latest 3 months bank statements, Latest payslip or EA form, EPF statement (optional but helpful). For business owners, we also need SSM registration and business bank statements.'
        },
        {
          q: 'Can I apply if I have existing loans?',
          a: 'Yes, you can apply even with existing loans. We will assess your debt service ratio to ensure you can comfortably manage the new loan repayment. In some cases, we may offer debt consolidation to help you manage multiple loans more efficiently.'
        },
        {
          q: 'Do you accept applications from self-employed individuals?',
          a: 'Absolutely! We welcome applications from self-employed individuals and business owners. You will need to provide business registration documents (SSM), business bank statements for the last 6 months, and income tax returns if available.'
        }
      ]
    },
    {
      title: 'Interest Rates & Fees',
      questions: [
        {
          q: 'What is your interest rate?',
          a: 'Our personal loan interest rates start from 4.88% p.a. (flat rate). The final rate depends on your credit profile, loan amount, and tenure. We provide transparent pricing with no hidden charges - you will know the exact rate before signing any agreement.'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees. We believe in full transparency. You will only pay: (1) Interest on the loan amount, (2) Stamp duty (as required by law), (3) Processing fee (if applicable, clearly stated upfront). All charges are disclosed in the loan agreement before you sign.'
        },
        {
          q: 'Is there a penalty for early repayment?',
          a: 'We do not charge penalties for early full settlement. However, please note that interest savings may be subject to our terms and conditions. Contact our advisor for specific calculations based on your loan terms.'
        }
      ]
    },
    {
      title: 'Loan Details',
      questions: [
        {
          q: 'What loan amounts do you offer?',
          a: 'We offer personal loans ranging from RM 5,000 to RM 100,000. The approved amount depends on your income level, credit assessment, and repayment capacity. Our advisor will recommend an appropriate amount based on your financial profile.'
        },
        {
          q: 'What repayment tenures are available?',
          a: 'You can choose repayment periods from 1 to 10 years (12 to 120 months). Longer tenures mean lower monthly installments but higher total interest paid. Use our loan calculator to explore different scenarios.'
        },
        {
          q: 'How is the monthly installment calculated?',
          a: 'Monthly installment = (Loan Amount + Total Interest) ÷ Number of Months. For example, a RM 50,000 loan at 4.88% p.a. for 5 years would have a monthly installment of approximately RM 1,037. Try our calculator for accurate figures.'
        }
      ]
    },
    {
      title: 'Approval & Disbursement',
      questions: [
        {
          q: 'How long does approval take?',
          a: 'Initial approval decision: Within 1 business day. Final approval and agreement signing: 2-3 business days (depending on document completeness). Fund disbursement: 1-3 business days after agreement signing.'
        },
        {
          q: 'What are the common reasons for rejection?',
          a: 'Common rejection reasons include: Insufficient income to support repayment, Poor credit history with multiple defaults, Incomplete or incorrect documentation, High existing debt obligations, Failure to meet minimum age or residency requirements.'
        },
        {
          q: 'How will I receive the loan amount?',
          a: 'Approved loan amounts are disbursed directly to your bank account via bank transfer. You will receive a notification once the disbursement is completed. Ensure your bank account details are accurate in the application.'
        }
      ]
    },
    {
      title: 'Repayment',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept: (1) Monthly auto-debit from your bank account (recommended), (2) Online banking transfer, (3) Cash deposit at our office (by appointment). Auto-debit ensures you never miss a payment and helps maintain good credit standing.'
        },
        {
          q: 'What if I miss a payment?',
          a: 'If you miss a payment: (1) Late payment charges may apply as per agreement, (2) Your credit score may be affected, (3) We will contact you to understand the situation. If you foresee difficulty, contact us immediately - we may be able to arrange alternative payment plans.'
        },
        {
          q: 'Can I restructure my loan if I face financial difficulties?',
          a: 'Yes, we understand that circumstances change. If you are facing temporary financial difficulties, contact our advisor as soon as possible. We may be able to offer solutions such as tenure extension, temporary payment reduction, or loan restructuring based on your situation.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-10 shadow-lg">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Find quick answers to common questions about our loan products, application process, and services.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category, catIndex) => (
          <section
            key={category.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-white font-bold">
                {catIndex + 1}
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-slate-200 bg-slate-50/50 transition hover:border-slate-300"
                >
                  <summary className="flex cursor-pointer items-start gap-4 p-6 font-semibold text-slate-900">
                    <span className="mt-1 flex-shrink-0 text-slate-600 transition group-open:rotate-90">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="flex-1">{item.q}</span>
                  </summary>
                  <div className="px-6 pb-6 pl-16 text-slate-700">
                    <p className="leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact CTA */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-700 to-slate-800 p-10 text-center text-white shadow-lg">
        <h2 className="text-2xl font-semibold">Still have questions?</h2>
        <p className="mt-3 text-slate-300">
          Our licensed advisors are here to help. Contact us for personalized assistance.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-800 shadow-lg transition hover:bg-slate-100"
          >
            Contact Us
          </a>
          <a
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
