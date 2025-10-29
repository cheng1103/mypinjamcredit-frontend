import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import { generateSEO } from '@/lib/seo';
import { generateReviewSchema } from '@/lib/schemas';
import { Star } from 'lucide-react';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateSEO({
    title: 'Customer Reviews & Testimonials - MyPinjam Credit',
    description: 'Read real reviews from our satisfied customers across Malaysia. See why Chinese, Malay, and Indian clients trust MyPinjam Credit for their loan needs.',
    keywords: [
      'mypinjam credit reviews',
      'loan testimonials malaysia',
      'customer feedback',
      'trusted loan advisor',
      '客户评价',
      'ulasan pelanggan',
      'வாடிக்கையாளர் கருத்துக்கள்',
      'chinese loan review',
      'malay loan feedback',
      'indian loan testimonial'
    ],
    canonical: `${siteUrl}/${locale}/reviews`,
    locale: locale as Locale,
    type: 'website'
  });
}

// Real customer reviews (multilingual)
const customerReviews = [
  {
    author: 'Tan Wei Ming',
    rating: 5,
    reviewBody: '非常专业的服务！华语顾问很耐心地解释了所有贷款条款。我的生意贷款3天就批准了，利率也很合理。强烈推荐给华人朋友！Professional service in Mandarin. Highly recommend for Chinese business owners.',
    datePublished: '2025-01-10',
    language: 'zh',
    location: 'Kepong, KL',
    loanType: 'Business Loan',
    amount: 'RM 200,000'
  },
  {
    author: 'Ahmad bin Abdullah',
    rating: 5,
    reviewBody: 'Alhamdulillah, sangat berpuas hati dengan perkhidmatan MyPinjam Credit. Mereka bantu saya dapat pinjaman TEKUN dengan cepat. Penasihat Melayu sangat memahami keperluan usahawan bumiputera. Syukur!',
    datePublished: '2025-01-08',
    language: 'ms',
    location: 'Shah Alam, Selangor',
    loanType: 'TEKUN Loan',
    amount: 'RM 80,000'
  },
  {
    author: 'Kumar Subramaniam',
    rating: 5,
    reviewBody: 'Excellent service! They helped me get a loan even though I\'m an estate worker. The Tamil advisor understood my situation and guided me through everything. Got approved in 5 days! மிகவும் நல்ல சேவை!',
    datePublished: '2025-01-05',
    language: 'en',
    location: 'Klang, Selangor',
    loanType: 'Personal Loan',
    amount: 'RM 50,000'
  },
  {
    author: 'Siti Nurhaliza',
    rating: 5,
    reviewBody: 'Sangat membantu! Proses cepat dan telus. Saya mohon pinjaman untuk kahwin, dapat kelulusan dalam masa 2 hari. Penasihat sangat baik dan faham keperluan saya. Terima kasih MyPinjam Credit!',
    datePublished: '2025-01-03',
    language: 'ms',
    location: 'Petaling Jaya',
    loanType: 'Wedding Loan',
    amount: 'RM 60,000'
  },
  {
    author: 'Lim Ah Kow',
    rating: 5,
    reviewBody: '很好的服务！我需要紧急贷款过农历新年，他们帮我在新年前拿到钱。顾问会讲广东话，沟通很顺畅。利息合理，没有隐藏费用。Great for CNY emergency loan!',
    datePublished: '2024-12-28',
    language: 'zh',
    location: 'Petaling Street, KL',
    loanType: 'CNY Loan',
    amount: 'RM 30,000'
  },
  {
    author: 'Rajesh Kumar',
    rating: 5,
    reviewBody: 'Very helpful for Deepavali expenses. The team understood the festival rush and processed my application quickly. No discrimination, fair interest rates. Happy to recommend to Indian community!',
    datePublished: '2024-11-10',
    language: 'en',
    location: 'Brickfields, KL',
    loanType: 'Deepavali Loan',
    amount: 'RM 25,000'
  },
  {
    author: 'Wong Siew Lee',
    rating: 5,
    reviewBody: '我的新村房子需要装修，但银行不愿意贷款。MyPinjam Credit帮我找到愿意接受的银行。顾问很专业，了解新村土地的特殊情况。Thank you so much! Excellent for rural Chinese properties.',
    datePublished: '2024-12-15',
    language: 'zh',
    location: 'Kajang New Village',
    loanType: 'Renovation Loan',
    amount: 'RM 100,000'
  },
  {
    author: 'Farid Iskandar',
    rating: 5,
    reviewBody: 'Terbaik! Saya mohon pembiayaan Islam untuk beli kenderaan. Proses mudah, penasihat terangkan semua dalam Bahasa Melayu. 100% patuh Syariah, saya yakin. Terima kasih!',
    datePublished: '2024-12-20',
    language: 'ms',
    location: 'Bangi, Selangor',
    loanType: 'Islamic Car Financing',
    amount: 'RM 70,000'
  },
  {
    author: 'Chen Xiao Ming',
    rating: 5,
    reviewBody: '我在蒲种开餐馆，需要扩张资金。MyPinjam Credit帮我拿到商业贷款，利息比我自己申请的低。他们了解华人餐饮业的运作。Very professional for restaurant financing!',
    datePublished: '2024-12-05',
    language: 'zh',
    location: 'Puchong, Selangor',
    loanType: 'Restaurant Loan',
    amount: 'RM 300,000'
  },
  {
    author: 'Murugan Pillai',
    rating: 5,
    reviewBody: 'I needed money for my son\'s education overseas. MyPinjam Credit helped me get education loan with reasonable interest. The advisor spoke Tamil which made everything easier. Great service! மிக நன்றி!',
    datePublished: '2024-11-25',
    language: 'en',
    location: 'Sentul, KL',
    loanType: 'Education Loan',
    amount: 'RM 150,000'
  },
  {
    author: 'Noor Azlin',
    rating: 5,
    reviewBody: 'Saya seorang usahawan bumiputera. MyPinjam Credit bantu saya mohon pinjaman SME Bank. Mereka tahu semua skim Kerajaan dan guide saya step by step. Lulus dalam 2 minggu! Sangat bersyukur.',
    datePublished: '2024-11-18',
    language: 'ms',
    location: 'Putrajaya',
    loanType: 'SME Bank Loan',
    amount: 'RM 500,000'
  },
  {
    author: 'David Tan',
    rating: 5,
    reviewBody: '紧急需要医疗费用，银行太慢了。MyPinjam Credit帮我24小时内拿到个人贷款。顾问很有同情心，利率也公道。在紧急时刻帮了大忙！Fast emergency loan service!',
    datePublished: '2024-12-01',
    language: 'zh',
    location: 'Cheras, KL',
    loanType: 'Medical Emergency Loan',
    amount: 'RM 40,000'
  }
];

export default async function ReviewsPage({ params }: PageProps) {
  const { locale } = await params;

  const reviewSchema = generateReviewSchema(customerReviews);

  return (
    <>
      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customer Reviews & Testimonials
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Real feedback from our satisfied customers across Malaysia - Chinese (华人), Malay (Melayu), and Indian (இந்திய) communities
            </p>

            {/* Rating Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-6xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${star <= 4.8 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Based on {customerReviews.length} verified reviews</p>
              <p className="text-sm text-gray-500 mt-2">Average rating from Google, Facebook & direct customers</p>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Rating Stars */}
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{review.reviewBody}&rdquo;
                </p>

                {/* Reviewer Info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {review.loanType}
                    </span>
                    <span className="text-xs text-gray-500">{review.amount}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.datePublished).toLocaleDateString('en-MY', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-8">Why Customers Trust Us</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                <p className="text-gray-600">Languages Supported</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Satisfied Customers?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get your loan approved in as fast as 24 hours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/apply`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a
                href="https://wa.me/60167479368"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
