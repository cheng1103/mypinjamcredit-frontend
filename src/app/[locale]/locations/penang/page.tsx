import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import { Breadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import Link from 'next/link';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/locations/penang`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Personal & Business Loan Penang 2025 - Licensed Loan Consultant | MyPinjam Credit',
    description: 'Licensed loan services in Penang. Personal loans RM5K-RM150K, business loans RM50K-RM500K. Georgetown, Bayan Lepas, Bukit Mertajam coverage. Chinese 华语, Malay, Tamil support. 78% approval rate. Free consultation, only 1-3% fee if approved.',
    keywords: [
      'loan advisor penang',
      'pinjaman penang',
      '槟城贷款',
      'penang loan consultant',
      'personal loan penang',
      'business loan penang',
      'georgetown loan',
      'bayan lepas loan',
      'bukit mertajam loan',
      'chinese loan advisor penang',
      'hokkien loan service',
      'penang CTOS improvement',
      '槟城个人贷款',
      'pinjaman perniagaan penang'
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
      title: 'Personal & Business Loan Penang - Licensed Consultant',
      description: 'Licensed loan services covering Georgetown, Bayan Lepas, Bukit Mertajam. Chinese/Malay/Tamil support. 78% approval rate.',
      url: hrefForLocale(locale),
      siteName: 'MyPinjam Credit',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-penang-location.jpg`,
          width: 1200,
          height: 630,
          alt: 'MyPinjam Credit Penang - Licensed Loan Consultant'
        }
      ]
    }
  };
}

// Generate LocalBusiness Schema for Penang
function generatePenangLocationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'MyPinjam Credit - Penang',
    description: 'Licensed loan services service in Penang providing personal loans, business loans, and CTOS improvement services',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lebuh Bishop',
      addressLocality: 'Georgetown',
      addressRegion: 'Penang',
      postalCode: '10200',
      addressCountry: 'MY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.4141,
      longitude: 100.3288
    },
    telephone: '+60-12-345-6789',
    email: 'penang@mypinjamcredit.com',
    url: 'https://www.mypinjamcredit.com/en/locations/penang',
    areaServed: {
      '@type': 'City',
      name: 'Penang'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '142',
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
            name: 'Personal Loan Penang',
            description: 'Personal loans from RM5,000 to RM150,000'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Business Loan Penang',
            description: 'Business financing from RM50,000 to RM500,000'
          }
        }
      ]
    }
  };
}

export default async function PenangLocationPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const penangAreas = [
    { name: 'Georgetown', district: 'Northeast', population: '~150,000' },
    { name: 'Bayan Lepas', district: 'Southwest', population: '~80,000' },
    { name: 'Bukit Mertajam', district: 'Central', population: '~200,000' },
    { name: 'Butterworth', district: 'North', population: '~100,000' },
    { name: 'Jelutong', district: 'East', population: '~60,000' },
    { name: 'Tanjung Tokong', district: 'Northeast', population: '~40,000' },
    { name: 'Sungai Nibong', district: 'South', population: '~35,000' },
    { name: 'Prai', district: 'North', population: '~90,000' },
    { name: 'Balik Pulau', district: 'Southwest', population: '~30,000' },
    { name: 'Tanjung Bungah', district: 'North', population: '~25,000' },
    { name: 'Air Itam', district: 'Central', population: '~45,000' },
    { name: 'Batu Kawan', district: 'South', population: '~50,000' },
    { name: 'Seberang Perai', district: 'Mainland', population: '~300,000' },
    { name: 'Permatang Pauh', district: 'Central', population: '~70,000' },
    { name: 'Bayan Baru', district: 'South', population: '~55,000' }
  ];

  const successStories = [
    {
      name: 'Mr. Lim (林先生)',
      area: 'Georgetown',
      business: 'Coffee Shop Owner',
      loan: 'RM120,000 Business Expansion',
      story: 'Georgetown coffee shop owner needed RM 120,000 to open a 2nd outlet in Gurney Plaza. Banks rejected due to high existing mortgage. We secured a Business Term Loan from SME Bank at 5.2% p.a. Our Hokkien-speaking consultant understood the hawker business model. Approved in 3 weeks. Now operates 2 successful outlets.',
      language: 'Hokkien 福建话',
      icon: '🍜'
    },
    {
      name: 'Puan Aminah',
      area: 'Bukit Mertajam',
      business: 'Tudung Online Business',
      loan: 'RM50,000 Inventory Financing',
      story: 'Bukit Mertajam entrepreneur needed RM 50,000 to buy bulk inventory for Ramadan season. No business bank account yet. We helped open an SME account and secured invoice financing from Funding Societies at 8% p.a. Our Malay-speaking advisor handled all documentation. Approved in 5 days. Sales tripled during Ramadan.',
      language: 'Bahasa Malaysia',
      icon: '🧕'
    },
    {
      name: 'Mr. Raju',
      area: 'Butterworth',
      business: 'Logistics Driver',
      loan: 'RM80,000 Lorry Purchase',
      story: 'Butterworth lorry driver needed RM 80,000 to buy his own 3-ton lorry and start a transport business. CTOS score 620 (low). We improved his score to 680 in 2 months and secured hire purchase from Hong Leong Bank at 4.5% p.a. Our Tamil-speaking consultant explained all terms clearly. Now owns 2 lorries and employs 3 drivers.',
      language: 'Tamil தமிழ்',
      icon: '🚚'
    }
  ];

  const loanProducts = [
    {
      title: 'Georgetown Business Loans',
      description: 'Financing for heritage zone businesses, coffee shops, hotels, retail stores',
      amount: 'RM50K - RM500K',
      rate: '5.2% p.a.',
      tenure: '1-10 years',
      approval: '2-4 weeks',
      icon: '🏪'
    },
    {
      title: 'Bayan Lepas Tech Worker Loans',
      description: 'Personal loans for FTZ factory workers, engineers, tech professionals',
      amount: 'RM5K - RM150K',
      rate: '4.88% p.a.',
      tenure: '1-7 years',
      approval: '1-3 days',
      icon: '💼'
    },
    {
      title: 'Hawker & Food Stall Loans',
      description: 'Equipment financing for hawkers, kopitiam, char kuey teow stalls',
      amount: 'RM20K - RM200K',
      rate: '6.5% p.a.',
      tenure: '3-7 years',
      approval: '1-2 weeks',
      icon: '🍜'
    },
    {
      title: 'Property Investment Loans',
      description: 'Financing for Penang property investors, rental property owners',
      amount: 'RM100K - RM500K',
      rate: '5.0% p.a.',
      tenure: '5-15 years',
      approval: '3-6 weeks',
      icon: '🏢'
    },
    {
      title: 'Tourism Business Loans',
      description: 'Loans for hotels, homestays, tour operators, travel agencies',
      amount: 'RM80K - RM400K',
      rate: '5.5% p.a.',
      tenure: '3-10 years',
      approval: '2-5 weeks',
      icon: '🏨'
    },
    {
      title: 'Manufacturing SME Loans',
      description: 'Machinery purchase, working capital for Penang manufacturers',
      amount: 'RM100K - RM500K',
      rate: '5.8% p.a.',
      tenure: '5-10 years',
      approval: '3-6 weeks',
      icon: '🏭'
    }
  ];

  const localBanks = [
    { name: 'Penang Development Corporation (PDC)', speciality: 'SME & Manufacturing Loans', icon: '🏛️' },
    { name: 'Bank Muamalat Penang', speciality: 'Islamic Financing', icon: '🕌' },
    { name: 'Public Bank Georgetown', speciality: 'Personal & Business Loans', icon: '🏦' },
    { name: 'RHB Bank Butterworth', speciality: 'SME Financing', icon: '💳' },
    { name: 'AmBank Bukit Mertajam', speciality: 'Equipment Financing', icon: '🏧' }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Locations', href: `/${locale}/locations` },
    { label: 'Penang', href: `/${locale}/locations/penang` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, siteUrl);

  return (
    <div className="space-y-12">
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePenangLocationSchema()) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} locale={locale} />

      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-10 shadow-lg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Personal & Business Loan Consultant in Penang
          </h1>
          <p className="mt-4 text-xl text-slate-700">
            Licensed loan services serving Georgetown, Bayan Lepas, Bukit Mertajam & all Penang areas
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              🗣️ Hokkien 福建话
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              🗣️ Mandarin 华语
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
              🗣️ Bahasa Malaysia
            </span>
            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
              🗣️ Tamil தமிழ்
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-emerald-600">78%</div>
              <div className="mt-1 text-sm text-slate-600">Approval Rate</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-emerald-600">142</div>
              <div className="mt-1 text-sm text-slate-600">Penang Clients</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <div className="text-3xl font-bold text-emerald-600">1-3%</div>
              <div className="mt-1 text-sm text-slate-600">Fee Only If Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          📍 Penang Areas We Serve
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Complete coverage across Penang Island and Seberang Perai. We serve all major districts with local advisors who understand your area.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {penangAreas.map((area) => (
            <div key={area.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:shadow-md">
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
          ✨ Real Success Stories from Penang
        </h2>
        <div className="space-y-6">
          {successStories.map((story, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{story.icon}</span>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {story.area}
                    </span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
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
          💼 Loan Products for Penang Residents
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {loanProducts.map((product, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300 hover:shadow-md">
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
                  <span className="font-semibold text-emerald-600">{product.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tenure:</span>
                  <span className="font-semibold text-slate-900">{product.tenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Approval Time:</span>
                  <span className="font-semibold text-blue-600">{product.approval}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Banks */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          🏦 Our Penang Lender Partners
        </h2>
        <p className="mb-6 text-slate-600">
          We work with major banks and lenders operating in Penang to get you the best rates and approval chances.
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
          Why Choose MyPinjam Credit for Loans in Penang?
        </h2>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Licensed Loan Consultant Serving All Penang</h3>
            <p>
              MyPinjam Credit is a fully licensed loan services service with deep roots in Penang. Whether you're a coffee shop owner in Georgetown's heritage zone, a factory worker in Bayan Lepas Free Trade Zone, or a business owner in Bukit Mertajam, we understand the unique financial needs of Penang residents.
            </p>
            <p>
              Our Penang team speaks <strong>Hokkien (福建话)</strong>, <strong>Mandarin (华语)</strong>, <strong>Bahasa Malaysia</strong>, and <strong>Tamil (தமிழ்)</strong> - ensuring you get consultation in your preferred language. We've helped over 142 Penang clients secure financing totaling over RM18 million.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Personal Loans in Penang (RM5,000 - RM150,000)</h3>
            <p>
              Need a personal loan in Penang? We help individuals from all backgrounds - whether you're working in the electronics industry in Bayan Lepas, running a hawker stall in Jelutong, or employed in Butterworth's port. Our personal loan service covers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Emergency Cash Loans:</strong> Fast approval in 1-3 days for urgent needs</li>
              <li><strong>Debt Consolidation:</strong> Combine multiple loans into one manageable payment</li>
              <li><strong>Medical Expenses:</strong> Healthcare financing for treatment in Penang hospitals</li>
              <li><strong>Education Loans:</strong> Fund studies at USM, INTI, or overseas universities</li>
              <li><strong>Wedding Financing:</strong> Plan your dream wedding without financial stress</li>
              <li><strong>Home Renovation:</strong> Upgrade your Penang property</li>
            </ul>
            <p>
              Interest rates start from <strong>4.88% p.a.</strong> with flexible repayment terms from 1 to 7 years. Even if you have existing loans or less-than-perfect credit, we can help find suitable lenders.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Business Loans in Penang (RM50,000 - RM500,000)</h3>
            <p>
              Penang is Malaysia's manufacturing and tourism hub, and we specialize in financing businesses unique to this state:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Heritage Business Financing:</strong> Loans for UNESCO heritage zone businesses in Georgetown - coffee shops, hotels, retail stores, art galleries</li>
              <li><strong>Hawker & Food Stall Loans:</strong> Equipment financing for char kuey teow stalls, laksa shops, nasi kandar restaurants. We understand hawker business models that banks often reject</li>
              <li><strong>Manufacturing SME Loans:</strong> Working capital and machinery financing for Penang's electronics, semiconductor, and manufacturing SMEs</li>
              <li><strong>Tourism Business Financing:</strong> Loans for hotels, homestays, tour operators, travel agencies serving Penang's 8+ million annual tourists</li>
              <li><strong>E-commerce & Online Business:</strong> Inventory financing for Shopee, Lazada, or independent online sellers</li>
              <li><strong>Professional Services:</strong> Setup financing for clinics, law firms, accounting practices in Penang</li>
            </ul>
            <p>
              We've secured funding for businesses ranging from traditional kopitiam to high-tech startups. Our expertise includes navigating special schemes like <strong>Penang Development Corporation (PDC) SME Financing</strong> and <strong>SME Bank Manufacturing Loans</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">CTOS Score Improvement for Penang Residents</h3>
            <p>
              Low CTOS score affecting your loan applications? This is especially common among Penang's hawker community, gig workers, and small business owners who may have had late payments or defaults. Our CTOS improvement service has helped over 30 Penang clients raise their scores by 50-120 points in 2-4 months.
            </p>
            <p>
              We provide <strong>free CTOS report review</strong>, identify issues affecting your score, and create a personalized improvement plan. Common fixes include settling old debts through negotiation, correcting errors in your credit report, and rebuilding credit through strategic actions.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Why Penang Businesses Choose Us</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Local Knowledge:</strong> We understand Penang's unique business ecosystem - from Georgetown heritage businesses to Bayan Lepas tech companies</li>
              <li><strong>Language Support:</strong> Hokkien-speaking consultants who understand local business culture and can explain terms clearly</li>
              <li><strong>Bank Relationships:</strong> Strong connections with Penang branches of major banks and local financial institutions</li>
              <li><strong>Industry Expertise:</strong> Experience with manufacturing, F&amp;B, tourism, retail sectors prominent in Penang</li>
              <li><strong>Fast Processing:</strong> We expedite applications by preparing complete documentation upfront</li>
              <li><strong>Success-Based Fee:</strong> Only pay 1-3% commission if your loan is approved - no upfront charges</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Serving Georgetown, Bayan Lepas, Bukit Mertajam & Beyond</h3>
            <p>
              Our Penang coverage includes all major areas: <strong>Georgetown</strong> (heritage zone, Lebuh Chulia, Komtar area), <strong>Bayan Lepas</strong> (Free Trade Zone, airport vicinity), <strong>Bukit Mertajam</strong> (commercial center), <strong>Butterworth</strong> (port and industrial area), <strong>Jelutong</strong>, <strong>Tanjung Tokong</strong>, <strong>Sungai Nibong</strong>, <strong>Prai</strong>, <strong>Balik Pulau</strong>, <strong>Tanjung Bungah</strong>, <strong>Air Itam</strong>, <strong>Batu Kawan</strong>, <strong>Permatang Pauh</strong>, and <strong>Bayan Baru</strong>.
            </p>
            <p>
              You can complete the entire application process online, but if you prefer face-to-face consultation, we welcome visits to our Penang office or can arrange meetings at your business location.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">How to Apply for a Loan in Penang</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Free Consultation:</strong> Contact us via phone, WhatsApp, or online form. Tell us about your loan needs in Hokkien, Mandarin, Malay, or Tamil</li>
              <li><strong>Document Preparation:</strong> We'll guide you on required documents (MyKad, bank statements, payslips for personal loans; SSM, business bank statements for business loans)</li>
              <li><strong>Lender Matching:</strong> We submit your application to suitable banks and lenders in Penang based on your profile</li>
              <li><strong>Approval & Disbursement:</strong> Once approved, funds are disbursed to your account within 1-3 business days</li>
              <li><strong>Pay Our Fee:</strong> You only pay our 1-3% fee after successful loan disbursement</li>
            </ol>
            <p>
              The entire process typically takes 1-3 days for personal loans and 2-4 weeks for business loans, depending on loan type and completeness of documents.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800">Frequently Asked Questions - Penang Loans</h3>
            <p><strong>Q: Do you provide service in Hokkien?</strong></p>
            <p>A: Yes! We have Hokkien-speaking (福建话) consultants who understand Penang's Chinese community needs. Many of our Georgetown hawker and business clients prefer consultation in Hokkien.</p>

            <p className="mt-4"><strong>Q: Can hawkers and food stall owners get business loans?</strong></p>
            <p>A: Absolutely! We specialize in hawker financing. Even if you don't have official business registration, we can help with equipment loans for your char kuey teow stall, laksa shop, or nasi kandar business.</p>

            <p className="mt-4"><strong>Q: What if I work in Bayan Lepas FTZ but have low CTOS score?</strong></p>
            <p>A: Many factory workers have this issue. We can improve your CTOS score first, then apply for personal loans. We've helped numerous Bayan Lepas workers secure financing despite initial low scores.</p>

            <p className="mt-4"><strong>Q: How long does business loan approval take in Penang?</strong></p>
            <p>A: Depends on lender and loan amount. Fintech lenders: 2-5 days. Local banks: 2-4 weeks. PDC/SME Bank: 3-6 weeks. We expedite by ensuring complete documentation upfront.</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Ready to Get Your Loan in Penang?</h2>
        <p className="mt-4 text-lg text-emerald-100">
          Free consultation in Hokkien, Mandarin, Malay, or Tamil. Only pay 1-3% if approved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-emerald-600 shadow-lg transition hover:bg-emerald-50"
          >
            Apply Now
          </a>
          <a
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Contact Penang Office
          </a>
          <a
            href={`/${locale}/calculator` as any}
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Calculate Loan
          </a>
        </div>
        <div className="mt-8 text-emerald-100">
          <p className="text-sm">📍 Serving: Georgetown • Bayan Lepas • Bukit Mertajam • Butterworth • All Penang</p>
          <p className="mt-2 text-sm">🗣️ Languages: Hokkien 福建话 • Mandarin 华语 • Bahasa • தமிழ் Tamil</p>
        </div>
      </section>
    </div>
  );
}
