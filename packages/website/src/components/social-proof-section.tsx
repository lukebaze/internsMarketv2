"use client";

import { ShieldCheck, Lock, EyeOff } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { AnimatedCounter } from "./animated-counter";

const stats = [
  { target: 500, suffix: "+", label: "GITHUB STARS" },
  { target: 1.2, suffix: "K", label: "DISCORD MEMBERS" },
  { target: 55, suffix: "+", label: "SPECIALIZED SKILLS" },
  { target: 11, suffix: "", label: "AI INTERNS READY" },
];

const testimonials = [
  {
    quote:
      '"Jordan has a writing voice. An actual voice — not a prompt template. Ship time dropped 60% because I stopped rewriting AI output. Cost: $0."',
    attribution: "ALEX CHEN, SOLO FOUNDER",
    hasBorder: true,
  },
  {
    quote:
      '"I interviewed Marcus, liked his style, deployed him in 30 seconds. He automated our CI/CD pipeline by the weekend. No hand-holding."',
    attribution: "SARAH KIM, CTO @ DEVSTACK",
    hasBorder: true,
  },
  {
    quote:
      '"These aren\'t chatbots. They have personality, catchphrases, opinions. Ethan literally told me my PR needed work — and he was right."',
    attribution: "JAMES PARK, INDIE HACKER",
    hasBorder: false,
  },
];

const trustItems = [
  { icon: ShieldCheck, text: "NO EXTERNAL API CALLS" },
  { icon: Lock, text: "RUNS LOCALLY ON YOUR MACHINE" },
  { icon: EyeOff, text: "YOUR DATA, YOUR CONTROL" },
];

export function SocialProofSection() {
  return (
    <section className="w-full bg-[var(--bg-black)] border-t-2 border-[var(--stroke)] px-12 py-16 flex flex-col gap-12">
      {/* Stats Row */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center gap-0 flex-1">
            <div className="flex flex-col items-center gap-2 flex-1">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                duration={1.8}
                className="font-display text-[36px] md:text-[64px] font-black text-[var(--text-inverted)] leading-[0.9] tabular-nums"
              />
              <span className="font-body text-[13px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                {stat.label}
              </span>
            </div>
            {index < stats.length - 1 && (
              <div className="hidden md:block w-[2px] h-[80px] bg-[var(--text-muted-dark)] flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Testimonials Row */}
      <div className="flex flex-col md:flex-row w-full">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.attribution} delay={i * 0.15} className="flex-1">
            <div
              className={`flex flex-col gap-4 p-6 h-full ${
                t.hasBorder ? "md:border-r-2 border-[var(--text-muted-dark)]" : ""
              }`}
            >
              <p className="font-body text-[13px] text-[var(--text-inverted)] leading-[1.5]">
                {t.quote}
              </p>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                {t.attribution}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Trust Bar */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {trustItems.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="text-[var(--text-muted)]" aria-hidden="true" />
              <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
