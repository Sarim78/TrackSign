import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* TODO: Clerk SignIn requires ClerkProvider + NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local. */}
      <SignIn />
    </main>
  );
}
