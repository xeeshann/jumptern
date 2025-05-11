// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add diagnostic headers in development
  if (process.env.NODE_ENV !== 'production') {
    const response = NextResponse.next();
    
    // Add headers with environment variable statuses (only presence, not values for security)
    response.headers.set('X-Appwrite-Config-Status', JSON.stringify({
      endpoint: !!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      projectId: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      databaseId: !!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      collectionId: !!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      bucketId: !!process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID
    }));
    
    return response;
  }

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

// Only run middleware on specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};