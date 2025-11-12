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
    publisher: 'MyPinjam Credit',
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
    'licensed loan company',

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

    // Location-based - Kuala Lumpur & Klang Valley
    'mont kiara loan',
    'kuala lumpur loan',
    'kl loan advisor',
    'klang valley loan',
    'selangor loan',
    'petaling jaya loan',
    'pj loan',
    'subang jaya loan',
    'shah alam loan',
    'klang loan',
    'ampang loan',
    'cheras loan',
    'kepong loan',
    'sentul loan',
    'brickfields loan',
    'bukit bintang loan',
    'bangsar loan',
    'damansara loan',
    'puchong loan',
    'seri kembangan loan',
    'kajang loan',
    'cyberjaya loan',
    'putrajaya loan',

    // Penang
    'penang loan',
    'georgetown loan',
    'butterworth loan',
    'bayan lepas loan',
    'bukit mertajam loan',
    'pinjaman pulau pinang',

    // Johor
    'johor bahru loan',
    'jb loan',
    'johor loan',
    'skudai loan',
    'masai loan',
    'pasir gudang loan',
    'kulai loan',
    'kluang loan',
    'muar loan',
    'batu pahat loan',
    'segamat loan',

    // Perak
    'ipoh loan',
    'perak loan',
    'taiping loan',
    'teluk intan loan',
    'kuala kangsar loan',
    'kampar loan',
    'batu gajah loan',

    // Negeri Sembilan
    'seremban loan',
    'negeri sembilan loan',
    'nilai loan',
    'port dickson loan',

    // Melaka
    'melaka loan',
    'malacca loan',
    'bandar melaka loan',

    // Kedah
    'alor setar loan',
    'kedah loan',
    'sungai petani loan',
    'kulim loan',
    'langkawi loan',

    // Kelantan
    'kota bharu loan',
    'kelantan loan',
    'tanah merah loan',

    // Terengganu
    'kuala terengganu loan',
    'terengganu loan',
    'kemaman loan',

    // Pahang
    'kuantan loan',
    'pahang loan',
    'temerloh loan',
    'bentong loan',
    'raub loan',

    // Sabah
    'kota kinabalu loan',
    'sabah loan',
    'sandakan loan',
    'tawau loan',

    // Sarawak
    'kuching loan',
    'sarawak loan',
    'miri loan',
    'sibu loan',
    'bintulu loan',

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
  ],
  // New: Comprehensive location-based keywords for local SEO
  locations: {
    kl: [
      'loan advisor kuala lumpur',
      'pinjaman kl',
      'kl personal loan',
      'kl business loan',
      'licensed moneylender kl',
      'credit consultant kuala lumpur',
      '吉隆坡贷款',
      'KL贷款顾问'
    ],
    selangor: [
      'loan advisor selangor',
      'pinjaman selangor',
      'petaling jaya loan',
      'shah alam loan',
      'klang loan advisor',
      'subang jaya financing',
      'puchong loan consultant',
      'ampang loan',
      'cheras loan broker',
      'kepong loan advisor',
      'kajang loan',
      'serdang loan',
      'bangi loan',
      'cyberjaya financing',
      'pinjaman lembah klang',
      '雪兰莪贷款',
      '八打灵再也贷款'
    ],
    penang: [
      'loan advisor penang',
      'pinjaman pulau pinang',
      'georgetown loan',
      'butterworth loan',
      'bukit mertajam loan',
      'bayan lepas financing',
      'penang island loan',
      'permatang pauh loan',
      'jelutong loan',
      '槟城贷款',
      '槟城贷款顾问'
    ],
    johor: [
      'loan advisor johor bahru',
      'pinjaman johor',
      'jb loan consultant',
      'skudai loan',
      'masai financing',
      'pasir gudang loan',
      'kulai loan advisor',
      'kluang loan',
      'muar loan',
      'batu pahat loan',
      'segamat financing',
      'pontian loan',
      '新山贷款',
      'JB贷款顾问'
    ],
    perak: [
      'loan advisor ipoh',
      'pinjaman perak',
      'ipoh loan consultant',
      'taiping loan',
      'teluk intan financing',
      'kuala kangsar loan',
      'kampar loan',
      'batu gajah loan',
      'parit buntar loan',
      '怡保贷款',
      '霹雳贷款顾问'
    ],
    melaka: [
      'loan advisor melaka',
      'pinjaman melaka',
      'malacca loan consultant',
      'bandar melaka loan',
      'alor gajah financing',
      'jasin loan',
      '马六甲贷款'
    ],
    ns: [
      'loan advisor seremban',
      'pinjaman negeri sembilan',
      'seremban loan',
      'nilai loan',
      'port dickson loan',
      'bahau financing',
      'rembau loan',
      '芙蓉贷款'
    ],
    kedah: [
      'loan advisor alor setar',
      'pinjaman kedah',
      'sungai petani loan',
      'kulim loan',
      'langkawi financing',
      'jitra loan',
      'pendang loan',
      '亚罗士打贷款'
    ],
    kelantan: [
      'loan advisor kota bharu',
      'pinjaman kelantan',
      'kota bharu loan',
      'tanah merah loan',
      'pasir mas financing',
      'tumpat loan',
      'bachok loan'
    ],
    terengganu: [
      'loan advisor kuala terengganu',
      'pinjaman terengganu',
      'kuala terengganu loan',
      'kemaman loan',
      'dungun financing',
      'marang loan'
    ],
    pahang: [
      'loan advisor kuantan',
      'pinjaman pahang',
      'kuantan loan',
      'temerloh loan',
      'bentong financing',
      'raub loan',
      'jerantut loan',
      'pekan loan',
      '关丹贷款'
    ],
    sabah: [
      'loan advisor kota kinabalu',
      'pinjaman sabah',
      'kk loan',
      'sandakan loan',
      'tawau financing',
      'lahad datu loan',
      'keningau loan',
      'beaufort loan',
      '亚庇贷款',
      '沙巴贷款顾问'
    ],
    sarawak: [
      'loan advisor kuching',
      'pinjaman sarawak',
      'kuching loan',
      'miri loan',
      'sibu financing',
      'bintulu loan',
      'limbang loan',
      'sarikei loan',
      '古晋贷款',
      '砂拉越贷款顾问'
    ]
  },
  // New: Industry-specific keywords
  industries: {
    ecommerce: [
      'shopee seller loan',
      'lazada seller financing',
      'ecommerce business loan',
      'online seller loan malaysia',
      'tiktok shop financing',
      'digital business loan',
      'pinjaman penjual online',
      '网店贷款',
      '电商融资'
    ],
    fnb: [
      'restaurant loan malaysia',
      'cafe financing',
      'kopitiam loan',
      'mamak shop loan',
      'food truck financing',
      'warung loan',
      'catering business loan',
      'halal restaurant financing',
      'pinjaman restoran',
      '餐馆贷款',
      '咖啡店融资',
      'dim sum shop loan',
      'nasi kandar financing',
      'banana leaf restaurant loan'
    ],
    retail: [
      'retail shop loan',
      'clothing boutique financing',
      'grocery store loan',
      'pharmacy financing',
      'convenience store loan',
      'hypermarket financing',
      'kedai runcit pinjaman',
      '零售店贷款'
    ],
    professional: [
      'clinic financing malaysia',
      'dental clinic loan',
      'physiotherapy center financing',
      'legal firm loan',
      'accounting firm financing',
      'salon loan malaysia',
      'spa financing',
      'gym equipment financing',
      'tuition center loan',
      'pinjaman klinik',
      '诊所贷款'
    ],
    construction: [
      'contractor loan malaysia',
      'construction equipment financing',
      'renovation contractor loan',
      'builder financing',
      'pinjaman kontraktor',
      '承包商贷款'
    ],
    automotive: [
      'workshop loan malaysia',
      'car repair shop financing',
      'spare parts shop loan',
      'tyre shop financing',
      'car wash loan',
      'pinjaman bengkel kereta',
      '汽车维修店贷款'
    ],
    agriculture: [
      'agricultural loan malaysia',
      'farm financing',
      'plantation loan',
      'livestock financing',
      'aquaculture loan',
      'pinjaman pertanian',
      'agrobank loan',
      '农业贷款'
    ]
  },
  // New: Loan purpose specific
  purposes: {
    emergency: [
      'emergency loan malaysia',
      'urgent cash loan',
      'same day loan approval',
      'medical emergency loan',
      'funeral loan',
      'accident loan',
      'pinjaman kecemasan',
      '紧急贷款',
      'விரைவு கடன்'
    ],
    renovation: [
      'home renovation loan',
      'house repair loan',
      'home improvement financing',
      'kitchen renovation loan',
      'bathroom renovation financing',
      'pinjaman ubahsuai rumah',
      '装修贷款'
    ],
    wedding: [
      'wedding loan malaysia',
      'kahwin loan',
      'marriage financing',
      'dowry loan',
      'pinjaman perkahwinan',
      '婚礼贷款',
      'கல்யாண கடன்'
    ],
    education: [
      'education loan malaysia',
      'study loan',
      'overseas education financing',
      'tuition fee loan',
      'ptptn alternative',
      'pinjaman pendidikan',
      '教育贷款',
      'கல்வி கடன்'
    ],
    debt: [
      'debt consolidation malaysia',
      'debt settlement loan',
      'refinancing loan',
      'balance transfer',
      'pinjaman penyelesaian hutang',
      '债务整合贷款'
    ],
    festival: [
      'chinese new year loan',
      'cny loan malaysia',
      'hari raya loan',
      'deepavali loan',
      'christmas loan',
      'pinjaman raya',
      '农历新年贷款',
      'தீபாவளி கடன்'
    ]
  },
  // New: Credit profile keywords
  creditProfiles: {
    goodCredit: [
      'low interest loan malaysia',
      'best loan rates',
      'prime loan',
      'competitive interest rates',
      'lowest rate loan'
    ],
    badCredit: [
      'bad credit loan malaysia',
      'loan for blacklisted',
      'ccris defaulter loan',
      'ctos low score loan',
      'loan for bankrupts',
      'second chance loan',
      'pinjaman ccris teruk',
      '信用不良贷款',
      'கடன் வரலாறு மோசம்'
    ],
    noCreditHistory: [
      'first time loan malaysia',
      'loan without credit history',
      'no ccris record loan',
      'new to credit loan',
      'student loan malaysia'
    ]
  }
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
