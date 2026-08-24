"use client";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

export default function SettingsPage() {
  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold">Settings</h2>

      <section className="mb-6 rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold">Account</h3>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
          <p className="text-sm" style={{ color: "#666" }}>
            Email
          </p>
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            Not connected
          </p>
        </div>
        <div className="flex items-center justify-between py-3">
          <p className="text-sm" style={{ color: "#666" }}>
            Member since
          </p>
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            N/A
          </p>
        </div>
        {/* TODO: Pull account info from Clerk */}
      </section>

      <section className="mb-6 rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold">Subscription</h3>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
          <p className="text-sm" style={{ color: "#666" }}>
            Current plan
          </p>
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            Free
          </p>
        </div>
        <div className="flex items-center justify-between py-3">
          <p className="text-sm" style={{ color: "#666" }}>
            Reviews used
          </p>
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            0 / 1
          </p>
        </div>
        <button
          type="button"
          className="mt-4 rounded-md px-5 py-2.5 text-sm text-white"
          style={{ backgroundColor: "#E8614D" }}
        >
          Upgrade to Pro
        </button>
        {/* TODO: Connect to Stripe checkout */}
      </section>

      <section className="rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold" style={{ color: "#EF4444" }}>
          Danger zone
        </h3>
        <p className="text-sm" style={{ color: "#999" }}>
          Delete account
        </p>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>
          Permanently delete your account and all review data.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md px-4 py-2 text-sm"
          style={{ border: "1px solid #EF4444", color: "#EF4444" }}
        >
          Delete account
        </button>
        {/* TODO: Wire up account deletion */}
      </section>
    </div>
  );
}
