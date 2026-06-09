import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getSecret } from "@/lib/auth";

const NAME_MAP = {
  [process.env.AUTH_EMAIL]:  { name: "Cristi", initial: "C" },
  [process.env.AUTH_EMAIL2]: { name: "Alex",   initial: "A" },
  [process.env.AUTH_EMAIL3]: { name: "Dencik", initial: "D" },
};

export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ email: null, name: "Utilizator", initial: "U" }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = String(payload.email || "");
    const info = NAME_MAP[email] ?? { name: email.split("@")[0], initial: email[0]?.toUpperCase() ?? "U" };
    const isAdmin = Boolean(process.env.AUTH_EMAIL) && email === process.env.AUTH_EMAIL;
    return NextResponse.json({ email, isAdmin, ...info });
  } catch {
    return NextResponse.json({ email: null, name: "Utilizator", initial: "U" }, { status: 401 });
  }
}
