"use client";

import Link from "next/link";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

export default function ReviewReportPage() {
  return (
    <div>
      <Link href="/dashboard/history" className="mb-6 inline-block text-sm" style={{ color: "#E8614D" }}>
        ← Back to history
      </Link>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Contract review</h2>
          <p className="mt-1 text-xs" style={{ color: "#666" }}>
            Uploaded date unavailable
          </p>
        </div>
        <div className="flex gap-3">
          <span className="text-xs" style={{ color: "#EF4444" }}>
            0 High
          </span>
          <span className="text-xs" style={{ color: "#F59E0B" }}>
            0 Medium
          </span>
          <span className="text-xs" style={{ color: "#22C55E" }}>
            0 Low
          </span>
        </div>
      </div>

      <div className="rounded-xl p-12 text-center" style={cardStyle}>
        <p className="text-sm" style={{ color: "#999" }}>
          Review loading...
        </p>
        <p className="mt-2 text-xs" style={{ color: "#666" }}>
          Looking up your contract review.
        </p>
        <Link href="/dashboard/review-demo" className="mt-4 inline-block text-sm" style={{ color: "#E8614D" }}>
          View demo report →
        </Link>
        {/* TODO: Fetch review by params.reviewId from backend API. If not found, show 404. */}
      </div>
    </div>
  );
}
