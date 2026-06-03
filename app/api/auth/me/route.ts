import { NextRequest, NextResponse } from 'next/server';
import { getAuthPayload } from '@/lib/auth/session';
import { initializeDatabase, getUserById } from '@/lib/db/init';

export async function GET(request: NextRequest) {
  try {
    initializeDatabase();

    const payload = await getAuthPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get full user info from database
    const user = getUserById(payload.sub) as any;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin === 1,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
