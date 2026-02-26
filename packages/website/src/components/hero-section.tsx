"use client";

import { CopyableCodeBlock } from "./copyable-code-block";
import { DemoVideoPlayer } from "./demo-video-player";

export function HeroSection() {
  return (
    <section id="install" className="relative w-full min-h-[700px] bg-[var(--bg-black)] flex items-center">
      {/* Background: avatar image grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0.5 opacity-60">
        {[
          "/images/jordan-lee.jpg",
          "/images/mia-santos.jpg",
          "/images/tomoko-nakamura.jpg",
          "/images/alex-rivera.jpg",
          "/images/ethan-hale.jpg",
          "/images/luna-sage.jpg",
          "/images/marcus-chen.jpg",
          "/images/nadia-okafor.jpg",
          "/images/priya-sharma.jpg",
          "/images/sam-patel.jpg",
          "/images/sofia-reyes.jpg",
          "/images/jordan-lee.jpg",
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width={400}
            height={233}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #000000FF 0%, #000000E6 30%, #000000B3 55%, #00000066 80%, #00000033 100%)",
        }}
      />

      {/* Content layer — side-by-side */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 py-12 md:px-16 md:py-20">
        {/* Left: headline + install + buttons */}
        <div className="flex flex-col gap-8 lg:flex-1 lg:max-w-[55%]">
          <h1 className="font-display text-5xl md:text-[80px] xl:text-[96px] font-black text-[var(--text-inverted)] leading-none uppercase">
            AI Agents With Real Identity. Not Just Skills.
          </h1>

          <CopyableCodeBlock code="npm install -g internsmarket" variant="hero" />

          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="#install"
              className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-7 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors"
            >
              HIRE YOUR FIRST INTERN FREE
            </a>
            <a
              href="#gallery"
              className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--warm-white)] px-7 py-[14px] text-center bg-transparent hover:bg-white/10 transition-colors"
            >
              MEET THE TEAM
            </a>
          </div>
        </div>

        {/* Right: demo video */}
        <div
          className="w-full lg:flex-1 lg:max-w-[45%] border-2 border-[var(--terminal-border)] overflow-hidden"
          style={{ boxShadow: "0 0 32px 4px rgba(0,255,128,0.10)" }}
        >
          <DemoVideoPlayer />
        </div>
      </div>
    </section>
  );
}
