import { createSupabaseAdminClient } from "./supabase/admin";
export { FREE_TRIAL_CREDITS } from "./credits-constants";

export interface UserCreditSummary {
  creditsRemaining: number;
  totalGenerated: number;
  isUnlimited: boolean;
}

export interface ConsumeCreditResult {
  allowed: boolean;
  creditsRemaining: number;
  isUnlimited: boolean;
}

interface UserIdentity {
  id: string;
  email?: string | null;
  fullName?: string | null;
}

export async function getOrCreateUserCredits(user: UserIdentity): Promise<UserCreditSummary | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.rpc("ensure_user_credits", {
    p_user_id: user.id,
    p_email: user.email ?? null,
    p_full_name: user.fullName ?? null,
  });

  if (error) {
    console.error("[credits] ensure_user_credits failed:", error);
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  return {
    creditsRemaining: Number(row.credits_remaining ?? 0),
    totalGenerated: Number(row.total_generated ?? 0),
    isUnlimited: Boolean(row.is_unlimited),
  };
}

export async function consumeGenerationCredit(user: UserIdentity): Promise<ConsumeCreditResult | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.rpc("consume_generation_credit", {
    p_user_id: user.id,
    p_email: user.email ?? null,
    p_full_name: user.fullName ?? null,
  });

  if (error) {
    console.error("[credits] consume_generation_credit failed:", error);
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  return {
    allowed: Boolean(row.allowed),
    creditsRemaining: Number(row.credits_remaining ?? 0),
    isUnlimited: Boolean(row.is_unlimited),
  };
}

export async function refundGenerationCredit(userId: string): Promise<number | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.rpc("refund_generation_credit", {
    p_user_id: userId,
  });

  if (error) {
    console.error("[credits] refund_generation_credit failed:", error);
    return null;
  }

  return typeof data === "number" ? data : Number(data ?? 0);
}
