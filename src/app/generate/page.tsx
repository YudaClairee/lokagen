import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOrCreateUserCredits, FREE_TRIAL_CREDITS } from "@/lib/credits";
import { GenerateClient } from "./GenerateClient";

export const dynamic = "force-dynamic";

export default async function GeneratePage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/login?error=not_configured");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/generate");
  }

  const fullName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
    null;

  const credits = await getOrCreateUserCredits({
    id: user.id,
    email: user.email,
    fullName,
  });

  return (
    <GenerateClient
      userEmail={user.email ?? ""}
      initialCreditsRemaining={credits?.creditsRemaining ?? FREE_TRIAL_CREDITS}
      initialIsUnlimited={credits?.isUnlimited ?? false}
      creditsUnavailable={!credits}
    />
  );
}
