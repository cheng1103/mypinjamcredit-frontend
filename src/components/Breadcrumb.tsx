'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from URL if not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname, locale);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumb on homepage
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {isLast ? (
                <span className="font-medium text-slate-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-600 transition-colors hover:text-blue-600 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string, locale: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: `/${locale}` }
  ];

  // Remove locale from pathname
  const path = pathname.replace(`/${locale}`, '');

  if (!path || path === '/') {
    return breadcrumbs;
  }

  const segments = path.split('/').filter(Boolean);
  let currentPath = `/${locale}`;

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Generate label from segment
    let label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Special cases for better labels
    if (segment === 'kuala-lumpur') label = 'Kuala Lumpur';
    if (segment === 'johor-bahru') label = 'Johor Bahru';
    if (segment === 'ctos-score-complete-guide-2025') label = 'CTOS Score Guide 2025';
    if (segment === 'personal-loan-guide-malaysia-2025') label = 'Personal Loan Guide';
    if (segment === 'business-loan-sme-guide-2025') label = 'Business Loan Guide';
    if (segment === 'debt-consolidation-guide-malaysia') label = 'Debt Consolidation Guide';
    if (segment === 'faq') label = 'FAQ';
    if (segment === 'locations') label = 'Locations';

    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return breadcrumbs;
}

// Generate BreadcrumbList Schema for SEO
export function generateBreadcrumbSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`
    }))
  };
}
