import { ShieldCheck, Lock, EyeOff } from "lucide-react";

const stats = [
  { number: "500+", label: "GITHUB STARS" },
  { number: "1.2K", label: "DISCORD MEMBERS" },
  { number: "55+", label: "SPECIALIZED SKILLS" },
  { number: "11", label: "AI INTERNS READY" },
];

const testimonials = [
  {
    quote:
      '"I replaced my freelance content writer with Jordan. Ship time dropped 60%. Cost: $0."',
    attribution: "ALEX CHEN, SOLO FOUNDER",
    hasBorder: true,
  },
  {
    quote:
      '"Marcus automated our entire CI/CD pipeline in a weekend. It just works."',
    attribution: "SARAH KIM, CTO @ DEVSTACK",
    hasBorder: true,
  },
  {
    quote:
      '"No more ChatGPT prompt loops. Install, apply, done. This is how AI tools should work."',
    attribution: "JAMES PARK, INDIE HACKER",
    hasBorder: false,
  },
];

const trustItems = [
  { icon: ShieldCheck, text: "NO EXTERNAL API CALLS" },
  { icon: Lock, text: "RUNS LOCALLY ON YOUR MACHINE" },
  { icon: EyeOff, text: "YOUR DATA, YOUR CONTROL" },
];

export function SocialProofSection() {
  return (
    <section className="w-full bg-[var(--bg-black)] border-t-2 border-[var(--stroke)] px-12 py-16 flex flex-col gap-12">
      {/* Stats Row */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center gap-0 flex-1">
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="font-display text-[64px] md:text-[64px] text-[36px] font-black text-[var(--text-inverted)] leading-[0.9]">
                {stat.number}
              </span>
              <span className="font-body text-[13px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
                {stat.label}
              </span>
            </div>
            {index < stats.length - 1 && (
              <div className="hidden md:block w-[2px] h-[80px] bg-[var(--text-muted-dark)] flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Testimonials Row */}
      <div className="flex flex-col md:flex-row w-full">
        {testimonials.map((t) => (
          <div
            key={t.attribution}
            className={`flex-1 flex flex-col gap-4 p-6 ${
              t.hasBorder ? "md:border-r-2 border-[var(--text-muted-dark)]" : ""
            }`}
          >
            <p className="font-body text-[13px] text-[var(--text-inverted)] leading-[1.5]">
              {t.quote}
            </p>
            <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
              {t.attribution}
            </span>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {trustItems.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon size={16} className="text-[var(--text-muted)]" />
            <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
