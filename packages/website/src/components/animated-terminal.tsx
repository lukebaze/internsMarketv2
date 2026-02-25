"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface TerminalLine {
  text: string;
  color: string;
  copyable?: string;
  /** Typing speed in ms per character (default 30) */
  speed?: number;
}

interface SpacerLine {
  spacer: true;
}

type Line = TerminalLine | SpacerLine;

// Terminal content data
const lines: Line[] = [
  { text: "$ npm install -g internsmarket", color: "text-[var(--text-inverted)]", copyable: "npm install -g internsmarket", speed: 25 },
  { text: "\u2713 installed v2.4.0", color: "text-[#84CC6A]", speed: 15 },
  { spacer: true },
  { text: "$ im install content-marketing-intern", color: "text-[var(--text-inverted)]", copyable: "im install content-marketing-intern", speed: 25 },
  { text: "\u2192 Verifying signature... \u2713", color: "text-[#B0A08E]", speed: 20 },
  { text: "\u2192 Jordan Lee ready for interview", color: "text-[#B0A08E]", speed: 20 },
  { spacer: true },
  { text: "$ im apply content-marketing-intern", color: "text-[var(--text-inverted)]", copyable: "im apply content-marketing-intern", speed: 25 },
  { text: "\uD83D\uDE80 Jordan deployed \u2014 \"Let me craft that narrative.\"", color: "text-[#F5B041]", speed: 15 },
];

/** Copyable line with hover icon */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy: ${text}`}
      className="text-[#9C8B7A] hover:text-[var(--text-inverted)] transition-colors cursor-pointer bg-transparent border-none p-0 shrink-0 opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

/** CSS-animated typewriter terminal that plays on viewport entry */
export function AnimatedTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);

  // Start animation when terminal enters viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter animation loop
  useEffect(() => {
    if (!started) return;

    const nonSpacerLines = lines.filter((l): l is TerminalLine => !("spacer" in l));
    let lineIdx = 0;
    let charIdx = 0;
    let globalLine = 0;

    // Find next non-spacer line index in the original array
    function advanceLine() {
      globalLine++;
      // Skip spacers
      while (globalLine < lines.length && "spacer" in lines[globalLine]) {
        globalLine++;
        setVisibleLines(globalLine);
      }
    }

    // Show first line
    setVisibleLines(1);
    setTypedChars(0);

    const tick = () => {
      if (lineIdx >= nonSpacerLines.length) return;

      const currentLine = nonSpacerLines[lineIdx];
      const speed = currentLine.speed ?? 30;

      if (charIdx < currentLine.text.length) {
        charIdx++;
        setTypedChars(charIdx);
        return setTimeout(tick, speed);
      }

      // Line complete — move to next
      lineIdx++;
      charIdx = 0;
      advanceLine();

      if (lineIdx < nonSpacerLines.length) {
        setVisibleLines(globalLine + 1);
        setTypedChars(0);
        // Pause between lines
        return setTimeout(tick, 400);
      }
    };

    const timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, [started]);

  // Map visible state to rendered lines
  let nonSpacerIdx = 0;

  return (
    <div ref={containerRef} className="flex flex-col w-full border-2 border-[var(--terminal-border)]">
      {/* Title bar */}
      <div className="flex items-center h-11 px-[18px] bg-[#1A1714]">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#E87461]" />
          <div className="w-3 h-3 rounded-full bg-[#F5C842]" />
          <div className="w-3 h-3 rounded-full bg-[#84CC6A]" />
        </div>
        <span className="font-body text-[13px] font-medium text-[#9C8B7A] flex-1 text-center">
          internsmarket — zsh
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[6px] px-5 py-6 bg-[#141210] min-h-[220px]">
        {lines.map((line, i) => {
          if (i >= visibleLines) return null;

          if ("spacer" in line) {
            return <div key={i} className="h-1" />;
          }

          const currentNonSpacerIdx = nonSpacerIdx++;
          const isCurrentlyTyping = currentNonSpacerIdx === countNonSpacers(visibleLines, lines) - 1;
          const displayText = isCurrentlyTyping
            ? line.text.slice(0, typedChars)
            : line.text;

          return (
            <div key={i} className="flex items-center gap-2 group">
              <span className={`font-mono text-[13px] leading-[1.8] ${line.color} flex-1 whitespace-pre`}>
                {displayText}
                {isCurrentlyTyping && showCursor && (
                  <span className="inline-block w-[8px] h-[15px] bg-[var(--accent)] align-middle ml-[1px]" />
                )}
              </span>
              {!isCurrentlyTyping && line.copyable && <CopyButton text={line.copyable} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Count non-spacer lines up to index */
function countNonSpacers(upTo: number, allLines: Line[]): number {
  let count = 0;
  for (let i = 0; i < upTo && i < allLines.length; i++) {
    if (!("spacer" in allLines[i])) count++;
  }
  return count;
}
