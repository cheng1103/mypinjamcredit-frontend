import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import { generateSEO } from '@/lib/seo';
import { MapPin, Phone, Mail, Clock, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateSEO({
    title: 'Loan Advisor Kuala Lumpur 2025 - Personal & Business Loan KL | MyPinjam Credit',
    description: 'Best loan advisor in Kuala Lumpur. Get personal loans (RM5K-RM150K) & business loans (RM50K-RM500K) in KL, Mont Kiara, KLCC, Bangsar. Chinese, Malay, Indian community support. Fast approval 24-48hrs.',
    keywords: [
      'loan advisor kuala lumpur',
      'KL loan consultant',
      'pinjaman kuala lumpur',
      '吉隆坡贷款',
      'personal loan KL',
      'business loan kuala lumpur',
      'mont kiara loan',
      'KLCC loan advisor',
      'bangsar loan',
      'loan advisor near me',
      'chinese loan KL',
      'licensed moneylender kuala lumpur',
      'fast loan approval KL',
      'low interest loan kuala lumpur'
    ],
    canonical: `${siteUrl}/${locale}/locations/kuala-lumpur`,
    locale: locale as Locale,
    type: 'website'
  });
}

// Generate LocalBusiness Schema for KL location
function generateKLLocationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'MyPinjam Credit - Kuala Lumpur',
    image: `${siteUrl}/images/kl-office.jpg`,
    '@id': `${siteUrl}/en/locations/kuala-lumpur`,
    url: `${siteUrl}/en/locations/kuala-lumpur`,
    telephone: '+60-16-7479368',
    email: 'hello@mypinjamcredit.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Jalan Mont Kiara',
      addressLocality: 'Kuala Lumpur',
      addressRegion: 'Wilayah Persekutuan',
      postalCode: '50480',
      addressCountry: 'MY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.1725,
      longitude: 101.6509
    },
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
        closes: '14:00'
      }
    ],
    priceRange: 'RM 5,000 - RM 500,000',
    areaServed: {
      '@type': 'City',
      name: 'Kuala Lumpur',
      '@id': 'https://en.wikipedia.org/wiki/Kuala_Lumpur'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
      bestRating: '5'
    }
  };
}

export default async function KualaLumpurPage({ params }: PageProps) {
  const { locale } = await params;

  const klSchema = generateKLLocationSchema();

  // KL Areas Served
  const klAreas = [
    'Mont Kiara', 'KLCC', 'Bangsar', 'Damansara', 'Ampang', 'Cheras',
    'Kepong', 'Sentul', 'Brickfields', 'Bukit Bintang', 'Wangsa Maju',
    'Setapak', 'Taman Tun Dr Ismail (TTDI)', 'Sri Hartamas', 'Desa ParkCity'
  ];

  // Local success stories
  const klSuccessStories = [
    {
      name: 'Mr. Tan (华人)',
      area: 'Mont Kiara',
      loanType: 'Business Loan',
      amount: 'RM200,000',
      story: 'Opened dim sum restaurant in Mont Kiara. Approved in 2 weeks with competitive 5.5% rate. Now doing RM180K monthly revenue!'
    },
    {
      name: 'Ahmad (Malay)',
      area: 'Sentul',
      loanType: 'TEKUN Loan',
      amount: 'RM80,000',
      story: 'Got TEKUN financing for warung business. Only 4% interest! Business growing 40% monthly after expansion.'
    },
    {
      name: 'Kumar (Indian)',
      area: 'Brickfields',
      loanType: 'Personal Loan',
      amount: 'RM50,000',
      story: 'Despite CTOS 520, got approved for daughter\'s education. Used guarantor strategy. Now CTOS improved to 680!'
    }
  ];

  // KL-specific banks and lenders
  const klLenders = [
    { name: 'Bank Rakyat KL', location: 'Jalan Travers', specialty: 'Personal Loan from RM1K salary' },
    { name: 'Maybank Islamic KL', location: 'Menara Maybank', specialty: 'Islamic Business Financing' },
    { name: 'SME Bank KL', location: 'Plaza SME', specialty: 'Government SME Loans' },
    { name: 'CIMB Bank KLCC', location: 'Menara CIMB', specialty: 'Premium Banking' },
    { name: 'Funding Societies', location: 'Online (KL-based)', specialty: 'Fast Fintech Loans 2-5 days' }
  ];

  return (
    <>
      {/* KL Location Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(klSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  Kuala Lumpur Office
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Loan Advisor
                  </span>
                  <br />
                  <span className="text-gray-900">Kuala Lumpur</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  KL's trusted loan consultant since 2015. Personal & business loans from RM5,000 to RM500,000.
                  Serving Mont Kiara, KLCC, Bangsar, and all KL areas.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">KL Clients</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl font-bold text-blue-600">24-48h</div>
                    <div className="text-sm text-gray-600">Fast Approval</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl font-bold text-blue-600">4.8★</div>
                    <div className="text-sm text-gray-600">Client Rating</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`/${locale}/apply`}
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-center shadow-lg"
                  >
                    Apply Now - Free Consultation
                  </a>
                  <a
                    href="https://wa.me/60167479368"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors text-center shadow-lg flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Now
                  </a>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kuala Lumpur Office</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600">123 Jalan Mont Kiara, 50480 Kuala Lumpur</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a href="tel:+60167479368" className="text-blue-600 hover:underline">+60 16-747 9368</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a href="mailto:hello@mypinjamcredit.com" className="text-blue-600 hover:underline">hello@mypinjamcredit.com</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Operating Hours</div>
                      <div className="text-gray-600">
                        Mon-Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 2:00 PM<br />
                        Sun: Closed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-semibold text-gray-900 mb-3">Languages Spoken</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">English</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">华语 Mandarin</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">粤语 Cantonese</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Bahasa Malaysia</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">தமிழ் Tamil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KL Areas Served */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Areas We Serve in Kuala Lumpur</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional loan advisory services across all KL neighborhoods
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {klAreas.map((area, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Products for KL */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Loan Products Available in KL</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Personal Loan KL', amount: 'RM5K - RM150K', rate: '6.5% - 12% p.a.', desc: 'Fast approval for KL residents' },
                { title: 'Business Loan KL', amount: 'RM50K - RM500K', rate: '7% - 14% p.a.', desc: 'SME financing for KL businesses' },
                { title: 'Mont Kiara Loan', amount: 'RM10K - RM200K', rate: '6% - 11% p.a.', desc: 'Premium rates for Mont Kiara' },
                { title: 'KLCC Financing', amount: 'RM20K - RM300K', rate: '5.5% - 10% p.a.', desc: 'Corporate & executive loans' },
                { title: 'Chinese Business (华人)', amount: 'RM30K - RM500K', rate: '7% - 13% p.a.', desc: 'Chinese restaurant, retail' },
                { title: 'Bumiputera (TEKUN)', amount: 'RM1K - RM100K', rate: '4% p.a.', desc: 'Government scheme KL' }
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">{product.title}</h3>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{product.amount}</div>
                  <div className="text-sm text-gray-600 mb-3">Interest: {product.rate}</div>
                  <p className="text-gray-700 mb-4">{product.desc}</p>
                  <Link
                    href={`/${locale}/apply`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">KL Client Success Stories</h2>
            <p className="text-center text-gray-600 mb-12">Real customers from Kuala Lumpur who got approved</p>
            <div className="grid md:grid-cols-3 gap-6">
              {klSuccessStories.map((story, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="font-bold text-gray-900 mb-1">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.area}, KL • {story.loanType}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-3">{story.amount}</div>
                  <p className="text-gray-700 italic">"{story.story}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KL Banks & Lenders */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Banks & Lenders We Work With in KL</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {klLenders.map((lender, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{lender.name}</h3>
                    <div className="text-sm text-gray-600 mb-2">{lender.location}</div>
                    <div className="text-sm text-blue-600 font-medium">{lender.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Loan in Kuala Lumpur?</h2>
            <p className="text-xl mb-8 opacity-90">
              Free consultation in English, Chinese, Malay, or Tamil. Apply online or visit our KL office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/apply`}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Apply Online Now
              </a>
              <a
                href="https://wa.me/60167479368"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: +60 16-747 9368
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
            <h2>Loan Advisor Kuala Lumpur - Complete Guide 2025</h2>

            <h3>Why Choose MyPinjam Credit for Your KL Loan Needs?</h3>
            <p>
              As Kuala Lumpur's trusted loan advisory service since 2015, we've helped over 500 KL residents and
              businesses secure financing from RM5,000 to RM500,000. Whether you're in Mont Kiara, KLCC, Bangsar,
              or any part of KL, we provide expert loan consultation in your language.
            </p>

            <h3>Personal Loans in Kuala Lumpur</h3>
            <p>
              Need a personal loan in KL? We help you get approved fast with competitive rates from 6.5% p.a.
              Minimum salary RM1,000 with Bank Rakyat KL branch. Even with bad credit (CTOS below 500), we have
              solutions using guarantors, co-borrowers, or microfinance options like AIM and TEKUN.
            </p>

            <h3>Business Loans for KL SMEs</h3>
            <p>
              Running a business in Kuala Lumpur? From Chinese restaurants in Kepong to Malay warung in Sentul,
              Indian shops in Brickfields to tech startups in KLCC - we secure business financing RM50K-RM500K.
              Work with SME Bank KL, Maybank Islamic, CIMB, and fintech lenders. Average approval time: 2-4 weeks.
            </p>

            <h3>KL Neighborhood-Specific Services</h3>
            <ul>
              <li><strong>Mont Kiara:</strong> Premium financing for expats and professionals</li>
              <li><strong>KLCC:</strong> Corporate loans and executive banking</li>
              <li><strong>Bangsar:</strong> Lifestyle and property financing</li>
              <li><strong>Kepong:</strong> Chinese business loans (华人生意贷款)</li>
              <li><strong>Sentul:</strong> Malay SME and TEKUN financing</li>
              <li><strong>Brickfields:</strong> Indian community loans (Tamil support)</li>
              <li><strong>Cheras:</strong> Family and renovation loans</li>
              <li><strong>Ampang:</strong> Mixed development financing</li>
            </ul>

            <h3>Contact Our KL Office Today</h3>
            <p>
              Visit us at 123 Jalan Mont Kiara or call +60 16-747 9368 for free consultation.
              Walk-ins welcome Monday-Saturday. Multilingual service available.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
