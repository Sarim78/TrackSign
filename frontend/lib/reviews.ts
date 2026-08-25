export type Severity = "high" | "medium" | "low";

export type Finding = {
  severity: Severity;
  category: string;
  clause: string;
  explanation: string;
  fairerVersion: string;
};

export type Review = {
  id: string;
  filename: string;
  fileSize: string;
  date: string;
  findings: Finding[];
  flagCounts: { high: number; medium: number; low: number };
};

const REVIEWS_KEY = "tracksign_reviews";

export const FINDING_POOL: Finding[] = [
  {
    severity: "high",
    category: "Payment terms",
    clause: "Payment is due within 90 days of project completion and client acceptance.",
    explanation: "Net-90 with an acceptance gate means the client can delay payment indefinitely.",
    fairerVersion: "Payment due within 30 days of invoice. 50% deposit before work begins.",
  },
  {
    severity: "high",
    category: "IP and ownership",
    clause: "All deliverables, including pre-existing tools, become client property.",
    explanation: "This sweeps your existing tools into the assignment.",
    fairerVersion:
      "Deliverables created for this project are assigned on full payment. Pre-existing tools remain yours.",
  },
  {
    severity: "high",
    category: "Liability",
    clause: "The contractor shall indemnify the client against any and all claims.",
    explanation: "Uncapped indemnification means liability far exceeding your fee.",
    fairerVersion: "Liability capped at total fees paid. Each party indemnifies only for their own negligence.",
  },
  {
    severity: "medium",
    category: "Scope and revisions",
    clause: "The contractor will make revisions until client satisfaction.",
    explanation: "No revision cap means unlimited free rework.",
    fairerVersion: "Up to 2 rounds of revisions included. Additional revisions billed at hourly rate.",
  },
  {
    severity: "medium",
    category: "Termination",
    clause: "Either party may terminate with 7 days notice.",
    explanation: "No kill fee means you eat the cost of partial work.",
    fairerVersion: "Either party may terminate with 14 days notice. Kill fee of 25% of remaining value.",
  },
  {
    severity: "medium",
    category: "Auto-renewal",
    clause: "This agreement automatically renews for successive 12-month periods.",
    explanation: "Auto-renewal locks you in without active consent.",
    fairerVersion: "Agreement expires at end of term. Renewal requires written agreement from both parties.",
  },
  {
    severity: "low",
    category: "Confidentiality",
    clause: "Both parties agree to keep confidential information private for two years.",
    explanation: "Standard mutual NDA. No unusual restrictions.",
    fairerVersion: "No changes needed. This clause is fair.",
  },
  {
    severity: "high",
    category: "Non-compete",
    clause: "Contractor agrees not to work with competing businesses for 24 months.",
    explanation: "A 24-month non-compete is extremely broad for freelance work.",
    fairerVersion:
      "Non-compete limited to direct competitors, 6 months maximum, within the same geographic market.",
  },
  {
    severity: "medium",
    category: "Work-for-hire",
    clause: "All work is considered work-for-hire under copyright law.",
    explanation: "Work-for-hire means you have zero rights to reuse any part of what you create.",
    fairerVersion:
      "Work is assigned on full payment. Contractor retains right to use for portfolio and case studies.",
  },
  {
    severity: "low",
    category: "Governing law",
    clause: "This agreement is governed by the laws of the State of Delaware.",
    explanation: "Standard governing law clause. Delaware is common and neutral.",
    fairerVersion: "No changes needed.",
  },
];

function readAll(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REVIEWS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(reviews: Review[]) {
  window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export function getReviews(): Review[] {
  return readAll().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getReview(id: string): Review | null {
  return readAll().find((review) => review.id === id) ?? null;
}

export function saveReview(review: Review) {
  const reviews = readAll().filter((item) => item.id !== review.id);
  reviews.push(review);
  writeAll(reviews);
}

export function clearReviews() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(REVIEWS_KEY);
}

export function pickFindings(): Finding[] {
  const shuffled = [...FINDING_POOL].sort(() => Math.random() - 0.5);
  const count = 4 + Math.floor(Math.random() * 3);
  return shuffled.slice(0, count);
}

export function createReview(filename: string, fileSize: string): Review {
  const findings = pickFindings();
  const review: Review = {
    id: crypto.randomUUID(),
    filename,
    fileSize,
    date: new Date().toISOString(),
    findings,
    flagCounts: {
      high: findings.filter((item) => item.severity === "high").length,
      medium: findings.filter((item) => item.severity === "medium").length,
      low: findings.filter((item) => item.severity === "low").length,
    },
  };
  saveReview(review);
  return review;
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function riskScore(counts: { high: number; medium: number; low: number }) {
  return Math.max(0, Math.min(100, 100 - (counts.high * 15 + counts.medium * 8 + counts.low * 2)));
}

export function isCurrentMonth(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

export function reviewsByWeek(reviews: Review[]) {
  const now = new Date();
  return [3, 2, 1, 0].map((offset) => {
    const end = new Date(now);
    end.setDate(now.getDate() - offset * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 7);
    const count = reviews.filter((review) => {
      const date = new Date(review.date);
      return date >= start && date < end;
    }).length;
    return { label: offset === 0 ? "This week" : `${offset}w ago`, count };
  });
}
