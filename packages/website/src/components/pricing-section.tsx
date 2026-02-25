const freeFeatures = [
  "✓  1 concurrent intern",
  "✓  3 free tier interns",
  "✓  Multi-runtime support",
  "✓  CLI management",
  "✓  Community Discord",
];

const starterFeatures = [
  "✓  5 concurrent interns",
  "✓  All 11 interns unlocked",
  "✓  Multi-runtime support",
  "✓  Email support",
  "✓  Community Discord",
  "✓  CLI management",
];

const proFeatures = [
  "✓  Unlimited concurrent interns",
  "✓  All interns incl. Sofia",
  "✓  Custom runtime integration",
  "✓  Email support",
  "✓  Multi-runtime support",
  "✓  Community Discord",
];

const enterpriseFeatures = [
  "✓  Unlimited everything",
  "✓  Priority support + SLA",
  "✓  Dedicated account manager",
  "✓  Custom integrations",
];

function FeatureList({
  features,
  textClass,
}: {
  features: string[];
  textClass: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {features.map((f) => (
        <span key={f} className={`font-body text-[13px] leading-[1.5] ${textClass}`}>
          {f}
        </span>
      ))}
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)] px-12 py-16 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 w-full">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          PRICING
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          SIMPLE, TRANSPARENT PRICING
        </h2>
        <p className="font-body text-[13px] text-[var(--text-muted-dark)]">
          Start free. Scale when you need to.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Free Tier */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              FREE
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9]">
                $0
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                /MONTH
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={freeFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <button className="w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-black/5 transition-colors cursor-pointer">
            INSTALL NOW
          </button>
        </div>

        {/* Starter Tier (Highlighted) */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--brown-dark)]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="self-start font-body text-[11px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-3 py-[6px] rounded-[4px]">
                MOST POPULAR
              </span>
              <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-inverted)]">
                STARTER
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-inverted)] leading-[0.9]">
                $9
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                /MONTH
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--text-muted-dark)]" />
            <FeatureList features={starterFeatures} textClass="text-[var(--text-inverted)]" />
          </div>
          <button className="w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-6 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors cursor-pointer border-none">
            UPGRADE
          </button>
        </div>

        {/* Pro Tier */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              PRO
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9]">
                $19
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                /MONTH
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={proFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <button className="w-full font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] bg-[var(--bg-black)] px-6 py-[14px] text-center hover:bg-black/80 transition-colors cursor-pointer border-none">
            UPGRADE
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              ENTERPRISE
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9]">
                CUSTOM
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                CONTACT US
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={enterpriseFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <button className="w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-black/5 transition-colors cursor-pointer">
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
}
