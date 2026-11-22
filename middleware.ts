import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, isValidAuthToken } from "@/lib/auth";

const PUBLIC_PATHS = ["/login", "/", "/_next", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (
    PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    ) ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Biarkan Server Action POST lewat agar ditangani auth di dalam action (return UNAUTHORIZED),
  // karena redirect 307 pada request Next-Action membuat browser gagal memuat halaman.
  if (request.method === "POST" && request.headers.has("next-action")) {
    return NextResponse.next();
  }

  // Cookie berisi token (hash), bukan string tebakan
  const isAuthenticated = await isValidAuthToken(request.cookies.get(AUTH_COOKIE)?.value);
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/generate/:path*", "/test-slides/:path*"],
};
