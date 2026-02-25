import { Github, Twitter, MessageCircle, Linkedin } from "lucide-react";

// Link column data
const linkColumns = [
  {
    title: "PRODUCT",
    links: ["Docs", "GitHub", "Intern Authoring", "Changelog"],
  },
  {
    title: "COMPANY",
    links: ["About", "Blog", "Careers"],
  },
  {
    title: "COMMUNITY",
    links: ["Discord", "Twitter / X", "Roadmap"],
  },
  {
    title: "LEGAL",
    links: ["Privacy Policy", "Terms of Service", "Licenses", "Contact"],
  },
] as const;

function LinkColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-body text-[11px] font-bold text-white tracking-[1.5px]">
        {title}
      </span>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="font-body text-[13px] text-[var(--text-muted)] leading-[1.5] hover:text-white transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
  );
}

export function FooterSection() {
  return (
    <footer className="w-full bg-[var(--bg-black)] border-t-2 border-[var(--bg-black)] flex flex-col gap-12 px-12 py-12">
      {/* Footer top */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-4 lg:w-[360px]">
          <span className="font-display text-[22px] font-black text-white tracking-[1px]">
            INTERNSMARKET
          </span>
          <p className="font-body text-[13px] text-[var(--text-muted)] leading-[1.5] max-w-[320px]">
            CLI marketplace for AI intern personas. Install, configure, deploy your autonomous AI team.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="text-[var(--text-muted)] hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Discord" className="text-[var(--text-muted)] hover:text-white transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-[var(--text-muted)] hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Link columns — 2x2 on mobile, row on desktop */}
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-20">
          {linkColumns.map((col) => (
            <LinkColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--text-muted-dark)]" />

      {/* Footer bottom */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <span className="font-body text-[11px] text-[var(--text-muted)]">
          © 2026 InternsMarket. All rights reserved.
        </span>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 border border-[var(--text-muted-dark)] rounded px-3 py-1.5 self-start sm:self-auto">
          <div className="w-2 h-2 rounded-full bg-[var(--success-green)]" />
          <span className="font-body text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px]">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
