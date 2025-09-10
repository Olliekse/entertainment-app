/**
 * Login Page Component
 *
 * This component provides the user authentication interface for logging into the app.
 * It includes form validation, error handling, and integration with NextAuth.
 *
 * Key features:
 * - Email and password input fields with validation
 * - Real-time error clearing on input change
 * - Form validation with custom error messages
 * - Loading states during authentication
 * - Integration with NextAuth credentials provider
 * - Responsive design with mobile-first approach
 * - Link to signup page for new users
 */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

/**
 * Login page component for user authentication
 * @returns JSX.Element - Login form with validation and error handling
 */
export default function Login() {
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  /**
   * Validates the login form and sets error messages
   * @returns boolean - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Can&apos;t be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Can&apos;t be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission and authentication
   * @param e - Form submission event
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Attempt to sign in using NextAuth
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Handle redirect manually
    });

    setLoading(false);

    // Handle authentication errors
    if (res?.error) {
      setErrors({ password: "Invalid credentials" });
      return;
    }

    // Redirect to home page on successful login
    window.location.href = "/";
  }

  return (
    <div className="flex flex-col pt-[46px] md:pt-[79px] pb-[172px] justify-center items-center bg-[#10141e] px-6">
      {/* Site logo linking to home */}
      <Link href="/">
        <Image
          className="mb-[56px] md:mb-[80px]"
          src="/images/logo.svg"
          alt="site icon"
          width={32}
          height={25}
        />
      </Link>

      {/* Login form container */}
      <div className="flex flex-col items-center bg-[#161d2f] px-6 py-[25px] md:py-[27px] md:px-[32px] rounded-[10px]  w-[327px] md:w-[400px] text-white">
        <h1 className="self-start font-light text-[32px] text-white pb-[35px] md:pb-9">
          Login
        </h1>

        {/* Login form */}
        <form
          className="flex flex-col font-light text-[15px] gap-[21px] w-full"
          onSubmit={handleSubmit}
        >
          {/* Email input field with validation */}
          <div className="relative">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear email error when user starts typing
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              type="email"
              value={email}
              className={`border-b pb-[14px] md:pb-[12px] pl-4 w-full bg-transparent outline-none ${
                errors.email
                  ? "border-b-[#fc4747] placeholder-white/50"
                  : "border-b-[#5a698f] placeholder-white/50"
              }`}
              placeholder="Email address"
            />
            {/* Email error message */}
            {errors.email && (
              <span className="absolute right-0 top-0 text-[#fc4747] text-[13px]">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password input field with validation */}
          <div className="relative">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear password error when user starts typing
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              type="password"
              value={password}
              className={`border-b pb-[16px] pl-4 w-full bg-transparent outline-none ${
                errors.password
                  ? "border-b-[#fc4747] placeholder-white/50"
                  : "border-b-[#5a698f] placeholder-white/50"
              }`}
              placeholder="Password"
            />
            {/* Password error message */}
            {errors.password && (
              <span className="absolute right-0 top-0 text-[#fc4747] text-[13px]">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit button and signup link */}
          <div className="flex flex-col gap-[21px] w-full items-center">
            <button
              type="submit"
              disabled={loading}
              className="h-12 bg-[#fc4747] rounded-md text-white w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Logging in..." : "Login to your account"}
            </button>
            <p className="font-light text-[15px] text-white">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-[#fc4747] pl-2 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
