"use client";

import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginForm1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, googleLogin } = useAuth();

  const searchParams = useSearchParams();
  const from = searchParams.get("redirectUrl");
  const { replace } = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading("Logging in...");
    try {
      const { user } = await signIn(email, password);
      await createJWT({
        email,
      });
      toast.dismiss(toastId);
      toast.success(
        user?.displayName ? `Welcome back ${user.displayName}` : "Welcome back"
      );
      replace(from || "/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Logging in...");
    try {
      const { user } = await googleLogin();
      await createJWT({
        email: user?.email,
      });
      toast.dismiss(toastId);
      toast.success(
        user?.displayName ? `Welcome back ${user.displayName}` : "Welcome back"
      );
      replace(from || "/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label htmlFor="email" className="label label-text">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          className="input input-bordered"
          // autoComplete="email"
          {...register("email", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
        />
        {errors.email && (
          <span className="text-xs text-red-500">
            Please enter a valid email address
          </span>
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
        {errors.password && (
          <span className="text-xs text-red-500">
            Please enter a valid password
          </span>
        )}
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
      <div className="">
        <p className="mt-3">
          Don&apos;t have an account?
          <Link className="text-blue-500 underline ml-1" href="/signup">
            Signup
          </Link>
        </p>
      </div>
      <div className="divider mt-5">OR</div>
      {/* <GoogleLogin from={from} /> */}

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

export default LoginForm1;
