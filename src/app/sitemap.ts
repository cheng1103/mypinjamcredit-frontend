import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mypinjamcredit.com';
  const lastModified = new Date();

  // Define all routes
  const routes = [
    '',
    '/apply',
    '/contact',
    '/about',
    '/products',
    '/calculator',
    '/faq',
    '/blog',
    '/reviews',
    '/feedback',
    '/privacy',
    '/terms',
    '/compliance',
    '/locations/kuala-lumpur'
  ];
  const locales = ['en', 'ms'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each route and locale
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${route}`;
      const priority = route === '' ? 1.0 : route === '/apply' ? 0.9 : 0.7;
      const changeFrequency = route === '' ? 'daily' : route === '/blog' ? 'weekly' : 'monthly';

      sitemap.push({
        url,
        lastModified,
        changeFrequency: changeFrequency as 'daily' | 'weekly' | 'monthly',
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ms: `${baseUrl}/ms${route}`,
          },
        },
      });
    });
  });

  // Add blog posts to sitemap
  const blogPosts = getAllBlogPosts();
  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/blog/${post.slug}`;

      // Safely parse date, fallback to current date if invalid
      let postDate: Date;
      try {
        const dateStr = post.modifiedDate || post.publishedDate;
        postDate = dateStr ? new Date(dateStr) : lastModified;
        // Check if date is valid
        if (isNaN(postDate.getTime())) {
          postDate = lastModified;
        }
      } catch (error) {
        postDate = lastModified;
      }

      sitemap.push({
        url,
        lastModified: postDate,
        changeFrequency: 'monthly',
        priority: post.featured ? 0.8 : 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            ms: `${baseUrl}/ms/blog/${post.slug}`,
          },
        },
      });
    });
  });

  return sitemap;
}
