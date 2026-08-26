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
          TrackSign is an AI-powered contract review tool built for businesses and professionals. We help anyone who signs contracts understand what they are agreeing to before they sign.
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#999" }}>
          Most people sign contracts without a lawyer reviewing every clause. They miss unfavorable payment terms, one-sided liability clauses, and IP assignments that quietly transfer valuable rights. TrackSign catches these patterns and explains them in plain English, so you know exactly what to ask about or push back on.
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
