"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g internsmarket");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="relative w-full min-h-[700px] bg-[var(--bg-black)] flex items-center">
      {/* Background: avatar image grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0.5 opacity-60">
        {[
          "/images/jordan-lee.jpg",
          "/images/mia-santos.jpg",
          "/images/tomoko-nakamura.jpg",
          "/images/alex-rivera.jpg",
          "/images/ethan-hale.jpg",
          "/images/luna-sage.jpg",
          "/images/marcus-chen.jpg",
          "/images/nadia-okafor.jpg",
          "/images/priya-sharma.jpg",
          "/images/sam-patel.jpg",
          "/images/sofia-reyes.jpg",
          "/images/jordan-lee.jpg",
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width={400}
            height={233}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Gradient overlay: bottom opaque → top transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #1D1916FF 0%, #1D1916E6 25%, #1D1916B3 50%, #1D191666 75%, #1D191633 100%)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 w-full flex flex-col gap-8 justify-center px-6 py-12 md:px-16 md:py-20">
        {/* Headline */}
        <h1 className="font-display text-5xl md:text-[96px] font-black text-[var(--text-inverted)] leading-none max-w-[900px] uppercase">
          Hire, Train &amp; Deploy Your Personal AI Intern in One Click
        </h1>

        {/* Subheadline */}
        <p className="font-body text-base text-[var(--text-muted-light)] leading-relaxed max-w-[600px]">
          InternsMarket ships full-stack AI personas — personality, skills,
          memory, voice. Install free. Buy once to unlock the full team.
        </p>

        {/* Button row */}
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-7 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors"
          >
            INSTALL FREE
          </a>
          <a
            href="#pricing"
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--warm-white)] px-7 py-[14px] text-center bg-transparent hover:bg-white/10 transition-colors"
          >
            SEE PRICING
          </a>
        </div>

        {/* Code block */}
        <div className="inline-flex items-center gap-3 bg-[#2D1810CC] px-6 py-[14px] self-start">
          <span className="font-mono text-[14px] text-[var(--text-muted)]">$</span>
          <span className="font-mono text-[14px] text-[var(--text-inverted)]">
            npm install -g internsmarket
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy install command"
            className="text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <span className="font-mono text-[12px] text-[var(--accent)]">
              Copied!
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
