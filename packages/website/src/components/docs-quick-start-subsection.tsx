"use client";

import { CopyableCodeBlock } from "./copyable-code-block";
import { ScrollReveal } from "./scroll-reveal";

const quickStartSteps = [
  { label: "1. Install the CLI", code: "npm install -g internsmarket" },
  { label: "2. Pick your intern", code: "im install content-marketing-intern" },
  { label: "3. Deploy them", code: "im apply content-marketing-intern" },
];

/** Quick Start subsection — 3 copyable install steps */
export function DocsQuickStartSubsection() {
  return (
    <ScrollReveal delay={0.1} className="flex flex-col gap-5 p-6 border-b-2 border-r-0 md:border-r-2 border-[var(--stroke)]">
      <span className="font-display text-[18px] font-black text-[var(--text-primary)] tracking-[1px]">
        QUICK START
      </span>
      <div className="flex flex-col gap-3">
        {quickStartSteps.map((step) => (
          <div key={step.code} className="flex flex-col gap-1">
            <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1px] uppercase">
              {step.label}
            </span>
            <CopyableCodeBlock code={step.code} variant="card" />
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
