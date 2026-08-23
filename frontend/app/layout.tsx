import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className="scroll-smooth bg-[#FAF9F6]">
      <body
        className={`${inter.className} bg-[#FAF9F6] text-stone-900 antialiased`}
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
