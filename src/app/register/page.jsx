"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/component/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, photoURL, password } = data;
    setLoading(true);

    try {
      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to register. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Registration successful. Please login to continue.");
      router.push("/login?registered=email");
    } catch (err) {
      console.error("Register error:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/api/auth/post-register-google",
        newUserCallbackURL: "/api/auth/post-register-google",
        additionalParams: {
          prompt: "select_account",
        },
      });
      if (res?.error) {
        console.error("Google sign up error:", res.error);
        toast.error(
          res.error.message ||
            "Failed to sign up with Google. Please try again."
        );
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google sign up error:", err);
      toast.error(
        err?.message ||
          "Failed to connect to Google. Please check your network."
      );
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content">Create Account</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Join SkillSphere and start learning today
          </p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="label text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="input input-bordered w-full mt-1"
              disabled={loading || googleLoading}
            />
            {errors.name && (
              <span className="text-error text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-sm font-medium">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
              className="input input-bordered w-full mt-1"
              disabled={loading || googleLoading}
            />
            {errors.email && (
              <span className="text-error text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="label text-sm font-medium">Photo URL (Avatar)</label>
            <input
              type="url"
              {...register("photoURL")}
              placeholder="https://example.com/avatar.jpg"
              className="input input-bordered w-full mt-1"
              disabled={loading || googleLoading}
            />
            {errors.photoURL && (
              <span className="text-error text-xs mt-1 block">
                {errors.photoURL.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10"
                disabled={loading || googleLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading || googleLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-error text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-primary w-full mt-2 font-semibold shadow-md"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <div className="divider text-xs text-base-content/50 my-6">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="btn btn-outline w-full flex items-center justify-center gap-3 border-base-300 hover:bg-base-200 hover:border-base-300 hover:text-base-content font-medium"
        >
          {googleLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          )}
          <span>Continue with Google</span>
        </button>

        <div className="text-center mt-6 pt-4 border-t border-base-200">
          <p className="text-sm text-base-content/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
