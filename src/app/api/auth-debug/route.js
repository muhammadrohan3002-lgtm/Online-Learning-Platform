import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      GOOGLE_CLIENT_ID_present: Boolean(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_ID_length: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.length : 0,
      GOOGLE_CLIENT_ID_valid_format: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID.endsWith(".apps.googleusercontent.com")
        : false,
      GOOGLE_CLIENT_SECRET_present: Boolean(process.env.GOOGLE_CLIENT_SECRET),
      GOOGLE_CLIENT_SECRET_length: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET.length : 0,
      BETTER_AUTH_SECRET_present: Boolean(process.env.BETTER_AUTH_SECRET),
      BETTER_AUTH_URL_value: process.env.BETTER_AUTH_URL || "(not set in env, defaulting to http://localhost:3000)",
      MONGO_URI_present: Boolean(process.env.MONGO_URI || process.env.MONGODB_URI),
    },
    betterAuthDirectTest: null,
  };

  try {
    // Create a synthetic POST request to /api/auth/sign-in/social
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const reqUrl = `${protocol}://${host}/api/auth/sign-in/social`;

    const syntheticReq = new Request(reqUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "origin": `${protocol}://${host}`,
        "referer": `${protocol}://${host}/register`,
      },
      body: JSON.stringify({
        provider: "google",
        callbackURL: `${protocol}://${host}/`,
      }),
    });

    const res = await auth.handler(syntheticReq);
    const status = res.status;
    const bodyText = await res.text();

    let parsedBody;
    try {
      parsedBody = JSON.parse(bodyText);
    } catch {
      parsedBody = bodyText;
    }

    diagnostics.betterAuthDirectTest = {
      status,
      ok: res.ok,
      response: parsedBody,
    };
  } catch (err) {
    diagnostics.betterAuthDirectTest = {
      error: true,
      message: err.message,
      name: err.name,
      stack: err.stack,
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
