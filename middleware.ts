import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== 'true') {
    return NextResponse.next()
  }

  // Rewrite to maintenance page
  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

export const config = {
  matcher: '/',
}
