"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to SkillSphere updates!");
    setEmail("");
  };

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-primary inline-block"
            >
              Skill<span className="text-base-content">Sphere</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Empowering lifelong learners with practical, industry-standard courses in Web
              Development, UI/UX Design, Cloud Architecture, and Data Science.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm pt-2">
              <label className="text-xs font-semibold text-gray-500 block">
                Subscribe to our weekly learning digest
              </label>
              <div className="join w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="input input-bordered input-sm join-item w-full text-xs"
                />
                <button type="submit" className="btn btn-primary btn-sm join-item font-semibold">
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#trending" className="hover:text-primary transition-colors">
                  Trending Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  DevOps & Cloud
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  My Learning
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SkillSphere Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}