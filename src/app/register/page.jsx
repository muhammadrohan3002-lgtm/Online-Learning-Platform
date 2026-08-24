"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image.trim() ? formData.image.trim() : undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Account created successfully!");
        router.push("/courses");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/courses",
      });
    } catch (err) {
      toast.error("Google sign-in failed. Please ensure Google OAuth is configured.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Create an Account</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Join thousands of students on SkillSphere
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-semibold">Full Name</label>
              <input
                type="text"
                required
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full text-sm"
              />
            </div>

            <div className="form-control">
              <label className="label text-xs font-semibold">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full text-sm"
              />
            </div>

            <div className="form-control">
              <label className="label text-xs font-semibold">
                Avatar Image URL <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="input input-bordered w-full text-sm"
              />
            </div>

            <div className="form-control">
              <label className="label text-xs font-semibold">
                Password <span className="text-gray-400 font-normal">(min 8 characters)</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn btn-primary w-full mt-2 font-bold shadow-sm"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Account"}
            </button>
          </form>

          <div className="divider text-xs text-gray-400 my-4">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="btn btn-outline w-full text-sm gap-2 font-medium"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign up with Google
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
