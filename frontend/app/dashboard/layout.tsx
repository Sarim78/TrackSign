/**
 * DashboardLayout — metadata plus authenticated dashboard chrome.
 *
 * Route: /dashboard/*
 * Dependencies: DashboardShell
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardShell from "@/components/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard - TrackSign",
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
