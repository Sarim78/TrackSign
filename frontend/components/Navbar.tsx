export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#0C0C0C]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
        <a href="/" className="text-sm font-semibold tracking-wide text-[#EDEDED]">
          TrackSign
        </a>
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-[13px] text-[#999] transition-colors duration-200 hover:text-[#EDEDED]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-[13px] text-[#999] transition-colors duration-200 hover:text-[#EDEDED]"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-[13px] text-[#999] transition-colors duration-200 hover:text-[#EDEDED]"
          >
            FAQ
          </a>
          <a
            href="#features"
            className="text-[13px] text-[#999] transition-colors duration-200 hover:text-[#EDEDED]"
          >
            Blog
          </a>
        </div>
        <div className="flex items-center">
          <a
            href="/sign-in"
            className="text-[13px] text-[#999] transition-colors duration-200 hover:text-[#EDEDED]"
          >
            Sign in
          </a>
          <span className="mx-3 h-4 w-px bg-white/10" />
          <a
            href="/sign-up"
            className="rounded-md border border-white/20 px-3.5 py-1.5 text-[13px] font-medium text-[#EDEDED] transition-all duration-200 hover:bg-white/5"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
