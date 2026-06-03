import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';

export interface TokenPayload {
  sub: string; // user id
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, email: string, isAdmin: boolean): string {
  return jwt.sign(
    {
      sub: userId,
      email,
      isAdmin,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function generateSessionId(): string {
  return randomUUID();
}
