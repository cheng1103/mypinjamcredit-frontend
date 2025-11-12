import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const API_BASE_URL = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000/api';

// Rate limiter instance: 5 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});

// Validation schema matching MultiStepLeadForm
const leadSchema = z.object({
  loanAmount: z.number()
    .min(1000, 'Loan amount must be at least RM 1,000')
    .max(5000000, 'Loan amount must be less than RM 5,000,000'),
  loanType: z.string().min(1, 'Please select a loan type'),
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  phone: z.string()
    .regex(/^(\+?6?01)[0-46-9][0-9]{7,8}$/, 'Please enter a valid Malaysian phone number'),
  occupation: z.string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(100, 'Occupation must be less than 100 characters'),
  monthlyIncome: z.number()
    .min(1000, 'Monthly income must be at least RM 1,000')
    .max(1000000, 'Monthly income must be less than RM 1,000,000'),
  location: z.string().min(1, 'Please select your location')
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const rateLimitResult = limiter.check(request as any, 5, ip);

    if (!rateLimitResult.success) {
      return NextResponse.json({ errorKey: 'too_many_requests' }, { status: 429 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = leadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        errorKey: 'invalid_input',
        errors: validationResult.error.errors
      }, { status: 400 });
    }

    const payload = validationResult.data;

    // Forward to backend
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const errorKey = typeof data.errorKey === 'string' ? data.errorKey : 'generic';
      return NextResponse.json({ errorKey }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Don't expose error details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to create lead', error);
    }
    return NextResponse.json({ errorKey: 'generic' }, { status: 500 });
  }
}
