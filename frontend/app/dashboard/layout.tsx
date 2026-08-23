function AuthProtection({ children }: { children: React.ReactNode }) {
  // TODO: Enforce Clerk auth here (auth.protect() and/or clerkMiddleware for /dashboard) once keys are configured.
  return children;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProtection>
      <div className="flex min-h-screen">
        <aside className="w-56 border-r p-4">
          {/* TODO: Dashboard sidebar / top nav (reviews, billing, sign out). */}
          <p>Dashboard</p>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </AuthProtection>
  );
}
