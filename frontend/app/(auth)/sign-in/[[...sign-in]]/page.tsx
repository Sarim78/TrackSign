"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    login("User", email.trim());
    router.push("/dashboard");
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-48px)] items-center justify-center px-4 pt-12">
        <form
          onSubmit={submit}
          className="w-full max-w-sm rounded-xl p-8"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="mb-1 text-lg font-semibold">TrackSign</p>
          <p className="mb-8 text-sm" style={{ color: "#999" }}>
            Sign in to your account
          </p>
          <label htmlFor="email" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
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
          {errors.email ? <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.email}</p> : null}
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
          {errors.password ? <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.password}</p> : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-md py-2.5 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: "#E8614D" }}
          >
            Sign in
          </button>
          <p className="mt-6 text-center text-sm" style={{ color: "#666" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={{ color: "#E8614D" }}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
