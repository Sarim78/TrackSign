export default function Navbar() {
  return (
    <nav
      className="fixed top-0 z-50 w-full backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(23, 20, 18, 0.9)",
        borderBottom: "1px solid #2a2722",
      }}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="/" className="text-sm font-semibold">
          TrackSign
        </a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="/#features" className="text-[13px] text-[#999] hover:text-[#EDEDED]">
            Features
          </a>
          <a href="/#faq" className="text-[13px] text-[#999] hover:text-[#EDEDED]">
            FAQ
          </a>
          <a href="#" className="text-[13px] text-[#999] hover:text-[#EDEDED]">
            Blog
          </a>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <a href="/sign-in" className="text-[13px] text-[#999] hover:text-[#EDEDED]">
            Sign in
          </a>
          <a
            href="/sign-up"
            className="rounded-md px-3 py-1.5 text-[13px] hover:opacity-90 md:px-3.5"
            style={{ border: "1px solid #2a2722" }}
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
