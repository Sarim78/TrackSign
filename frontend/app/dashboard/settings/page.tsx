"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { clearReviews, getReviews, reviewsByWeek, type Review } from "@/lib/reviews";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

export default function SettingsPage() {
  const { user, setPlan, logout } = useAuth();
  const [upgraded, setUpgraded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const weeks = reviewsByWeek(reviews);
  const maxCount = Math.max(1, ...weeks.map((week) => week.count));

  function upgrade() {
    setPlan("pro");
    setUpgraded(true);
    window.setTimeout(() => setUpgraded(false), 3000);
  }

  function deleteAccount() {
    clearReviews();
    logout();
  }

  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold">Settings</h2>

      <section className="mb-6 rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold">Account</h3>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
          <p className="text-sm" style={{ color: "#666" }}>
            Name
          </p>
          <p className="text-sm">{user?.name ?? "Not connected"}</p>
        </div>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
          <p className="text-sm" style={{ color: "#666" }}>
            Email
          </p>
          <p className="text-sm">{user?.email ?? "Not connected"}</p>
        </div>
        <div className="flex items-center justify-between py-3">
          <p className="text-sm" style={{ color: "#666" }}>
            Member since
          </p>
          <p className="text-sm">August 2026</p>
        </div>
      </section>

      <section className="mb-6 rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold">Review usage</h3>
        {/* TODO: Replace with real usage data from backend */}
        {reviews.length === 0 ? (
          <p className="text-xs" style={{ color: "#666" }}>
            Upload your first contract to see usage stats.
          </p>
        ) : (
          <div className="flex h-32 items-end gap-3">
            {weeks.map((week) => (
              <div key={week.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${Math.max(8, (week.count / maxCount) * 100)}%`,
                    backgroundColor: "#E8614D",
                    opacity: week.count === 0 ? 0.25 : 1,
                  }}
                />
                <p className="text-[10px]" style={{ color: "#666" }}>
                  {week.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-6 rounded-xl p-6" style={cardStyle}>
        <h3 className="mb-4 text-lg font-semibold">Subscription</h3>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
          <p className="text-sm" style={{ color: "#666" }}>
            Current plan
          </p>
          <p className="text-sm">{user?.plan === "pro" ? "Pro" : "Free"}</p>
        </div>
        <div className="flex items-center justify-between py-3">
          <p className="text-sm" style={{ color: "#666" }}>
            Reviews used
          </p>
          <p className="text-sm">
            {user?.reviewCount ?? 0} / {user?.plan === "pro" ? "unlimited" : "1"}
          </p>
        </div>
        {user?.plan === "free" ? (
          <button
            type="button"
            onClick={upgrade}
            className="mt-4 rounded-md px-5 py-2.5 text-sm text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            Upgrade to Pro
          </button>
        ) : null}
        {upgraded ? (
          <p className="mt-3 text-sm" style={{ color: "#22C55E" }}>
            Upgraded to Pro!
          </p>
        ) : null}
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
        {confirmDelete ? (
          <div className="mt-4">
            <p className="text-sm">Are you sure?</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={deleteAccount}
                className="rounded-md px-4 py-2 text-sm"
                style={{ backgroundColor: "#EF4444", color: "#fff" }}
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-md px-4 py-2 text-sm"
                style={{ border: "1px solid #2a2722" }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="mt-4 rounded-md px-4 py-2 text-sm"
            style={{ border: "1px solid #EF4444", color: "#EF4444" }}
          >
            Delete account
          </button>
        )}
      </section>
    </div>
  );
}
