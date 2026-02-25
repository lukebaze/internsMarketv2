"use client";

import { BUNDLE_PRICES } from "@/data/interns-data";

export interface InternCardProps {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  price: number;
  isLast?: boolean;
}

const tierBgClass: Record<string, string> = {
  free: "bg-[var(--free-tier)]",
  starter: "bg-[var(--starter-tier)]",
  pro: "bg-[var(--pro-tier)]",
};

// Badge label: free shows "FREE", paid tiers show their price
function tierBadgeLabel(tier: string, price: number): string {
  if (tier === "free") return "FREE";
  return `$${price}`;
}

export function InternCard({
  name,
  role,
  tier,
  quote,
  skills,
  image,
  price,
  isLast = false,
}: InternCardProps) {
  const borderClass = isLast
    ? "border-b-2 border-[var(--stroke)]"
    : "border-b-2 border-r-2 border-[var(--stroke)]";

  return (
    <div className={`flex flex-col gap-3 p-6 bg-[var(--warm-white)] ${borderClass}`}>
      {/* Avatar image */}
      <div className="w-full h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          width={400}
          height={200}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Name + tier badge row */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="font-display text-[22px] font-black text-[var(--text-primary)] leading-tight"
          style={{ letterSpacing: "1px" }}
        >
          {name}
        </span>
        <span
          className={`${tierBgClass[tier]} rounded-[4px] px-[10px] py-1 flex-shrink-0`}
        >
          <span
            className="font-body text-[11px] font-bold text-[var(--text-inverted)] uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            {tierBadgeLabel(tier, price)}
          </span>
        </span>
      </div>

      {/* Role */}
      <span className="font-body text-[13px] text-[var(--text-primary)]">
        {role}
      </span>

      {/* Skills */}
      <div className="flex flex-row flex-wrap gap-[6px]">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-body text-[11px] text-[var(--text-muted-dark)] border border-[var(--brown-light)] rounded-[4px] px-2 py-[2px]"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Quote */}
      <p
        className="font-body text-[13px] italic text-[var(--text-primary)] leading-[1.5] overflow-hidden"
        style={{ maxHeight: "40px" }}
      >
        {quote}
      </p>

      {/* CTA button */}
      <div className="mt-auto pt-2 flex flex-col gap-1">
        {tier === "free" ? (
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--bg-black)] text-[var(--text-inverted)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline hover:bg-[var(--brown-dark)] transition-colors"
          >
            INSTALL FREE
          </a>
        ) : (
          <>
            <a
              href={`https://polar.sh/internsmarket/products/${name.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[var(--bg-black)] text-[var(--text-inverted)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline hover:bg-[var(--brown-dark)] transition-colors"
            >
              BUY FOR ${price}
            </a>
            <span className="font-body text-[11px] text-[var(--text-muted-dark)] text-center">
              or get all interns for ${BUNDLE_PRICES.starter}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
