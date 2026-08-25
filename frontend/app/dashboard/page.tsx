"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { formatReviewDate, getReviews, isCurrentMonth, type Review } from "@/lib/reviews";

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
  return (
    <Link href={href} className="card-hover group cursor-pointer rounded-xl p-6" style={cardStyle}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs" style={{ color: "#999" }}>
            {subtext}
          </p>
        </div>
        {showArrow ? (
          <span className="quick-action-arrow text-sm" style={{ color: "#E8614D" }}>
            →
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const stats = useMemo(() => {
    const high = reviews.reduce((sum, review) => sum + review.flagCounts.high, 0);
    const month = reviews.filter((review) => isCurrentMonth(review.date)).length;
    const totalFlags = reviews.reduce(
      (sum, review) => sum + review.flagCounts.high + review.flagCounts.medium + review.flagCounts.low,
      0,
    );
    const avg = reviews.length ? Math.round(totalFlags / reviews.length) : null;
    return { high, month, avg };
  }, [reviews]);

  const recent = reviews.slice(0, 3);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Welcome back, {user?.name ?? "there"}</h2>
      <p className="text-sm" style={{ color: "#999" }}>
        Here&apos;s an overview of your contract reviews.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="card-hover rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Total reviews
          </p>
          <p className="text-2xl font-semibold">{reviews.length}</p>
        </div>
        <div className="card-hover rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            High risk flags
          </p>
          <p className="text-2xl font-semibold" style={{ color: "#EF4444" }}>
            {stats.high}
          </p>
        </div>
        <div className="card-hover rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Contracts this month
          </p>
          <p className="text-2xl font-semibold">{stats.month}</p>
        </div>
        <div className="card-hover rounded-xl p-5" style={cardStyle}>
          <p className="text-xs" style={{ color: "#666" }}>
            Risk score (avg)
          </p>
          <p className="text-2xl font-semibold" style={{ color: stats.avg === null ? "#999" : "#EDEDED" }}>
            {stats.avg === null ? "N/A" : stats.avg}
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
        {recent.length === 0 ? (
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
        ) : (
          <div className="overflow-hidden rounded-xl" style={cardStyle}>
            <div className="grid grid-cols-3 px-5 py-3 text-xs uppercase tracking-wider" style={{ color: "#666" }}>
              <p>Contract</p>
              <p>Flags</p>
              <p className="text-right">Date</p>
            </div>
            {recent.map((review) => (
              <Link
                key={review.id}
                href={`/dashboard/${review.id}`}
                className="grid grid-cols-3 items-center px-5 py-4 transition-colors"
                style={{ borderTop: "1px solid #2a2722" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = "#232018";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <p className="truncate text-sm font-semibold">{review.filename}</p>
                <p className="text-xs">
                  <span style={{ color: "#EF4444" }}>{review.flagCounts.high} high</span>
                  <span className="mx-2" style={{ color: "#F59E0B" }}>
                    {review.flagCounts.medium} medium
                  </span>
                  <span style={{ color: "#22C55E" }}>{review.flagCounts.low} low</span>
                </p>
                <p className="text-right text-xs" style={{ color: "#666" }}>
                  {formatReviewDate(review.date)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
