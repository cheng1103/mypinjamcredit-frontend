import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ms'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
