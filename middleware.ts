import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define your tenant domains
const TENANT_DOMAINS = {
  'tenant1.localhost:3000': 'tenant1',
  'tenant2.localhost:3000': 'tenant2',
  // For Vercel deployment - add your actual domains here
  'tenant1domain.com': 'tenant1',
  'tenant2domain.com': 'tenant2',
  'www.tenant1domain.com': 'tenant1',
  'www.tenant2domain.com': 'tenant2',
}

// Domain-specific redirects configuration
// This is the key to answering the customer's question
const DOMAIN_REDIRECTS: Record<string, Record<string, string>> = {
  'tenant1': {
    '/company': '/about',
    '/old-page': '/new-page',
  },
  'tenant2': {
    // tenant2 has no redirects for /company - it won't redirect
    '/contact': '/support',
  },
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Get the tenant based on the hostname
  const tenant = TENANT_DOMAINS[hostname] || 'default'

  // Check if this tenant has any redirects configured
  if (DOMAIN_REDIRECTS[tenant]) {
    const redirectPath = DOMAIN_REDIRECTS[tenant][url.pathname]

    if (redirectPath) {
      // Domain-specific redirect found!
      const redirectUrl = url.clone()
      redirectUrl.pathname = redirectPath

      // Return a 308 permanent redirect (or use 307 for temporary)
      return NextResponse.redirect(redirectUrl, 308)
    }
  }

  // Add tenant to headers for use in your app
  const response = NextResponse.next()
  response.headers.set('x-tenant', tenant)

  // Rewrite the URL to include tenant (optional - for organization)
  // This allows you to have tenant-specific pages if needed
  return response
}

export const config = {
  // Match all paths except static files and API routes (optional)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}
