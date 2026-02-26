"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Intern } from "@/data/interns-data";
import { BUNDLE_PRICES, BUNDLE_CHECKOUT_URLS, tierBgClass } from "@/data/interns-data";

interface InternDetailOverlayProps {
  intern: Intern;
  onClose: () => void;
}

export function InternDetailOverlay({ intern, onClose }: InternDetailOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Auto-focus close button on mount for keyboard accessibility
  useEffect(() => { closeRef.current?.focus(); }, []);

  // Escape key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll lock with scrollbar compensation
  useEffect(() => {
    const prev = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPadding;
    };
  }, []);

  const bundleUrl = intern.tier === "pro" ? BUNDLE_CHECKOUT_URLS.pro : BUNDLE_CHECKOUT_URLS.starter;
  const bundlePrice = intern.tier === "pro" ? BUNDLE_PRICES.pro : BUNDLE_PRICES.starter;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Outer wrapper — allows close button to overflow */}
      <motion.div
        layoutId={intern.name}
        className="fixed inset-0 z-50 m-auto w-[calc(100vw-32px)] max-w-[700px] max-h-[90vh]"
        style={{ height: "fit-content" }}
        role="dialog"
        aria-modal="true"
        aria-label={`${intern.name} details`}
      >
        {/* Close button — on the edge, half outside */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 flex items-center justify-center bg-[var(--warm-white)] border-2 border-[var(--stroke)] rounded-full cursor-pointer hover:bg-[var(--brown-light)] transition-colors shadow-md"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Inner scrollable card — side-by-side on desktop, stacked on mobile */}
        <div className="w-full max-h-[90vh] overflow-y-auto bg-[var(--warm-white)] border-2 border-[var(--stroke)] flex flex-col md:flex-row">

        {/* Left column — Avatar (stacks on top for mobile) */}
        <div className="w-full md:w-[40%] flex-shrink-0">
          <img
            src={intern.image}
            alt={intern.name}
            className="w-full h-[200px] md:h-full object-cover object-top"
          />
        </div>

        {/* Right column — Content */}
        <div className="flex flex-col gap-3 p-6 flex-1 min-w-0">
          {/* Name + MBTI badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span
                className="font-display text-[20px] font-black text-[var(--text-primary)] leading-tight"
                style={{ letterSpacing: "1px" }}
              >
                {intern.name}
              </span>
              <span className="font-body text-[13px] text-[var(--text-muted-dark)]">
                {intern.role}
              </span>
            </div>
            <span className={`${tierBgClass[intern.tier]} flex-shrink-0 rounded-[4px] px-2 py-[2px]`}>
              <span className="font-body text-[11px] font-bold text-[var(--text-inverted)] uppercase" style={{ letterSpacing: "0.5px" }}>
                {intern.personality}
              </span>
            </span>
          </div>

          {/* Bio */}
          <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.6] italic">
            &ldquo;{intern.bio}&rdquo;
          </p>

          {/* Skills */}
          <div>
            <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px] uppercase">
              Skills
            </span>
            <div className="flex flex-wrap gap-[6px] mt-2">
              {intern.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-[11px] text-[var(--text-muted-dark)] border border-[var(--brown-light)] rounded-[4px] px-2 py-[2px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <span className="font-body text-[11px] font-bold text-[var(--text-muted-dark)] tracking-[1px] uppercase">
              What I Deliver
            </span>
            <ul className="mt-2 flex flex-col gap-1 list-none p-0 m-0">
              {intern.delivers.map((item) => (
                <li key={item} className="font-body text-[13px] text-[var(--text-primary)] leading-[1.5] flex gap-2">
                  <span className="text-[var(--text-muted-dark)] flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-2 flex flex-col gap-1">
            {intern.tier === "free" ? (
              <a
                href="#install"
                onClick={(e) => e.stopPropagation()}
                className="block w-full bg-[var(--bg-black)] text-[var(--text-inverted)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline hover:bg-[var(--brown-dark)] transition-colors"
              >
                INSTALL FREE
              </a>
            ) : (
              <>
                <a
                  href={intern.checkoutUrl || "#pricing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full bg-[var(--bg-black)] text-[var(--text-inverted)] font-body text-[13px] font-bold px-5 py-[10px] text-center no-underline hover:bg-[var(--brown-dark)] transition-colors"
                >
                  BUY FOR ${intern.price}
                </a>
                <a
                  href={bundleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-body text-[11px] text-[var(--text-muted-dark)] text-center no-underline hover:text-[var(--text-primary)] transition-colors"
                >
                  or get all interns for ${bundlePrice}
                </a>
              </>
            )}
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
}
