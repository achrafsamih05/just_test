import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to protect admin routes
 * Checks if user has admin token and role
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;

    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect user account routes
  if (pathname.startsWith('/account')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*'],
};
