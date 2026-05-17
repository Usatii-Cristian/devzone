import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (
      email !== process.env.AUTH_EMAIL ||
      password !== process.env.AUTH_PASSWORD
    ) {
      return NextResponse.json({ error: "Email sau parolă incorecte." }, { status: 401 });
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(SECRET);

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Eroare server." }, { status: 500 });
  }
}
