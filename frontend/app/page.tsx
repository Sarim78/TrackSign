import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LogoTicker from "@/components/LogoTicker";
import Navbar from "@/components/Navbar";

function WindowChrome({ url }: { url: string }) {
  return (
    <div
      className="relative flex h-9 items-center px-4"
      style={{ backgroundColor: "#0e0c0a", borderBottom: "1px solid #2a2722" }}
    >
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
      </div>
      <span
        className="absolute left-1/2 hidden -translate-x-1/2 text-[11px] sm:inline"
        style={{ color: "#555" }}
      >
        {url}
      </span>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

const mockLeftStyle = {
  backgroundColor: "#141210",
  borderRight: "1px solid #2a2722",
} as const;

const mockRightStyle = {
  backgroundColor: "#141210",
  borderLeft: "1px solid #2a2722",
} as const;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <section className="mx-auto max-w-5xl px-4 pb-12 pt-24 text-center md:px-6 md:pt-36">
          <h1 className="animate-fade-in-up text-4xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
            Review contracts
            <br />
            <span style={{ color: "#E8614D" }}>before you sign.</span>
          </h1>
          <p
            className="animate-fade-in-up mx-auto mt-5 max-w-sm text-sm leading-relaxed delay-150 md:max-w-xl md:text-base"
            style={{ color: "#999" }}
          >
            TrackSign scans your freelance contracts with AI and flags risky,
            unfair, or unusual terms. Plain-English explanations, severity
            ratings, and fairer alternatives.
          </p>
          <div className="animate-fade-in-up mx-auto mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3 delay-300 sm:max-w-none sm:flex-row">
            <a
              href="/sign-up"
              className="w-full rounded-md px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: "#E8614D" }}
            >
              Start scanning free →
            </a>
            <a
              href="#sample"
              className="w-full rounded-md px-5 py-2.5 text-center text-sm font-medium hover:opacity-90 sm:w-auto"
              style={{ border: "1px solid #2a2722" }}
            >
              View sample report
            </a>
          </div>
        </section>

        <section className="mx-auto mb-20 mt-16 max-w-5xl px-4 md:mb-28 md:px-6">
          <div className="overflow-hidden rounded-xl" style={cardStyle}>
            <div
              className="relative flex h-8 items-center px-4"
              style={{ backgroundColor: "#0e0c0a", borderBottom: "1px solid #2a2722" }}
            >
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
              </div>
              <span
                className="absolute left-1/2 hidden -translate-x-1/2 text-[11px] sm:inline"
                style={{ color: "#555" }}
              >
                tracksign.com/dashboard
              </span>
            </div>
            <div className="flex min-h-0 md:min-h-[350px]">
              <aside
                className="hidden w-56 shrink-0 md:block"
                style={{ backgroundColor: "#141210", borderRight: "1px solid #2a2722" }}
              >
                <p className="mb-6 px-4 pt-4 text-xs font-semibold">TrackSign</p>
                <p className="mb-2 px-4 text-[10px] tracking-wider" style={{ color: "#555" }}>
                  THIS WEEK
                </p>
                <div className="px-4 py-2 text-xs text-[#999]" style={{ backgroundColor: "#1a1816" }}>
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#E8614D" }} />
                  Client Contract Review
                </div>
                <div className="px-4 py-2 text-xs text-[#999]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#E8614D" }} />
                  NDA, Acme Corp
                </div>
                <div className="px-4 py-2 text-xs text-[#999]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#E8614D" }} />
                  SOW, Design Sprint
                </div>
                <p className="mb-2 mt-4 px-4 text-[10px] tracking-wider" style={{ color: "#555" }}>
                  LAST MONTH
                </p>
                <div className="px-4 py-2 text-xs text-[#999]">Freelance Agreement</div>
                <div className="px-4 py-2 text-xs text-[#999]">Subcontractor Terms</div>
              </aside>
              <div className="min-w-0 flex-1 p-4 md:p-6">
                <h2 className="mb-1 text-base font-semibold md:text-lg">Client Contract Review</h2>
                <p className="mb-4 text-xs" style={{ color: "#555" }}>
                  Uploaded Aug 22, 2026
                </p>
                <div className="mb-6 flex flex-wrap gap-2 md:gap-4">
                  <div className="rounded-lg px-3 py-2 md:px-4 md:py-3" style={{ backgroundColor: "#141210", border: "1px solid #2a2722" }}>
                    <p className="text-[10px]" style={{ color: "#555" }}>Flags</p>
                    <p className="text-lg font-semibold md:text-xl">6</p>
                  </div>
                  <div className="rounded-lg px-3 py-2 md:px-4 md:py-3" style={{ backgroundColor: "#141210", border: "1px solid #2a2722" }}>
                    <p className="text-[10px]" style={{ color: "#555" }}>High risk</p>
                    <p className="text-lg font-semibold md:text-xl" style={{ color: "#EF4444" }}>3</p>
                  </div>
                  <div className="rounded-lg px-3 py-2 md:px-4 md:py-3" style={{ backgroundColor: "#141210", border: "1px solid #2a2722" }}>
                    <p className="text-[10px]" style={{ color: "#555" }}>Score</p>
                    <p className="text-lg font-semibold md:text-xl" style={{ color: "#F59E0B" }}>42/100</p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 py-3" style={{ borderTop: "1px solid #2a2722" }}>
                  <div className="min-w-0">
                    <p className="text-xs font-medium md:text-sm">Payment terms</p>
                    <p className="text-xs" style={{ color: "#666" }}>Net-90 with acceptance gate</p>
                  </div>
                  <p className="shrink-0 text-xs" style={{ color: "#EF4444" }}>High</p>
                </div>
                <div className="flex items-start justify-between gap-4 py-3" style={{ borderTop: "1px solid #2a2722" }}>
                  <div className="min-w-0">
                    <p className="text-xs font-medium md:text-sm">Scope</p>
                    <p className="text-xs" style={{ color: "#666" }}>Unlimited revisions</p>
                  </div>
                  <p className="shrink-0 text-xs" style={{ color: "#F59E0B" }}>Medium</p>
                </div>
                <div className="flex items-start justify-between gap-4 py-3" style={{ borderTop: "1px solid #2a2722" }}>
                  <div className="min-w-0">
                    <p className="text-xs font-medium md:text-sm">IP ownership</p>
                    <p className="text-xs" style={{ color: "#666" }}>Pre-existing tools assigned</p>
                  </div>
                  <p className="shrink-0 text-xs" style={{ color: "#EF4444" }}>High</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LogoTicker />

        <section className="px-4 md:px-6">
          <div id="features" className="mx-auto flex max-w-6xl scroll-mt-24 flex-col gap-12 md:gap-16">
            <div className="overflow-hidden rounded-xl" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center p-5 md:p-8 lg:p-12">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Catch risky clauses{" "}
                    <span style={{ color: "#E8614D" }}>before they cost you</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
                    TrackSign reviews every clause against a checklist built for
                    freelance contracts. Payment terms, scope, IP, liability, and
                    termination. Flagged with severity ratings so you know what to
                    push back on.
                  </p>
                  <a href="#" className="mt-4 inline-block text-sm font-medium" style={{ color: "#E8614D" }}>
                    Learn about risk scanning →
                  </a>
                </div>
                <div className="min-w-0 overflow-hidden" style={mockRightStyle}>
                  <WindowChrome url="tracksign.com/scan" />
                  <div className="flex items-center gap-3 px-4 py-3 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-t-transparent" style={{ borderColor: "#E8614D", borderTopColor: "transparent" }} />
                    <p className="truncate text-xs text-[#999]">Scanning contract...</p>
                    <p className="ml-auto hidden truncate text-xs sm:block" style={{ color: "#666" }}>FreelanceContract.pdf</p>
                  </div>
                  <div className="px-4 py-4 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "#666" }}>Clauses analyzed</p>
                    <div className="mt-2 h-1.5 w-full rounded-full" style={{ backgroundColor: "#0e0c0a" }}>
                      <div className="h-full w-[85%] rounded-full" style={{ backgroundColor: "#E8614D" }} />
                    </div>
                    <p className="mt-2 text-xs text-[#999]">34 of 40 clauses</p>
                  </div>
                  <div className="px-4 py-3 md:px-5">
                    <div className="flex justify-between py-3" style={{ borderBottom: "1px solid #1a1816" }}>
                      <p className="text-xs md:text-sm">Payment terms</p>
                      <p className="text-xs" style={{ color: "#EF4444" }}>High</p>
                    </div>
                    <div className="flex justify-between py-3" style={{ borderBottom: "1px solid #1a1816" }}>
                      <p className="text-xs md:text-sm">Scope and revisions</p>
                      <p className="text-xs" style={{ color: "#F59E0B" }}>Medium</p>
                    </div>
                    <div className="flex justify-between py-3">
                      <p className="text-xs md:text-sm">IP ownership</p>
                      <p className="text-xs" style={{ color: "#EF4444" }}>High</p>
                    </div>
                    <p className="pt-2 text-xs" style={{ color: "#666" }}>+ 3 more flags found...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="order-1 flex flex-col justify-center p-5 md:order-2 md:p-8 lg:p-12">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Not just what&apos;s wrong.{" "}
                    <span style={{ color: "#E8614D" }}>What&apos;s fairer.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
                    Every flag includes a plain-English explanation and a fairer alternative. Know exactly what to ask your client to change, or what to bring to your lawyer.
                  </p>
                  <a href="#" className="mt-4 inline-block text-sm font-medium" style={{ color: "#E8614D" }}>
                    See a sample report →
                  </a>
                </div>
                <div id="sample" className="order-2 min-w-0 overflow-hidden scroll-mt-24 md:order-1" style={mockLeftStyle}>
                  <WindowChrome url="tracksign.com/review/payment-terms" />
                  <div className="flex items-center px-4 py-3 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <p className="text-xs font-medium" style={{ color: "#EF4444" }}>High</p>
                    <p className="ml-3 text-xs font-semibold md:text-sm">Payment terms</p>
                  </div>
                  <div className="px-4 py-4 md:px-5">
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#666" }}>What it says:</p>
                    <p className="mb-5 mt-1 text-xs text-[#999] md:text-sm">
                      Payment is due within 90 days of project completion and client acceptance.
                    </p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#666" }}>Why it matters:</p>
                    <p className="mb-5 mt-1 text-xs text-[#999] md:text-sm">
                      Net-90 with an acceptance gate means the client can delay payment indefinitely by withholding approval. Most freelancers can&apos;t float three months of unpaid work.
                    </p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#E8614D" }}>Fairer version:</p>
                    <p className="mt-1 text-xs md:text-sm">
                      Payment due within 30 days of invoice. 50% deposit due before work begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center p-5 md:p-8 lg:p-12">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    <span style={{ color: "#E8614D" }}>Review history</span>, track every contract
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
                    Every review is saved. Compare terms across clients, track which contracts had the worst clauses, and build a record of what you&apos;ve signed.
                  </p>
                  <a href="#" className="mt-4 inline-block text-sm font-medium" style={{ color: "#E8614D" }}>
                    Learn about review history →
                  </a>
                </div>
                <div className="min-w-0 overflow-hidden" style={mockRightStyle}>
                  <WindowChrome url="tracksign.com/dashboard" />
                  <div className="flex justify-between px-4 py-3 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <p className="text-xs font-medium md:text-sm">All reviews</p>
                    <p className="text-xs" style={{ color: "#666" }}>6 contracts</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto px-4 py-2.5 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <span className="shrink-0 rounded-md px-3 py-1 text-xs" style={{ backgroundColor: "#2a2722" }}>All</span>
                    <span className="shrink-0 px-3 py-1 text-xs" style={{ color: "#666" }}>High risk</span>
                    <span className="shrink-0 px-3 py-1 text-xs" style={{ color: "#666" }}>This month</span>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-4 md:px-5" style={{ backgroundColor: "#1a1816", borderBottom: "1px solid #1a1816" }}>
                    <div className="min-w-0">
                      <p className="truncate text-xs md:text-sm">Client Contract, Acme Corp</p>
                      <p className="mt-0.5 text-xs text-[#999]">3 high, 2 medium</p>
                    </div>
                    <p className="shrink-0 text-xs" style={{ color: "#666" }}>Aug 22</p>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-4 md:px-5" style={{ borderBottom: "1px solid #1a1816" }}>
                    <div className="min-w-0">
                      <p className="truncate text-xs md:text-sm">NDA, Folio Agency</p>
                      <p className="mt-0.5 text-xs text-[#999]">1 high, 0 medium</p>
                    </div>
                    <p className="shrink-0 text-xs" style={{ color: "#666" }}>Aug 18</p>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-4 md:px-5" style={{ borderBottom: "1px solid #1a1816" }}>
                    <div className="min-w-0">
                      <p className="truncate text-xs md:text-sm">SOW, Design Sprint</p>
                      <p className="mt-0.5 text-xs text-[#999]">0 high, 3 medium</p>
                    </div>
                    <p className="shrink-0 text-xs" style={{ color: "#666" }}>Aug 10</p>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-4 md:px-5">
                    <div className="min-w-0">
                      <p className="truncate text-xs md:text-sm">MSA, Stackline Digital</p>
                      <p className="mt-0.5 text-xs text-[#999]">2 high, 1 medium</p>
                    </div>
                    <p className="shrink-0 text-xs" style={{ color: "#666" }}>Jul 29</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="order-1 flex flex-col justify-center p-5 md:order-2 md:p-8 lg:p-12">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Every contract type.{" "}
                    <span style={{ color: "#E8614D" }}>One checklist.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
                    TrackSign uses a structured risk checklist built for freelance and agency contracts. Every clause is checked against real patterns, not a generic AI guess. The checklist covers payment, scope, IP, liability, termination, and more.
                  </p>
                  <a href="#" className="mt-4 inline-block text-sm font-medium" style={{ color: "#E8614D" }}>
                    See the full checklist →
                  </a>
                </div>
                <div className="order-2 min-w-0 overflow-hidden md:order-1" style={mockLeftStyle}>
                  <WindowChrome url="tracksign.com/settings/checklist" />
                  <div className="flex items-center justify-between gap-2 px-4 py-3 md:px-5" style={{ borderBottom: "1px solid #2a2722" }}>
                    <p className="text-xs font-medium md:text-sm">Risk checklist</p>
                    <p className="shrink-0 text-[10px] md:text-xs" style={{ color: "#E8614D" }}>Freelancer and Agency</p>
                  </div>
                  <div className="px-4 py-2 md:px-5">
                    {[
                      ["Payment terms", "#22C55E"],
                      ["Scope and revisions", "#22C55E"],
                      ["IP and ownership", "#22C55E"],
                      ["Liability and indemnification", "#22C55E"],
                      ["Termination", "#22C55E"],
                      ["Non-compete / exclusivity", "#F59E0B"],
                      ["Confidentiality", "#F59E0B"],
                      ["Insurance and assignment", "#F59E0B"],
                    ].map(([label, color], i, arr) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 py-3"
                        style={i < arr.length - 1 ? { borderBottom: "1px solid #1a1816" } : undefined}
                      >
                        <p className="min-w-0 truncate text-xs md:text-sm">{label}</p>
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 md:px-5" style={{ borderTop: "1px solid #2a2722" }}>
                    <p className="text-xs text-[#999]">8 active rules</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24 px-4 md:mt-32 md:px-6">
          <h2 className="mb-8 text-2xl font-semibold">FAQ</h2>
          <FAQ />
        </section>

        <section className="mt-24 px-4 py-24 text-center md:px-6 md:py-32">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-7xl">Try TrackSign.</h2>
          <a
            href="/sign-up"
            className="mt-8 inline-block w-full max-w-sm rounded-md px-6 py-3 text-sm font-medium text-white hover:opacity-90 sm:w-auto sm:max-w-none"
            style={{ backgroundColor: "#E8614D" }}
          >
            Start scanning free →
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
