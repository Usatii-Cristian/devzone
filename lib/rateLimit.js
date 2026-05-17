const WINDOW_MS = 60_000;
const buckets = new Map();

export function rateLimit(key, max = 10) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { count: 0, resetAt: now + WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }

  bucket.count++;
  buckets.set(key, bucket);

  // Opportunistic cleanup
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }

  return {
    ok: bucket.count <= max,
    remaining: Math.max(0, max - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export function clientKey(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anon"
  );
}
