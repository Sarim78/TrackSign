"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReviewReport from "@/components/ReviewReport";
import { formatReviewDate, getReview, type Review } from "@/lib/reviews";

export default function ReviewReportPage() {
  const params = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<Review | null | undefined>(undefined);

  useEffect(() => {
    setReview(getReview(params.reviewId));
  }, [params.reviewId]);

  if (review === undefined) {
    return (
      <p className="text-sm" style={{ color: "#999" }}>
        Review loading...
      </p>
    );
  }

  if (!review) {
    return (
      <div className="rounded-xl p-12 text-center" style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}>
        <p className="text-sm" style={{ color: "#999" }}>
          Review not found
        </p>
        <p className="mt-2 text-xs" style={{ color: "#666" }}>
          This review does not exist or was deleted.
        </p>
        <Link href="/dashboard" className="mt-4 inline-block text-sm" style={{ color: "#E8614D" }}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <ReviewReport
      review={review}
      dateLabel={formatReviewDate(review.date)}
      backHref="/dashboard/history"
      backLabel="← Back to history"
    />
  );
}
