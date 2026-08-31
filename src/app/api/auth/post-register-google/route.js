import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Revoke the newly created session via Better Auth
    await auth.api.signOut({
      headers: request.headers,
    }).catch(() => {});
  } catch (err) {
    console.error("Error revoking session post-registration:", err);
  }

  // Redirect to /login with registered status
  const loginUrl = new URL("/login?registered=google", request.url);
  const response = NextResponse.redirect(loginUrl);

  // Clear Better Auth session cookies explicitly
  const sessionCookies = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session_data",
    "__Secure-better-auth.session_data",
    "better-auth.state",
    "better-auth.oauth_state",
  ];

  sessionCookies.forEach((name) => {
    response.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
  });

  return response;
}
