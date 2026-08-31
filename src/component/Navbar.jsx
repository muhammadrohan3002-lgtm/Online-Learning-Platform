"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to logout");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Dropdown & Logo */}
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-200 font-medium"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <div className="divider my-1"></div>

              {/* Mobile Auth Links with Ternary Operator */}
              {user ? (
                <>
                  <li className="px-3 py-1.5 text-xs text-base-content/70">
                    Signed in as <span className="font-semibold text-base-content">{user.name || user.email}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error font-semibold hover:bg-error/10"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link
            href="/"
            className="btn btn-ghost text-xl font-black tracking-tight text-primary px-2"
          >
            Skill<span className="text-base-content">Sphere</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold gap-1">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-primary transition-colors">
                Courses
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Auth Section with Ternary Operator */}
        <div className="navbar-end gap-3 items-center">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar & Details */}
              <div className="flex items-center gap-2.5">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 overflow-hidden bg-primary/10 flex items-center justify-center font-bold text-primary select-none">
                    {user.image && !imageError ? (
                      <img
                        src={user.image}
                        alt={user.name || "User Avatar"}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span>
                        {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-semibold leading-tight text-base-content">
                    {user.name || "User"}
                  </span>
                  <span className="text-xs text-base-content/60 leading-tight truncate max-w-[130px]">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline btn-sm font-medium hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost btn-sm font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm font-semibold shadow-xs"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
