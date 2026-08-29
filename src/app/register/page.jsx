"use client";

import { useForm } from "react-hook-form";
import { authClient } from "@/component/lib/auth-client";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const {name,email,photoURL,password}=data
    console.log(name,email,photoURL,password);

    const { data:res, error } = await authClient.signUp.email({
    name:name,
    email:email,
    password:password,
    image:photoURL,
    callbackURL:"/",
});
    console.log(res, error);
    if (error) {
      alert(error.message);
    }
    if (res) {
      alert("Signup successful");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="container mx-auto mt-10 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        {/* Name */}
        <label className="label">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Your Name"
          className="input"
        />
        {errors.name && (
          <p className="text-error text-sm">Name is required</p>
        )}

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input"
        />
        {errors.email && (
          <p className="text-error text-sm">Email is required</p>
        )}

        {/* Photo URL */}
        <label className="label">Photo URL</label>
        <input
          type="url"
          {...register("photoURL", { required: true })}
          placeholder="https://example.com/photo.jpg"
          className="input"
        />
        {errors.photoURL && (
          <p className="text-error text-sm">Photo URL is required</p>
        )}

        {/* Password */}
        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
          className="input"
        />
        {errors.password && (
          <p className="text-error text-sm">
            {errors.password.message || "Password is required"}
          </p>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Register
        </button>
      </fieldset>
    </form>
  );
}

