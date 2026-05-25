import { NextResponse } from "next/server";

// Lightweight diagnostic — confirms env vars are loaded without leaking values.
// Visit /api/auth/health to verify Vercel deployment configuration.
export async function GET() {
  function status(value, minLen = 1) {
    if (typeof value !== "string") return "MISSING";
    let v = value.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1).trim();
    }
    if (v.length === 0) return "EMPTY";
    if (v.length < minLen) return `TOO_SHORT (len=${v.length}, need=${minLen})`;
    return `OK (len=${v.length})`;
  }

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    AUTH_SECRET: status(process.env.AUTH_SECRET, 32),
    AUTH_EMAIL: status(process.env.AUTH_EMAIL),
    AUTH_PASSWORD: status(process.env.AUTH_PASSWORD),
    AUTH_EMAIL2: status(process.env.AUTH_EMAIL2),
    AUTH_PASSWORD2: status(process.env.AUTH_PASSWORD2),
    DATABASE_URL: status(process.env.DATABASE_URL),
    timestamp: new Date().toISOString(),
  });
}
