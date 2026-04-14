import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const loginPath = "/admin/login";
  const sessionValue = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = sessionValue ? await verifyAdminSessionToken(sessionValue) : false;

  if (pathname === loginPath) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
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
