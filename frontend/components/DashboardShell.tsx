/**
 * DashboardShell — authenticated chrome with sidebar, top bar, and route guard.
 *
 * Route: /dashboard/*
 * Dependencies: useAuth, review store
 * TODO [BACKEND]: Replace fake auth with Clerk useUser()
 */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { initials, useAuth } from "@/lib/auth";
import { getReviews } from "@/lib/reviews";

interface NavItem {
  href: string;
  label: string;
}

interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  badge?: string;
  showNew?: boolean;
  onClick: () => void;
}

interface SectionLabelProps {
  children: string;
}

interface DashboardShellProps {
  children: ReactNode;
}

const mainNav: NavItem[] = [{ href: "/dashboard", label: "Dashboard" }];
const accountNav: NavItem[] = [{ href: "/dashboard/settings", label: "Settings" }];

const pageTitle = (pathname: string): string => {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/upload")) return "Upload contract";
  if (pathname.startsWith("/dashboard/history")) return "Review history";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/review-demo")) return "Demo review";
  if (pathname.startsWith("/dashboard/")) return "Review";
  return "Dashboard";
};

const isActive = (pathname: string, href: string): boolean => {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
};

const NavLink = ({ href, label, pathname, badge, showNew, onClick }: NavLinkProps) => {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="mx-3 flex items-center justify-between rounded-r-md px-5 py-2.5 text-sm"
      style={{
        backgroundColor: active ? "#1e1c18" : "transparent",
        color: active ? "#EDEDED" : "#999",
        borderLeft: active ? "2px solid #E8614D" : "2px solid transparent",
      }}
    >
      <span className="flex items-center">
        {label}
        {showNew ? (
          <span
            className="ml-2 rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            NEW
          </span>
        ) : null}
      </span>
      {badge !== undefined ? (
        <span className="rounded-full px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: "#2a2722", color: "#666" }}>
          {badge}
        </span>
      ) : null}
    </Link>
  );
};

const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <p className="mb-2 mt-6 px-5 text-[10px] tracking-wider" style={{ color: "#555" }}>
      {children}
    </p>
  );
};

const DashboardShell = ({ children }: DashboardShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, isLoggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [reviewTotal, setReviewTotal] = useState<number>(0);
  const handleClose = () => setMobileOpen(false);
  const current = pageTitle(pathname);

  // Sends unauthenticated visitors to sign-in after localStorage hydrates.
  useEffect(() => {
    if (!ready) return;
    if (!isLoggedIn) router.replace("/sign-in");
  }, [ready, isLoggedIn, router]);

  useEffect(() => {
    // TODO [BACKEND]: Replace getReviews() with fetchReviews() from @/lib/api
    setReviewTotal(getReviews().length);
  }, [pathname]);

  if (!ready || !isLoggedIn || !user) return null;

  const userInitials = initials(user.name);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#171412", color: "#EDEDED" }}>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col overflow-hidden transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#141210", borderRight: "1px solid #2a2722" }}
      >
        <div
          className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,97,77,0.06) 0%, transparent 70%)" }}
        />
        <Link href="/dashboard" className="relative px-5 pt-5 text-sm font-semibold" onClick={handleClose}>
          TrackSign
        </Link>
        <nav className="relative flex flex-1 flex-col">
          <SectionLabel>MAIN</SectionLabel>
          {mainNav.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onClick={handleClose} />
          ))}
          <SectionLabel>CONTRACTS</SectionLabel>
          <NavLink href="/dashboard/upload" label="Upload contract" pathname={pathname} showNew onClick={handleClose} />
          <NavLink
            href="/dashboard/history"
            label="Review history"
            pathname={pathname}
            badge={String(reviewTotal)}
            onClick={handleClose}
          />
          <SectionLabel>ACCOUNT</SectionLabel>
          {accountNav.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onClick={handleClose} />
          ))}
        </nav>
        <div className="relative px-5 py-4" style={{ borderTop: "1px solid #2a2722" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm">{user.name}</p>
              <p className="truncate text-[10px]" style={{ color: "#666" }}>
                {user.email}
              </p>
              <p className="text-[10px]" style={{ color: "#666" }}>
                {user.plan === "pro" ? "Pro plan" : "Free plan"}
              </p>
            </div>
          </div>
          {user.plan === "free" ? (
            <Link
              href="/dashboard/settings"
              className="mt-2 inline-block rounded-md px-2 py-1 text-[10px]"
              style={{ border: "1px solid #E8614D", color: "#E8614D" }}
            >
              Upgrade to Pro
            </Link>
          ) : null}
          <button
            type="button"
            onClick={logout}
            className="mt-3 block cursor-pointer text-xs"
            style={{ color: "#666" }}
          >
            Sign out
          </button>
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
            aria-expanded={mobileOpen}
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
          className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 px-6 backdrop-blur-xl md:px-8"
          style={{
            backgroundColor: "rgba(23, 20, 18, 0.9)",
            borderBottom: "1px solid #2a2722",
          }}
        >
          <p className="shrink-0 text-sm">
            {pathname === "/dashboard" ? (
              <span>Dashboard</span>
            ) : (
              <>
                <Link href="/dashboard" style={{ color: "#666" }}>
                  Dashboard
                </Link>
                <span style={{ color: "#666" }}> / </span>
                <span>{current}</span>
              </>
            )}
          </p>
          <div
            className="hidden w-64 rounded-md px-3 py-1.5 text-xs lg:block"
            style={{ color: "#555", backgroundColor: "#141210", border: "1px solid #2a2722" }}
          >
            Search contracts...
          </div>
          {/* TODO [BACKEND]: Wire up contract search */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/upload"
              className="rounded-md px-4 py-2 text-sm text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              Upload contract
            </Link>
            <Link
              href="/dashboard/settings"
              aria-label="Account settings"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium text-white"
              style={{ backgroundColor: "#E8614D" }}
            >
              {userInitials}
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardShell;
