# Better Auth & MongoDB Rules

Guidelines for implementing and maintaining authentication and database features in this repository.

## Architecture
- **Auth Provider**: Better Auth (`better-auth`) with MongoDB adapter (`@better-auth/mongo-adapter`).
- **Server Instance**: `src/lib/auth.js`
- **Client Instance**: `src/component/lib/auth-client.js`
- **Route Handler**: `src/app/api/auth/[...all]/route.js`

## Client-Side Authentication Patterns
Always import `authClient` from `@/component/lib/auth-client`:
```javascript
"use client";
import { authClient } from "@/component/lib/auth-client";

// Get current session
const { data: session, isPending, error } = authClient.useSession();

// Social Sign-in (e.g., Google)
const handleGoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    newUserCallbackURL: "/",
    additionalParams: {
      prompt: "select_account",
    },
  });
};

// Sign-out
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      // Redirect or notify
    },
  },
});
```

## Security Rules
1. Never import `src/lib/auth.js` into Client Components (files starting with `"use client"`).
2. Do not log sensitive credential fields, password hashes, or token secrets in server route handlers.
3. Keep database client initialization singleton or cached to avoid connection exhaustion in serverless environments.
