import { NextRequest, NextResponse } from 'next/server';
import { getAuthPayload, setAuthCookie } from '@/lib/auth/session';
import { generateToken } from '@/lib/auth/jwt';
import { initializeDatabase, getUserById } from '@/lib/db/init';

export async function POST(request: NextRequest) {
  try {
    initializeDatabase();

    const payload = await getAuthPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user info to generate new token
    const user = getUserById(payload.sub) as any;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate new JWT token
    const newToken = generateToken(user.id, user.email, user.is_admin === 1);

    const response = NextResponse.json({ message: 'Token refreshed' }, { status: 200 });

    // Set new auth cookie
    response.cookies.set({
      name: 'hk_auth_token',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}
