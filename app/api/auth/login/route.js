import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const USERS = [
  { email: process.env.AUTH_EMAIL, password: process.env.AUTH_PASSWORD },
  { email: process.env.AUTH_EMAIL2, password: process.env.AUTH_PASSWORD2 },
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = USERS.find(u => u.email && u.email === email && u.password === password);
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
