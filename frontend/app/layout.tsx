/**
 * RootLayout — wraps every page with global styles, metadata, and auth.
 *
 * Route: all routes
 * Dependencies: Providers (AuthProvider)
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackSign",
  description:
    "Upload a contract and get a plain-English report flagging risky, unfair, or unusual terms. Severity ratings, explanations, and fairer alternatives.",
  openGraph: {
    title: "TrackSign - AI Contract Review",
    description:
      "Upload a contract and get a plain-English report flagging risky, unfair, or unusual terms. Severity ratings, explanations, and fairer alternatives.",
    type: "website",
    url: "https://tracksign.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrackSign - AI Contract Review",
    description:
      "Upload a contract and get a plain-English report flagging risky, unfair, or unusual terms. Severity ratings, explanations, and fairer alternatives.",
  },
  referrer: "strict-origin-when-cross-origin",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased"
        suppressHydrationWarning
        style={{ backgroundColor: "#171412", color: "#EDEDED" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
