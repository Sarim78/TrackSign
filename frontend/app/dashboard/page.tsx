"use client";

import Link from "next/link";
import { useState } from "react";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

function ActionCard({
  href,
  title,
  subtext,
  showArrow,
}: {
  href: string;
  title: string;
  subtext: string;
  showArrow?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group cursor-pointer rounded-xl p-6"
      style={{
        backgroundColor: "#1e1c18",
        border: `1px solid ${hovered ? "#E8614D" : "#2a2722"}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs" style={{ color: "#999" }}>
            {subtext}
          </p>
        </div>
        {showArrow ? (
          <span className="text-sm" style={{ color: "#E8614D" }}>
            →
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Welcome back</h2>
      <p className="text-sm" style={{ color: "#999" }}>
        Here&apos;s an overview of your contract reviews.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
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
        <div className="rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Risk score (avg)
          </p>
          <p className="text-2xl font-semibold" style={{ color: "#999" }}>
            N/A
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Quick actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ActionCard
            href="/dashboard/upload"
            title="Upload a new contract"
            subtext="Drop a PDF and get your review in under 60 seconds."
            showArrow
          />
          <ActionCard
            href="/dashboard/history"
            title="View review history"
            subtext="Browse all your past contract reviews."
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent reviews</h3>
          <Link href="/dashboard/history" className="text-sm" style={{ color: "#E8614D" }}>
            View all →
          </Link>
        </div>
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
