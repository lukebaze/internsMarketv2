"use client";

export function NavigationBar() {
  const navLinks = ["DOCS", "PRICING", "GALLERY", "DISCORD"];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#040404]">
      <div className="flex items-center justify-between px-12 py-4">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-[22px] font-black text-[var(--text-inverted)] tracking-[1px] no-underline"
        >
          INTERNSMARKET
        </a>

        {/* Right nav */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] no-underline hover:text-[var(--accent)] transition-colors"
            >
              {link}
            </a>
          ))}

          {/* Upgrade button */}
          <a
            href="#upgrade"
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--text-inverted)] px-5 py-2 no-underline hover:bg-[var(--text-inverted)] hover:text-[#040404] transition-colors"
          >
            UPGRADE
          </a>
        </div>
      </div>
    </nav>
  );
}
