import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { timingSafeEqual, createHash } from "crypto";
import { rateLimit, clientKey } from "@/lib/rateLimit";

// Strip surrounding quotes and trim — handles env vars typed with quotes on Vercel.
function cleanEnv(value) {
  if (typeof value !== "string") return "";
  let v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

// AUTH_SECRET must be at least 32 bytes for HS256. Fall back to a deterministic
// dev key if missing so the route never crashes — production should always set it.
function getSecret() {
  const raw = cleanEnv(process.env.AUTH_SECRET);
  if (raw.length >= 32) return new TextEncoder().encode(raw);
  console.warn(
    "[auth] AUTH_SECRET missing or too short (< 32 chars). Using insecure fallback. " +
      "Set AUTH_SECRET in Vercel env vars to a 64-char random hex string."
  );
  return new TextEncoder().encode("devzone-fallback-key-please-replace-in-production-32+chars");
}

// SHA-256 hashes of default passwords — safe to store in source.
// Used only when env vars are missing/empty. Change via AUTH_EMAIL/AUTH_PASSWORD env vars.
const DEFAULT_USERS = [
  {
    email: "cristiusa98@gmail.com",
    passwordHash: "62b169e6f187bb1461bef2e611b8f83cee592671c4bcf08e03dac5826b829947",
  },
  {
    email: "alexandrupopovschi36@gmail.com",
    passwordHash: "cc9e2ccea28135fb689e07da3a266eaada7851a7a16b45fd60273720e87152cf",
  },
];

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function getUsers() {
  const fromEnv = [
    { email: cleanEnv(process.env.AUTH_EMAIL), password: cleanEnv(process.env.AUTH_PASSWORD) },
    { email: cleanEnv(process.env.AUTH_EMAIL2), password: cleanEnv(process.env.AUTH_PASSWORD2) },
  ].filter((u) => u.email && u.password);

  if (fromEnv.length > 0) return { users: fromEnv, mode: "env" };
  console.warn("[auth] No env var users found — falling back to default hashed credentials.");
  return { users: [], defaults: DEFAULT_USERS, mode: "hash" };
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) {
    timingSafeEqual(ab, Buffer.alloc(ab.length));
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export async function POST(request) {
  const limit = rateLimit(`login:${clientKey(request)}`, 8);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Prea multe încercări. Așteaptă un minut." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error("[auth] Invalid JSON body:", e?.message);
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { email, password } = body || {};
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email și parolă obligatorii." }, { status: 400 });
  }

  const { users, defaults, mode } = getUsers();

  const emailNorm = email.trim().toLowerCase();
  const passwordNorm = password.trim();

  let matchedEmail = null;

  if (mode === "env" && users.length > 0) {
    // Normal mode: compare plaintext from env vars
    for (const u of users) {
      const emailOk = safeEqual(u.email.toLowerCase(), emailNorm);
      const passOk = safeEqual(u.password, passwordNorm);
      if (emailOk && passOk) matchedEmail = u.email;
    }
  } else {
    // Fallback mode: compare SHA-256 hash of provided password
    const providedHash = hashPassword(passwordNorm);
    for (const u of defaults) {
      const emailOk = safeEqual(u.email.toLowerCase(), emailNorm);
      const passOk = safeEqual(u.passwordHash, providedHash);
      if (emailOk && passOk) matchedEmail = u.email;
    }
  }

  if (!matchedEmail) {
    return NextResponse.json({ error: "Email sau parolă incorecte." }, { status: 401 });
  }

  try {
    const token = await new SignJWT({ email: matchedEmail })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("365d")
      .sign(getSecret());

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("[auth] JWT sign failed:", e?.message, e?.stack);
    return NextResponse.json({ error: "Eroare la generarea token-ului. Verifică AUTH_SECRET." }, { status: 500 });
  }
}
