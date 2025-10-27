import type { Metadata } from 'next';
import type { Locale } from '@/types/locale';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getRelatedPosts, getAllBlogPosts } from '@/lib/blog';
import { generateSEO, generateArticleSchema } from '@/lib/seo';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const locales = ['en', 'ms'];

  return locales.flatMap(locale =>
    posts.map(post => ({
      locale,
      slug: post.slug
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return generateSEO({
    title: post.title,
    description: post.description,
    keywords: post.tags,
    canonical: `${siteUrl}/${locale}/blog/${post.slug}`,
    locale: locale as Locale,
    type: 'article',
    publishedTime: post.publishedDate,
    modifiedTime: post.modifiedDate,
    author: post.author,
    section: post.category
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Generate Article Schema
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    author: post.author,
    url: `${siteUrl}/${locale}/blog/${post.slug}`
  });

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Featured Image Placeholder */}
            <div className="h-96 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />

            {/* Article Content */}
            <div className="p-8 md:p-12">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.publishedDate).toLocaleDateString('en-MY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-xl font-bold mt-4 mb-2 text-gray-900">{children}</h4>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
                          {children}
                        </code>
                      );
                    },
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-gray-300">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-blue-100">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        {children}
                      </td>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-700">{children}</em>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.slug}
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-purple-50" />
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-2">{relatedPost.category}</div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Your Loan?</h2>
            <p className="mb-6 opacity-90">
              Our licensed advisors are ready to help you find the best loan options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/apply`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Apply Now
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
    </>
  );
}
