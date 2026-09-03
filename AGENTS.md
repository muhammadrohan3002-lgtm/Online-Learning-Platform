<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agentic Rules & Engineering Guidelines: Online Learning Platform

Welcome, AI Agent / Pair Programmer. These guidelines govern development, architecture, code style, and security across the **Online Learning Platform** codebase. Follow these rules consistently.

---

## 1. Tech Stack Overview

- **Framework**: Next.js `16.3+` (App Router, Turbopack)
- **React**: React `19.2+`
- **Styling**: Tailwind CSS `v4`, DaisyUI `v5`, HeroUI `v3`
- **Authentication**: [Better Auth](https://better-auth.com) `v1.7+` with `@better-auth/mongo-adapter`
- **Database**: MongoDB `v7.6+` native driver
- **Icons & UI Utilities**: `lucide-react`, `react-hot-toast`, `react-hook-form`, `swiper`

---

## 2. Architecture & File Structure Conventions

```
online-learning-platform/
├── .agents/                    # Custom agent rules & skills
│   └── rules/                  # Modular agent rules
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, route handlers)
│   │   ├── api/                # API route handlers (e.g., /api/auth/[...all])
│   │   ├── (auth)/             # Auth routes (login, register)
│   │   ├── layout.js           # Root layout with providers & global styles
│   │   └── page.js             # Landing page
│   ├── component/              # Reusable UI components
│   │   ├── lib/auth-client.js  # Client-side Better Auth instance (authClient)
│   │   ├── Navbar.jsx          # Header navigation
│   │   ├── Footer.jsx          # Site footer
│   │   └── ui/                 # Small atomic design UI elements
│   ├── data/                   # Static data and mock datasets
│   └── lib/                    # Server-side utilities
│       └── auth.js             # Server-side Better Auth initialization
├── .env                        # Local environment variables (DO NOT COMMIT)
├── .env.example                # Template for required environment variables
├── package.json
└── next.config.mjs
```

### Path Aliasing
- Always use the `@/*` alias for imports pointing to `src/*` (e.g., `import { auth } from "@/lib/auth"`).

---

## 3. Component & Routing Conventions

### Server vs. Client Components
- **Default to React Server Components (RSC)**. Do not mark components with `"use client"` unless they require:
  - React hooks (`useState`, `useEffect`, `useCallback`, etc.)
  - Client-side auth sessions (`authClient.useSession()`)
  - Browser APIs or event listeners (`onClick`, `onChange`, `window`, `localStorage`)
- When creating a Client Component, place `"use client";` as the **very first line** of the file.

### Navigation & Links
- Always use `next/link` for internal navigation (`<Link href="...">`).
- For programmatic navigation, import `useRouter` from `next/navigation` (never use `next/router`).

### Form Handling & Feedback
- Use `react-hook-form` for complex forms with validation.
- Use `react-hot-toast` for user-facing success and error notifications.
- Ensure buttons have disabled and loading states during async submissions.

---

## 4. Authentication Guidelines (Better Auth)

### Client Side
- Import `authClient` from `@/component/lib/auth-client`:
  ```javascript
  import { authClient } from "@/component/lib/auth-client";
  
  // Checking session
  const { data: session, isPending } = authClient.useSession();
  
  // Social login (Google / GitHub)
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
  
  // Sign out
  await authClient.signOut();
  ```

### Server Side
- Server auth configuration resides in `src/lib/auth.js`.
- The catch-all route handler is located at `src/app/api/auth/[...all]/route.js`.
- **Never expose server-side secrets** (`BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_SECRET`, `MONGO_URI`) to client components.

---

## 5. Styling & Design System Rules

- **Tailwind CSS v4 & DaisyUI v5**:
  - Use semantic DaisyUI classes (`btn`, `btn-primary`, `navbar`, `card`, `badge`, `modal`) instead of custom ad-hoc styling where applicable.
  - Rely on theme tokens (`bg-base-100`, `bg-base-200`, `text-base-content`, `border-base-300`) to guarantee proper contrast in both light and dark themes.
- **Aesthetics & UX**:
  - Keep interfaces modern, clean, and responsive (mobile-first breakpoints: `sm`, `md`, `lg`, `xl`).
  - Add smooth transitions on interactive elements (`transition-colors`, `hover:scale-105`, `duration-200`).
  - Avoid layout shifts: supply explicit dimensions or aspect ratios for images and video containers.

---

## 6. Environment Variables & Security Rules

1. **Naming Conventions**:
   - Variables accessed in the browser **MUST** start with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_BETTER_AUTH_URL`).
   - Private/server-only variables must **NOT** have the `NEXT_PUBLIC_` prefix (e.g., `MONGO_URI`, `BETTER_AUTH_SECRET`).
2. **Formatting**:
   - Do **NOT** put inline comments on the same line as a variable value in `.env` (e.g., avoid `KEY=val # comment`). Place comments on a preceding `#` line.
3. **Synchronization**:
   - Whenever introducing a new environment variable, immediately update both `.env` (with local value) and `.env.example` (with descriptive placeholder).
4. **Never log sensitive data**:
   - Do not log passwords, tokens, client secrets, or full connection strings to the console.

---

## 7. Development & Troubleshooting Workflow

- **Dev Server**: `npm run dev`
- **Port Conflicts**:
  - If port 3000 is occupied, terminate the existing process via:
    ```powershell
    taskkill /PID <PID> /F
    ```
    or
    ```powershell
    npx kill-port 3000
    ```
- **Next.js Cache Clear**: If facing hydration or Turbopack caching issues, remove `.next/` and restart the dev server.
