import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const NAME_MAP = {
  [process.env.AUTH_EMAIL]:  { name: "Cristi", initial: "C" },
  [process.env.AUTH_EMAIL2]: { name: "Alex",   initial: "A" },
};

export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ email: null, name: "Utilizator", initial: "U" }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const email = String(payload.email || "");
    const info = NAME_MAP[email] ?? { name: email.split("@")[0], initial: email[0]?.toUpperCase() ?? "U" };
    return NextResponse.json({ email, ...info });
  } catch {
    return NextResponse.json({ email: null, name: "Utilizator", initial: "U" }, { status: 401 });
  }
}
