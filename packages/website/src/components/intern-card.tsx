"use client";

export interface InternCardProps {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  onClick?: () => void;
}

export function InternCard({
  name,
  role,
  image,
  onClick,
}: InternCardProps) {
  return (
    <div
      onClick={onClick}
      className="group/card relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0 mx-2
        rounded-lg overflow-hidden bg-[var(--bg-surface)] cursor-pointer
        border-2 border-transparent hover:border-[var(--accent)] transition-all duration-300
        hover:shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:scale-105"
    >
      {/* Portrait image — grayscale by default, color on hover */}
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top
          grayscale group-hover/card:grayscale-0 transition-all duration-400
          group-hover/card:scale-105"
      />

      {/* Gradient overlay with name + role — visible on hover */}
      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-16
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
          opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
      >
        <p
          className="font-display text-base font-black text-white leading-tight"
          style={{ letterSpacing: "0.5px" }}
        >
          {name}
        </p>
        <p className="font-body text-xs text-white/70 mt-1">{role}</p>
      </div>
    </div>
  );
}
