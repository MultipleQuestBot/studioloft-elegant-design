import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Simple auth scaffold:
  // - allow admin in development for easier iteration
  // - require cookie in production deployments
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const adminSession = request.cookies.get("studioloft_admin_session");
  if (!adminSession?.value) {
    const redirectUrl = new URL("/order", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
