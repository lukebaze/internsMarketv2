"use client";

// Nav link definitions with explicit hrefs and optional external target
const navLinks = [
  { label: "DOCS", href: "https://docs.internsmarket.com", external: true },
  { label: "PRICING", href: "#pricing", external: false },
  { label: "GALLERY", href: "#gallery", external: false },
  { label: "DISCORD", href: "https://discord.gg/internsmarket", external: true },
];

export function NavigationBar() {
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
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] no-underline hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Upgrade button — scrolls to pricing */}
          <a
            href="#pricing"
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--text-inverted)] px-5 py-2 no-underline hover:bg-[var(--text-inverted)] hover:text-[#040404] transition-colors"
          >
            UPGRADE
          </a>
        </div>
      </div>
    </nav>
  );
}
