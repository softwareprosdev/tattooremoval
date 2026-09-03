import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service role key, which bypasses
 * row-level security — never import this module from a client component.
 * Returns null (rather than throwing) when env vars aren't configured
 * yet, so the app can run/build before Supabase is wired up; callers
 * must handle the null case explicitly.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  if (!serverClient) {
    serverClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  return serverClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
