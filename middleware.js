import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip auth routes and static files
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const email = payload.email;

    const headers = new Headers(request.headers);
    headers.set("x-user-id", email || "local-user");

    return NextResponse.next({ request: { headers } });
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
