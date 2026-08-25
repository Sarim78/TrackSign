"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  name: string;
  email: string;
  plan: "free" | "pro";
  reviewCount: number;
};

type AuthContextValue = {
  ready: boolean;
  isLoggedIn: boolean;
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  incrementReviewCount: () => void;
  setPlan: (plan: "free" | "pro") => void;
};

const USER_KEY = "tracksign_user";

const AuthContext = createContext<AuthContextValue | null>(null);

function persist(user: User | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(USER_KEY);
    return;
  }
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      window.localStorage.removeItem(USER_KEY);
    }
    setReady(true);
  }, []);

  const login = useCallback((name: string, email: string) => {
    const next: User = { name, email, plan: "free", reviewCount: 0 };
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as User;
        if (saved.email === email) {
          next.plan = saved.plan;
          next.reviewCount = saved.reviewCount;
          next.name = name || saved.name;
        }
      }
    } catch {
      /* ignore */
    }
    setUser(next);
    persist(next);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persist(null);
    router.push("/");
  }, [router]);

  const incrementReviewCount = useCallback(() => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, reviewCount: current.reviewCount + 1 };
      persist(next);
      return next;
    });
  }, []);

  const setPlan = useCallback((plan: "free" | "pro") => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, plan };
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      ready,
      isLoggedIn: Boolean(user),
      user,
      login,
      logout,
      incrementReviewCount,
      setPlan,
    }),
    [ready, user, login, logout, incrementReviewCount, setPlan],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
