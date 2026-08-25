import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function StatusPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <h1 className="mb-4 text-3xl font-semibold">System status</h1>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: "#999" }}>
          Current operational status of TrackSign services.
        </p>
        {/* TODO: Connect to real status monitoring */}
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: "#1e1c18", border: "1px solid #2a2722" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#22C55E" }}>
            All systems operational
          </p>
          <div className="mt-4 flex justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
            <p className="text-sm">Web app</p>
            <p className="text-sm" style={{ color: "#22C55E" }}>
              Operational
            </p>
          </div>
          <div className="flex justify-between py-3" style={{ borderBottom: "1px solid #2a2722" }}>
            <p className="text-sm">API</p>
            <p className="text-sm" style={{ color: "#22C55E" }}>
              Operational
            </p>
          </div>
          <div className="flex justify-between py-3">
            <p className="text-sm">Contract analysis</p>
            <p className="text-sm" style={{ color: "#22C55E" }}>
              Operational
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
