// TODO: Replace with Clerk SignUp component
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
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
            Create your account
          </p>
          <label htmlFor="full-name" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Full name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Your name"
            className="mb-4 w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
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
            Create account
          </button>
          <p className="mt-6 text-center text-sm" style={{ color: "#666" }}>
            Already have an account?{" "}
            <a href="/sign-in" style={{ color: "#E8614D" }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
