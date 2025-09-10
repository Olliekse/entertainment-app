"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    repeatPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      repeatPassword?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = "Can't be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Can't be empty";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = "Can't be empty";
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    console.log(email, password);
    // Add your signup logic here
    setLoading(false);
  }

  return (
    <div className="flex flex-col pt-[48px] md:pt-[80px] pb-[112px] justify-center items-center bg-[#10141e] px-6">
      <Link href="/">
        <Image
          className="mb-[56px] md:mb-[76px]"
          src="/images/logo.svg"
          alt="site icon"
          width={32}
          height={25}
        />
      </Link>
      <div className="flex flex-col items-center bg-[#161d2f] px-6 py-[26px] md:py-[30px] md:px-[32px] rounded-[10px]  w-[327px] md:w-[400px]">
        <h1 className="self-start font-light text-[32px] text-white pb-8 md:pb-9">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#161d2f] text-white flex flex-col font-light text-[15px] gap-6 md:gap-[22px] w-full"
        >
          <div className="relative">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              type="email"
              value={email}
              className={`border-b pb-[14px] md:pb-[13px] pl-4 w-full bg-transparent outline-none ${
                errors.email
                  ? "border-b-[#fc4747] placeholder-white/50"
                  : "border-b-[#5a698f] placeholder-white/50"
              }`}
              placeholder="Email address"
            />
            {errors.email && (
              <span className="absolute right-0 top-0 text-[#fc4747] text-[13px]">
                {errors.email}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
                // Clear repeat password error if passwords now match
                if (
                  errors.repeatPassword &&
                  e.target.value === repeatPassword
                ) {
                  setErrors((prev) => ({ ...prev, repeatPassword: undefined }));
                }
              }}
              type="password"
              value={password}
              className={`border-b pb-[13px] pl-4 w-full bg-transparent outline-none ${
                errors.password
                  ? "border-b-[#fc4747] placeholder-white/50"
                  : "border-b-[#5a698f] placeholder-white/50"
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <span className="absolute right-0 top-0 text-[#fc4747] text-[13px]">
                {errors.password}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                if (errors.repeatPassword) {
                  setErrors((prev) => ({ ...prev, repeatPassword: undefined }));
                }
              }}
              type="password"
              value={repeatPassword}
              className={`border-b pb-[13px] pl-4 w-full bg-transparent outline-none ${
                errors.repeatPassword
                  ? "border-b-[#fc4747] placeholder-white/50"
                  : "border-b-[#5a698f] placeholder-white/50"
              }`}
              placeholder="Repeat Password"
            />
            {errors.repeatPassword && (
              <span className="absolute right-0 top-0 text-[#fc4747] text-[13px]">
                {errors.repeatPassword}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6 w-full items-center">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer h-12 bg-[#fc4747] rounded-md text-white w-full mt-4 md:mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create an account"}
            </button>
            <p className="font-light text-[15px] text-white tracking-tight">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#fc4747] pl-2 cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
