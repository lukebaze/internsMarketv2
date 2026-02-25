"use client";

import { Terminal, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";

// Terminal body lines data
const terminalLines = [
  { text: "$ npm install -g internsmarket", color: "text-[var(--text-inverted)]", copyable: "npm install -g internsmarket" },
  { text: "✓ installed v2.4.0", color: "text-[#84CC6A]" },
  { spacer: true },
  { text: "$ im install content-marketing-intern", color: "text-[var(--text-inverted)]", copyable: "im install content-marketing-intern" },
  { text: "→ Verifying signature... ✓", color: "text-[#B0A08E]" },
  { text: "→ Jordan Lee ready for interview", color: "text-[#B0A08E]" },
  { spacer: true },
  { text: "$ im apply content-marketing-intern", color: "text-[var(--text-inverted)]", copyable: "im apply content-marketing-intern" },
  { text: "🚀 Jordan deployed — \"Let me craft that narrative.\"", color: "text-[#F5B041]" },
] as const;

// Mini stat item
function StatItem({ value, label, valueColor }: { value: string; label: string; valueColor: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-display text-[36px] font-black leading-none tabular-nums ${valueColor}`}>{value}</span>
      <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">{label}</span>
    </div>
  );
}

// Copyable terminal line
function CopyableLine({ text, color, copyText }: { text: string; color: string; copyText: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [copyText]);

  return (
    <div className="flex items-center gap-2 group">
      <span className={`font-mono text-[13px] leading-[1.8] ${color} flex-1`}>{text}</span>
      <button
        onClick={handleCopy}
        aria-label={`Copy: ${copyText}`}
        className="text-[#9C8B7A] hover:text-[var(--text-inverted)] transition-colors cursor-pointer bg-transparent border-none p-0 shrink-0 opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
}

// Terminal window component
function TerminalWindow() {
  return (
    <div className="flex flex-col w-full border-2 border-[var(--terminal-border)]">
      {/* Title bar */}
      <div className="flex items-center h-11 px-[18px] bg-[#1A1714]">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#E87461]" />
          <div className="w-3 h-3 rounded-full bg-[#F5C842]" />
          <div className="w-3 h-3 rounded-full bg-[#84CC6A]" />
        </div>
        <span className="font-body text-[13px] font-medium text-[#9C8B7A] flex-1 text-center">
          internsmarket — zsh
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[6px] px-5 py-6 bg-[#141210]">
        {terminalLines.map((line, i) => {
          if ("spacer" in line) {
            return <div key={i} className="h-1" />;
          }
          if ("copyable" in line && line.copyable) {
            return <CopyableLine key={i} text={line.text} color={line.color} copyText={line.copyable} />;
          }
          return (
            <span key={i} className={`font-mono text-[13px] leading-[1.8] ${line.color}`}>
              {line.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FinalCtaSection() {
  return (
    <section className="relative w-full bg-[var(--bg-black)] border-t-2 border-[var(--bg-black)]">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-[var(--accent)]" />
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[var(--accent)]" />

      {/* Desktop layout: absolute positioned inner container */}
      <div className="hidden lg:block relative h-[600px]">
        {/* Left content */}
        <div className="absolute flex flex-col gap-8" style={{ left: 48, top: 80, width: 660 }}>
          {/* Headlines */}
          <h2 className="flex flex-col gap-1">
            <span className="font-display text-[80px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
              STOP PROMPTING.
            </span>
            <span className="font-display text-[80px] font-black text-[var(--accent)] leading-[0.95] uppercase">
              START HIRING.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6] max-w-[480px]">
            Your next teammate has a name, a voice, and opinions. Interview them in 30 seconds. Deploy in one command. Walk away.
          </p>

          {/* Mini stats row */}
          <div className="flex items-start gap-10">
            <StatItem value="500+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
            <StatItem value="1.2K" label="USERS" valueColor="text-[var(--warm-white)]" />
            <StatItem value="11" label="AI INTERNS" valueColor="text-[var(--accent)]" />
          </div>

          {/* Tagline badge */}
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[var(--accent)]" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
              FULL IDENTITY · ONE COMMAND · YOUR RUNTIME
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          className="absolute bg-[var(--brown-mid)]"
          style={{ left: 730, top: 80, width: 2, height: 440 }}
        />

        {/* Right panel */}
        <div
          className="absolute flex flex-col"
          style={{ left: 760, top: 60, width: 620, height: 480 }}
        >
          <TerminalWindow />

          {/* CTA Button */}
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--accent-bright)] py-[22px] px-8 text-center no-underline mt-0 hover:opacity-90 transition-opacity"
          >
            <span className="font-display text-[26px] font-black text-white tracking-wide">
              HIRE YOUR FIRST INTERN FREE →
            </span>
          </a>

          {/* Subtitle */}
          <p className="font-body text-[12px] text-[var(--brown-light)] text-center mt-3">
            3 interns free forever · No credit card · No subscription
          </p>
        </div>
      </div>

      {/* Mobile layout: flex column */}
      <div className="lg:hidden flex flex-col gap-8 px-6 py-16">
        {/* Headlines */}
        <h2 className="flex flex-col gap-1">
          <span className="font-display text-[48px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
            STOP PROMPTING.
          </span>
          <span className="font-display text-[48px] font-black text-[var(--accent)] leading-[0.95] uppercase">
            START HIRING.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6]">
          Your next teammate has a name, a voice, and opinions. Interview them in 30 seconds. Deploy in one command. Walk away.
        </p>

        {/* Mini stats */}
        <div className="flex items-start gap-8">
          <StatItem value="500+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
          <StatItem value="1.2K" label="USERS" valueColor="text-[var(--warm-white)]" />
          <StatItem value="11" label="AI INTERNS" valueColor="text-[var(--accent)]" />
        </div>

        {/* Tagline badge */}
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[var(--accent)]" />
          <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
            FULL IDENTITY · ONE COMMAND · YOUR RUNTIME
          </span>
        </div>

        {/* Terminal */}
        <TerminalWindow />

        {/* CTA Button */}
        <a
          href="https://www.npmjs.com/package/internsmarket"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[var(--accent-bright)] py-5 px-8 text-center no-underline hover:opacity-90 transition-opacity"
        >
          <span className="font-display text-[22px] font-black text-white tracking-wide">
            HIRE YOUR FIRST INTERN FREE →
          </span>
        </a>

        {/* Subtitle */}
        <p className="font-body text-[12px] text-[var(--brown-light)] text-center">
          3 interns free forever · No credit card · No subscription
        </p>
      </div>
    </section>
  );
}
