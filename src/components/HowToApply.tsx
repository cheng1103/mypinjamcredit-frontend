import { generateHowToSchema } from '@/lib/seo';

export function HowToApplySchema() {
  const howtoData = {
    name: 'How to Apply for a Loan at MyPinjam Credit',
    description: 'Step-by-step guide to applying for a personal or business loan in Malaysia',
    totalTime: 'PT15M', // 15 minutes
    steps: [
      {
        name: 'Fill Online Application Form',
        text: 'Complete our secure online application form with your personal information, loan amount, and purpose. The form takes only 5-10 minutes to complete.'
      },
      {
        name: 'Submit Required Documents',
        text: 'Upload your MyKad, latest 3 months bank statements, payslip or EA form, and EPF statement. Business owners should also submit SSM registration.'
      },
      {
        name: 'Advisor Review',
        text: 'Our licensed loan advisor will review your application within 24 hours and contact you for any additional information or clarification needed.'
      },
      {
        name: 'Receive Approval Decision',
        text: 'You will receive the approval decision via email or phone call. If approved, we will prepare the loan agreement with all terms clearly stated.'
      },
      {
        name: 'Sign Loan Agreement',
        text: 'Review and sign the loan agreement either digitally or at our office. Make sure you understand all terms including interest rate, tenure, and repayment schedule.'
      },
      {
        name: 'Receive Funds',
        text: 'Once the agreement is signed, funds will be disbursed directly to your bank account within 1-3 business days.'
      }
    ]
  };

  const schema = generateHowToSchema(howtoData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToApplyProps {
  locale: string;
}

export function HowToApply({ locale }: HowToApplyProps) {
  const steps = [
    {
      number: 1,
      title: 'Fill Online Application',
      description: 'Complete our secure form in just 5-10 minutes',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Submit Documents',
      description: 'Upload MyKad, bank statements, and income proof',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Get Approved',
      description: 'Advisor reviews within 24 hours',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: 4,
      title: 'Receive Funds',
      description: 'Money in your account within 1-3 days',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <HowToApplySchema />
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            How to Apply
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Get your loan in 4 simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 transition hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <div className="text-blue-600">
                  {step.icon}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:bg-blue-500"
          >
            Start Your Application
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
