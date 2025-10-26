import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mypinjamcredit.com';
  const lastModified = new Date('2025-10-24');

  // Define all routes
  const routes = ['', '/apply', '/contact', '/about', '/products', '/calculator', '/faq', '/blog', '/feedback', '/privacy', '/terms', '/compliance'];
  const locales = ['en', 'ms'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each route and locale
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${route}`;
      const priority = route === '' ? 1.0 : route === '/apply' ? 0.9 : 0.7;
      const changeFrequency = route === '' ? 'weekly' : 'monthly';

      sitemap.push({
        url,
        lastModified,
        changeFrequency: changeFrequency as 'weekly' | 'monthly',
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

  return sitemap;
}
