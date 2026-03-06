import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TOKEN_COOKIE_NAME = 'generosity_token'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)
  const { pathname } = request.nextUrl

  // Protect /app/* routes
  if (pathname.startsWith('/app')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect logged-in users away from login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/app/overview', request.url))
  }

  // Redirect root to login if not authenticated, otherwise to app
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/app/overview', request.url))
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/app/:path*', '/login'],
}
