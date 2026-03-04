export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-[700px] bg-[var(--bg-black)] flex items-center overflow-hidden">
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
            "linear-gradient(to top, #0a0a0aFF 0%, #0a0a0aE6 30%, #0a0a0aB3 55%, #0a0a0a66 80%, #0a0a0a33 100%)",
        }}
      />

      {/* Lava morphing blob */}
      <div className="lava-blob hidden md:block" aria-hidden="true" />

      {/* Content layer — centered */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6 py-12 md:px-16 md:py-20">
        <div className="flex flex-col gap-8 max-w-[800px]">
          <h1 className="font-display text-5xl md:text-[80px] xl:text-[96px] font-black text-[var(--text-inverted)] leading-none uppercase">
            AI Agents With Real Identity. Not Just Skills.
          </h1>

          <p className="font-body text-[16px] md:text-[18px] text-[var(--text-muted)] leading-[1.6]">
            Hire AI interns that actually have personality. 3-day free trial — no credit card required.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#gallery"
              className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px] bg-[var(--accent)] px-7 py-[14px] text-center hover:bg-[var(--accent-bright)] transition-colors"
            >
              START YOUR FREE TRIAL
            </a>
            <a
              href="#pricing"
              className="font-body text-[13px] font-bold text-[var(--text-inverted)] tracking-[1.5px] border-[1.5px] border-white px-7 py-[14px] text-center bg-transparent hover:bg-white/10 transition-colors"
            >
              VIEW PRICING
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
