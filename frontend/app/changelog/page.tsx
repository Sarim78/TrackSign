/**
 * ChangelogPage — public product update list.
 *
 * Route: /changelog
 * Dependencies: Navbar, Footer
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ChangelogPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Changelog</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          All notable updates and improvements to TrackSign.
        </p>
        {/* TODO [BACKEND]: Replace with real changelog entries */}
        <h2 className="mt-8 mb-3 text-lg font-semibold text-[#EDEDED]">August 2026</h2>
        <p className="text-sm font-semibold text-[#EDEDED]">Launch</p>
        <p className="mt-1 text-sm" style={{ color: "#999" }}>
          Initial release of TrackSign with AI contract review, severity ratings, and fairer version suggestions.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default ChangelogPage;
