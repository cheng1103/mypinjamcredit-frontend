import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // in milliseconds
  uniqueTokenPerInterval: number;
}

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (request: NextRequest, limit: number, token: string): { success: boolean; remaining: number; reset: number } => {
      const now = Date.now();
      const tokenData = store[token] || { count: 0, resetTime: now + config.interval };

      if (now > tokenData.resetTime) {
        tokenData.count = 0;
        tokenData.resetTime = now + config.interval;
      }

      tokenData.count += 1;
      store[token] = tokenData;

      const success = tokenData.count <= limit;
      const remaining = Math.max(0, limit - tokenData.count);
      const reset = Math.ceil(tokenData.resetTime / 1000);

      // Cleanup old entries (simple garbage collection)
      Object.keys(store).forEach((key) => {
        if (now > store[key].resetTime + config.interval) {
          delete store[key];
        }
      });

      return { success, remaining, reset };
    }
  };
}

export function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return ip;
}
