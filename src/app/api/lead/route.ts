import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.BACKEND_BASE_URL ?? 'http://localhost:4000/api';

export async function POST(request: Request) {
  const payload = await request.json();

  try {
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
    console.error('Failed to create lead', error);
    return NextResponse.json({ errorKey: 'generic' }, { status: 500 });
  }
}
