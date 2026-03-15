import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /**
     * Match wszystkie routes OPRÓCZ:
     * - /api (API routes - mają własną autentykację)
     * - /_next/static (Next.js static files)
     * - /_next/image (Next.js image optimization)
     * - /favicon.ico
     * - /auth/* (public auth pages: sign-in, sign-up)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth|$).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const sessionCookie = allCookies.find(
    (c) => c.name.includes("devinsight") && c.name.includes("session_token"),
  );

  const sessionToken = sessionCookie?.value;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/notes") ||
    request.nextUrl.pathname.startsWith("/saved");

  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);

    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/auth/sign-in") ||
    request.nextUrl.pathname.startsWith("/auth/sign-up");

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
