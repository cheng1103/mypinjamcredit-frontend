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
      type: type === 'product' ? 'website' : type,
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
    // English - General
    'personal loan malaysia',
    'business loan malaysia',
    'loan advisor malaysia',
    'fast loan approval',
    'low interest loan',
    'licensed credit facilitator',

    // Malay - Targeting Malay community
    'pinjaman peribadi malaysia',
    'pinjaman perniagaan',
    'pembiayaan islam',
    'pinjaman cepat lulus',
    'pinjaman tanpa cagaran',
    'pembiayaan murabahah',
    'pinjaman bumiputera',
    'tekun loan',
    'agrobank pinjaman',

    // Chinese - Targeting Chinese community (Simplified)
    '马来西亚贷款',
    '个人贷款',
    '商业贷款',
    '快速批准贷款',
    '低利息贷款',
    '无抵押贷款',
    '华人贷款顾问',

    // Tamil - Targeting Indian community
    'கடன் மலேசியா',
    'தனிப்பட்ட கடன்',
    'வணிக கடன்',

    // Location-based
    'mont kiara loan',
    'kuala lumpur loan',
    'klang valley loan',
    'selangor loan',
    'penang loan',
    'johor bahru loan',

    // Community-specific
    'chinese loan advisor',
    'malay loan consultant',
    'indian loan helper',
    'bumiputera financing',
    'sme loan malaysia',
    'online loan malaysia'
  ],
  personalLoan: [
    // English
    'personal loan malaysia',
    'unsecured loan',
    'no collateral loan',
    'fast approval loan',
    'emergency loan',
    'online loan application',
    '24 hour loan approval',

    // Malay
    'pinjaman peribadi',
    'pinjaman kecemasan',
    'pinjaman cepat',
    'pinjaman tanpa penjamin',
    'pinjaman islam',
    'pinjaman al-tawarruq',

    // Chinese
    '个人贷款马来西亚',
    '紧急贷款',
    '快速贷款',
    '无需担保人',
    '网上申请贷款',

    // Tamil
    'தனிப்பட்ட கடன் மலேசியா',
    'விரைவு கடன்',

    // Specific needs
    'debt consolidation malaysia',
    'wedding loan',
    'medical emergency loan',
    'education loan'
  ],
  businessLoan: [
    // English
    'business loan malaysia',
    'SME loan',
    'working capital loan',
    'equipment financing',
    'business expansion loan',
    'startup loan malaysia',

    // Malay
    'pinjaman perniagaan',
    'pinjaman PKS',
    'modal kerja',
    'pinjaman TEKUN',
    'pembiayaan usahawan',
    'pinjaman bumiputera',

    // Chinese
    '商业贷款马来西亚',
    '中小企业贷款',
    '营运资金贷款',
    '设备融资',
    '创业贷款',

    // Tamil
    'வணிக கடன் மலேசியா',

    // Specific
    'restaurant financing',
    'retail business loan',
    'franchise financing',
    'factory loan',
    'shop lot financing'
  ],
  calculator: [
    // English
    'loan calculator malaysia',
    'monthly installment calculator',
    'loan repayment calculator',
    'interest calculator',
    'DSR calculator',

    // Malay
    'kalkulator pinjaman',
    'kalkulator ansuran bulanan',
    'kira bayaran balik',

    // Chinese
    '贷款计算器',
    '月供计算器',
    '利息计算器',

    // Tamil
    'கடன் கணிப்பான்'
  ],
  faq: [
    // English
    'loan FAQ malaysia',
    'how to apply loan',
    'loan eligibility',
    'loan requirements',
    'credit score malaysia',

    // Malay
    'soalan lazim pinjaman',
    'syarat kelayakan pinjaman',
    'cara mohon pinjaman',

    // Chinese
    '贷款常见问题',
    '如何申请贷款',
    '贷款资格',

    // Tamil
    'கடன் கேள்விகள்'
  ],
  // New: Ethnic/Community specific
  chinese: [
    '华人贷款顾问',
    '马来西亚华人贷款',
    '中文贷款服务',
    '华语顾问',
    '新村贷款',
    'chinese speaking loan advisor',
    'mandarin loan service',
    'cantonese loan consultant'
  ],
  malay: [
    'pinjaman bumiputera',
    'pembiayaan islam',
    'pinjaman TEKUN',
    'pinjaman MARA',
    'bank rakyat',
    'agrobank',
    'bsn pinjaman',
    'pinjaman felda',
    'malay loan advisor',
    'islamic financing'
  ],
  indian: [
    'indian loan malaysia',
    'tamil loan advisor',
    'estate loan',
    'hindu temple loan',
    'deepavali loan',
    'கடன் ஆலோசகர்',
    'மலேசிய கடன்',
    'விரைவு அனுமதி'
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
