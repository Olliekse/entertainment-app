"use client";

import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="flex flex-col pt-[48px] pb-[112px] justify-center items-center bg-[#10141e] px-6">
      <Link href="/">
        <img className="mb-[56px]" src="../images/logo.svg" alt="site icon" />
      </Link>
      <div className="flex flex-col items-center bg-[#161d2f] px-6 py-[29px] md:px-[32px] rounded-[10px]  w-[327px] md:w-[400px]">
        <h1 className="self-start font-light text-[32px] text-white pb-10">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#161d2f] text-white flex flex-col font-light text-[15px] gap-6 w-full"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-b border-b-[#5a698f] placeholder-white/50 pb-4 pl-4"
            placeholder="Email address"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-b border-b-[#5a698f] placeholder-white/50 pb-4 pl-4"
            placeholder="Password"
          />

          <input
            className="border-b border-b-[#5a698f] placeholder-white/50 pb-4 pl-4"
            placeholder="Repeat Password"
          />
          <div className="flex flex-col gap-6 w-full items-center">
            <button className="cursor-pointer h-12 bg-[#fc4747] rounded-md text-white w-full mt-4">
              Create an account
            </button>
            <p className="font-light text-[15px] text-white">
              Already have an account?{" "}
              <span className="text-[#fc4747] pl-2">Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
