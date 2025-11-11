// Centralized Schema.org structured data

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mypinjamcredit.com';

// LocalBusiness Schema for Homepage
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Money Line Solutions',
    alternateName: 'Money Line Solutions Sdn Bhd',
    image: `${siteUrl}/logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+60-16-7479368',
    email: 'hello@mypinjamcredit.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Jalan Mont Kiara',
      addressLocality: 'Kuala Lumpur',
      postalCode: '50480',
      addressRegion: 'Wilayah Persekutuan',
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
    sameAs: [
      'https://www.facebook.com/mypinjamcredit',
      'https://www.instagram.com/mypinjamcredit',
      'https://www.linkedin.com/company/mypinjamcredit'
    ],
    priceRange: 'RM 5,000 - RM 5,000,000',
    currenciesAccepted: 'MYR',
    paymentAccepted: 'Bank Transfer',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 3.1390,
        longitude: 101.6869
      },
      geoRadius: '100000'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
      bestRating: '5',
      worstRating: '1'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Personal Loan',
            description: 'Unsecured personal loans from RM 5,000 to RM 150,000'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'FinancialProduct',
            name: 'Business Loan',
            description: 'SME and business financing from RM 50,000 to RM 5,000,000'
          }
        }
      ]
    }
  };
}

// Review Schema
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  language?: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Money Line Solutions Loan Advisory Services',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
      inLanguage: review.language || 'en'
    }))
  };
}

// Video Schema
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${siteUrl}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl
  };
}

// Product/Service Schema for Loan Products
export function generateLoanProductSchema(product: {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: string;
  tenure: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: product.name,
    description: product.description,
    provider: {
      '@type': 'FinancialService',
      name: 'Money Line Solutions'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MYR',
      price: product.minAmount.toString(),
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: product.minAmount.toString(),
        maxPrice: product.maxAmount.toString(),
        priceCurrency: 'MYR'
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'Malaysia'
      }
    },
    feesAndCommissionsSpecification: product.interestRate,
    loanTerm: product.tenure
  };
}

// WebSite Schema with SearchAction
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Money Line Solutions',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/en/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Money Line Solutions',
    legalName: 'Money Line Solutions Sdn Bhd',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    foundingDate: '2015',
    founders: [
      {
        '@type': 'Person',
        name: 'Howard Tan'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Jalan Mont Kiara',
      addressLocality: 'Kuala Lumpur',
      postalCode: '50480',
      addressCountry: 'MY'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+60-16-7479368',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Malay', 'Chinese', 'Tamil'],
        areaServed: 'MY'
      }
    ],
    sameAs: [
      'https://www.facebook.com/mypinjamcredit',
      'https://www.instagram.com/mypinjamcredit',
      'https://www.linkedin.com/company/mypinjamcredit'
    ]
  };
}
