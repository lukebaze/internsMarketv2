"use client";

export interface InternCardProps {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  isLast?: boolean;
}

const tierBgClass: Record<string, string> = {
  free: "bg-[var(--free-tier)]",
  starter: "bg-[var(--starter-tier)]",
  pro: "bg-[var(--pro-tier)]",
};

export function InternCard({
  name,
  role,
  tier,
  quote,
  skills,
  image,
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
            {tier}
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
      <div className="mt-auto pt-2">
        {tier === "free" ? (
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--bg-black)] text-[var(--text-inverted)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline"
          >
            INSTALL NOW
          </a>
        ) : (
          <a
            href="#pricing"
            className="block w-full bg-transparent text-[var(--text-primary)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline border-[1.5px] border-[var(--stroke)]"
          >
            UPGRADE TO UNLOCK
          </a>
        )}
      </div>
    </div>
  );
}
