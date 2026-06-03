'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
            Welcome, {user.email}!
          </h1>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                User ID
              </h2>
              <p className="text-blue-800 dark:text-blue-300 font-mono break-all">{user.id}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h2 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                Email
              </h2>
              <p className="text-green-800 dark:text-green-300">{user.email}</p>
            </div>

            {user.isAdmin && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h2 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  Role
                </h2>
                <p className="text-purple-800 dark:text-purple-300 font-semibold">Administrator</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200">
                ℹ️ Phase 1 basic authentication is complete! Coming next: File browsing and management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
