import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, createUser, getUserByEmail } from '@/lib/db/init';
import { hashPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/session';
import { validateRegisterInput } from '@/lib/utils/validation';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    initializeDatabase();

    const body = await request.json();
    const { email, password, passwordConfirm, isAdmin } = body;

    // Validate input
    const errors = validateRegisterInput(email, password, passwordConfirm);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = randomUUID();
    const adminFlag = isAdmin === true; // Only allow admin if explicitly passed

    createUser(userId, email, passwordHash, adminFlag);

    // Generate JWT token
    const token = generateToken(userId, email, adminFlag);

    // Set auth cookie
    const response = NextResponse.json(
      { message: 'User registered successfully', userId },
      { status: 201 }
    );

    // Set cookie by manipulating headers
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
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
