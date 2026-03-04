"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { interns, type Intern } from "@/data/interns-data";
import { InternCard } from "@/components/intern-card";
import { InternDetailOverlay } from "@/components/intern-detail-overlay";
import { ScrollReveal } from "@/components/scroll-reveal";

/** Deterministic shuffle using a simple seed-based approach */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function MarqueeRow({
  items,
  direction,
  duration,
  onSelect,
}: {
  items: Intern[];
  direction: "left" | "right";
  duration: string;
  onSelect: (intern: Intern) => void;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className="group overflow-hidden">
      <div
        className="intern-marquee-track flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {doubled.map((intern, i) => (
          <InternCard
            key={`${intern.name}-${i}`}
            {...intern}
            onClick={() => onSelect(intern)}
          />
        ))}
      </div>
    </div>
  );
}

export function InternCatalogSection() {
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const shuffledInterns = useMemo(() => shuffleArray(interns), []);

  return (
    <section id="gallery" className="w-full bg-[var(--bg-black)] overflow-hidden">
      {/* Header */}
      <ScrollReveal className="flex flex-col gap-4 px-6 sm:px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          THE INTERVIEW ROOM
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          MEET THEM BEFORE YOU HIRE THEM
        </h2>
        <p className="font-body text-[13px] text-[var(--text-primary)]">
          11 AI personas. Real personalities. Real catchphrases. 3 are free — no strings attached.
        </p>
      </ScrollReveal>

      {/* Marquee rows — opposite directions, different speeds */}
      <div className="flex flex-col gap-4 pb-12">
        <MarqueeRow
          items={interns}
          direction="left"
          duration="60s"
          onSelect={setSelectedIntern}
        />
        <MarqueeRow
          items={shuffledInterns}
          direction="right"
          duration="65s"
          onSelect={setSelectedIntern}
        />
      </div>

      {/* Fly-out overlay */}
      <AnimatePresence>
        {selectedIntern && (
          <InternDetailOverlay
            intern={selectedIntern}
            onClose={() => setSelectedIntern(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
