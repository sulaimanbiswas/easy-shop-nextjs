"use client";

import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const { createUser, profileUpdate, googleLogin } = useAuth();

  const searchParams = useSearchParams();
  const from = searchParams.get("redirectUrl");
  const { replace } = useRouter();

  const uploadImage = async (e) => {
    const formData = new FormData();

    if (!e.target.files[0]) return;

    formData.append("image", e.target.files[0]);

    const toastId = toast.loading("Uploading image...");

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imageBBKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        toast.dismiss(toastId);
        toast.error("Failed to upload image");
        throw new Error("Failed to upload image");
      }
      toast.dismiss(toastId);
      toast.success("Image uploaded successfully");
      const data = await res.json();
      setValue("photo", data.data.url);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Failed to upload image");
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const toastId = toast.loading("Signing up...");

    try {
      const { user } = await createUser(email, password);
      await createJWT({
        email,
      });
      await profileUpdate({
        displayName: name,
        photoURL: photo,
      });
      toast.dismiss(toastId);
      toast.success(
        user?.displayName ? `Welcome ${user?.displayName}` : "Welcome"
      );
      replace(from);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Failed to signup");
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Signing up...");

    try {
      const { user } = await googleLogin();
      await createJWT({
        email: user?.email,
      });
      toast.dismiss(toastId);
      toast.success(
        user?.displayName ? `Welcome ${user?.displayName}` : "Welcome"
      );
      replace(from);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Failed to signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label label-text">
          Name
        </label>
        <input
          type="text"
          placeholder="name"
          id="name"
          name="name"
          className="input input-bordered"
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
        {errors.name?.type === "required" && (
          <span className="text-xs text-red-500">Name is required</span>
        )}
        {errors.name?.type === "minLength" && (
          <span className="text-xs text-red-500">
            Name must be at least 3 characters
          </span>
        )}
        {errors.name?.type === "maxLength" && (
          <span className="text-xs text-red-500">
            Name must be at most 20 characters
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label label-text">
          email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="input input-bordered"
          {...register("email", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
        />
        {errors.email?.type === "required" && (
          <span className="text-xs text-red-500">Email is required</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="text-xs text-red-500">Email is invalid</span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label label-text">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="input input-bordered"
          autoComplete="new-password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors.password?.type === "required" && (
          <span className="text-xs text-red-500">Password is required</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-xs text-red-500">
            Password must be at least 8 characters
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label label-text">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          className="input input-bordered"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
        {errors.confirmPassword?.type === "validate" && (
          <span className="text-xs text-red-500">Passwords must match</span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="photo" className="label label-text">
          Photo
        </label>
        <input
          type="file"
          id="photo"
          accept=".jpg,.jpeg,.png"
          onChange={uploadImage}
          className="file-input file-input-bordered file-input-primary w-full"
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </div>
      <p className="mt-3">
        Already have an account?{" "}
        <Link className="text-blue-500 underline ml-1" href="/login">
          Login
        </Link>
      </p>
      <div className="divider mt-5">OR</div>
      <button
        className="btn btn-primary mt-5 mx-auto w-full"
        type="button"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-3xl mr-3" /> Login with Google
      </button>
    </form>
  );
};

export default SignupForm;
