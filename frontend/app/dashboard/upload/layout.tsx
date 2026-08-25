/**
 * UploadLayout — page title for the upload route.
 *
 * Route: /dashboard/upload
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Upload Contract - TrackSign",
};

interface UploadLayoutProps {
  children: ReactNode;
}

const UploadLayout = ({ children }: UploadLayoutProps) => {
  return children;
};

export default UploadLayout;
