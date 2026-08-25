/**
 * PrivacyPage — privacy policy copy for TrackSign.
 *
 * Route: /privacy
 * Dependencies: Navbar, Footer
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PrivacyPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        {/* TODO [BACKEND]: Have a lawyer review */}
        <p className="mb-4 text-xs" style={{ color: "#666" }}>
          Last updated: August 2026
        </p>
        <h1 className="mb-4 text-3xl font-semibold">Privacy policy</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          This policy explains how TrackSign collects, uses, and stores your information.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Information we collect</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Email, name, and uploaded contract text.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">How we use your information</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          To provide contract review services and improve our product.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Data storage</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Your data is stored securely on encrypted servers. Contract text is stored to provide review history.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Third parties</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          We do not sell your data. We use third-party services for authentication (Clerk), payments (Stripe), and AI analysis (Anthropic).
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Data deletion</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          You can delete your account and all associated data at any time from your settings.
        </p>
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">Contact</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Questions about privacy? Email{" "}
          <a href="mailto:privacy@tracksign.com" rel="noopener noreferrer" style={{ color: "#E8614D" }}>
            privacy@tracksign.com
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
