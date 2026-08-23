export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/50 bg-[#FAF9F6]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-stone-900">
          TrackSign
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-stone-500 transition-colors duration-200 hover:text-stone-900"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-stone-500 transition-colors duration-200 hover:text-stone-900"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/sign-in"
            className="text-sm text-stone-500 transition-colors duration-200 hover:text-stone-900"
          >
            Sign in
          </a>
          <a
            href="/sign-up"
            className="rounded-full bg-[#E8614D] px-5 py-2 text-sm font-medium text-white shadow-[0_4px_14px_-3px_rgba(232,97,77,0.4)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#D4503E] hover:shadow-[0_6px_20px_-3px_rgba(232,97,77,0.5)]"
          >
            Try it free
          </a>
        </div>
      </div>
    </nav>
  );
}
