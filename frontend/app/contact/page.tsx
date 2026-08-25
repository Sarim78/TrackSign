"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Contact us</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          Get in touch with the TrackSign team.
        </p>
        {/* TODO: Wire up form submission to backend or email service */}
        <form
          className="mt-8 max-w-lg rounded-xl p-6"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="name" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mb-4 w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          <label htmlFor="email" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mb-4 w-full rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          <label htmlFor="message" className="mb-1.5 block text-xs" style={{ color: "#999" }}>
            Message
          </label>
          <textarea
            id="message"
            className="h-32 w-full resize-none rounded-md px-3 py-2.5 text-sm"
            style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-md px-5 py-2.5 text-sm text-white"
            style={{ backgroundColor: "#E8614D" }}
          >
            Send message
          </button>
          <p className="mt-4 text-xs" style={{ color: "#666" }}>
            Or email us directly at{" "}
            <a href="mailto:support@tracksign.com" style={{ color: "#E8614D" }}>
              support@tracksign.com
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
