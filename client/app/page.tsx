'use client';

import { useAuth } from '@/hooks/use-auth';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <AuthWrapper />;
}