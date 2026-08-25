import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">Careers</h1>
        <p className="text-sm leading-relaxed" style={{ color: "#999" }}>
          We are a small team building tools for freelancers.
        </p>
        <div
          className="mt-8 rounded-xl p-12 text-center"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="text-sm" style={{ color: "#999" }}>
            No open positions right now. Check back later or follow us on LinkedIn for updates.
          </p>
          <a
            href="https://linkedin.com/company/tracksign"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm"
            style={{ color: "#E8614D" }}
          >
            LinkedIn
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
