import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackSign",
  description: "AI contract review for freelancers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased"
        suppressHydrationWarning
        style={{ backgroundColor: "#171412", color: "#EDEDED" }}
      >
        {children}
      </body>
    </html>
  );
}
