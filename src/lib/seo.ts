import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  locale?: 'en' | 'ms';
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mypinjamcredit.com';
const siteName = 'MyPinjam Credit';
const defaultImage = '/opengraph-image.png';

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    locale = 'en',
    image = defaultImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical || `${siteUrl}/${locale}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const ogLocale = locale === 'ms' ? 'ms_MY' : 'en_MY';

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: siteName }],
    creator: siteName,
    publisher: 'Howard Loan Advisor',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-MY': canonicalUrl.replace(`/${locale}`, '/en'),
        'ms-MY': canonicalUrl.replace(`/${locale}`, '/ms'),
        'x-default': canonicalUrl.replace(`/${locale}`, '/en')
      }
    },
    openGraph: {
      type,
      locale: ogLocale,
      url: canonicalUrl,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@mypinjamcredit'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };

  // Add article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section
    };
  }

  return metadata;
}

// Common keyword sets for different page types
export const keywordSets = {
  homepage: [
    'personal loan malaysia',
    'business loan malaysia',
    'pinjaman peribadi',
    'loan advisor',
    'mont kiara loan',
    'kuala lumpur loan',
    'fast loan approval',
    'low interest loan',
    'licensed credit facilitator'
  ],
  personalLoan: [
    'personal loan',
    'pinjaman peribadi',
    'unsecured loan',
    'no collateral loan',
    'fast approval loan',
    'low interest personal loan malaysia',
    'online loan application'
  ],
  businessLoan: [
    'business loan',
    'SME loan',
    'working capital loan',
    'equipment financing',
    'business expansion loan',
    'pinjaman perniagaan',
    'SME financing malaysia'
  ],
  calculator: [
    'loan calculator',
    'monthly installment calculator',
    'loan repayment calculator',
    'interest calculator',
    'kalkulator pinjaman'
  ],
  faq: [
    'loan FAQ',
    'loan questions',
    'loan application process',
    'loan eligibility',
    'loan requirements malaysia'
  ]
};

// Generate Article Schema
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

// Generate HowTo Schema
export function generateHowToSchema(howto: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.name,
    description: howto.description,
    totalTime: howto.totalTime,
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? (step.image.startsWith('http') ? step.image : `${siteUrl}${step.image}`) : undefined
    }))
  };
}

// Generate VideoObject Schema
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
