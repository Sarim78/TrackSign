/**
 * Footer — site-wide marketing footer with product, legal, and social links.
 */

const Footer = () => {
  return (
    <footer className="mt-20 overflow-x-hidden" style={{ borderTop: "1px solid #2a2722" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-8">
          <div>
            <p className="mb-4 text-sm font-medium">Product</p>
            <div className="space-y-3">
              <a href="/#features" className="block text-sm" style={{ color: "#666" }}>
                Features
              </a>
              <a href="/#faq" className="block text-sm" style={{ color: "#666" }}>
                FAQ
              </a>
              <a href="/changelog" className="block text-sm" style={{ color: "#666" }}>
                Changelog
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Resources</p>
            <div className="space-y-3">
              <a href="/docs" className="block text-sm" style={{ color: "#666" }}>
                Documentation
              </a>
              <a href="/blog" className="block text-sm" style={{ color: "#666" }}>
                Blog
              </a>
              <a href="/support" className="block text-sm" style={{ color: "#666" }}>
                Support
              </a>
              <a href="/status" className="block text-sm" style={{ color: "#666" }}>
                Status
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Company</p>
            <div className="space-y-3">
              <a href="/about" className="block text-sm" style={{ color: "#666" }}>
                About
              </a>
              <a href="/careers" className="block text-sm" style={{ color: "#666" }}>
                Careers
              </a>
              <a href="/contact" className="block text-sm" style={{ color: "#666" }}>
                Contact
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Legal</p>
            <div className="space-y-3">
              <a href="/terms" className="block text-sm" style={{ color: "#666" }}>
                Terms of service
              </a>
              <a href="/privacy" className="block text-sm" style={{ color: "#666" }}>
                Privacy policy
              </a>
              <a href="/disclaimer" className="block text-sm" style={{ color: "#666" }}>
                Not legal advice
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Connect</p>
            <div className="space-y-3">
              <a
                href="https://linkedin.com/company/tracksign"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm"
                style={{ color: "#666" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-6 md:flex-row"
          style={{ borderTop: "1px solid #2a2722" }}
        >
          <p className="text-xs" style={{ color: "#555" }}>
            © 2026 TrackSign. All rights reserved.
          </p>
          <p className="text-center text-xs" style={{ color: "#555" }}>
            TrackSign does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
