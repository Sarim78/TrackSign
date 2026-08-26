/**
 * Footer — site-wide marketing footer with product, legal, and social links.
 */

interface FooterLinkProps {
  href: string;
  children: string;
  external?: boolean;
}

const FooterLink = ({ href, children, external }: FooterLinkProps) => {
  return (
    <a
      href={href}
      className="block text-sm text-[#555] hover:text-[#999]"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="mt-20 overflow-x-hidden" style={{ borderTop: "1px solid #2a2722" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
              Product
            </p>
            <div className="space-y-2.5">
              <FooterLink href="/#features">Features</FooterLink>
              <FooterLink href="/#faq">FAQ</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
              Resources
            </p>
            <div className="space-y-2.5">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
              <FooterLink href="/status">Status</FooterLink>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
              Company
            </p>
            <div className="space-y-2.5">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
              Legal
            </p>
            <div className="space-y-2.5">
              <FooterLink href="/terms">Terms of service</FooterLink>
              <FooterLink href="/privacy">Privacy policy</FooterLink>
              <FooterLink href="/disclaimer">Not legal advice</FooterLink>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
              Connect
            </p>
            <div className="space-y-2.5">
              <FooterLink href="https://linkedin.com/company/tracksign" external>
                LinkedIn
              </FooterLink>
            </div>
          </div>
        </div>
        <div
          className="mt-8 flex flex-col items-center justify-between gap-4 pt-6 md:flex-row"
          style={{ borderTop: "1px solid #2a2722" }}
        >
          <p className="text-xs" style={{ color: "#444" }}>
            © 2026 TrackSign
          </p>
          <p className="text-center text-xs" style={{ color: "#444" }}>
            TrackSign does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
