// TODO: Replace with Clerk SignIn component
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-48px)] items-center justify-center px-4 pt-12">
        <div
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
            placeholder="you@example.com"
            className="mb-4 w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          <label htmlFor="password" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          <button
            type="button"
            className="mt-6 w-full rounded-md py-2.5 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: "#E8614D" }}
          >
            Sign in
          </button>
          <p className="mt-6 text-center text-sm" style={{ color: "#666" }}>
            Don&apos;t have an account?{" "}
            <a href="/sign-up" style={{ color: "#E8614D" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
