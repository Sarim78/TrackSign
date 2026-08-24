"use client";

import Link from "next/link";
import { useState } from "react";

type Severity = "High" | "Medium" | "Low";

const findings: {
  severity: Severity;
  category: string;
  says: string;
  matters: string;
  fairer: string;
}[] = [
  {
    severity: "High",
    category: "Payment terms",
    says: "Payment is due within 90 days of project completion and client acceptance.",
    matters:
      "Net-90 with an acceptance gate means the client can delay payment indefinitely by withholding approval. Most freelancers cannot float three months of unpaid work.",
    fairer: "Payment due within 30 days of invoice. 50% deposit due before work begins.",
  },
  {
    severity: "High",
    category: "IP and ownership",
    says: "All deliverables, including pre-existing tools and templates, become the property of the client upon delivery.",
    matters:
      "This sweeps your existing tools and frameworks into the assignment. If you use a starter template across clients, you lose the right to reuse it.",
    fairer:
      "Deliverables created specifically for this project are assigned on full payment. Pre-existing tools remain the property of the contractor with a perpetual license granted to the client.",
  },
  {
    severity: "High",
    category: "Liability",
    says: "The contractor shall indemnify the client against any and all claims, damages, and expenses arising from the contractor's work.",
    matters:
      "Uncapped indemnification means you could be liable for damages far exceeding your project fee, including the client's own negligence.",
    fairer:
      "Contractor liability is capped at the total fees paid under this agreement. Each party indemnifies the other only for their own negligence.",
  },
  {
    severity: "Medium",
    category: "Scope and revisions",
    says: "The contractor will make revisions as reasonably requested by the client until satisfaction.",
    matters:
      "No revision cap and no change-order process means unlimited free rework. This is one of the most common ways freelancers end up working far below their effective rate.",
    fairer: "Up to 2 rounds of revisions included. Additional revisions billed at the hourly rate specified in the SOW.",
  },
  {
    severity: "Medium",
    category: "Termination",
    says: "Either party may terminate this agreement at any time with 7 days written notice.",
    matters:
      "No kill fee means if the client cancels mid-project, you eat the cost of partially completed work. Seven days is also a short notice period for complex projects.",
    fairer:
      "Either party may terminate with 14 days notice. If the client terminates, a kill fee of 25% of remaining project value is due within 15 days.",
  },
  {
    severity: "Low",
    category: "Confidentiality",
    says: "Both parties agree to keep confidential information private for a period of two years following completion of the project.",
    matters: "This is a standard mutual NDA with a reasonable time limit. No unusual restrictions.",
    fairer: "No changes needed. This clause is fair and standard.",
  },
];

const badgeStyle: Record<Severity, { backgroundColor: string; color: string }> = {
  High: { backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" },
  Medium: { backgroundColor: "rgba(245,158,11,0.1)", color: "#F59E0B" },
  Low: { backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E" },
};

export default function DemoReviewPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <Link href="/dashboard" className="mb-6 inline-block text-sm" style={{ color: "#E8614D" }}>
        ← Back to dashboard
      </Link>

      <div
        className="mb-6 rounded-xl p-6"
        style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">ClientContract_2026.pdf</h2>
          <p className="text-xs" style={{ color: "#666" }}>
            Reviewed just now
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            6 flags found
          </p>
          <p className="text-sm" style={{ color: "#EF4444" }}>
            3 high risk
          </p>
          <p className="text-sm" style={{ color: "#F59E0B" }}>
            2 medium
          </p>
          <p className="text-sm" style={{ color: "#22C55E" }}>
            1 low
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ border: "1px solid #2a2722", color: "#EDEDED" }}
          >
            Download report
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ border: "1px solid #2a2722", color: "#EDEDED" }}
          >
            Share
          </button>
          {/* TODO: Wire up PDF export and sharing */}
        </div>
      </div>

      <h3 className="mb-4 text-lg font-semibold">Findings</h3>
      <div className="space-y-4">
        {findings.map((finding, index) => {
          const open = openIndex === index;

          return (
            <div
              key={finding.category}
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
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
                    style={badgeStyle[finding.severity]}
                  >
                    {finding.severity}
                  </span>
                  <span className="ml-3 truncate text-base font-semibold" style={{ color: "#EDEDED" }}>
                    {finding.category}
                  </span>
                </span>
                <span
                  className={`ml-3 shrink-0 text-sm transition-transform ${open ? "rotate-90" : ""}`}
                  style={{ color: "#666" }}
                >
                  ›
                </span>
              </button>
              {open ? (
                <div className="px-6 py-5">
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#666" }}>
                    WHAT IT SAYS
                  </p>
                  <p className="mb-5 text-sm" style={{ color: "#999" }}>
                    {finding.says}
                  </p>
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#666" }}>
                    WHY IT MATTERS
                  </p>
                  <p className="mb-5 text-sm" style={{ color: "#999" }}>
                    {finding.matters}
                  </p>
                  <p className="mb-1 text-[10px] tracking-wider" style={{ color: "#E8614D" }}>
                    FAIRER VERSION
                  </p>
                  <p className="text-sm" style={{ color: "#EDEDED" }}>
                    {finding.fairer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p
        className="mt-8 pt-6 text-center text-xs"
        style={{ borderTop: "1px solid #2a2722", color: "#666" }}
      >
        TrackSign does not provide legal advice. This report flags terms worth reviewing with a qualified lawyer.
      </p>
    </div>
  );
}
