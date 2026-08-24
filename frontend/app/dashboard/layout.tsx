"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainNav = [{ href: "/dashboard", label: "Dashboard" }];
const contractNav = [
  { href: "/dashboard/upload", label: "Upload contract", accent: true },
  { href: "/dashboard/history", label: "Review history", badge: "0" },
];
const accountNav = [{ href: "/dashboard/settings", label: "Settings" }];

function pageTitle(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/upload")) return "Upload contract";
  if (pathname.startsWith("/dashboard/history")) return "Review history";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/review-demo")) return "Demo review";
  if (pathname.startsWith("/dashboard/")) return "Review";
  return "Dashboard";
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  pathname,
  accent,
  badge,
  onClick,
}: {
  href: string;
  label: string;
  pathname: string;
  accent?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="mx-3 flex items-center justify-between rounded-md px-5 py-2.5 text-sm"
      style={{
        backgroundColor: active ? "#1e1c18" : "transparent",
        color: active ? "#EDEDED" : "#999",
      }}
    >
      <span className="flex items-center gap-2">
        {accent ? (
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#E8614D" }} />
        ) : null}
        {label}
      </span>
      {badge !== undefined ? (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px]"
          style={{ backgroundColor: "#2a2722", color: "#666" }}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 mt-6 px-5 text-[10px] tracking-wider" style={{ color: "#555" }}>
      {children}
    </p>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  const current = pageTitle(pathname);

  return (
    // TODO: Enforce Clerk auth here (auth.protect() / clerkMiddleware) once keys are configured.
    <div className="min-h-screen" style={{ backgroundColor: "#171412", color: "#EDEDED" }}>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={close}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#141210", borderRight: "1px solid #2a2722" }}
      >
        <Link href="/dashboard" className="px-5 pt-5 text-sm font-semibold" onClick={close}>
          TrackSign
        </Link>
        <nav className="flex flex-1 flex-col">
          <SectionLabel>MAIN</SectionLabel>
          {mainNav.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onClick={close} />
          ))}
          <SectionLabel>CONTRACTS</SectionLabel>
          {contractNav.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onClick={close} />
          ))}
          <SectionLabel>ACCOUNT</SectionLabel>
          {accountNav.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onClick={close} />
          ))}
        </nav>
        <div className="px-5 py-4" style={{ borderTop: "1px solid #2a2722" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              TS
            </div>
            <div>
              <p className="text-sm">Account</p>
              <p className="text-[10px]" style={{ color: "#666" }}>
                Free plan
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="mt-2 inline-block rounded-md px-2 py-1 text-[10px]"
            style={{ border: "1px solid #E8614D", color: "#E8614D" }}
          >
            Upgrade to Pro
          </Link>
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
          <Link href="/dashboard" className="text-sm font-semibold">
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
          <p className="text-sm">
            {pathname === "/dashboard" ? (
              <span style={{ color: "#EDEDED" }}>Dashboard</span>
            ) : (
              <>
                <Link href="/dashboard" style={{ color: "#666" }}>
                  Dashboard
                </Link>
                <span style={{ color: "#666" }}> / </span>
                <span style={{ color: "#EDEDED" }}>{current}</span>
              </>
            )}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ border: "1px solid #2a2722" }}
            >
              <span
                className="block h-3 w-2.5 rounded-t-full rounded-b-[2px]"
                style={{ border: "1.5px solid #999" }}
              />
            </button>
            <Link
              href="/dashboard/upload"
              className="rounded-md px-4 py-2 text-sm text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              Upload contract
            </Link>
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              TS
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
