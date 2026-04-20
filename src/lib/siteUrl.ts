const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const resolveFallbackUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL.trim());
  }

  if (process.env.VERCEL_URL) {
    return trimTrailingSlash(`https://${process.env.VERCEL_URL}`);
  }

  return 'http://localhost:3000';
};

export const getSiteUrl = () => resolveFallbackUrl();
