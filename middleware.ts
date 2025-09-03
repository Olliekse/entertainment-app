/**
 * Next.js Middleware Configuration
 *
 * This middleware runs on every request to the application and can be used for:
 * - Authentication checks
 * - Request/response modification
 * - Redirects
 * - Headers manipulation
 *
 * Currently, this middleware simply passes through all requests without modification,
 * but it's set up to be extended for authentication, logging, or other cross-cutting concerns.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware function that processes incoming requests
 * @param request - The incoming Next.js request object
 * @returns NextResponse - The response to send back
 */
export function middleware(request: NextRequest) {
  // Currently passes through all requests without modification
  // This is where you could add authentication checks, logging, etc.
  return NextResponse.next();
}

/**
 * Configuration object that defines which routes the middleware should run on
 * The matcher uses a regex pattern to exclude certain paths:
 * - api/* - API routes
 * - _next/static/* - Next.js static files
 * - _next/image/* - Next.js image optimization
 * - favicon.ico - Browser favicon
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
