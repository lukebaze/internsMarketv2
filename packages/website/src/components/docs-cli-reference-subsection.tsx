"use client";

import { ScrollReveal } from "./scroll-reveal";

const cliCommands = [
  { cmd: "im setup", desc: "Authenticate and configure your workspace" },
  { cmd: "im install", desc: "Install an intern from the registry" },
  { cmd: "im update", desc: "Update an installed intern to latest version" },
  { cmd: "im remove", desc: "Uninstall an intern from your workspace" },
  { cmd: "im list", desc: "List all installed interns" },
  { cmd: "im activate", desc: "Activate an intern for the current session" },
  { cmd: "im status", desc: "Show status of all installed interns" },
  { cmd: "im apply", desc: "Deploy an intern to run a task" },
];

/** CLI Reference subsection — table of all 8 commands */
export function DocsCliReferenceSubsection() {
  return (
    <ScrollReveal delay={0.2} className="flex flex-col gap-5 p-6 border-b-2 border-[var(--stroke)]">
      <span className="font-display text-[18px] font-black text-[var(--text-primary)] tracking-[1px]">
        CLI REFERENCE
      </span>
      <div className="flex flex-col divide-y divide-[var(--stroke)]">
        {cliCommands.map((item) => (
          <div key={item.cmd} className="flex items-baseline gap-4 py-2">
            <code className="font-mono text-[12px] text-[var(--accent)] shrink-0 w-[120px]">
              {item.cmd}
            </code>
            <span className="font-body text-[12px] text-[var(--text-primary)] leading-[1.5]">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
