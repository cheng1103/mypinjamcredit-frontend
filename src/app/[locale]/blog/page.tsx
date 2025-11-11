import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getFeaturedPosts, getAllCategories } from '@/lib/blog';
import { generateSEO } from '@/lib/seo';
import { Calendar, Clock, Tag, User } from 'lucide-react';

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

const hrefForLocale = (locale: Locale) => `${siteUrl}/${locale}/blog`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  return generateSEO({
    title: 'Expert Loan & Finance Tips - Money Line Solutions Blog',
    description: 'Get expert advice on personal loans, business financing, credit scores, and financial planning in Malaysia. Free guides and tips from licensed loan advisors.',
    keywords: [
      // English
      'loan blog malaysia',
      'personal finance tips',
      'credit score guide',
      'loan approval tips',
      'business financing guide',
      'financial advice malaysia',

      // Malay
      'pinjaman tips',
      'panduan kewangan',
      'nasihat pinjaman',
      'pembiayaan islam',

      // Chinese
      '贷款博客',
      '马来西亚贷款指南',
      '个人理财建议',
      '贷款批准技巧',
      '华人贷款顾问',

      // Tamil
      'கடன் வழிகாட்டி',
      'நிதி ஆலோசனை',

      // Community-specific
      'chinese loan advisor',
      'malay loan tips',
      'indian loan guide',
      'bumiputera financing',
      'CTOS guide',
      'CCRIS tips'
    ],
    canonical: hrefForLocale(locale),
    locale,
    type: 'website'
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loan & Finance Expert Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get expert insights, tips, and guides on loans, credit scores, and financial planning in Malaysia
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/blog`}
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              All Posts
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                href={`/${locale}/blog?category=${encodeURIComponent(category)}`}
                className="px-6 py-2 rounded-full bg-white text-gray-700 font-medium hover:bg-blue-50 transition-colors border border-gray-200"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Tag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedDate).toLocaleDateString('en-MY')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-800">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map(post => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Loan Advice?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our licensed advisors are ready to help you find the best loan options for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/apply`}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply for Loan
            </Link>
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
  );
}
