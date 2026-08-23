import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

function SectionLabel({
  children,
  align = "left",
}: {
  children: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "flex flex-col items-center" : ""}>
      <span className="mb-3 block h-0.5 w-6 bg-[#E8614D]" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8614D]">
        {children}
      </p>
    </div>
  );
}

const coralButtonClass =
  "rounded-full bg-[#E8614D] px-8 py-3.5 text-sm font-medium text-white shadow-[0_4px_14px_-3px_rgba(232,97,77,0.4)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#D4503E] hover:shadow-[0_6px_20px_-3px_rgba(232,97,77,0.5)]";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pb-28 pt-24 md:pb-36 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in-up text-6xl font-bold tracking-tighter text-stone-900 [text-shadow:0_1px_2px_rgba(0,0,0,0.05)] md:text-7xl">
              Review contracts{" "}
              <br className="hidden md:block" />
              <span className="text-[#E8614D]">before you sign</span>
            </h1>
            <p className="animate-fade-in-up mx-auto mt-6 max-w-lg text-lg leading-relaxed text-stone-400 delay-150">
              TrackSign scans your freelance contracts with AI and flags risky,
              unfair, or unusual terms — with plain-English explanations,
              severity ratings, and fairer alternatives.
            </p>
            <div className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row delay-300">
              <a href="/sign-up" className={coralButtonClass}>
                Start scanning free →
              </a>
              <a
                href="#demo"
                className="rounded-full border border-stone-300 bg-white px-8 py-3.5 text-sm font-medium text-stone-700 transition-all duration-200 hover:bg-stone-50"
              >
                View demo
              </a>
            </div>
            <p className="animate-fade-in-up mt-4 text-sm text-stone-400 delay-300">
              Free, no credit card required.
            </p>
          </div>

          <div
            id="demo"
            className="animate-scale-in mx-auto mt-16 max-w-4xl scroll-mt-24"
            style={{ animationDelay: "500ms" }}
          >
            <div className="group origin-center transition-all duration-500 md:-rotate-1 md:hover:scale-[1.01] md:hover:rotate-0">
              <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_28px_70px_-12px_rgba(0,0,0,0.16)]">
              <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-3 rounded-sm bg-stone-300" />
                  <p className="text-sm font-medium text-stone-700">
                    FreelanceContract_2026.pdf
                  </p>
                </div>
                <p className="text-xs text-stone-400">Reviewed Aug 22, 2026</p>
              </div>

              <div className="flex flex-wrap gap-6 border-b border-stone-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-800">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
                  3 High
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-stone-800">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-600" />
                  2 Medium
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-stone-800">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
                  1 Low
                </div>
              </div>

              <div className="px-4 sm:px-6">
                <div className="flex items-start gap-4 border-b border-stone-100 py-4">
                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    High
                  </span>
                  <div>
                    <p className="font-medium text-stone-800">Payment terms</p>
                    <p className="mt-1 text-sm text-stone-500">
                      Net-90 payment with acceptance gate — client can delay
                      indefinitely
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-b border-stone-100 py-4">
                  <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    Medium
                  </span>
                  <div>
                    <p className="font-medium text-stone-800">
                      Scope and revisions
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Unlimited revisions with no change-order process
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-b border-stone-100 py-4">
                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    High
                  </span>
                  <div>
                    <p className="font-medium text-stone-800">IP and ownership</p>
                    <p className="mt-1 text-sm text-stone-500">
                      All deliverables and pre-existing tools assigned to client
                      on signing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-4">
                  <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    Low
                  </span>
                  <div>
                    <p className="font-medium text-stone-800">Confidentiality</p>
                    <p className="mt-1 text-sm text-stone-500">
                      Standard mutual NDA — no unusual restrictions
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px w-16 bg-stone-200" />

        <section id="features" className="scroll-mt-24 px-6 py-28 md:py-36">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-16 md:px-12">
            <SectionLabel>Features</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Built for the way freelancers work
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
              <ScrollReveal delay={0}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F0]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#E8614D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M18 5 10 17h6l-2 10 8-12h-6z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-800">
                  Instant results
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Upload a contract and get your full report in under 60 seconds
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F0]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#E8614D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 24V16" />
                    <path d="M16 24V10" />
                    <path d="M25 24V19" />
                    <path d="M5 24h22" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-800">
                  Severity scoring
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Every flag rated High, Medium, or Low so you know what to push
                  back on first
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F0]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#E8614D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M16 7v14" />
                    <path d="M9 22h14" />
                    <path d="M16 7 6 14h6" />
                    <path d="m16 7 10 7h-6" />
                    <path d="M6 14c1.8 3 4.2 3 6 0" />
                    <path d="M20 14c1.8 3 4.2 3 6 0" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-800">
                  Fairer alternatives
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Not just what&apos;s wrong — what the clause should say instead
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2F0]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#E8614D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="16" cy="18" r="8" />
                    <path d="M16 18v-5" />
                    <path d="m16 18 3.5 2" />
                    <path d="m22 7 4 1-1 3.5" />
                    <path d="m26 8-3 1.5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-800">
                  Review history
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Every contract saved so you can compare terms across clients
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="px-6 py-28 md:py-36">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>What it catches</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                The clauses that cost freelancers thousands
              </h2>
              <div className="mt-10 space-y-8">
                <ScrollReveal delay={0}>
                  <div className="border-l-2 border-[#E8614D]/30 pl-5">
                    <h3 className="font-semibold text-stone-800">
                      Payment terms
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      Net-90 windows, missing deposits, payment gated on vague
                      acceptance criteria
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <div className="border-l-2 border-[#E8614D]/30 pl-5">
                    <h3 className="font-semibold text-stone-800">
                      Scope and revisions
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      Unlimited revision clauses, vague deliverables, no
                      change-order process
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={160}>
                  <div className="border-l-2 border-[#E8614D]/30 pl-5">
                    <h3 className="font-semibold text-stone-800">
                      IP and ownership
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      Pre-existing tools swept into assignment, IP transferred
                      before you&apos;re paid
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={240}>
                  <div className="border-l-2 border-[#E8614D]/30 pl-5">
                    <h3 className="font-semibold text-stone-800">
                      Liability and indemnification
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      Uncapped liability, broad indemnity obligations, overbroad
                      warranties
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={320}>
                  <div className="border-l-2 border-[#E8614D]/30 pl-5">
                    <h3 className="font-semibold text-stone-800">Termination</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      Client can walk with no kill fee, no notice period,
                      one-sided cancellation
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal>
              <div className="relative rounded-xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]">
                <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-[#E8614D]" />
                <span className="inline-block rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                  High
                </span>
                <h3 className="mt-3 text-lg font-semibold text-stone-800">
                  Payment terms
                </h3>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-stone-500">
                  <p>
                    <span className="font-medium text-stone-800">
                      What it says:
                    </span>{" "}
                    Payment is due within 90 days of project completion and
                    client acceptance.
                  </p>
                  <p>
                    <span className="font-medium text-stone-800">
                      Why it matters:
                    </span>{" "}
                    Net-90 with an acceptance gate means the client can delay
                    payment indefinitely by withholding approval. Most
                    freelancers can&apos;t float three months of unpaid work.
                  </p>
                  <p>
                    <span className="font-medium text-stone-800">
                      Fairer version:
                    </span>{" "}
                    Payment due within 30 days of invoice. 50% deposit due before
                    work begins.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="mx-auto h-px w-16 bg-stone-200" />

        <section id="pricing" className="scroll-mt-24 px-6 py-28 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel align="center">Pricing</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              One bad clause costs more than a year of TrackSign.
            </h2>
            <div className="mx-auto mt-14 grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-8">
              <ScrollReveal delay={0}>
                <div className="rounded-2xl border border-stone-200 bg-white p-8">
                  <p className="text-lg font-bold text-stone-900">Free</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
                    $0
                  </p>
                  <div className="mt-8 space-y-3 text-sm text-stone-600">
                    <p>
                      <span className="text-stone-400">✓</span> 1 contract review
                    </p>
                    <p>
                      <span className="text-stone-400">✓</span> Severity ratings
                    </p>
                    <p>
                      <span className="text-stone-400">✓</span> Summary flags
                    </p>
                    <p>
                      <span className="text-stone-300">✗</span> Full explanations
                    </p>
                    <p>
                      <span className="text-stone-300">✗</span> Saved history
                    </p>
                  </div>
                  <a
                    href="/sign-up"
                    className="mt-6 block rounded-full border border-stone-300 px-6 py-2.5 text-center text-sm font-medium text-stone-600 transition-all duration-200 hover:bg-stone-50"
                  >
                    Get started
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="relative rounded-2xl border border-[#E8614D]/40 bg-white p-8 shadow-[0_0_20px_-5px_rgba(232,97,77,0.15)]">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E8614D] px-3 py-1 text-xs font-medium text-white">
                    Popular
                  </span>
                  <p className="text-lg font-bold text-stone-900">Pro</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
                    $39
                    <span className="text-base font-normal text-stone-500">
                      /mo
                    </span>
                  </p>
                  <div className="mt-8 space-y-3 text-sm text-stone-600">
                    <p>
                      <span className="text-green-500">✓</span> Unlimited reviews
                    </p>
                    <p>
                      <span className="text-green-500">✓</span> Severity ratings
                    </p>
                    <p>
                      <span className="text-green-500">✓</span> Full explanations
                    </p>
                    <p>
                      <span className="text-green-500">✓</span> Fairer version
                      suggestions
                    </p>
                    <p>
                      <span className="text-green-500">✓</span> Saved review
                      history
                    </p>
                  </div>
                  <a
                    href="/sign-up"
                    className={`mt-6 block text-center ${coralButtonClass} px-6 py-2.5`}
                  >
                    Start free trial
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="px-6 py-28 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel align="center">FAQ</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-base text-stone-500">
              Everything you need to know about TrackSign.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <FAQ />
          </div>
        </section>

        <ScrollReveal>
          <section className="px-6 py-28 text-center md:py-36">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Stop signing contracts you haven&apos;t read carefully.
            </h2>
            <a href="/sign-up" className={`mt-8 inline-block ${coralButtonClass}`}>
              Review your first contract free →
            </a>
            <p className="mt-4 text-sm text-stone-400">
              Free. No credit card. Takes under two minutes.
            </p>
          </section>
        </ScrollReveal>
      </main>

      <footer className="border-t border-stone-200 px-6 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto mb-6 block h-1.5 w-1.5 rounded-full bg-[#E8614D]" />
          <p className="text-sm text-stone-400">
            TrackSign flags terms worth reviewing with a qualified lawyer. It
            does not provide legal advice.
          </p>
          <p className="mt-2 text-sm text-stone-400">
            © 2026 TrackSign. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
