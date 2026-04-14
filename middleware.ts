import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const loginPath = "/admin/login";
  const sessionValue = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(sessionValue);

  if (pathname === loginPath) {
    // Keep login page accessible to avoid redirect loops
    // when cookie exists but token is invalid/expired.
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
