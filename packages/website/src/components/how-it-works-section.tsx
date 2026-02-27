"use client";

import { CopyableCodeBlock } from "./copyable-code-block";
import { ScrollReveal } from "./scroll-reveal";

const cards = [
  {
    number: "01",
    title: "INSTALL THE CLI",
    description:
      "One command. 60 seconds. You now have access to 11 AI interns with full personalities, skills, and voice.",
    code: "npm install -g internsmarket",
  },
  {
    number: "02",
    title: "INTERVIEW YOUR INTERN",
    description:
      "Browse the roster. Read their bios, catchphrases, and skill sets. Pick the right person for the job — 3 are free to try.",
    code: "im install content-marketing-intern",
  },
  {
    number: "03",
    title: "DEPLOY & WALK AWAY",
    description:
      "One command. Your intern is live — writing content, reviewing code, or running pipelines. No babysitting required.",
    code: "im apply content-marketing-intern",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)]">
      {/* Header */}
      <ScrollReveal className="flex flex-col gap-4 px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          HOW IT WORKS
        </span>
        {/* Flowgram: inline tag blocks with breadcrumb arrows */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {["INTERVIEW", "HIRE", "DEPLOY", "DONE"].map((step, i) => (
            <div key={step} className="flex items-center gap-3 md:gap-4">
              <span className="font-display text-[28px] md:text-[48px] lg:text-[64px] font-black text-[var(--text-primary)] leading-none border-b-[3px] md:border-b-4 border-[var(--text-primary)] pb-1 md:pb-2">
                {step}
              </span>
              {i < 3 && (
                <span className="font-display text-[28px] md:text-[48px] lg:text-[64px] font-black text-[var(--text-muted-dark)] leading-none select-none">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Cards row */}
      <div className="flex flex-col md:flex-row w-full">
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          const borderClass = isLast
            ? "border-b-2 border-[var(--stroke)]"
            : "border-r-2 border-b-2 border-[var(--stroke)]";

          return (
            <ScrollReveal key={card.number} delay={index * 0.15} className="flex-1">
              <div className={`flex flex-col gap-5 p-6 ${borderClass}`}>
                <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9]">
                  {card.number}
                </span>
                <span className="font-display text-[22px] font-black text-[var(--text-primary)] tracking-[1px]">
                  {card.title}
                </span>
                <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.5]">
                  {card.description}
                </p>
                <CopyableCodeBlock code={card.code} variant="card" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
