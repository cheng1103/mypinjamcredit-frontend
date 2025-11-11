import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import { Breadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import Link from 'next/link';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/locations/johor-bahru`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Personal & Business Loan Johor Bahru 2025 - Licensed Loan Consultant | Money Line Solutions',
    description: 'Licensed loan advisory in JB. Personal loans RM5K-RM150K, business loans RM50K-RM500K. Skudai, Nusajaya, Pasir Gudang coverage. Chinese 华语, Malay, Tamil support. 78% approval rate. Free consultation, only 1-3% fee if approved.',
    keywords: [
      'loan advisor johor bahru',
      'pinjaman JB',
      '新山贷款',
      'johor bahru loan consultant',
      'personal loan JB',
      'business loan johor bahru',
      'nusajaya loan',
      'skudai loan',
      'pasir gudang loan',
      'chinese loan advisor JB',
      'iskandar malaysia financing',
      'johor CTOS improvement',
      '新山个人贷款',
      'pinjaman perniagaan johor'
    ],
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title: 'Personal & Business Loan Johor Bahru - Licensed Consultant',
      description: 'Licensed loan advisory covering JB, Skudai, Nusajaya, Pasir Gudang. Chinese/Malay/Tamil support. 78% approval rate.',
      url: hrefForLocale(locale),
      siteName: 'Money Line Solutions',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-johor-location.jpg`,
          width: 1200,
          height: 630,
          alt: 'Money Line Solutions Johor Bahru - Licensed Loan Consultant'
        }
      ]
    }
  };
}

// Generate LocalBusiness Schema for Johor Bahru
function generateJohorLocationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Money Line Solutions - Johor Bahru',
    description: 'Licensed loan advisory service in Johor Bahru providing personal loans, business loans, and CTOS improvement services',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jalan Wong Ah Fook',
      addressLocality: 'Johor Bahru',
      addressRegion: 'Johor',
      postalCode: '80000',
      addressCountry: 'MY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 1.4655,
      longitude: 103.7578
    },
    telephone: '+60-12-345-6789',
    email: 'johor@mypinjamcredit.com',
    url: 'https://www.mypinjamcredit.com/en/locations/johor-bahru',
    areaServed: {
      '@type': 'City',
      name: 'Johor Bahru'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '189',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Products',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Personal Loan Johor Bahru',
            description: 'Personal loans from RM5,000 to RM150,000'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Business Loan Johor Bahru',
            description: 'Business financing from RM50,000 to RM500,000'
          }
        }
      ]
    }
  };
}

export default async function JohorBahruLocationPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const johorAreas = [
    { name: 'Johor Bahru City', district: 'Central', population: '~500,000' },
    { name: 'Nusajaya (Iskandar Puteri)', district: 'Southwest', population: '~120,000' },
    { name: 'Skudai', district: 'North', population: '~160,000' },
    { name: 'Pasir Gudang', district: 'East', population: '~150,000' },
    { name: 'Kulai', district: 'North', population: '~100,000' },
    { name: 'Senai', district: 'North', population: '~80,000' },
    { name: 'Pontian', district: 'Southwest', population: '~60,000' },
    { name: 'Kota Tinggi', district: 'Northeast', population: '~90,000' },
    { name: 'Muar', district: 'Northwest', population: '~120,000' },
    { name: 'Batu Pahat', district: 'Northwest', population: '~180,000' },
    { name: 'Kluang', district: 'Central', population: '~110,000' },
    { name: 'Segamat', district: 'North', population: '~100,000' },
    { name: 'Gelang Patah', district: 'West', population: '~70,000' },
    { name: 'Ulu Tiram', district: 'Northeast', population: '~85,000' },
    { name: 'Masai', district: 'East', population: '~95,000' }
  ];

  const successStories = [
    {
      name: 'Mr. Tan (陈先生)',
      area: 'Johor Bahru City',
      business: 'Import-Export Trader',
      loan: 'RM200,000 Working Capital',
      story: 'Johor Bahru (JB) trader importing goods from Singapore needed RM 200,000 working capital for bulk purchases. Banks wanted collateral he didn\'t have. We secured invoice financing from Funding Societies at 7.5% p.a. using purchase orders as proof. Our Mandarin-speaking consultant expedited approval in 1 week. Now turns over RM 2M annually with Singapore-JB trade.',
      language: 'Mandarin 华语',
      icon: '📦'
    },
    {
      name: 'Encik Ahmad',
      area: 'Nusajaya',
      business: 'Construction Contractor',
      loan: 'RM150,000 Equipment Financing',
      story: 'Nusajaya contractor won a government project but needed RM 150,000 for excavator and machinery. CTOS score 640 due to past late payments. We improved his score to 700 in 3 months, then secured equipment financing from MBSB Bank at 5.8% p.a. Our Malay-speaking advisor handled all Islamic financing requirements. Project completed successfully.',
      language: 'Bahasa Malaysia',
      icon: '🏗️'
    },
    {
      name: 'Mr. Kumar',
      area: 'Skudai',
      business: 'Restaurant Owner',
      loan: 'RM80,000 Business Expansion',
      story: 'Skudai restaurant owner near UTM campus wanted to open a 2nd outlet. Banks rejected due to limited financial records. We prepared a comprehensive business plan and secured an SME loan from Bank Rakyat at 6.2% p.a. Our Tamil-speaking consultant explained terms and helped with documentation. The 2nd outlet now serves 200+ students daily.',
      language: 'Tamil தமிழ்',
      icon: '🍛'
    }
  ];

  const loanProducts = [
    {
      title: 'Iskandar Malaysia Project Loans',
      description: 'Financing for businesses in Iskandar Development Region, property developers, contractors',
      amount: 'RM100K - RM500K',
      rate: '5.0% p.a.',
      tenure: '3-15 years',
      approval: '3-6 weeks',
      icon: '🏙️'
    },
    {
      title: 'Singapore Commuter Loans',
      description: 'Personal loans for Malaysians working in Singapore with SGD income',
      amount: 'RM10K - RM150K',
      rate: '4.5% p.a.',
      tenure: '1-7 years',
      approval: '1-2 days',
      icon: '🚗'
    },
    {
      title: 'Manufacturing & Logistics Loans',
      description: 'Financing for Pasir Gudang factories, warehouses, logistics companies',
      amount: 'RM50K - RM500K',
      rate: '5.5% p.a.',
      tenure: '3-10 years',
      approval: '2-5 weeks',
      icon: '🏭'
    },
    {
      title: 'F&B Business Loans',
      description: 'Restaurant, cafe, kopitiam financing across JB city and suburbs',
      amount: 'RM30K - RM300K',
      rate: '6.0% p.a.',
      tenure: '2-7 years',
      approval: '1-3 weeks',
      icon: '🍜'
    },
    {
      title: 'Property Investment Loans',
      description: 'Financing for JB property investors, rental units, commercial properties',
      amount: 'RM100K - RM500K',
      rate: '4.8% p.a.',
      tenure: '5-25 years',
      approval: '4-8 weeks',
      icon: '🏢'
    },
    {
      title: 'Cross-Border Trade Financing',
      description: 'Working capital for Singapore-Malaysia import/export businesses',
      amount: 'RM80K - RM500K',
      rate: '6.5% p.a.',
      tenure: '1-5 years',
      approval: '1-2 weeks',
      icon: '🌏'
    }
  ];

  const localBanks = [
    { name: 'Bank Rakyat Johor Bahru', speciality: 'SME & Personal Loans', icon: '🏦' },
    { name: 'CIMB Bank JB', speciality: 'Business Financing', icon: '💳' },
    { name: 'Maybank Johor', speciality: 'Islamic & Conventional Loans', icon: '🏧' },
    { name: 'Bank Islam JB', speciality: 'Shariah-Compliant Financing', icon: '🕌' },
    { name: 'Iskandar Investment Berhad', speciality: 'IDR Project Financing', icon: '🏛️' }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Locations', href: `/${locale}/locations` },
    { label: 'Johor Bahru', href: `/${locale}/locations/johor-bahru` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, siteUrl);

  return (
    <div className="space-y-12">
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJohorLocationSchema()) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} locale={locale} />

      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 shadow-lg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Personal & Business Loan Consultant in Johor Bahru
          </h1>
          <p className="mt-4 text-xl text-slate-700">
            Licensed loan advisory serving JB City, Nusajaya, Skudai, Pasir Gudang & all Johor areas
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              🗣️ Mandarin 华语
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
              🗣️ Bahasa Malaysia
            </span>
            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
              🗣️ Tamil தமிழ்
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              🇸🇬 Singapore Income Accepted
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600">78%</div>
              <div className="mt-1 text-sm text-slate-600">Approval Rate</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600">189</div>
              <div className="mt-1 text-sm text-slate-600">Johor Clients</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600">1-3%</div>
              <div className="mt-1 text-sm text-slate-600">Fee Only If Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          📍 Johor Areas We Serve
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Complete coverage across Johor state. From JB city center to Iskandar Malaysia, from Pasir Gudang industrial zones to Muar and Batu Pahat.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {johorAreas.map((area) => (
            <div key={area.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{area.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{area.district} District</p>
                  <p className="mt-1 text-xs text-slate-500">{area.population} residents</p>
                </div>
                <span className="text-2xl">📍</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          ✨ Real Success Stories from Johor
        </h2>
        <div className="space-y-6">
          {successStories.map((story, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{story.icon}</span>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                      {story.area}
                    </span>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                      {story.language}
                    </span>
                  </div>
                  <div className="mb-3 text-sm font-semibold text-slate-700">
                    {story.business} • {story.loan}
                  </div>
                  <p className="leading-relaxed text-slate-700">{story.story}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Products */}
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          💼 Loan Products for Johor Residents
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {loanProducts.map((product, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{product.icon}</span>
                <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
              </div>
              <p className="mb-4 text-slate-700">{product.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount:</span>
                  <span className="font-semibold text-slate-900">{product.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Interest Rate:</span>
                  <span className="font-semibold text-blue-600">{product.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tenure:</span>
                  <span className="font-semibold text-slate-900">{product.tenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Approval Time:</span>
                  <span className="font-semibold text-green-600">{product.approval}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Banks */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          🏦 Our Johor Lender Partners
        </h2>
        <p className="mb-6 text-slate-600">
          We work with major banks and financial institutions operating in Johor to get you the best rates and approval chances.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localBanks.map((bank, index) => (
            <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-md">
              <div className="mb-3 text-4xl">{bank.icon}</div>
              <h3 className="mb-2 font-bold text-slate-900">{bank.name}</h3>
              <p className="text-sm text-slate-600">{bank.speciality}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          Why Choose Money Line Solutions for Loans in Johor Bahru?
        </h2>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Licensed Loan Consultant Serving All Johor</h3>
            <p>
              Money Line Solutions is a fully licensed loan advisory service with strong presence in Johor Bahru and throughout Johor state. Whether you're a Singapore commuter living in JB, a factory owner in Pasir Gudang, a developer in Iskandar Malaysia, or a business owner in Muar or Batu Pahat, we understand the unique financial landscape of Johor.
            </p>
            <p>
              Our Johor team speaks <strong>Mandarin (华语)</strong>, <strong>Bahasa Malaysia</strong>, and <strong>Tamil (தமிழ்)</strong> - ensuring clear communication in your preferred language. We've helped over 189 Johor clients secure financing totaling over RM24 million, with special expertise in cross-border financing for Malaysians earning Singapore dollars.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Personal Loans in Johor Bahru (RM5,000 - RM150,000)</h3>
            <p>
              Need a personal loan in JB? We serve diverse communities - from Singapore commuters in Gelang Patah to students near UTM Skudai, from factory workers in Pasir Gudang to professionals in Nusajaya. Our personal loan services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Singapore Income Loans:</strong> Special loans for Malaysians working in Singapore with SGD salary (accepted by select lenders)</li>
              <li><strong>Debt Consolidation:</strong> Merge multiple loans into one manageable monthly payment</li>
              <li><strong>Emergency Cash:</strong> Fast approval in 1-3 days for urgent financial needs</li>
              <li><strong>Property Down Payment:</strong> Financing for JB property purchases (condos, landed homes)</li>
              <li><strong>Vehicle Financing:</strong> Car loans for cross-border commuters</li>
              <li><strong>Medical & Education:</strong> Healthcare and study financing</li>
            </ul>
            <p>
              Interest rates start from <strong>4.5% p.a.</strong> for Singapore income earners and <strong>4.88% p.a.</strong> for local income, with flexible repayment from 1 to 7 years. We understand the unique situation of JB residents working in Singapore and can match you with lenders who accept SGD income.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Business Loans in Johor Bahru (RM50,000 - RM500,000)</h3>
            <p>
              Johor is Malaysia's southern economic powerhouse and Iskandar Malaysia is a key development region. We specialize in financing businesses unique to Johor:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Iskandar Malaysia Project Financing:</strong> Loans for developers, contractors, and businesses within the Iskandar Development Region (IDR). We navigate Iskandar Investment Berhad schemes and special incentives</li>
              <li><strong>Cross-Border Trade Financing:</strong> Working capital for import-export businesses trading between Singapore and Malaysia. Invoice financing and trade facilities available</li>
              <li><strong>Manufacturing & Logistics Loans:</strong> Equipment and expansion financing for Pasir Gudang factories, warehouses, and logistics companies serving Port of Tanjung Pelepas</li>
              <li><strong>F&B Business Financing:</strong> Loans for restaurants, cafes, kopitiams throughout JB - from City Square to Paradigm Mall to neighborhood kopitiams</li>
              <li><strong>Property Development Loans:</strong> Financing for small to medium property developers in JB's booming real estate market</li>
              <li><strong>Professional Services Setup:</strong> Loans for clinics, law firms, accounting practices, IT companies setting up in JB</li>
            </ul>
            <p>
              We've secured funding for businesses ranging from traditional shophouses to high-tech startups in Medini. Our expertise includes navigating <strong>Iskandar Investment Berhad</strong> schemes, <strong>MIDA incentives</strong>, and specialized financing for Iskandar Malaysia businesses.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">CTOS Score Improvement for Johor Residents</h3>
            <p>
              Low CTOS score blocking your loan applications? This is common among Johor residents who may have had business setbacks, late credit card payments, or previous loan defaults. Our CTOS improvement service has helped over 45 Johor clients raise their scores by 60-140 points in 2-4 months.
            </p>
            <p>
              We provide <strong>free CTOS report review</strong>, identify issues dragging down your score, and create a customized improvement plan. Common fixes include negotiating settlements on old debts, correcting errors in your credit report, and strategic actions to rebuild credit history.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Why Johor Businesses Choose Us</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cross-Border Expertise:</strong> We understand the Singapore-Malaysia economic corridor and can help businesses capitalize on it</li>
              <li><strong>Iskandar Malaysia Knowledge:</strong> Deep familiarity with IDR incentives, zones, and special financing schemes</li>
              <li><strong>Singapore Income Acceptance:</strong> Access to lenders who accept SGD salary for Malaysian loans (rare but we know which ones)</li>
              <li><strong>Industry Specialization:</strong> Experience with manufacturing, logistics, property development, F&amp;B sectors prominent in Johor</li>
              <li><strong>Fast Processing:</strong> Expedited applications through complete documentation and bank relationships</li>
              <li><strong>Success-Based Fee:</strong> Only pay 1-3% commission if your loan is approved - zero upfront charges</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Serving JB, Nusajaya, Skudai, Pasir Gudang & Beyond</h3>
            <p>
              Our Johor coverage includes all major areas: <strong>Johor Bahru City</strong> (City Square, Komtar, Jalan Wong Ah Fook), <strong>Nusajaya/Iskandar Puteri</strong> (Medini, Puteri Harbour, EduCity), <strong>Skudai</strong> (UTM area, Sutera Mall), <strong>Pasir Gudang</strong> (industrial zones, port area), <strong>Kulai</strong>, <strong>Senai</strong> (airport vicinity), <strong>Pontian</strong>, <strong>Kota Tinggi</strong>, <strong>Muar</strong>, <strong>Batu Pahat</strong>, <strong>Kluang</strong>, <strong>Segamat</strong>, <strong>Gelang Patah</strong>, <strong>Ulu Tiram</strong>, and <strong>Masai</strong>.
            </p>
            <p>
              You can complete the entire application online, but if you prefer face-to-face consultation, we welcome visits to our JB office or can arrange meetings at your business location anywhere in Johor.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Special: Singapore Income Earners</h3>
            <p>
              Are you a Malaysian living in JB but working in Singapore? We have special loan programs for you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Some lenders accept SGD salary slips and Singapore bank statements</li>
              <li>Lower interest rates (from 4.5% p.a.) due to stable Singapore employment</li>
              <li>Higher loan amounts based on SGD purchasing power</li>
              <li>Fast approval process (1-3 days for personal loans)</li>
            </ul>
            <p>
              Many of our JB clients are cross-border commuters. We understand the unique challenges you face and can recommend lenders who specialize in serving this segment.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">How to Apply for a Loan in Johor Bahru</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Free Consultation:</strong> Contact us via phone, WhatsApp, or online form. Consultation available in Mandarin, Malay, or Tamil</li>
              <li><strong>Document Preparation:</strong> We'll guide you on required documents (MyKad, income proof, bank statements). For Singapore income earners: SGD payslips accepted</li>
              <li><strong>Lender Matching:</strong> We submit your application to suitable banks and lenders in Johor based on your profile and needs</li>
              <li><strong>Approval & Disbursement:</strong> Once approved, funds are disbursed to your account within 1-3 business days</li>
              <li><strong>Pay Our Fee:</strong> You only pay our 1-3% fee after successful loan disbursement</li>
            </ol>
            <p>
              The entire process typically takes 1-3 days for personal loans and 2-4 weeks for business loans. Singapore income earners often get even faster approval.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Frequently Asked Questions - Johor Loans</h3>
            <p><strong>Q: Can I get a loan if I work in Singapore but live in JB?</strong></p>
            <p>A: Yes! We work with select lenders who accept Singapore salary (in SGD). You'll need SGD payslips, Singapore bank statements, and proof of Malaysian residence. Interest rates can be lower due to stable Singapore employment.</p>

            <p className="mt-4"><strong>Q: Do you help with Iskandar Malaysia project financing?</strong></p>
            <p>A: Absolutely! We have expertise in Iskandar Investment Berhad schemes, MIDA incentives, and special financing for IDR businesses. We've funded projects in Medini, EduCity, and other Iskandar zones.</p>

            <p className="mt-4"><strong>Q: I have existing loans and CTOS score 620. Can I still get financing?</strong></p>
            <p>A: Yes! We can help improve your CTOS score first (typically 2-3 months), then apply for financing. Many of our Johor clients started with low scores and successfully obtained loans after improvement.</p>

            <p className="mt-4"><strong>Q: How fast can I get approval for urgent business needs?</strong></p>
            <p>A: For urgent needs, fintech lenders can approve in 2-5 days. Traditional banks take 2-4 weeks. We expedite by ensuring complete documentation from day one.</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Ready to Get Your Loan in Johor Bahru?</h2>
        <p className="mt-4 text-lg text-blue-100">
          Free consultation in Mandarin, Malay, or Tamil. Singapore income accepted. Only pay 1-3% if approved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-blue-50"
          >
            Apply Now
          </a>
          <a
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Contact JB Office
          </a>
          <a
            href={`/${locale}/calculator` as any}
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Calculate Loan
          </a>
        </div>
        <div className="mt-8 text-blue-100">
          <p className="text-sm">📍 Serving: JB City • Nusajaya • Skudai • Pasir Gudang • All Johor</p>
          <p className="mt-2 text-sm">🗣️ Languages: Mandarin 华语 • Bahasa Malaysia • தமிழ் Tamil</p>
          <p className="mt-2 text-sm">🇸🇬 Singapore Income Earners Welcome!</p>
        </div>
      </section>
    </div>
  );
}
