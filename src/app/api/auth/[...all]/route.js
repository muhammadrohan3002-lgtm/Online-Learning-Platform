import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = async (request, context) => {
  try {
    return await handlers.GET(request, context);
  } catch (error) {
    console.error("[Better Auth API GET Error]:", error);
    throw error;
  }
};

export const POST = async (request, context) => {
  try {
    const url = new URL(request.url);
    console.log(`\n================== [BETTER AUTH POST REQUEST] ==================`);
    console.log(`Timestamp : ${new Date().toISOString()}`);
    console.log(`Endpoint  : ${url.pathname}`);
    
    // Check environment variables safely without leaking secret values
    const envCheck = {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
        ? `Configured (length: ${process.env.GOOGLE_CLIENT_ID.length}, ends with: ...${process.env.GOOGLE_CLIENT_ID.slice(-10)})`
        : "MISSING / UNDEFINED in process.env",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
        ? `Configured (length: ${process.env.GOOGLE_CLIENT_SECRET.length})`
        : "MISSING / UNDEFINED in process.env",
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET
        ? `Configured (length: ${process.env.BETTER_AUTH_SECRET.length})`
        : "MISSING (using fallback in auth.js)",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "(not set in env, defaulting to http://localhost:3000)",
      MONGO_URI: (process.env.MONGO_URI || process.env.MONGODB_URI) ? "Configured" : "MISSING",
    };
    console.log("Server Env Check:", JSON.stringify(envCheck, null, 2));

    const response = await handlers.POST(request, context);
    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (response.status >= 400) {
      const cloned = response.clone();
      try {
        const errorText = await cloned.text();
        console.error(`\n[BETTER AUTH SERVER ERROR DETAILS]:\n${errorText}\n`);
      } catch (e) {
        console.error("[Could not read error response body]:", e);
      }
    }
    console.log(`=================================================================\n`);
    return response;
  } catch (error) {
    console.error("\n[BETTER AUTH UNCAUGHT SERVER EXCEPTION]:", error);
    console.log(`=================================================================\n`);
    throw error;
  }
};