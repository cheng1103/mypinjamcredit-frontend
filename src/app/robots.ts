import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';
import { isIndexingAllowed } from '@/lib/indexing';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const allowIndexing = isIndexingAllowed();

  const rule = allowIndexing
    ? {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    : {
        userAgent: '*',
        disallow: ['/']
      };

  return {
    rules: [rule],
    sitemap: allowIndexing ? `${siteUrl}/sitemap.xml` : undefined
  };
}
