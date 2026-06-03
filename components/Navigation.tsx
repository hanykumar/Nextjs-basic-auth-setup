'use client';

import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';

export function Navigation() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-zinc-200 dark:bg-black dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-semibold text-lg">
            HK-Space
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {user.email}
                  {user.isAdmin && ' (Admin)'}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Login
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
