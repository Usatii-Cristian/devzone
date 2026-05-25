import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
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

function getUsers() {
  const users = [
    { email: cleanEnv(process.env.AUTH_EMAIL), password: cleanEnv(process.env.AUTH_PASSWORD) },
    { email: cleanEnv(process.env.AUTH_EMAIL2), password: cleanEnv(process.env.AUTH_PASSWORD2) },
  ];
  return users.filter((u) => u.email && u.password);
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

  const users = getUsers();
  if (users.length === 0) {
    console.error("[auth] No users configured. Set AUTH_EMAIL + AUTH_PASSWORD env vars on Vercel.");
    return NextResponse.json(
      { error: "Configurare server incompletă. Contactează administratorul." },
      { status: 503 }
    );
  }

  const emailNorm = email.trim().toLowerCase();
  const passwordNorm = password.trim();

  let matched = null;
  for (const u of users) {
    const emailOk = safeEqual(u.email.toLowerCase(), emailNorm);
    const passOk = safeEqual(u.password, passwordNorm);
    if (emailOk && passOk) matched = u;
  }
  if (!matched) {
    return NextResponse.json({ error: "Email sau parolă incorecte." }, { status: 401 });
  }

  try {
    const token = await new SignJWT({ email: matched.email })
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
