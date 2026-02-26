"use client";

import { ScrollReveal } from "./scroll-reveal";
import { DocsQuickStartSubsection } from "./docs-quick-start-subsection";
import { DocsCliReferenceSubsection } from "./docs-cli-reference-subsection";
import { DocsAiAgentsSubsection } from "./docs-ai-agents-subsection";

/** Docs / How-To section — Quick Start, CLI Reference, For AI Agents */
export function DocsSection() {
  return (
    <section
      id="docs"
      className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)]"
    >
      {/* Header */}
      <ScrollReveal className="flex flex-col gap-4 px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          DOCUMENTATION
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none max-w-[800px]">
          EVERYTHING YOU NEED TO KNOW
        </h2>
        <p className="font-body text-[15px] text-[var(--text-primary)] leading-[1.6] max-w-[560px]">
          From install to deploy in 60 seconds. Full CLI reference below.
        </p>
      </ScrollReveal>

      {/* 2-col grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <DocsQuickStartSubsection />
        <DocsCliReferenceSubsection />
        <DocsAiAgentsSubsection />
      </div>
    </section>
  );
}
