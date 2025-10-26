import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/types/locale';
import Link from 'next/link';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/blog`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return {
    title: 'Financial Insights & News - MyPinjam Credit Blog',
    description: 'Expert advice on personal finance, loan tips, and financial news in Malaysia.',
    alternates: {
      canonical: hrefForLocale(locale),
      languages: {
        'en-MY': hrefForLocale('en'),
        'ms-MY': hrefForLocale('ms'),
        'x-default': hrefForLocale('en')
      }
    },
    openGraph: {
      title: 'MyPinjam Credit Blog',
      description: 'Financial insights and expert advice',
      url: hrefForLocale(locale),
      siteName: 'MyPinjam Credit',
      locale: locale === 'ms' ? 'ms_MY' : 'en_MY',
      type: 'website'
    }
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: '5 Essential Tips for First-Time Loan Applicants in Malaysia',
      excerpt: 'Applying for your first loan can be overwhelming. Learn the key factors lenders consider and how to increase your approval chances.',
      category: 'Loan Tips',
      date: '2025-01-15',
      readTime: '5 min read',
      image: '📋'
    },
    {
      id: 2,
      title: 'Understanding Your Credit Score: A Complete Guide',
      excerpt: 'Your credit score plays a crucial role in loan approval. Discover what affects your score and how to improve it.',
      category: 'Financial Education',
      date: '2025-01-10',
      readTime: '7 min read',
      image: '📊'
    },
    {
      id: 3,
      title: 'Debt Consolidation: Is It Right for You?',
      excerpt: 'Multiple loans can be stressful to manage. Learn how debt consolidation works and whether it makes sense for your situation.',
      category: 'Debt Management',
      date: '2025-01-05',
      readTime: '6 min read',
      image: '💳'
    },
    {
      id: 4,
      title: 'Bank Negara Malaysia Interest Rate Changes: What It Means for Borrowers',
      excerpt: 'BNM recently adjusted the Overnight Policy Rate. Here\'s how it affects your loan repayments and new applications.',
      category: 'Market News',
      date: '2024-12-28',
      readTime: '4 min read',
      image: '📈'
    },
    {
      id: 5,
      title: 'Personal Loan vs Credit Card: Which Should You Choose?',
      excerpt: 'Both can provide quick funds, but which is better for your needs? Compare the pros and cons of each option.',
      category: 'Comparison',
      date: '2024-12-20',
      readTime: '5 min read',
      image: '🆚'
    },
    {
      id: 6,
      title: 'How to Build an Emergency Fund While Repaying a Loan',
      excerpt: 'Balancing loan repayment with savings can be challenging. Here are practical strategies to do both effectively.',
      category: 'Financial Planning',
      date: '2024-12-15',
      readTime: '6 min read',
      image: '💰'
    }
  ];

  const categories = ['All', 'Loan Tips', 'Financial Education', 'Debt Management', 'Market News', 'Financial Planning'];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-10 shadow-xl shadow-blue-100">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Financial Insights & News
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Expert advice, market updates, and practical tips to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-sky-600 p-10 text-white shadow-xl shadow-blue-100">
        <div className="flex items-center gap-2 text-sm text-blue-100">
          <span>⭐</span>
          <span>Featured Article</span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold">
          {blogPosts[0].title}
        </h2>
        <p className="mt-4 text-blue-100">
          {blogPosts[0].excerpt}
        </p>
        <div className="mt-6 flex items-center gap-6 text-sm text-blue-100">
          <span>{blogPosts[0].category}</span>
          <span>•</span>
          <span>{blogPosts[0].date}</span>
          <span>•</span>
          <span>{blogPosts[0].readTime}</span>
        </div>
        <div className="mt-6">
          <Link
            href={`/${locale}/blog/${blogPosts[0].id}` as any}
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Read Full Article
          </Link>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(1).map((post) => (
          <article
            key={post.id}
            className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-sky-100 text-3xl">
              {post.image}
            </div>

            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                {post.category}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-blue-600">
              {post.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <Link
              href={`/${locale}/blog/${post.id}` as any}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3"
            >
              Read More
              <span>→</span>
            </Link>
          </article>
        ))}
      </section>

      {/* Newsletter Signup */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-4xl">📧</div>
          <h2 className="text-3xl font-semibold text-slate-900">Stay Informed</h2>
          <p className="mt-3 text-slate-700">
            Subscribe to our newsletter for the latest financial tips, market updates, and exclusive offers.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full border border-blue-200 px-6 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-600 p-10 text-center text-white shadow-xl shadow-blue-100">
        <h2 className="text-2xl font-semibold">Need Personalized Financial Advice?</h2>
        <p className="mt-3 text-blue-100">
          Our licensed advisors are ready to help you make the best financial decisions.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/contact` as any}
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 shadow-lg transition hover:bg-slate-100"
          >
            Contact an Advisor
          </Link>
          <Link
            href={`/${locale}/apply` as any}
            className="inline-flex items-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Apply for Loan
          </Link>
        </div>
      </section>
    </div>
  );
}
