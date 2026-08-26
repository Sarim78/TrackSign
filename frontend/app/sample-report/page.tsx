/**
 * SampleReportPage — public demo report anyone can view from the landing page.
 *
 * Route: /sample-report
 * Dependencies: Navbar, Footer, ReviewReport, FINDING_POOL
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
  id: "sample-report",
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

const SampleReportPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        <ReviewReport
          review={demoReview}
          dateLabel="Reviewed just now"
          backHref="/"
          backLabel="← Back to home"
        />
        <div
          className="mt-12 rounded-xl p-8 text-center"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="text-lg font-semibold">Ready to review your own contracts?</p>
          <a
            href="/sign-up"
            className="mt-4 inline-block rounded-md px-5 py-2.5 text-sm text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            Get started
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SampleReportPage;
