// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Special case - don't check auth for the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for our admin auth cookie with HttpOnly and secure flags
    const adminAuth = request.cookies.get('admin-auth');

    // If there's no admin auth cookie, redirect to login
    if (!adminAuth) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: ['/admin/:path*'],
};