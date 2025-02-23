import { NextResponse } from 'next/server'

export function middleware(request) {
  const isLoggedIn = request.cookies.get('isLoggedIn')
  const { pathname } = request.nextUrl

  // Allow access to login page and static files
  if (
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}