const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "invalid" | "network_error" };

/**
 * Verifies a Cloudflare Turnstile token server-side. When
 * TURNSTILE_SECRET_KEY isn't configured yet, verification is skipped
 * (returns ok:true) so local development / early deployment isn't
 * blocked — but this should always be configured before go-live, since
 * skipping verification removes the site's bot/spam protection.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: true };
  }

  if (!token) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = (await res.json()) as { success: boolean };
    return data.success ? { ok: true } : { ok: false, reason: "invalid" };
  } catch {
    return { ok: false, reason: "network_error" };
  }
}
