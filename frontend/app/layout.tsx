import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackSign",
  description: "AI-powered contract review for freelancers and small agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const html = (
    <html lang="en" className="scroll-smooth bg-[#0C0C0C]">
      <body
        className="bg-[#0C0C0C] text-[#EDEDED] antialiased [font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );

  // TODO: Always wrap the tree in ClerkProvider once NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in .env.local.
  if (!publishableKey) {
    return html;
  }

  return <ClerkProvider publishableKey={publishableKey}>{html}</ClerkProvider>;
}
