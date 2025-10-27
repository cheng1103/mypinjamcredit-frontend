import Link from 'next/link';
import { ReactNode } from 'react';

interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  prefetch?: boolean;
}

/**
 * SEO-optimized internal link component
 * - Adds proper rel attributes
 * - Includes descriptive titles
 * - Prefetches on hover for better UX
 * - Maintains proper link hierarchy
 */
export function InternalLink({
  href,
  children,
  className = '',
  title,
  prefetch = true
}: InternalLinkProps) {
  return (
    <Link
      href={href as any}
      className={className}
      title={title}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}

/**
 * Generate related links section for SEO
 */
interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

export function RelatedLinks({ links, title = 'Related Pages' }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label="Related pages" className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <InternalLink
              href={link.href}
              title={link.title}
              className="group block rounded-lg border border-transparent p-3 transition hover:border-blue-200 hover:bg-white"
            >
              <div className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {link.description}
                  </p>
                </div>
              </div>
            </InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Contextual call-to-action links
 */
interface CTALinksProps {
  primary: {
    text: string;
    href: string;
  };
  secondary?: {
    text: string;
    href: string;
  };
}

export function CTALinks({ primary, secondary }: CTALinksProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <InternalLink
        href={primary.href}
        className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:bg-blue-500"
        title={primary.text}
      >
        {primary.text}
      </InternalLink>
      {secondary && (
        <InternalLink
          href={secondary.href}
          className="inline-flex items-center rounded-full border-2 border-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition duration-200 hover:bg-blue-50"
          title={secondary.text}
        >
          {secondary.text}
        </InternalLink>
      )}
    </div>
  );
}
