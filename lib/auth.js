import { jwtVerify } from "jose";

// Strip surrounding quotes and trim — handles env vars typed with quotes on Vercel.
export function cleanEnv(value) {
  if (typeof value !== "string") return "";
  let v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

// Deterministic dev key used only when AUTH_SECRET is missing/too short, so auth
// never crashes locally. Production MUST set AUTH_SECRET (>= 32 chars).
const FALLBACK_SECRET = "devzone-fallback-key-please-replace-in-production-32+chars";

let warnedAboutSecret = false;

// Single source of truth for the JWT key. The SAME value must be used to sign
// (login) and to verify (proxy + API routes) — otherwise tokens never validate.
export function getSecret() {
  const raw = cleanEnv(process.env.AUTH_SECRET);
  if (raw.length >= 32) return new TextEncoder().encode(raw);
  if (!warnedAboutSecret) {
    warnedAboutSecret = true;
    console.warn(
      "[auth] AUTH_SECRET missing or too short (< 32 chars). Using insecure fallback. " +
        "Set AUTH_SECRET in env vars to a 64-char random hex string."
    );
  }
  return new TextEncoder().encode(FALLBACK_SECRET);
}

// Resolve the authenticated user's id (email) from the auth cookie.
// Returns "local-user" when no/invalid token (matches prior route behavior).
export async function getUserId(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return "local-user";
    const { payload } = await jwtVerify(token, getSecret());
    return String(payload.email || "local-user");
  } catch {
    return "local-user";
  }
}
