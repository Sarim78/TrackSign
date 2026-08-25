/**
 * AboutPage — company story and product positioning.
 *
 * Route: /about
 * Dependencies: Navbar, Footer
 */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">About TrackSign</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          TrackSign is an AI-powered contract review tool built for freelancers and small digital agencies. We help independent professionals understand what they are signing before they sign it.
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
          Most freelancers sign contracts without a lawyer reviewing them. They miss net-90 payment terms, unlimited revision clauses, and IP assignments that hand over their pre-existing tools. TrackSign catches these patterns and explains them in plain English, so you know exactly what to push back on.
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
          We are not a law firm and TrackSign is not legal advice. We flag the clauses worth reviewing with a qualified lawyer.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
