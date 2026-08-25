/**
 * Auth — fake session stored in localStorage for the frontend prototype.
 *
 * Route: used app-wide via Providers
 * Dependencies: Next.js router
 * TODO [BACKEND]: Replace fake auth with Clerk useUser()
 */

"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { stripHtml } from "@/lib/sanitize";

export interface User {
  name: string;
  email: string;
  plan: "free" | "pro";
  reviewCount: number;
}

export interface AuthContextType {
  ready: boolean;
  isLoggedIn: boolean;
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  upgradePlan: () => void;
  incrementReviewCount: () => void;
}

const USER_KEY = "tracksign_user";

const AuthContext = createContext<AuthContextType | null>(null);

// Confirms a parsed localStorage value matches the User shape.
const isUser = (value: unknown): value is User => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    (record.plan === "free" || record.plan === "pro") &&
    typeof record.reviewCount === "number"
  );
};

// Writes the current user to localStorage, or clears it on logout.
const persist = (user: User | null): void => {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(USER_KEY);
    return;
  }
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [ready, setReady] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isUser(parsed)) setUser(parsed);
      }
    } catch {
      window.localStorage.removeItem(USER_KEY);
    }
    setReady(true);
  }, []);

  // Creates or restores a local session for the given name and email.
  const login = useCallback((name: string, email: string) => {
    const safeName = stripHtml(name);
    const safeEmail = stripHtml(email);
    const next: User = { name: safeName, email: safeEmail, plan: "free", reviewCount: 0 };
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (isUser(saved) && saved.email === safeEmail) {
          next.plan = saved.plan;
          next.reviewCount = saved.reviewCount;
          next.name = safeName || saved.name;
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setUser(next);
    persist(next);
  }, []);

  // Clears the session and returns to the landing page.
  const logout = useCallback(() => {
    setUser(null);
    persist(null);
    router.push("/");
  }, [router]);

  // Increments the local review count after a successful prototype scan.
  const incrementReviewCount = useCallback(() => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, reviewCount: current.reviewCount + 1 };
      persist(next);
      return next;
    });
  }, []);

  // TODO [BACKEND]: Replace simulated upgrade with Stripe checkout
  const upgradePlan = useCallback(() => {
    setUser((current) => {
      if (!current) return current;
      const next: User = { ...current, plan: "pro" };
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      ready,
      isLoggedIn: Boolean(user),
      user,
      login,
      logout,
      upgradePlan,
      incrementReviewCount,
    }),
    [ready, user, login, logout, upgradePlan, incrementReviewCount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Builds two-letter initials for avatar labels.
export const initials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};
