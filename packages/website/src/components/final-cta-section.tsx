"use client";

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

      {/* Single responsive centered layout */}
      <div className="flex flex-col items-center text-center gap-8 px-6 md:px-16 py-16 md:py-20 max-w-[800px] mx-auto">
        <ScrollReveal>
          <h2 className="flex flex-col gap-1">
            <span className="font-display text-[48px] md:text-[80px] font-black text-[var(--text-primary)] leading-[0.95] uppercase">
              STOP PROMPTING.
            </span>
            <span className="font-display text-[48px] md:text-[80px] font-black text-[var(--accent)] leading-[0.95] uppercase">
              START HIRING.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6] max-w-[480px] mx-auto">
            Your next teammate has a name, a voice, and opinions. Browse the roster. Start your free trial. Walk away.
          </p>
        </ScrollReveal>

        {/* Mini stats row */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-start gap-8 md:gap-10 justify-center">
            <StatItem target={1.2} suffix="K" label="USERS" valueColor="text-[var(--text-primary)]" />
            <StatItem target={11} suffix="" label="AI INTERNS" valueColor="text-[var(--accent)]" />
            <StatItem target={55} suffix="+" label="SKILLS" valueColor="text-[var(--text-primary)]" />
          </div>
        </ScrollReveal>

        {/* Tagline badge */}
        <ScrollReveal delay={0.4}>
          <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
            FULL IDENTITY &middot; 3-DAY TRIAL &middot; CANCEL ANYTIME
          </span>
        </ScrollReveal>

        {/* CTA */}
        <a
          href="#gallery"
          className="block w-full max-w-[400px] bg-[var(--accent-bright)] py-5 px-8 text-center no-underline hover:opacity-90 transition-opacity"
        >
          <span className="font-display text-[22px] md:text-[26px] font-black text-white tracking-wide">
            BROWSE INTERNS &rarr;
          </span>
        </a>

        <p className="font-body text-[12px] text-[var(--text-muted)] text-center">
          3-day free trial &middot; No credit card &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
