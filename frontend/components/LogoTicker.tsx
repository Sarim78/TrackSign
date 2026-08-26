/**
 * LogoTicker — scrolling “trusted by” names on the landing page.
 */

"use client";

const names = [
  "PixelCraft Studio",
  "Devbridge",
  "Folio Agency",
  "NorthStar Design",
  "Stackline Digital",
];

const LogoTicker = () => {
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
        Trusted by businesses and professionals worldwide.
      </p>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #171412 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #171412 0%, transparent 100%)" }}
        />
        <div className="flex w-max animate-logo-ticker">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
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
};

export default LogoTicker;
