"use client";

import Link from "next/link";
import { useState } from "react";

const filters = ["All", "High risk", "This month"] as const;

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

export default function HistoryPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Review history</h2>
      <p className="mb-6 text-sm" style={{ color: "#999" }}>
        All your reviewed contracts in one place.
      </p>

      <div className="mb-6 flex gap-2">
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className="rounded-md px-3 py-1.5 text-xs"
              style={{
                backgroundColor: selected ? "#1e1c18" : "transparent",
                color: selected ? "#EDEDED" : "#666",
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* TODO: Each row will be a <Link href={`/dashboard/${review.id}`}> wrapping the contract info */}
      <div className="rounded-xl p-12 text-center" style={cardStyle}>
        <p className="text-sm" style={{ color: "#999" }}>
          No reviews yet
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
        <div>
          <Link href="/dashboard/review-demo" className="mt-4 inline-block text-sm" style={{ color: "#E8614D" }}>
            Or try the demo review →
          </Link>
        </div>
      </div>
    </div>
  );
}
