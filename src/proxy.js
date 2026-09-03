import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  // Check whether the user has an active session
  const session = await auth.api
    .getSession({
      headers: request.headers,
    })
    .catch(() => null);

  // If unauthenticated, redirect to /login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/courses/:path*",
    "/course/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};