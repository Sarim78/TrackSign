import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Support</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Need help? We&apos;re here for you.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Email</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Reach us at{" "}
          <a href="mailto:support@tracksign.com" style={{ color: "#E8614D" }}>
            support@tracksign.com
          </a>{" "}
          for any questions or issues.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Response time</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          We typically respond within 24 hours on business days.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">FAQ</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Check our FAQ for answers to common questions.
        </p>
        <a href="/#faq" className="mt-3 inline-block text-sm" style={{ color: "#E8614D" }}>
          View FAQ →
        </a>
      </main>
      <Footer />
    </>
  );
}
