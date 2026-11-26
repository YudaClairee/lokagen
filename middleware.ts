import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Biarkan Server Action POST lewat agar ditangani auth di dalam action (return UNAUTHORIZED),
  // karena redirect 307 pada request Next-Action membuat browser gagal memuat halaman.
  if (request.method === "POST" && request.headers.has("next-action")) {
    return NextResponse.next();
  }

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  // Fail-closed bila env Supabase belum diset.
  if (!url || !anonKey) {
    if (pathname === "/login") return NextResponse.next();
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "not_configured");
    return NextResponse.redirect(loginUrl);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // PENTING: gunakan getUser() (bukan getSession()) agar JWT diverifikasi ke server Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname === "/login") {
    if (user) {
      const nextUrl = new URL("/generate", request.url);
      return NextResponse.redirect(nextUrl);
    }
    return supabaseResponse;
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/generate/:path*", "/test-slides/:path*", "/login"],
};
