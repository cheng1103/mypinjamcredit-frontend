'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('common');

  // Parse pathname to generate breadcrumbs
  const pathSegments = pathname.split('/').filter(Boolean);

  // Remove locale from segments
  const locale = pathSegments[0];
  const segments = pathSegments.slice(1);

  if (segments.length === 0) {
    // Homepage - no breadcrumbs needed
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.home'), href: `/${locale}` }
  ];

  let currentPath = `/${locale}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Get label from translation or capitalize segment
    const labelKey = `nav.${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbs.push({
      label: label,
      href: currentPath
    });
  });

  // Generate BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mypinjamcredit.com'}${crumb.href}`
    }))
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-medium text-slate-900" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href as any}
                    className="transition hover:text-blue-600 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
