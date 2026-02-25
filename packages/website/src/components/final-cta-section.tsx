import { Terminal } from "lucide-react";

// Terminal body lines data
const terminalLines = [
  { text: "$ npm install -g internsmarket", color: "text-white" },
  { text: "✓ installed v2.4.0", color: "text-[var(--success-green)]" },
  { spacer: true },
  { text: "$ internsmarket init", color: "text-white" },
  { text: "→ Scanning project...", color: "text-[#C8B8A8]" },
  { text: "→ 3 interns matched", color: "text-[#C8B8A8]" },
  { spacer: true },
  { text: "$ internsmarket deploy --intern jordan", color: "text-white" },
  { text: "🚀 Jordan deployed successfully!", color: "text-[#FF8C42]" },
] as const;

// Mini stat item
function StatItem({ value, label, valueColor }: { value: string; label: string; valueColor: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-display text-[36px] font-black leading-none tabular-nums ${valueColor}`}>{value}</span>
      <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">{label}</span>
    </div>
  );
}

// Terminal window component
function TerminalWindow() {
  return (
    <div className="flex flex-col w-full border-2 border-[var(--terminal-border)]">
      {/* Title bar */}
      <div className="flex items-center h-11 px-[18px] bg-[var(--terminal-bar)]">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-body text-[13px] font-medium text-[var(--brown-light)] flex-1 text-center">
          internsmarket — zsh
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[6px] p-5 bg-[var(--terminal-bg)]">
        {terminalLines.map((line, i) => {
          if ("spacer" in line) {
            return <div key={i} className="h-1" />;
          }
          return (
            <span key={i} className={`font-mono text-[13px] leading-[1.8] ${line.color}`}>
              {line.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FinalCtaSection() {
  return (
    <section className="relative w-full bg-[var(--bg-black)] border-t-2 border-[var(--bg-black)]">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-[var(--accent)]" />
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[var(--accent)]" />

      {/* Desktop layout: absolute positioned inner container */}
      <div className="hidden lg:block relative h-[600px]">
        {/* Left content */}
        <div className="absolute flex flex-col gap-8" style={{ left: 48, top: 80, width: 660 }}>
          {/* Headlines */}
          <h2 className="flex flex-col gap-1">
            <span className="font-display text-[80px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
              READY TO BUILD
            </span>
            <span className="font-display text-[80px] font-black text-[var(--accent)] leading-[0.95] uppercase">
              YOUR AI TEAM?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6] max-w-[480px]">
            Deploy AI interns to your codebase in 60 seconds. One CLI command. Zero configuration. Full control.
          </p>

          {/* Mini stats row */}
          <div className="flex items-start gap-10">
            <StatItem value="500+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
            <StatItem value="1.2K" label="USERS" valueColor="text-[var(--warm-white)]" />
            <StatItem value="11" label="AI INTERNS" valueColor="text-[var(--accent)]" />
          </div>

          {/* Tagline badge */}
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[var(--accent)]" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
              WORKS WITH ANY CODEBASE
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          className="absolute bg-[var(--brown-mid)]"
          style={{ left: 730, top: 80, width: 2, height: 440 }}
        />

        {/* Right panel */}
        <div
          className="absolute flex flex-col"
          style={{ left: 760, top: 60, width: 620, height: 480 }}
        >
          <TerminalWindow />

          {/* CTA Button */}
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--accent-bright)] py-[22px] px-8 text-center no-underline mt-0 hover:opacity-90 transition-opacity"
          >
            <span className="font-display text-[26px] font-black text-white tracking-wide">
              GET STARTED FREE →
            </span>
          </a>

          {/* Subtitle */}
          <p className="font-body text-[12px] text-[var(--brown-light)] text-center mt-3">
            No credit card required · Free tier available
          </p>
        </div>
      </div>

      {/* Mobile layout: flex column */}
      <div className="lg:hidden flex flex-col gap-8 px-6 py-16">
        {/* Headlines */}
        <h2 className="flex flex-col gap-1">
          <span className="font-display text-[48px] font-black text-[var(--warm-white)] leading-[0.95] uppercase">
            READY TO BUILD
          </span>
          <span className="font-display text-[48px] font-black text-[var(--accent)] leading-[0.95] uppercase">
            YOUR AI TEAM?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.6]">
          Deploy AI interns to your codebase in 60 seconds. One CLI command. Zero configuration. Full control.
        </p>

        {/* Mini stats */}
        <div className="flex items-start gap-8">
          <StatItem value="500+" label="GITHUB STARS" valueColor="text-[var(--warm-white)]" />
          <StatItem value="1.2K" label="USERS" valueColor="text-[var(--warm-white)]" />
          <StatItem value="11" label="AI INTERNS" valueColor="text-[var(--accent)]" />
        </div>

        {/* Tagline badge */}
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[var(--accent)]" />
          <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px]">
            WORKS WITH ANY CODEBASE
          </span>
        </div>

        {/* Terminal */}
        <TerminalWindow />

        {/* CTA Button */}
        <a
          href="https://www.npmjs.com/package/internsmarket"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[var(--accent-bright)] py-5 px-8 text-center no-underline hover:opacity-90 transition-opacity"
        >
          <span className="font-display text-[22px] font-black text-white tracking-wide">
            GET STARTED FREE →
          </span>
        </a>

        {/* Subtitle */}
        <p className="font-body text-[12px] text-[var(--brown-light)] text-center">
          No credit card required · Free tier available
        </p>
      </div>
    </section>
  );
}
