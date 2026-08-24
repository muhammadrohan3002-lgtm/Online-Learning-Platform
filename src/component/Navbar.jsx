"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Dropdown & Logo */}
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-200 font-medium"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
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

        {/* Login / Register / User profile */}
        <div className="navbar-end gap-2">
          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              ) : null}
              <span className="text-xs font-semibold hidden sm:inline-block max-w-[140px] truncate">
                Hi, {session.user.name || session.user.email}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error btn-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm font-semibold shadow-xs">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
