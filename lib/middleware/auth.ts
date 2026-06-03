import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/session';
import { verifyToken } from '@/lib/auth/jwt';

export async function withAuth(request: NextRequest, handler: (req: NextRequest, payload: any) => Promise<NextResponse>) {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return handler(request, payload);
}
