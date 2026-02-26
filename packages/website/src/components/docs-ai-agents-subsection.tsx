"use client";

import { CopyableCodeBlock } from "./copyable-code-block";
import { ScrollReveal } from "./scroll-reveal";

/** For AI Agents subsection — llm.txt info and curl command */
export function DocsAiAgentsSubsection() {
  return (
    <ScrollReveal delay={0.3} className="flex flex-col gap-5 p-6 border-b-2 border-[var(--stroke)]">
      <span className="font-display text-[18px] font-black text-[var(--text-primary)] tracking-[1px]">
        FOR AI AGENTS
      </span>
      <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.6]">
        Building with AI? Point your agent to{" "}
        <a
          href="/llm.txt"
          className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-bright)] transition-colors"
        >
          /llm.txt
        </a>{" "}
        for machine-readable documentation.
      </p>
      <CopyableCodeBlock code="curl https://internsmarket.com/llm.txt" variant="card" />
    </ScrollReveal>
  );
}
