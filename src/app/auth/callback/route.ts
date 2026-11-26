import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOrCreateUserCredits } from "@/lib/credits";

function safeNextPath(raw: string | null): string {
  if (!raw) return "/generate";
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/generate";
}

function resolveOrigin(request: Request): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
  if (forwardedHost && process.env.NODE_ENV !== "development") {
    return `${forwardedProto}://${forwardedHost}`;
  }
  return origin;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = safeNextPath(requestUrl.searchParams.get("next"));
  const origin = resolveOrigin(request);

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/login?error=not_configured`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("[auth/callback] exchangeCodeForSession failed:", error);
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Pastikan baris kuota gratis (3x) langsung tersedia setelah user masuk.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await getOrCreateUserCredits({
      id: user.id,
      email: user.email,
      fullName:
        (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
        (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
        null,
    });
  }

  return NextResponse.redirect(`${origin}${next}`);
}
