import { NextResponse } from "next/server";

const AUTH_COOKIE = "lokagen_auth";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "lokagen2024";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === AUTH_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set(AUTH_COOKIE, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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