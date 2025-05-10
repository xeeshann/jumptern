'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAdmin, logoutAdmin } from '@/lib/adminService';
import { AlertCircle, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie'; // We'll need to install this package

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log("Login form submitted with email:", email);

    try {
      // Try to log out any existing session first
      try {
        console.log("Attempting to logout any existing sessions");
        await logoutAdmin();
        
        // Clear any existing admin cookies
        Cookies.remove('admin-auth');
        Cookies.remove('admin-verified');
        
        console.log("Logout successful, cookies cleared");
      } catch (error) {
        console.error("Error during logout:", error);
      }

      // Now attempt to login
      console.log("Starting login process");
      const session = await loginAdmin(email, password);
      console.log("Login successful, session:", session);
      
      // Set a persistent admin auth cookie with a long expiration (7 days)
      Cookies.set('admin-auth', 'true', { 
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      console.log("Admin authentication cookie set");
      
      // Change the state to indicate successful login and upcoming redirect
      setRedirecting(true);
      
      // Force a hard navigation instead of client-side navigation
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.error("Login error caught in component:", err);
      setAttempts(attempts + 1);
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
      
      // Log for security tracking
      console.log(`Failed login attempt #${attempts + 1} for email: ${email}`);
    }
  };

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center neu-card p-8">
          <Loader2 size={36} className="animate-spin mx-auto text-primary-color mb-4" />
          <p className="text-gray-600">Login successful! Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 neu-card p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the CMS dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 neu-pressed bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Login Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="neu-input appearance-none rounded-t-md relative block w-full px-3 py-3 placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="neu-input appearance-none rounded-b-md relative block w-full px-3 py-3 placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {attempts > 2 && (
            <div className="text-sm text-amber-600 neu-pressed p-3 rounded-md">
              Multiple failed login attempts detected. After 5 failed attempts, you may be temporarily blocked.
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || attempts >= 5}
              className="neu-btn-primary group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : attempts >= 5 ? (
                'Too many attempts. Try again later'
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link
            href="/"
            className="neu-btn font-medium text-primary-color inline-block px-4 py-2"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}