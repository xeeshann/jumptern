// src/app/admin/layout.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, X, Home, FileText, Plus, Settings, ChevronDown } from 'lucide-react';
import { getCurrentAdmin, logoutAdmin } from '@/lib/adminService';

export default function AdminLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Skip auth check on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setLoading(false);
        return;
      }

      const currentAdmin = await getCurrentAdmin();
      if (currentAdmin) {
        setAdmin(currentAdmin);
      } else {
        // If no admin is logged in and not on login page, redirect to login
        router.push('/admin/login');
      }
      setLoading(false);
    }

    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If we're on login page, just render children without the admin layout
  if (isLoginPage || loading) {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Create Post', href: '/admin/posts/create', icon: Plus },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between neu-flat p-4 sticky top-0 z-50">
          <Link href="/admin/dashboard" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin CMS
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="neu-btn p-2 rounded-full"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="neu-card m-4 p-4 rounded-xl">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'neu-pressed text-primary-color font-medium'
                        : 'neu-flat hover:text-primary-color'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 neu-btn text-primary-color rounded-lg mt-4"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex-col lg:w-72 lg:pb-4 neu-flat">
        <div className="flex h-16 shrink-0 items-center justify-between px-6 neu-flat border-b border-gray-200">
          <Link href="/admin/dashboard" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin CMS
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'neu-pressed text-primary-color font-medium'
                      : 'neu-flat hover:text-primary-color'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="mt-auto pt-4 mx-4">
          {admin && (
            <div className="neu-card p-4 mb-4 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{admin.name}</div>
              <div className="text-xs text-gray-500">{admin.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center w-full neu-btn-primary px-4 py-3 rounded-lg text-white"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {!isLoginPage && (
          <header className="neu-flat sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigation.find((item) => item.href === pathname)?.name || 'Admin'}
                </h1>
                <Link
                  href="/"
                  target="_blank"
                  className="neu-btn px-3 py-2 rounded-lg text-primary-color flex items-center"
                >
                  <Home size={16} className="mr-1" />
                  View Blog
                </Link>
              </div>
            </div>
          </header>
        )}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}