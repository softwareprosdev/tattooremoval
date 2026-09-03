import { getSupabaseServerClient } from "@/lib/database/supabase";
import type { LeadRecord } from "@/lib/validation/lead";

export type CreateLeadResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not_configured" | "insert_failed"; error?: unknown };

/**
 * Inserts a new lead into the `leads` table (see supabase/schema.sql).
 * When Supabase hasn't been configured yet (missing env vars), this
 * degrades gracefully — the API route still sends notification email
 * and returns success to the client rather than hard-failing the whole
 * submission on a missing backend.
 */
export async function createLead(
  lead: Omit<LeadRecord, "status"> & { status?: LeadRecord["status"] }
): Promise<CreateLeadResult> {
  const client = getSupabaseServerClient();
  if (!client) {
    return { ok: false, reason: "not_configured" };
  }

  const { data, error } = await client
    .from("leads")
    .insert({ status: "NEW", ...lead })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, reason: "insert_failed", error };
  }

  return { ok: true, id: data.id as string };
}
