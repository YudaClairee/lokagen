"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseClientConfigured } from "@/lib/supabase/config";
import { FREE_TRIAL_CREDITS } from "@/lib/credits-constants";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.54-5.17 3.54-8.89Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.88-3.02c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.27v3.12A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.6H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.4l4.01-3.12Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.6l4.01 3.12c.95-2.84 3.6-4.95 6.72-4.95Z"
      />
    </svg>
  );
}

// useSearchParams() butuh Suspense agar halaman bisa di-prerender saat build.
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginCard />
    </Suspense>
  );
}

function LoginCard() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/generate";
  const redirect = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/generate";
  const isExpired = searchParams.get("reason") === "expired";
  const queryError = searchParams.get("error");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseClientConfigured();

  const initialError = !configured
    ? "Autentikasi belum dikonfigurasi oleh admin. Coba lagi nanti ya."
    : queryError === "auth_failed"
      ? "Login dengan Google dibatalkan atau gagal. Silakan coba lagi."
      : "";

  const displayError = error || initialError;

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`;
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (oauthError) {
        console.error("Google OAuth error:", oauthError);
        setError("Gagal memulai login Google. Silakan coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      setError("Terjadi kesalahan saat menghubungkan ke Google. Coba lagi ya.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-clip bg-background px-4 py-8">
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "#FFF8F0",
          backgroundImage: `
            linear-gradient(to right, rgba(28,25,23,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28,25,23,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(194,65,12,0.08) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Gratis {FREE_TRIAL_CREDITS}× Generate Konten
            </div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Masuk ke LokaGen</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Daftar otomatis dalam 1 klik dengan akun Google kamu untuk langsung mencoba bikin konten IG &amp; Story gratis.
            </p>
          </div>

          {isExpired && !displayError && (
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-800">
              Sesi login Anda habis. Silakan masuk ulang untuk melanjutkan.
            </div>
          )}

          {displayError && (
            <div role="alert" className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-700">
              {displayError}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={loading || !configured}
            onClick={handleGoogleLogin}
            className="w-full gap-3 border-border bg-white text-foreground hover:bg-muted"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Mengarahkan ke Google...
              </>
            ) : (
              <>
                <GoogleIcon />
                Lanjutkan dengan Google
              </>
            )}
          </Button>

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            Akun baru otomatis mendapat <strong>{FREE_TRIAL_CREDITS} slot generate gratis</strong>. Dengan masuk, Anda menyetujui{" "}
            <Link href="/privasi" className="underline underline-offset-2 hover:text-foreground">
              Kebijakan Privasi &amp; Ketentuan
            </Link>{" "}
            LokaGen.
          </p>
        </div>
      </div>
    </main>
  );
}
