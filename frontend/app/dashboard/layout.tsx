"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/upload", label: "Upload contract" },
  { href: "/dashboard/history", label: "Review history" },
  { href: "/dashboard/settings", label: "Settings" },
];

function pageTitle(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/upload")) return "Upload contract";
  if (pathname.startsWith("/dashboard/history")) return "Review history";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/")) return "Review";
  return "Dashboard";
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // TODO: Enforce Clerk auth here (auth.protect() / clerkMiddleware) once keys are configured.
    <div className="min-h-screen" style={{ backgroundColor: "#171412", color: "#EDEDED" }}>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#141210", borderRight: "1px solid #2a2722" }}
      >
        <Link href="/" className="px-5 pt-5 text-sm font-semibold" onClick={() => setMobileOpen(false)}>
          TrackSign
        </Link>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="mx-3 rounded-md px-5 py-2.5 text-sm"
                style={{
                  backgroundColor: active ? "#1e1c18" : "transparent",
                  color: active ? "#EDEDED" : "#999",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4" style={{ borderTop: "1px solid #2a2722" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              T
            </div>
            <div>
              <p className="text-sm">Account</p>
              <Link href="/dashboard/settings" className="text-xs" style={{ color: "#E8614D" }}>
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="ml-0 md:ml-60">
        <div
          className="flex h-14 items-center justify-between px-4 md:hidden"
          style={{ backgroundColor: "#171412", borderBottom: "1px solid #2a2722" }}
        >
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(true)}
          >
            <span className="block h-px w-5" style={{ backgroundColor: "#EDEDED" }} />
            <span className="block h-px w-5" style={{ backgroundColor: "#EDEDED" }} />
            <span className="block h-px w-5" style={{ backgroundColor: "#EDEDED" }} />
          </button>
          <Link href="/" className="text-sm font-semibold">
            TrackSign
          </Link>
          <span className="w-8" />
        </div>

        <header
          className="sticky top-0 z-40 flex h-14 items-center justify-between px-6 backdrop-blur-xl md:px-8"
          style={{
            backgroundColor: "rgba(23, 20, 18, 0.9)",
            borderBottom: "1px solid #2a2722",
          }}
        >
          <h1 className="text-sm font-medium">{pageTitle(pathname)}</h1>
          <Link
            href="/dashboard/upload"
            className="rounded-md px-4 py-2 text-sm text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            Upload contract
          </Link>
        </header>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
