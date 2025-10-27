import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export async function generateCsrfToken(): Promise<string> {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const cookieStore = await cookies();

  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  return token;
}

export async function verifyCsrfToken(headerToken: string | null): Promise<boolean> {
  if (!headerToken) return false;

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_TOKEN_NAME)?.value;

  return headerToken === cookieToken;
}

export async function getCsrfToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_NAME)?.value;
}

export const CSRF_HEADER = CSRF_HEADER_NAME;
