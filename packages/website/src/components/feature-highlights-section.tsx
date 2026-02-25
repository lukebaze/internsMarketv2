import { User, Monitor, Terminal, Cpu, Puzzle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: User,
    title: "BORN, NOT CONFIGURED",
    description:
      "Each intern has a neural personality matrix — creativity, empathy, logic, charisma scores that shape every decision. Catchphrases. Mood triggers. Backstory. This isn't a prompt template. It's a person.",
  },
  {
    icon: Monitor,
    title: "INTERVIEW BEFORE YOU HIRE",
    description:
      "Browse the roster. Read their quotes. Check their skills and personality traits. Know exactly who you're deploying before you commit. Try free interns first — no credit card.",
  },
  {
    icon: Terminal,
    title: "ONE COMMAND. DEPLOYED.",
    description:
      "Install → Apply → Done. Your intern is live in your runtime in under 60 seconds. No config files. No API keys. No setup wizard. Just the terminal.",
  },
  {
    icon: Cpu,
    title: "AUTONOMOUS, NOT ASSISTIVE",
    description:
      "These aren't chatbots waiting for your prompt. Each intern runs independently with its own memory, context, and execution thread. Delegate and walk away.",
  },
  {
    icon: Puzzle,
    title: "55+ REAL SKILLS. 10+ HRS SAVED/WEEK.",
    description:
      "Blog writing. CI/CD pipelines. Code reviews. Data analysis. UX research. Each intern ships with 3–5 battle-tested skills that replace real workflows — not demo toys.",
  },
];

function FeatureCard({
  feature,
  borderClass,
}: {
  feature: FeatureCard;
  borderClass: string;
}) {
  const Icon = feature.icon;
  return (
    <div className={`flex-1 flex flex-col gap-4 p-6 ${borderClass}`}>
      <Icon size={24} className="text-[var(--text-primary)]" strokeWidth={2} aria-hidden="true" />
      <span className="font-display text-[22px] font-black text-[var(--text-primary)] tracking-[1px]">
        {feature.title}
      </span>
      <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.5]">
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureHighlightsSection() {
  const topRow = features.slice(0, 3);
  const bottomRow = features.slice(3, 5);

  return (
    <section className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)]">
      {/* Header */}
      <div className="flex flex-col gap-4 px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          NOT ANOTHER AI WRAPPER
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          FULL IDENTITY. NOT RAW SKILLS.
        </h2>
      </div>

      {/* Top row: 3 cards */}
      <div className="flex flex-col md:flex-row w-full">
        {topRow.map((feature, index) => {
          const isLast = index === topRow.length - 1;
          const borderClass = isLast
            ? "border-b-2 border-[var(--stroke)]"
            : "border-r-2 border-b-2 border-[var(--stroke)]";
          return (
            <FeatureCard
              key={feature.title}
              feature={feature}
              borderClass={borderClass}
            />
          );
        })}
      </div>

      {/* Bottom row: 2 cards */}
      <div className="flex flex-col md:flex-row w-full">
        {bottomRow.map((feature, index) => {
          const isLast = index === bottomRow.length - 1;
          const borderClass = isLast
            ? "border-b-2 border-[var(--stroke)]"
            : "border-r-2 border-b-2 border-[var(--stroke)]";
          return (
            <FeatureCard
              key={feature.title}
              feature={feature}
              borderClass={borderClass}
            />
          );
        })}
      </div>
    </section>
  );
}
