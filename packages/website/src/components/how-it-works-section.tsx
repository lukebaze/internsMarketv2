export function HowItWorksSection() {
  const cards = [
    {
      number: "01",
      title: "INSTALL THE CLI",
      description:
        "One command to install the InternsMarket CLI globally. Works with npm, yarn, or pnpm.",
      code: "npm install -g internsmarket",
    },
    {
      number: "02",
      title: "CHOOSE YOUR INTERNS",
      description:
        "Browse the roster and install specialized AI personas with pre-built skills and personalities.",
      code: "im install content-marketing-intern",
    },
    {
      number: "03",
      title: "DEPLOY & RUN",
      description:
        "Apply your intern configuration and watch them execute tasks autonomously across your stack.",
      code: "im apply content-marketing-intern",
    },
  ];

  return (
    <section className="w-full bg-[var(--warm-white)] border-t-2 border-[var(--stroke)]">
      {/* Header */}
      <div className="flex flex-col gap-4 px-12 pt-12 pb-8">
        <span className="font-body text-[13px] font-bold text-[var(--text-primary)] tracking-[1.5px]">
          HOW IT WORKS
        </span>
        <h2 className="font-display text-[32px] md:text-[64px] font-black text-[var(--text-primary)] leading-none max-w-[800px]">
          THREE COMMANDS. YOUR AI TEAM IS LIVE.
        </h2>
      </div>

      {/* Cards row */}
      <div className="flex flex-col md:flex-row w-full">
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          const borderClass = isLast
            ? "border-b-2 border-[var(--stroke)]"
            : "border-r-2 border-b-2 border-[var(--stroke)]";

          return (
            <div
              key={card.number}
              className={`flex-1 flex flex-col gap-5 p-6 ${borderClass}`}
            >
              {/* Number */}
              <span className="font-display text-[64px] font-black text-[var(--text-primary)] leading-[0.9]">
                {card.number}
              </span>

              {/* Title */}
              <span className="font-display text-[22px] font-black text-[var(--text-primary)] tracking-[1px]">
                {card.title}
              </span>

              {/* Description */}
              <p className="font-body text-[13px] text-[var(--text-primary)] leading-[1.5]">
                {card.description}
              </p>

              {/* Code block */}
              <div className="bg-[var(--bg-black)] px-4 py-3 w-full">
                <code className="font-mono text-[12px] text-[var(--text-inverted)]">
                  {card.code}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
