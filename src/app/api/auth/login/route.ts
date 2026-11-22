import { NextResponse } from "next/server";
import { AUTH_COOKIE, computeAuthToken, getAuthPassword, safeEqual } from "@/lib/auth";

export async function POST(request: Request) {
  const authPassword = getAuthPassword();
  if (!authPassword) {
    // Fail-closed: tanpa AUTH_PASSWORD, login tidak pernah berhasil.
    return NextResponse.json(
      { success: false, error: "Server belum dikonfigurasi" },
      { status: 500 }
    );
  }

  try {
    const { password } = await request.json();

    if (typeof password === "string" && safeEqual(password, authPassword)) {
      const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
      const proto = forwardedProto || new URL(request.url).protocol.replace(":", "");
      const response = NextResponse.json({ success: true });
      response.cookies.set(AUTH_COOKIE, await computeAuthToken(authPassword), {
        httpOnly: true,
        secure: proto === "https",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
