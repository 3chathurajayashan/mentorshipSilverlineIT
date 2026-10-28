import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Mentors", href: "#mentors" },
  { label: "Programs", href: "#programs" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full font-sans antialiased transition-colors duration-300 ${
        scrolled || open
          ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/10"
          : "bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-transparent"
      }`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5 md:h-[44px]"
      >
        {/* Logo */}
        <a
          href="/"
          className="text-[19px] font-semibold tracking-[-0.022em] text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors hover:text-[#0071e3]"
          aria-label="MentorShip home"
        >
          Mentor<span className="text-[#ee0a0a]">Ship</span>
        </a>
        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[12px] tracking-[-0.01em] text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="/signin"
            className="text-[12px] tracking-[-0.01em] text-[#0066cc] transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-sm"
          >
            Sign in
          </a>
          <a
            href="/signup"
            className="rounded-full bg-[#ee0a0a] px-3.5 py-1 text-[12px] font-normal tracking-[-0.01em] text-white transition-colors hover:bg-[#0077ed] active:bg-[#006edb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
          >
            Sign up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-[18px]">
            <span
              className={`absolute left-0 block h-[1.5px] w-full bg-[#1d1d1f] transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-full bg-[#1d1d1f] transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-12 bottom-0 overflow-y-auto bg-white/95 backdrop-blur-xl transition-all duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <ul className="px-8 pt-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="border-b border-black/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 px-8 pt-8">
          <a
            href="/signup"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#0071e3] py-3 text-center text-[17px] text-white transition-colors hover:bg-[#0077ed]"
          >
            Sign up
          </a>
          <a
            href="/signin"
            onClick={() => setOpen(false)}
            className="rounded-full border border-[#0071e3] py-3 text-center text-[17px] text-[#0066cc] transition-colors hover:bg-[#0071e3]/5"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
