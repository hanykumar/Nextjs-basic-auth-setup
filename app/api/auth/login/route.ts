import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, getUserByEmail } from '@/lib/db/init';
import { verifyPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import { validateLoginInput } from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    initializeDatabase();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    const errors = validateLoginInput(email, password);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Find user
    const user = getUserByEmail(email) as any;
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.is_admin === 1);

    const response = NextResponse.json(
      { message: 'Login successful', userId: user.id },
      { status: 200 }
    );

    // Set auth cookie
    response.cookies.set({
      name: 'hk_auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
