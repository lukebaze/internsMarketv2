import { MONTHLY_PRICE, MONTHLY_PRICE_3_PACK } from "@/data/interns-data";
import { ScrollReveal } from "./scroll-reveal";

const sharedFeatures = [
  "Full personality & identity",
  "Works 24/7",
  "Dedicated to your tasks",
  "Cancel anytime",
  "3-day free trial (internship probation)",
];

export function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-[var(--bg-black)] border-t-2 border-[var(--stroke)] px-6 md:px-12 py-16 flex flex-col gap-10">
      {/* Header */}
      <ScrollReveal className="flex flex-col gap-3 w-full">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          PRICING
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none">
          HIRE BY THE MONTH
        </h2>
        <p className="font-body text-[13px] text-[var(--text-muted-dark)]">
          Each intern is ${MONTHLY_PRICE}/month. Start with a 3-day free trial. Cancel anytime.
        </p>
      </ScrollReveal>

      {/* Pricing Tiers */}
      <div className="flex flex-col md:flex-row w-full">
        {/* 1 Intern */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-[var(--stroke)] min-h-[360px] bg-[var(--bg-surface)] hover-lift">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              1 INTERN
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9] tabular-nums">
                ${MONTHLY_PRICE}
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                PER INTERN / MONTH
              </span>
            </div>
          </div>
          <a
            href="#gallery"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-white/5 transition-colors no-underline"
          >
            START FREE TRIAL
          </a>
        </div>

        {/* 3 Interns — highlighted */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 min-h-[360px] bg-[var(--bg-surface)] border-2 border-[var(--accent)] shadow-[0_0_20px_rgba(255,77,0,0.15)] hover-lift">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="self-start font-body text-[11px] font-bold text-white tracking-[1.5px] bg-[var(--accent)] px-3 py-[6px] rounded-[4px]">
                MOST POPULAR
              </span>
              <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-inverted)]">
                3 INTERNS
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-inverted)] leading-[0.9] tabular-nums">
                ${MONTHLY_PRICE_3_PACK}
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                PER MONTH
              </span>
            </div>
            <span className="font-body text-[11px] text-[var(--accent)] font-bold tracking-[0.5px]">
              SAVE {Math.round((1 - MONTHLY_PRICE_3_PACK / (MONTHLY_PRICE * 3)) * 100)}% vs individual pricing
            </span>
          </div>
          <a
            href="#gallery"
            className="block w-full font-body text-[13px] font-bold text-white tracking-[1.5px] bg-[var(--accent)] px-6 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors no-underline"
          >
            START FREE TRIAL
          </a>
        </div>

        {/* Team 5+ */}
        <div className="flex-1 flex flex-col justify-between gap-5 p-6 border-l-0 md:border-l-2 border-t-2 md:border-t-0 border-[var(--stroke)] min-h-[360px] bg-[var(--bg-surface)] hover-lift">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[13px] font-bold tracking-[1.5px] text-[var(--text-primary)]">
              TEAM 5+
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9] tabular-nums">
                CUSTOM
              </span>
              <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1.5px]">
                CUSTOM PRICING
              </span>
            </div>
          </div>
          <a
            href="mailto:enterprise@internsmarket.com"
            className="block w-full font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] border-[1.5px] border-[var(--stroke)] px-6 py-[14px] text-center bg-transparent hover:bg-white/5 transition-colors no-underline"
          >
            CONTACT US
          </a>
        </div>
      </div>

      {/* Shared features */}
      <ScrollReveal className="flex flex-col gap-3 w-full items-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {sharedFeatures.map((f) => (
            <span key={f} className="font-body text-[13px] text-[var(--text-muted-dark)] leading-[1.5]">
              &#10003; {f}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
