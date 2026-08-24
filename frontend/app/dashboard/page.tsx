"use client";

import Link from "next/link";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Your dashboard</h2>
      <p className="text-sm" style={{ color: "#999" }}>
        Upload a contract to get started.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Total reviews
          </p>
          <p className="text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            High risk flags
          </p>
          <p className="text-2xl font-semibold" style={{ color: "#EF4444" }}>
            0
          </p>
        </div>
        <div className="rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Contracts this month
          </p>
          <p className="text-2xl font-semibold">0</p>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Recent reviews</h3>
        <div className="rounded-xl p-12 text-center" style={cardStyle}>
          <p className="text-sm" style={{ color: "#999" }}>
            No contracts reviewed yet
          </p>
          <p className="mt-2 text-xs" style={{ color: "#666" }}>
            Upload your first contract to get started
          </p>
          <Link
            href="/dashboard/upload"
            className="mt-4 inline-block rounded-md px-5 py-2.5 text-sm text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            Upload contract
          </Link>
        </div>
      </section>
    </div>
  );
}
