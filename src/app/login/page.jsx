"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { authClient } from "@/component/lib/auth-client";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="container mx-auto mt-10 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input"
        />
         {errors.email && (
          <span className="text-error text-sm">This field is required</span>
        )}

        <label className="label">Password</label>

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="input"
        />
        {errors.password && (
          <span className="text-error text-sm">This field is required</span>
        )}
        <p>
          If you don't have an account{" "}
          <Link
            href="/register"
            className="text-primary underline bg-slate-600 p-1 rounded text-white"
          >
            Register
          </Link>
        </p>

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </form>
  );
}