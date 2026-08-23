import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* TODO: Clerk SignUp requires ClerkProvider + NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local. */}
      <SignUp />
    </main>
  );
}
