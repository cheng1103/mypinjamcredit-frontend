import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ms'] as const;
const fallbackLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = locale && locales.includes(locale as (typeof locales)[number]) ? locale : fallbackLocale;

  return {
    locale: normalizedLocale,
    messages: (await import(`./messages/${normalizedLocale}.json`)).default
  };
});
