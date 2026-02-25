import { Github, Twitter, MessageCircle, Linkedin } from "lucide-react";

// Link column data with explicit hrefs for each link
const linkColumns = [
  {
    title: "PRODUCT",
    links: [
      { label: "Docs", href: "https://docs.internsmarket.com" },
      { label: "GitHub", href: "https://github.com/internsmarket/cli" },
      { label: "Intern Authoring", href: "https://docs.internsmarket.com/authoring" },
      { label: "Changelog", href: "https://github.com/internsmarket/cli/releases" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "https://internsmarket.com/about" },
      { label: "Blog", href: "https://internsmarket.com/blog" },
      { label: "Careers", href: "https://internsmarket.com/careers" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "Discord", href: "https://discord.gg/internsmarket" },
      { label: "Twitter / X", href: "https://x.com/internsmarket" },
      { label: "Roadmap", href: "https://github.com/internsmarket/cli/projects" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "https://internsmarket.com/privacy" },
      { label: "Terms of Service", href: "https://internsmarket.com/tos" },
      { label: "Licenses", href: "https://internsmarket.com/licenses" },
      { label: "Contact", href: "https://internsmarket.com/contact" },
    ],
  },
] as const;

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-body text-[11px] font-bold text-white tracking-[1.5px]">
        {title}
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[13px] text-[var(--text-muted)] leading-[1.5] hover:text-white transition-colors no-underline"
        >
          {link.label}
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
            <a
              href="https://github.com/internsmarket/cli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://x.com/internsmarket"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://discord.gg/internsmarket"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/internsmarket"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-white transition-colors"
            >
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
