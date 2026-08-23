"use client";

// Replace with real client logos when available
const names = [
  "PixelCraft Studio",
  "Devbridge",
  "Folio Agency",
  "NorthStar Design",
  "Stackline Digital",
];

export default function LogoTicker() {
  return (
    <section
      className="mb-16 py-10 md:mb-20 md:py-12"
      style={{
        backgroundColor: "#1e1c18",
        borderTop: "1px solid #2a2722",
        borderBottom: "1px solid #2a2722",
      }}
    >
      <p className="mb-5 text-center text-xs" style={{ color: "#666" }}>
        Trusted by freelancers and agencies worldwide.
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-logo-ticker">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-8 pr-8 md:gap-10 md:pr-10"
              aria-hidden={copy === 1}
            >
              {names.map((name) => (
                <span
                  key={`${copy}-${name}`}
                  className="whitespace-nowrap text-xs font-semibold sm:text-sm"
                  style={{ color: "#444" }}
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
