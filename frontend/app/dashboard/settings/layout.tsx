/**
 * SettingsLayout — page title for the settings route.
 *
 * Route: /dashboard/settings
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Settings - TrackSign",
};

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return children;
};

export default SettingsLayout;
