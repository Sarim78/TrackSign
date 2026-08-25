import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        {/* TODO: Have a lawyer review and finalize these terms */}
        <p className="mb-4 text-xs" style={{ color: "#666" }}>
          Last updated: August 2026
        </p>
        <h1 className="mb-4 text-3xl font-semibold">Terms of service</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          These terms govern your use of TrackSign. Please read them carefully.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Acceptance of terms</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          By using TrackSign, you agree to these terms.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Description of service</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          TrackSign provides AI-powered contract review. It does not provide legal advice.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">User accounts</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          You are responsible for maintaining the security of your account.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Payment and billing</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Paid plans are billed monthly. You can cancel at any time.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Limitation of liability</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          TrackSign is provided as-is. We are not liable for decisions made based on our reports.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Changes to terms</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          We may update these terms. Continued use constitutes acceptance.
        </p>
      </main>
      <Footer />
    </>
  );
}
