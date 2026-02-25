import { CopyableCodeBlock } from "./copyable-code-block";

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

      {/* Gradient overlay: bottom opaque → top transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #000000FF 0%, #000000E6 30%, #000000B3 55%, #00000066 80%, #00000033 100%)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 w-full flex flex-col gap-8 justify-center px-6 py-12 md:px-16 md:py-20">
        {/* Headline */}
        <h1 className="font-display text-5xl md:text-[96px] font-black text-[var(--text-inverted)] leading-none max-w-[900px] uppercase">
          Hire, Train &amp; Deploy Your Personal AI Intern in One Click
        </h1>

        {/* Subheadline */}
        <p className="font-body text-base text-[var(--text-muted-light)] leading-relaxed max-w-[600px]">
          InternsMarket ships full-stack AI personas — personality, skills,
          memory, voice. Think Shopify Themes for AI Agents.
        </p>

        {/* Button row */}
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="https://www.npmjs.com/package/internsmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-7 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors"
          >
            INSTALL FREE
          </a>
          <a
            href="#demo"
            className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-[var(--warm-white)] px-7 py-[14px] text-center bg-transparent hover:bg-white/10 transition-colors"
          >
            WATCH 90S DEMO
          </a>
        </div>

        {/* Code block with glow */}
        <CopyableCodeBlock code="npm install -g internsmarket" variant="hero" />
      </div>
    </section>
  );
}
