/**
 * SignUpPage — fake registration that stores a local session.
 *
 * Route: /sign-up
 * Dependencies: Navbar, useAuth
 * TODO [BACKEND]: Replace fake auth with Clerk useUser()
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import { isValidEmail, stripHtml } from "@/lib/sanitize";

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<SignUpErrors>({});

  // Validates and sanitizes inputs, then creates a prototype session.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: SignUpErrors = {};
    const trimmedName = stripHtml(name);
    const trimmedEmail = stripHtml(email);
    if (!trimmedName) next.name = "Name is required.";
    if (!trimmedEmail) next.email = "Email is required.";
    else if (!isValidEmail(trimmedEmail)) next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    login(trimmedName, trimmedEmail);
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-48px)] items-center justify-center px-4 pt-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-xl p-8"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="mb-1 text-lg font-semibold">TrackSign</p>
          <p className="mb-8 text-sm" style={{ color: "#999" }}>
            Create your account
          </p>
          <label htmlFor="full-name" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Full name
          </label>
          <input
            id="full-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          {errors.name ? (
            <p className="mt-1 text-xs" role="alert" style={{ color: "#EF4444" }}>
              {errors.name}
            </p>
          ) : null}
          <label htmlFor="email" className="mb-1.5 mt-4 block text-xs" style={{ color: "#999" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          {errors.email ? (
            <p className="mt-1 text-xs" role="alert" style={{ color: "#EF4444" }}>
              {errors.email}
            </p>
          ) : null}
          <label htmlFor="password" className="mb-1.5 mt-4 block text-xs" style={{ color: "#999" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          {errors.password ? (
            <p className="mt-1 text-xs" role="alert" style={{ color: "#EF4444" }}>
              {errors.password}
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-md py-2.5 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: "#E8614D" }}
          >
            Create account
          </button>
          <p className="mt-6 text-center text-sm" style={{ color: "#666" }}>
            Already have an account?{" "}
            <Link href="/sign-in" style={{ color: "#E8614D" }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
