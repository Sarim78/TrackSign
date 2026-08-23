import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-28 text-center md:pt-36">
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#EDEDED] md:text-7xl lg:text-8xl">
            Review contracts
            <br />
            <span className="text-[#E8614D]">before you sign.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#999] md:text-base">
            TrackSign scans your freelance contracts with AI and flags risky,
            unfair, or unusual terms. Plain-English explanations, severity
            ratings, and fairer alternatives.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/sign-up"
              className="rounded-md bg-[#E8614D] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#D4503E]"
            >
              Start scanning free →
            </a>
            <a
              href="#sample"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-[#EDEDED] transition-all duration-200 hover:bg-white/5"
            >
              View sample report
            </a>
          </div>
        </section>

        <section className="mx-auto mb-8 mt-16 max-w-5xl px-6">
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#1A1A1A]">
            <div className="relative flex h-8 items-center border-b border-white/[0.06] bg-[#111111] px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <p className="absolute left-1/2 -translate-x-1/2 text-[11px] text-[#555]">
                tracksign.com/dashboard
              </p>
            </div>

            <div className="flex min-h-[400px]">
              <aside className="hidden w-56 shrink-0 border-r border-white/[0.06] bg-[#111111] md:block">
                <p className="mb-6 px-4 pt-4 text-xs font-semibold text-[#EDEDED]">
                  TrackSign
                </p>
                <p className="mb-2 px-4 text-[10px] tracking-wider text-[#555]">
                  THIS WEEK
                </p>
                <div className="bg-white/[0.04] px-4 py-2 text-xs text-[#999]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#E8614D]" />
                  Client Contract Review
                </div>
                <div className="px-4 py-2 text-xs text-[#999]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#E8614D]" />
                  NDA — Acme Corp
                </div>
                <div className="px-4 py-2 text-xs text-[#999]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#E8614D]" />
                  SOW — Design Sprint
                </div>
                <p className="mb-2 mt-4 px-4 text-[10px] tracking-wider text-[#555]">
                  LAST MONTH
                </p>
                <div className="px-4 py-2 text-xs text-[#999]">
                  Freelance Agreement
                </div>
                <div className="px-4 py-2 text-xs text-[#999]">
                  Subcontractor Terms
                </div>
              </aside>

              <div className="min-w-0 flex-1 p-6">
                <h2 className="mb-1 text-lg font-semibold text-[#EDEDED]">
                  Client Contract Review
                </h2>
                <p className="mb-4 text-xs text-[#555]">Uploaded Aug 22, 2026</p>
                <div className="mb-6 flex flex-wrap gap-4">
                  <div className="rounded-lg border border-white/[0.06] bg-[#111111] px-4 py-3">
                    <p className="text-[10px] text-[#555]">Flags</p>
                    <p className="text-xl font-semibold text-[#EDEDED]">6</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-[#111111] px-4 py-3">
                    <p className="text-[10px] text-[#555]">High risk</p>
                    <p className="text-xl font-semibold text-[#EF4444]">3</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-[#111111] px-4 py-3">
                    <p className="text-[10px] text-[#555]">Score</p>
                    <p className="text-xl font-semibold text-[#F59E0B]">42/100</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] py-3">
                    <div>
                      <p className="text-sm font-medium text-[#EDEDED]">
                        Payment terms
                      </p>
                      <p className="text-xs text-[#666]">
                        Net-90 with acceptance gate
                      </p>
                    </div>
                    <p className="shrink-0 text-xs text-[#EF4444]">High</p>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] py-3">
                    <div>
                      <p className="text-sm font-medium text-[#EDEDED]">Scope</p>
                      <p className="text-xs text-[#666]">Unlimited revisions</p>
                    </div>
                    <p className="shrink-0 text-xs text-[#F59E0B]">Medium</p>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] py-3">
                    <div>
                      <p className="text-sm font-medium text-[#EDEDED]">
                        IP ownership
                      </p>
                      <p className="text-xs text-[#666]">
                        Pre-existing tools assigned
                      </p>
                    </div>
                    <p className="shrink-0 text-xs text-[#EF4444]">High</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-t border-white/[0.06] py-16">
          <p className="mb-8 text-center text-sm text-[#666]">
            Trusted by freelancers and agencies worldwide.
          </p>
          {/* Replace with real client logos when available */}
          <div className="flex flex-wrap items-center justify-center gap-12 px-6">
            <p className="text-sm font-semibold tracking-wide text-[#444] md:text-base">
              PixelCraft Studio
            </p>
            <p className="text-sm font-semibold tracking-wide text-[#444] md:text-base">
              Devbridge
            </p>
            <p className="text-sm font-semibold tracking-wide text-[#444] md:text-base">
              Folio Agency
            </p>
            <p className="text-sm font-semibold tracking-wide text-[#444] md:text-base">
              NorthStar Design
            </p>
            <p className="text-sm font-semibold tracking-wide text-[#444] md:text-base">
              Stackline Digital
            </p>
          </div>
        </section>

        <section id="features" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold leading-snug md:text-2xl">
                <span className="text-[#E8614D]">Catch risky clauses</span>{" "}
                <span className="text-[#EDEDED]">before they cost you</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#999]">
                TrackSign reviews every clause against a checklist built for
                freelance contracts. Payment terms, scope, IP, liability,
                termination — flagged with severity ratings so you know what to
                push back on.
              </p>
              <a
                href="#sample"
                className="mt-4 inline-block text-sm font-medium text-[#E8614D] transition-colors duration-200 hover:underline"
              >
                Learn about risk scanning →
              </a>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#1A1A1A] p-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] py-2.5">
                <p className="text-sm text-[#EDEDED]">Payment terms</p>
                <p className="text-xs text-[#EF4444]">High</p>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.06] py-2.5">
                <p className="text-sm text-[#EDEDED]">Scope and revisions</p>
                <p className="text-xs text-[#F59E0B]">Medium</p>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <p className="text-sm text-[#EDEDED]">IP ownership</p>
                <p className="text-xs text-[#EF4444]">High</p>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
            <div className="md:order-2">
              <h2 className="text-xl font-semibold leading-snug md:text-2xl">
                <span className="text-[#EDEDED]">Not just what&apos;s wrong —</span>{" "}
                <span className="text-[#E8614D]">what&apos;s fairer.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#999]">
                Every flag includes a plain-English explanation and a fairer
                alternative. Know exactly what to ask your client to change, or
                what to bring to your lawyer.
              </p>
              <a
                href="#sample"
                className="mt-4 inline-block text-sm font-medium text-[#E8614D] transition-colors duration-200 hover:underline"
              >
                See a sample report →
              </a>
            </div>
            <div
              id="sample"
              className="scroll-mt-24 rounded-xl border border-white/[0.08] bg-[#1A1A1A] p-5 md:order-1"
            >
              <p className="mb-3 text-sm font-semibold text-[#EDEDED]">
                Payment terms
              </p>
              <p className="mb-1 text-xs text-[#666]">Current:</p>
              <p className="mb-4 text-sm text-[#999]">
                Payment due 90 days after completion and acceptance.
              </p>
              <p className="mb-1 text-xs text-[#E8614D]">Fairer version:</p>
              <p className="text-sm text-[#EDEDED]">
                Payment due within 30 days of invoice. 50% deposit before work
                begins.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold leading-snug md:text-2xl">
                <span className="text-[#E8614D]">Review history</span>{" "}
                <span className="text-[#EDEDED]">track every contract</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#999]">
                Every review is saved. Compare terms across clients, track which
                contracts had the worst clauses, and build a record of what
                you&apos;ve signed.
              </p>
              <a
                href="#pricing"
                className="mt-4 inline-block text-sm font-medium text-[#E8614D] transition-colors duration-200 hover:underline"
              >
                Learn about review history →
              </a>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#1A1A1A] p-4">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] py-3">
                <div>
                  <p className="text-sm text-[#EDEDED]">
                    Client Contract — Acme Corp
                  </p>
                  <p className="text-xs text-[#666]">3 high · 2 medium</p>
                </div>
                <p className="shrink-0 text-xs text-[#555]">Aug 22</p>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] py-3">
                <div>
                  <p className="text-sm text-[#EDEDED]">NDA — Folio Agency</p>
                  <p className="text-xs text-[#666]">1 high · 0 medium</p>
                </div>
                <p className="shrink-0 text-xs text-[#555]">Aug 18</p>
              </div>
              <div className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-sm text-[#EDEDED]">SOW — Design Sprint</p>
                  <p className="text-xs text-[#666]">0 high · 3 medium</p>
                </div>
                <p className="shrink-0 text-xs text-[#555]">Aug 10</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-[#EDEDED]">Pricing</h2>
          <p className="mb-12 text-sm text-[#999]">
            One bad clause costs more than a year of TrackSign.
          </p>
          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-[#1A1A1A] p-8">
              <p className="text-lg font-semibold text-[#EDEDED]">Free</p>
              <p className="mt-2 text-4xl font-semibold text-[#EDEDED]">$0</p>
              <div className="my-6 border-t border-white/[0.08]" />
              <p className="py-1.5 text-sm text-[#999]">1 contract review</p>
              <p className="py-1.5 text-sm text-[#999]">Severity ratings</p>
              <p className="py-1.5 text-sm text-[#999]">Summary flags</p>
              <a
                href="/sign-up"
                className="mt-6 block w-full rounded-md border border-white/20 py-2.5 text-center text-sm font-medium text-[#EDEDED] transition-all duration-200 hover:bg-white/5"
              >
                Get started
              </a>
            </div>
            <div className="rounded-xl border border-[#E8614D]/30 bg-[#1A1A1A] p-8">
              <p className="text-lg font-semibold text-[#EDEDED]">Pro</p>
              <p className="mt-2 text-4xl font-semibold text-[#EDEDED]">
                $39
                <span className="text-base font-normal text-[#666]">/mo</span>
              </p>
              <div className="my-6 border-t border-white/[0.08]" />
              <p className="py-1.5 text-sm text-[#999]">Unlimited reviews</p>
              <p className="py-1.5 text-sm text-[#999]">Severity ratings</p>
              <p className="py-1.5 text-sm text-[#999]">Full explanations</p>
              <p className="py-1.5 text-sm text-[#999]">Fairer alternatives</p>
              <p className="py-1.5 text-sm text-[#999]">Saved history</p>
              <a
                href="/sign-up"
                className="mt-6 block w-full rounded-md bg-[#E8614D] py-2.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-[#D4503E]"
              >
                Start free trial
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
          <h2 className="mb-8 text-2xl font-semibold text-[#EDEDED]">FAQ</h2>
          <FAQ />
        </section>

        <section className="px-6 py-32 text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-[#EDEDED] md:text-7xl">
            Try TrackSign.
          </h2>
          <a
            href="/sign-up"
            className="mt-8 inline-block rounded-md bg-[#E8614D] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#D4503E]"
          >
            Start scanning free →
          </a>
          <p className="mt-4 text-sm text-[#666]">Free. No credit card.</p>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div>
              <p className="mb-4 text-sm font-medium text-[#EDEDED]">Product</p>
              <div className="space-y-3">
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  FAQ
                </a>
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Changelog
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-medium text-[#EDEDED]">
                Resources
              </p>
              <div className="space-y-3">
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Documentation
                </a>
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Blog
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Support
                </a>
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Status
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-medium text-[#EDEDED]">Company</p>
              <div className="space-y-3">
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Careers
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-medium text-[#EDEDED]">Legal</p>
              <div className="space-y-3">
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Terms of service
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Privacy policy
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  Not legal advice
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-medium text-[#EDEDED]">Connect</p>
              <div className="space-y-3">
                <a
                  href="https://x.com"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://linkedin.com"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  className="block text-sm text-[#666] transition-colors duration-200 hover:text-[#999]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row">
            <p className="text-xs text-[#555]">
              © 2026 TrackSign. All rights reserved.
            </p>
            <p className="text-xs text-[#555]">
              TrackSign does not provide legal advice.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
