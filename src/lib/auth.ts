// Token sesi berbasis Web Crypto (SHA-256). Dipakai di Edge Middleware,
// route handler, dan Server Action, jadi tidak boleh memakai modul Node saja.

export const AUTH_COOKIE = "lokagen_auth";
const TOKEN_SALT = "lokagen:session:v1";

export function getAuthPassword(): string | undefined {
  return process.env.AUTH_PASSWORD || undefined;
}

export async function computeAuthToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${TOKEN_SALT}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Perbandingan dengan waktu konstan untuk string yang panjangnya sama.
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Fail-closed: jika AUTH_PASSWORD belum di-set, tidak ada token yang valid. */
export async function isValidAuthToken(token: string | undefined | null): Promise<boolean> {
  const password = getAuthPassword();
  if (!password || !token) return false;
  const expected = await computeAuthToken(password);
  return safeEqual(token, expected);
}
