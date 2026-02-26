"use client";

import { Terminal } from "lucide-react";
import { AnimatedTerminal } from "./animated-terminal";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedCounter } from "./animated-counter";

/** Mini stat item with animated counter */
function StatItem({
  target,
  suffix,
  prefix,
  label,
  valueColor,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  valueColor: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <AnimatedCounter
        target={target}
        suffix={suffix}
        prefix={prefix}
        className={`font-display text-[36px] font-black leading-none tabular-nums ${valueColor}`}
      />
      <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
        {label}
      </span>
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

      {/* Desktop layout */}
      <div className="hidden lg:block relative h-[600px]">
        {/* Left content */}
        <div className="absolute flex flex-col gap-8" style={{ left: 48, top: 80, width: 660 }}>
          <ScrollReveal>
            <h2 className="flex flex-col gap-1">
              <span className="font-display text-[80px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
                STOP PROMPTING.
              </span>
              <span className="font-display text-[80px] font-black text-[var(--accent)] leading-[0.95] uppercase">
                START HIRING.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6] max-w-[480px]">
              Your next teammate has a name, a voice, and opinions. Interview them in 30 seconds. Deploy in one command. Walk away.
            </p>
          </ScrollReveal>

          {/* Mini stats row */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-start gap-10">
              <StatItem target={500} suffix="+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
              <StatItem target={1.2} suffix="K" label="USERS" valueColor="text-[var(--warm-white)]" />
              <StatItem target={11} suffix="" label="AI INTERNS" valueColor="text-[var(--accent)]" />
            </div>
          </ScrollReveal>

          {/* Tagline badge */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[var(--accent)]" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
                FULL IDENTITY · ONE COMMAND · YOUR RUNTIME
              </span>
            </div>
          </ScrollReveal>
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
          <AnimatedTerminal />

          {/* CTA Button */}
          <a
            href="#install"
            className="block w-full bg-[var(--accent-bright)] py-[22px] px-8 text-center no-underline mt-0 hover:opacity-90 transition-opacity"
          >
            <span className="font-display text-[26px] font-black text-white tracking-wide">
              HIRE YOUR FIRST INTERN FREE →
            </span>
          </a>

          <p className="font-body text-[12px] text-[var(--brown-light)] text-center mt-3">
            3 interns free forever · No credit card · No subscription
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col gap-8 px-6 py-16">
        <ScrollReveal>
          <h2 className="flex flex-col gap-1">
            <span className="font-display text-[48px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
              STOP PROMPTING.
            </span>
            <span className="font-display text-[48px] font-black text-[var(--accent)] leading-[0.95] uppercase">
              START HIRING.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6]">
            Your next teammate has a name, a voice, and opinions. Interview them in 30 seconds. Deploy in one command. Walk away.
          </p>
        </ScrollReveal>

        {/* Mini stats */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-start gap-8">
            <StatItem target={500} suffix="+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
            <StatItem target={1.2} suffix="K" label="USERS" valueColor="text-[var(--warm-white)]" />
            <StatItem target={11} suffix="" label="AI INTERNS" valueColor="text-[var(--accent)]" />
          </div>
        </ScrollReveal>

        {/* Tagline badge */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[var(--accent)]" />
            <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
              FULL IDENTITY · ONE COMMAND · YOUR RUNTIME
            </span>
          </div>
        </ScrollReveal>

        {/* Demo video player */}
        <AnimatedTerminal />

        {/* CTA Button */}
        <a
          href="#install"
          className="block w-full bg-[var(--accent-bright)] py-5 px-8 text-center no-underline hover:opacity-90 transition-opacity"
        >
          <span className="font-display text-[22px] font-black text-white tracking-wide">
            HIRE YOUR FIRST INTERN FREE →
          </span>
        </a>

        <p className="font-body text-[12px] text-[var(--brown-light)] text-center">
          3 interns free forever · No credit card · No subscription
        </p>
      </div>
    </section>
  );
}
