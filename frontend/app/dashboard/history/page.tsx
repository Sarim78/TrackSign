/**
 * HistoryPage — filterable list of saved contract reviews.
 *
 * Route: /dashboard/history
 * Dependencies: review store
 * TODO [BACKEND]: Replace localStorage with GET /api/reviews
 */

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatReviewDate, getReviews, isCurrentMonth, type Review } from "@/lib/reviews";

type HistoryFilter = "All" | "High risk" | "This month";

const filters: HistoryFilter[] = ["All", "High risk", "This month"];

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

const HistoryPage = () => {
  const [active, setActive] = useState<HistoryFilter>("All");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const visible = useMemo(() => {
    if (active === "High risk") return reviews.filter((review) => review.flagCounts.high > 0);
    if (active === "This month") return reviews.filter((review) => isCurrentMonth(review.date));
    return reviews;
  }, [active, reviews]);

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
              aria-pressed={selected}
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

      {visible.length === 0 ? (
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
      ) : (
        <div>
          {visible.map((review) => (
            <Link
              key={review.id}
              href={`/dashboard/${review.id}`}
              className="mb-3 flex cursor-pointer items-center justify-between rounded-xl p-5 transition-all"
              style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "rgba(232,97,77,0.3)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = "#2a2722";
              }}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{review.filename}</p>
                <p className="mt-1 text-xs" style={{ color: "#666" }}>
                  {formatReviewDate(review.date)}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 gap-3">
                <span className="text-xs" style={{ color: "#EF4444" }}>
                  {review.flagCounts.high} high
                </span>
                <span className="text-xs" style={{ color: "#F59E0B" }}>
                  {review.flagCounts.medium} medium
                </span>
                <span className="text-xs" style={{ color: "#22C55E" }}>
                  {review.flagCounts.low} low
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
