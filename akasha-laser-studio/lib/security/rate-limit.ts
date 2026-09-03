/**
 * Minimal in-memory sliding-window rate limiter for API routes.
 *
 * This is a best-effort spam guard suitable for a single-instance
 * deployment or as a first line of defense alongside Turnstile. It is
 * NOT durable across serverless cold starts or multiple regions/
 * instances — for production-grade distributed rate limiting, swap this
 * module's internals for a shared store (e.g. Upstash Redis, Vercel KV)
 * without changing the call site below.
 */

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count };
}

/** Best-effort client identifier from standard proxy headers. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}
