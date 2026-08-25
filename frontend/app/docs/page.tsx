import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Documentation</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Everything you need to get started with TrackSign.
        </p>
        {/* TODO: Expand with full documentation */}
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Getting started</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Upload a PDF contract and TrackSign scans every clause against a risk checklist built for freelance and agency contracts. You get a plain-English report with severity ratings and fairer alternatives.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Supported formats</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          TrackSign currently supports PDF files up to 20MB. DOCX support is coming soon.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Understanding your report</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Each flagged clause includes three parts: what the clause says, why it matters, and a fairer version you can propose to your client. Flags are rated High, Medium, or Low severity.
        </p>
      </main>
      <Footer />
    </>
  );
}
