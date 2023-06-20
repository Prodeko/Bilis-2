import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  if (request.nextUrl.pathname.startsWith('/player/')) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
}
