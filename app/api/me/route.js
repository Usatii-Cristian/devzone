import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getSecret, isAdminEmail, defaultUserId } from "@/lib/auth";

const NAME_MAP = {
  [process.env.AUTH_EMAIL]:  { name: "Cristi", initial: "C" },
  [process.env.AUTH_EMAIL2]: { name: "Alex",   initial: "A" },
  [process.env.AUTH_EMAIL3]: { name: "Dencik", initial: "D" },
};

// Visitor without a session = primary account, but never admin (admin needs a real login).
function guest() {
  const email = defaultUserId();
  return NextResponse.json({ email, isAdmin: false, ...(NAME_MAP[process.env.AUTH_EMAIL] ?? { name: "Utilizator", initial: "U" }) });
}

export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) return guest();

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = String(payload.email || "");
    const info = NAME_MAP[email] ?? { name: email.split("@")[0], initial: email[0]?.toUpperCase() ?? "U" };
    return NextResponse.json({ email, isAdmin: isAdminEmail(email), ...info });
  } catch {
    return guest();
  }
}
