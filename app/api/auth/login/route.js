import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rateLimit";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const USERS = [
  { email: process.env.AUTH_EMAIL, password: process.env.AUTH_PASSWORD },
  { email: process.env.AUTH_EMAIL2, password: process.env.AUTH_PASSWORD2 },
];

export async function POST(request) {
  const limit = rateLimit(`login:${clientKey(request)}`, 8);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Prea multe încercări. Așteaptă un minut." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }
  try {
    const { email, password } = await request.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }

    const user = USERS.find(u =>
      u.email && u.password &&
      u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.password.trim() === password.trim()
    );
    if (!user) {
      return NextResponse.json({ error: "Email sau parolă incorecte." }, { status: 401 });
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("365d")
      .sign(SECRET);

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Eroare server." }, { status: 500 });
  }
}
