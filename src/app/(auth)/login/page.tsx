"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="flex flex-col pt-[48px] pb-[172px] justify-center items-center bg-[#10141e] px-6">
      <Link href="/">
        <img
          className="mb-[56px] md:mb-[80px]"
          src="../images/logo.svg"
          alt="site icon"
        />
      </Link>
      <div className="flex flex-col items-center bg-[#161d2f] px-6 py-[29px] md:px-[32px] rounded-[10px]  w-[327px] md:w-[400px] text-white">
        <h1 className="self-start font-light text-[32px] text-white pb-10">
          Login
        </h1>
        <form className="flex flex-col font-light text-[15px] gap-6 w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            value={email}
            className="border-b border-b-[#5a698f] placeholder-white/50 pb-4 pl-4"
            placeholder="Email address"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            value={password}
            className="border-b border-b-[#5a698f] placeholder-white/50 pb-4 pl-4"
            placeholder="Password"
          />

          <div className="flex flex-col gap-6 w-full items-center">
            <button className="h-12 bg-[#fc4747] rounded-md text-white w-full mt-4">
              Login to your account
            </button>
            <p className="font-light text-[15px] text-white">
              Don't have an account?
              <span className="text-[#fc4747] pl-2">Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
