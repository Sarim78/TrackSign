/**
 * ReviewReport — shared contract report UI with risk ring and expandable findings.
 *
 * Dependencies: review store types
 */

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Finding, Review, Severity } from "@/lib/reviews";
import { riskScore } from "@/lib/reviews";

interface ReviewReportProps {
  review: Review;
  dateLabel: string;
  backHref: string;
  backLabel: string;
}

interface RiskRingProps {
  score: number;
}

const badgeStyle: Record<Severity, { backgroundColor: string; color: string; border: string }> = {
  high: { backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444", border: "3px solid #EF4444" },
  medium: { backgroundColor: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "3px solid #F59E0B" },
  low: { backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E", border: "3px solid #22C55E" },
};

const label = (severity: Severity): string => {
  return severity === "high" ? "High" : severity === "medium" ? "Medium" : "Low";
};

const scoreColor = (score: number): string => {
  if (score > 70) return "#22C55E";
  if (score >= 40) return "#F59E0B";
  return "#EF4444";
};

const RiskRing = ({ score }: RiskRingProps) => {
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);

  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#2a2722" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color }}>
        {score}
      </span>
    </div>
  );
};

const reportText = (filename: string, findings: Finding[]): string => {
  const lines = [`TrackSign Report - ${filename}`, ""];
  findings.forEach((finding) => {
    lines.push(`[${label(finding.severity)}] ${finding.category}`);
    lines.push(finding.clause);
    lines.push(`Why it matters: ${finding.explanation}`);
    lines.push(`Fairer version: ${finding.fairerVersion}`);
    lines.push("");
  });
  return lines.join("\n");
};

const ReviewReport = ({ review, dateLabel, backHref, backLabel }: ReviewReportProps) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const score = useMemo(() => riskScore(review.flagCounts), [review.flagCounts]);

  // Copies the full report text to the clipboard.
  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText(review.filename, review.findings));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <Link href={backHref} className="mb-6 inline-block text-sm" style={{ color: "#E8614D" }}>
        {backLabel}
      </Link>

      <div className="mb-6 rounded-xl p-6" style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{review.filename}</h2>
            <p className="mt-1 text-xs" style={{ color: "#666" }}>
              {dateLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-6">
              <p className="text-sm">{review.findings.length} flags found</p>
              <p className="text-sm" style={{ color: "#EF4444" }}>
                {review.flagCounts.high} high risk
              </p>
              <p className="text-sm" style={{ color: "#F59E0B" }}>
                {review.flagCounts.medium} medium
              </p>
              <p className="text-sm" style={{ color: "#22C55E" }}>
                {review.flagCounts.low} low
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RiskRing score={score} />
            <p className="text-xs" style={{ color: "#666" }}>
              Risk score
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ border: "1px solid #2a2722", color: "#EDEDED" }}
          >
            Download report
          </button>
          <button
            type="button"
            onClick={handleCopyReport}
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ border: "1px solid #2a2722", color: "#EDEDED" }}
          >
            {copied ? "Copied!" : "Copy report"}
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ border: "1px solid #2a2722", color: "#EDEDED" }}
          >
            Share
          </button>
        </div>
      </div>

      <h3 className="mb-4 text-lg font-semibold">Findings</h3>
      <div className="space-y-4">
        {review.findings.map((finding, index) => {
          const open = openIndex === index;
          const styles = badgeStyle[finding.severity];

          return (
            <div
              key={`${finding.category}-${index}`}
              className="overflow-hidden rounded-xl"
              style={{
                backgroundColor: "#1e1c18",
                border: "1px solid #2a2722",
                borderLeft: styles.border,
              }}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                style={{ borderBottom: open ? "1px solid #2a2722" : "1px solid transparent" }}
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span className="flex min-w-0 items-center">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: styles.backgroundColor, color: styles.color }}
                  >
                    {label(finding.severity)}
                  </span>
                  <span className="ml-3 truncate text-base font-semibold">{finding.category}</span>
                </span>
                <span className={`ml-3 shrink-0 text-sm transition-transform ${open ? "rotate-90" : ""}`} style={{ color: "#666" }}>
                  ›
                </span>
              </button>
              {open ? (
                <div className="px-6 py-5">
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#666" }}>
                    WHAT IT SAYS
                  </p>
                  <p className="mb-5 text-sm" style={{ color: "#999" }}>
                    {finding.clause}
                  </p>
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#666" }}>
                    WHY IT MATTERS
                  </p>
                  <p className="mb-5 text-sm" style={{ color: "#999" }}>
                    {finding.explanation}
                  </p>
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#E8614D" }}>
                    FAIRER VERSION
                  </p>
                  <p className="text-sm">{finding.fairerVersion}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="mt-8 pt-6 text-center text-xs" style={{ borderTop: "1px solid #2a2722", color: "#666" }}>
        TrackSign does not provide legal advice. This report flags terms worth reviewing with a qualified lawyer.
      </p>
    </div>
  );
};

export default ReviewReport;
