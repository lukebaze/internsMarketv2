"use client";

import { Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";

interface CopyableCodeBlockProps {
  code: string;
  /** Visual style variant */
  variant?: "hero" | "card" | "terminal";
}

/** Code block with click-to-copy button — reused across hero, how-it-works, CTA */
export function CopyableCodeBlock({ code, variant = "card" }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  if (variant === "hero") {
    return (
      <div className="inline-flex items-center gap-4 bg-[#1D1916E6] px-8 py-5 self-start rounded-md border-[1.5px] border-[#F59E0B99] shadow-[0_0_40px_4px_#F59E0B55,0_2px_12px_0_#F59E0B33] max-w-full">
        <span className="font-mono text-lg md:text-xl text-[var(--accent)]">$</span>
        <span className="font-mono text-lg md:text-xl text-[var(--text-inverted)] whitespace-nowrap overflow-hidden text-ellipsis">
          {code}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy install command"
          className="text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors cursor-pointer bg-transparent border-none p-0 shrink-0"
        >
          {copied ? <Check size={22} /> : <Copy size={22} />}
        </button>
      </div>
    );
  }

  // Card variant — used in How It Works cards
  return (
    <div className="flex items-center justify-between bg-[var(--bg-black)] px-4 py-3 w-full group">
      <code className="font-mono text-[12px] text-[var(--text-inverted)] overflow-hidden text-ellipsis whitespace-nowrap">
        {code}
      </code>
      <button
        onClick={handleCopy}
        aria-label={`Copy: ${code}`}
        className="text-[var(--text-muted)] hover:text-[var(--text-inverted)] transition-colors cursor-pointer bg-transparent border-none p-0 shrink-0 ml-2 opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
