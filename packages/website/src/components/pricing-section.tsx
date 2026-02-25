"use client";

import { BUNDLE_PRICES, BUNDLE_CHECKOUT_URLS } from "@/data/interns-data";
import { ScrollReveal } from "./scroll-reveal";

const freeFeatures = [
  "✓  3 free interns included",
  "✓  Multi-runtime support",
  "✓  CLI management",
  "✓  Community Discord",
];

const starterFeatures = [
  "✓  All 11 interns unlocked",
  "✓  5 concurrent interns",
  "✓  Multi-runtime support",
  "✓  Email support",
  "✓  Community Discord",
];

const proFeatures = [
  "✓  All current + future v1.x interns",
  "✓  Unlimited concurrent interns",
  "✓  Custom runtime integration",
  "✓  Priority email support",
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
    <section id="pricing" className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)] px-12 py-16 flex flex-col gap-10">
      {/* Header */}
      <ScrollReveal className="flex flex-col gap-3 w-full">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          PRICING
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          PAY ONCE. KEEP FOREVER.
        </h2>
        <p className="font-body text-[13px] text-[var(--text-muted-dark)]">
          Interview 3 interns free. No subscription. No credit card. Upgrade when they prove their worth.
        </p>
      </ScrollReveal>

      {/* Pricing Tiers */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Free Tier */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              FREE
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9] tabular-nums">
                $0
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                FOREVER FREE
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={freeFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <a
            href="#install"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-black/5 transition-colors no-underline"
          >
            INSTALL FREE
          </a>
        </div>

        {/* Starter Bundle (Highlighted) */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--brown-dark)]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="self-start font-body text-[11px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-3 py-[6px] rounded-[4px]">
                MOST POPULAR
              </span>
              <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-inverted)]">
                STARTER BUNDLE
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-inverted)] leading-[0.9] tabular-nums">
                ${BUNDLE_PRICES.starter}
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                ONE-TIME
              </span>
            </div>
            {/* Savings callout */}
            <span className="font-body text-[11px] text-[var(--accent)] font-bold tracking-[0.5px]">
              Save $103 vs buying individually
            </span>
            <div className="w-full h-[2px] bg-[var(--text-muted-dark)]" />
            <FeatureList features={starterFeatures} textClass="text-[var(--text-inverted)]" />
          </div>
          <a
            href={BUNDLE_CHECKOUT_URLS.starter}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-6 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors no-underline"
          >
            BUY STARTER BUNDLE
          </a>
        </div>

        {/* Pro Bundle */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-2 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="self-start font-body text-[11px] font-bold text-[var(--text-inverted)] tracking-[1.5px] bg-[var(--bg-black)] px-3 py-[6px] rounded-[4px]">
                INCLUDES FUTURE INTERNS
              </span>
              <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
                PRO BUNDLE
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9] tabular-nums">
                ${BUNDLE_PRICES.pro}
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                ONE-TIME
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={proFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <a
            href={BUNDLE_CHECKOUT_URLS.pro}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] bg-[var(--bg-black)] px-6 py-[14px] text-center hover:bg-black/80 transition-colors no-underline"
          >
            BUY PRO BUNDLE
          </a>
        </div>

        {/* Enterprise Tier */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-b-2 border-[var(--stroke)] min-h-[506px] bg-[var(--warm-white)]">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              ENTERPRISE
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9] tabular-nums">
                CUSTOM
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                CONTACT US
              </span>
            </div>
            <div className="w-full h-[2px] bg-[var(--stroke)]" />
            <FeatureList features={enterpriseFeatures} textClass="text-[var(--text-primary)]" />
          </div>
          <a
            href="mailto:enterprise@internsmarket.com"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-black/5 transition-colors no-underline"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
}
