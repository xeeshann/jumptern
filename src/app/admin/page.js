'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard page when this component mounts
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center neu-card p-8">
        <Loader2 size={36} className="animate-spin mx-auto text-primary-color mb-4" />
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}