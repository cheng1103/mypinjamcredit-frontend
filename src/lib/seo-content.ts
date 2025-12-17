import type { Locale } from '@/types/locale';
import enMessages from '../../messages/en.json';
import msMessages from '../../messages/ms.json';

const SEO_SECTIONS = ['home', 'apply', 'products', 'contact', 'feedback', 'calculator'] as const;

export type SeoNamespace = (typeof SEO_SECTIONS)[number];

export type SeoEntry = {
  title: string;
  description: string;
};

type MessageFile = typeof enMessages;

const buildSeoDictionary = (messages: MessageFile) => {
  const entries = messages.seo ?? {};
  return SEO_SECTIONS.reduce<Record<SeoNamespace, SeoEntry>>((acc, section) => {
    const entry = entries[section];
    acc[section] = {
      title: entry?.title || '',
      description: entry?.description || ''
    };
    return acc;
  }, {} as Record<SeoNamespace, SeoEntry>);
};

const seoMessages: Record<Locale, Record<SeoNamespace, SeoEntry>> = {
  en: buildSeoDictionary(enMessages),
  ms: buildSeoDictionary(msMessages)
};

export function getSeoCopy(locale: Locale, section: SeoNamespace): SeoEntry {
  const localized = seoMessages[locale]?.[section];
  const fallback = seoMessages.en[section];

  return {
    title: localized?.title || fallback.title,
    description: localized?.description || fallback.description
  };
}
