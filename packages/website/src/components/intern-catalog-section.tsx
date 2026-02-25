"use client";

import { useState } from "react";
import { interns } from "@/data/interns-data";
import { InternCard } from "@/components/intern-card";

type TierFilter = "ALL" | "free" | "starter" | "pro";

const FILTER_BUTTONS: { label: string; value: TierFilter }[] = [
  { label: "ALL", value: "ALL" },
  { label: "FREE", value: "free" },
  { label: "STARTER", value: "starter" },
  { label: "PRO", value: "pro" },
];

// Submit card rendered at the end of the grid
function SubmitCard({ isLast }: { isLast: boolean }) {
  const borderClass = isLast
    ? "border-b-2 border-[var(--stroke)]"
    : "border-b-2 border-r-2 border-[var(--stroke)]";

  return (
    <div className={`flex flex-col gap-3 p-6 bg-[var(--warm-white)] ${borderClass}`}>
      {/* Avatar area */}
      <div className="w-full h-[200px] bg-[var(--warm-bg)] flex items-center justify-center flex-shrink-0">
        <span className="font-display text-[48px] font-black text-[var(--text-muted-dark)] leading-none">
          ?
        </span>
      </div>

      {/* Name + badge row */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="font-display text-[22px] font-black text-[var(--text-primary)] leading-tight"
          style={{ letterSpacing: "1px" }}
        >
          YOUR INTERN
        </span>
        <span className="bg-[var(--bg-black)] rounded-[4px] px-[10px] py-1 flex-shrink-0">
          <span
            className="font-body text-[11px] font-bold text-[var(--text-inverted)] uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            COMING SOON
          </span>
        </span>
      </div>

      {/* Role */}
      <span className="font-body text-[13px] text-[var(--text-muted-dark)]">
        Could Be Yours
      </span>

      {/* Description */}
      <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.5]">
        Build your own AI intern with custom personality, skills, and voice.
        Publish to the marketplace.
      </p>

      {/* CTA */}
      <div className="mt-auto pt-2">
        <button className="w-full bg-[var(--accent)] text-[var(--text-primary)] font-body text-[13px] font-bold px-5 py-[10px] text-center cursor-pointer border-none">
          SUBMIT YOUR INTERN
        </button>
      </div>
    </div>
  );
}

export function InternCatalogSection() {
  const [activeFilter, setActiveFilter] = useState<TierFilter>("ALL");

  const filtered =
    activeFilter === "ALL"
      ? interns
      : interns.filter((i) => i.tier === activeFilter);

  // Show submit card only on ALL filter
  const showSubmit = activeFilter === "ALL";

  // Grid is 4 cols on desktop; compute isLast per row of 4
  const totalCards = filtered.length + (showSubmit ? 1 : 0);

  function isLastInRow(index: number): boolean {
    return (index + 1) % 4 === 0 || index === totalCards - 1;
  }

  return (
    <section className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)]">
      {/* Header */}
      <div className="flex flex-col gap-4 px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          THE INTERN ROSTER
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          MEET YOUR AI TEAM
        </h2>
        <p className="font-body text-[13px] text-[var(--text-primary)]">
          11 specialized personas. 55 skills. Pick your team.
        </p>

        {/* Filter row */}
        <div className="flex flex-row gap-2 flex-wrap">
          {FILTER_BUTTONS.map(({ label, value }) => {
            const isActive = activeFilter === value;
            return (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={[
                  "font-body text-[11px] font-bold px-3 py-[6px] cursor-pointer border-none rounded-[4px] transition-colors",
                  "tracking-[0.5px]",
                  isActive
                    ? "bg-[var(--bg-black)] text-[var(--text-inverted)]"
                    : "bg-transparent text-[var(--text-primary)] border-[1.5px] border-[var(--stroke)] !border-[1.5px]",
                ].join(" ")}
                style={!isActive ? { border: "1.5px solid var(--stroke)" } : {}}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {filtered.map((intern, index) => (
          <InternCard
            key={intern.name}
            {...intern}
            isLast={isLastInRow(index)}
          />
        ))}
        {showSubmit && (
          <SubmitCard isLast={isLastInRow(filtered.length)} />
        )}
      </div>
    </section>
  );
}
