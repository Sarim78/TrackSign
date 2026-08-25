/**
 * HistoryLayout — page title for the review history route.
 *
 * Route: /dashboard/history
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Review History - TrackSign",
};

interface HistoryLayoutProps {
  children: ReactNode;
}

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return children;
};

export default HistoryLayout;
