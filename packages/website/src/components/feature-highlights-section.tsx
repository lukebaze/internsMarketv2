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
    title: "FULL PERSONALITY",
    description:
      "Each intern ships with a complete persona — voice, tone, decision-making style, and memory. No more prompt loops.",
  },
  {
    icon: Monitor,
    title: "MULTI-RUNTIME",
    description:
      "Deploy interns to Claude, GPT, Gemini, local models, or your own custom runtime. Works everywhere.",
  },
  {
    icon: Terminal,
    title: "CLI-NATIVE",
    description:
      "Built for developers who live in the terminal. Install, configure, and deploy without leaving your workflow.",
  },
  {
    icon: Cpu,
    title: "INDEPENDENT AGENTS",
    description:
      "Each intern runs as an independent agent with its own context, memory, and execution thread. Run your whole team in parallel.",
  },
  {
    icon: Puzzle,
    title: "MODULAR SKILLS",
    description:
      "55+ specialized abilities across writing, coding, research, design, and operations. Mix and match skills across your intern team.",
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
      <Icon size={24} className="text-[var(--text-primary)]" strokeWidth={2} />
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
          WHY INTERNSMARKET?
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          BUILT FOR BUILDERS
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
