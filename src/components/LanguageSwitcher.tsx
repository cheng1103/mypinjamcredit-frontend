'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '@/types/locale';

const locales: Locale[] = ['en', 'ms'];

const getTargetPath = (pathname: string, nextLocale: Locale) => {
  const segments = pathname === '/' ? [] : pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    segments.unshift(nextLocale);
  } else if (locales.includes(segments[0] as Locale)) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  const joined = segments.join('/');
  return `/${joined}`;
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('common.language');
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === 'en' ? 'ms' : 'en';

  const handleSwitch = () => {
    const targetPath = getTargetPath(pathname, nextLocale);
    const query = searchParams.toString();
    const href = query ? `${targetPath}?${query}` : targetPath;

    startTransition(() => {
      router.replace(href as any);
    });
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={t('ariaLabel')}
      disabled={isPending}
      className="rounded-full border border-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="sr-only">{t('current')}</span>
      {t('switchLabel')}
    </button>
  );
}
