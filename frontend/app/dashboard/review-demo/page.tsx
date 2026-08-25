"use client";

import ReviewReport from "@/components/ReviewReport";
import { FINDING_POOL, type Review } from "@/lib/reviews";

const demoFindings = [
  FINDING_POOL[0],
  FINDING_POOL[1],
  FINDING_POOL[2],
  FINDING_POOL[3],
  FINDING_POOL[4],
  FINDING_POOL[6],
];

const demoReview: Review = {
  id: "review-demo",
  filename: "ClientContract_2026.pdf",
  fileSize: "1.2 MB",
  date: new Date().toISOString(),
  findings: demoFindings,
  flagCounts: {
    high: demoFindings.filter((item) => item.severity === "high").length,
    medium: demoFindings.filter((item) => item.severity === "medium").length,
    low: demoFindings.filter((item) => item.severity === "low").length,
  },
};

export default function DemoReviewPage() {
  return (
    <ReviewReport
      review={demoReview}
      dateLabel="Reviewed just now"
      backHref="/dashboard"
      backLabel="← Back to dashboard"
    />
  );
}
