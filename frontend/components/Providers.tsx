/**
 * Providers — client wrapper for app-wide React context.
 *
 * Dependencies: AuthProvider
 */

"use client";

import { AuthProvider } from "@/lib/auth";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
