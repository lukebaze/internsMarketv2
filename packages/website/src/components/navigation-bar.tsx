"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

// Nav link definitions with explicit hrefs and optional external target
const navLinks = [
  { label: "DOCS", href: "https://docs.internsmarket.com", external: true },
  { label: "PRICING", href: "#pricing", external: false },
  { label: "GALLERY", href: "#gallery", external: false },
  { label: "DISCORD", href: "https://discord.gg/internsmarket", external: true },
];

export function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--bg-black)]">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-[22px] font-black text-[var(--text-inverted)] tracking-[1px] no-underline"
        >
          INTERNSMARKET
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
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

          {/* Get started button — scrolls to pricing */}
          <a
            href="#pricing"
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--text-inverted)] px-5 py-2 no-underline hover:bg-[var(--text-inverted)] hover:text-[var(--bg-black)] transition-colors"
          >
            GET STARTED
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden bg-transparent border-none p-1 text-[var(--text-inverted)] cursor-pointer"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[var(--bg-black)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMobileOpen(false)}
              className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] no-underline hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--text-inverted)] px-5 py-2 no-underline text-center hover:bg-[var(--text-inverted)] hover:text-[var(--bg-black)] transition-colors"
          >
            GET STARTED
          </a>
        </div>
      )}
    </nav>
  );
}
