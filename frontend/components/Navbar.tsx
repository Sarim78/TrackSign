/**
 * Navbar — marketing site header with auth-aware CTAs and a mobile menu.
 *
 * Dependencies: useAuth
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { initials, useAuth } from "@/lib/auth";

interface NavItem {
  href: string;
  label: string;
  match: string | null;
}

const centerLinks: NavItem[] = [
  { href: "/#features", label: "Features", match: null },
  { href: "/#faq", label: "FAQ", match: null },
  { href: "/blog", label: "Blog", match: "/blog" },
  { href: "/docs", label: "Docs", match: "/docs" },
];

// Marks a marketing link as current when the path matches its route.
const isActive = (pathname: string, match: string | null): boolean => {
  if (!match) return false;
  return pathname === match || pathname.startsWith(`${match}/`);
};

const Navbar = () => {
  const pathname = usePathname();
  const { ready, isLoggedIn, user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const loggedIn = ready && isLoggedIn && user;

  return (
    <nav
      className="fixed top-0 z-50 w-full backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(23, 20, 18, 0.85)",
        borderBottom: "1px solid #2a2722",
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 xl:px-6">
        <Link href="/" className="whitespace-nowrap text-[15px] font-semibold tracking-tight" style={{ color: "#EDEDED" }}>
          TrackSign
        </Link>

        <div className="hidden items-center gap-4 md:flex xl:gap-8">
          {centerLinks.map((link) => {
            const active = isActive(pathname, link.match);
            const isHovered = hovered === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] transition-colors duration-150"
                style={{
                  color: active || isHovered ? "#EDEDED" : "#999",
                  backgroundColor: active || isHovered ? "rgba(255,255,255,0.05)" : "transparent",
                }}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link href="/dashboard" className="hidden whitespace-nowrap text-[13px] md:inline" style={{ color: "#999" }}>
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                aria-label="Account settings"
                className="hidden h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium text-white md:flex"
                style={{ backgroundColor: "#E8614D" }}
              >
                {initials(user.name)}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden whitespace-nowrap text-[13px] transition-colors duration-150 md:inline"
                style={{ color: "#999" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#EDEDED";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "#999";
                }}
              >
                Sign in
              </Link>
              <span className="hidden h-4 w-px md:block" style={{ backgroundColor: "#2a2722" }} />
              <Link
                href="/sign-up"
                className="hidden whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium text-white transition-all duration-150 hover:opacity-90 md:inline-block xl:px-4"
                style={{ backgroundColor: "#E8614D" }}
              >
                Get started
              </Link>
            </>
          )}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex flex-col gap-[4px] md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="block h-[1.5px] w-4" style={{ backgroundColor: "#EDEDED" }} />
            <span className="block h-[1.5px] w-4" style={{ backgroundColor: "#EDEDED" }} />
            <span className="block h-[1.5px] w-4" style={{ backgroundColor: "#EDEDED" }} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="px-6 py-4 md:hidden" style={{ backgroundColor: "#1e1c18", borderBottom: "1px solid #2a2722" }}>
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className="block py-2.5 text-sm transition-colors duration-150"
              style={{ color: "#999", borderBottom: "1px solid #2a2722" }}
            >
              {link.label}
            </Link>
          ))}
          {loggedIn ? (
            <>
              <Link href="/dashboard" onClick={handleClose} className="mt-3 block py-2.5 text-sm" style={{ color: "#999" }}>
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={handleClose}
                className="mt-2 block rounded-md px-4 py-2 text-center text-[13px] font-medium text-white"
                style={{ backgroundColor: "#E8614D" }}
              >
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={handleClose} className="mt-3 block py-2.5 text-sm" style={{ color: "#999" }}>
                Sign in
              </Link>
              <Link
                href="/sign-up"
                onClick={handleClose}
                className="mt-2 block rounded-md px-4 py-2 text-center text-[13px] font-medium text-white transition-all duration-150 hover:opacity-90"
                style={{ backgroundColor: "#E8614D" }}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
