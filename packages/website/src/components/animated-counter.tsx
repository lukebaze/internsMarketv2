"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  /** Target value (numeric part only, e.g. 500 for "500+") */
  target: number;
  /** Suffix appended after the number (e.g. "+", "K") */
  suffix?: string;
  /** Prefix before the number (e.g. "$") */
  prefix?: string;
  /** Animation duration in seconds */
  duration?: number;
  className?: string;
}

/** Counts from 0 to target when element enters viewport */
export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(value) {
        // Use decimal for values < 10, otherwise round
        const formatted = target < 10
          ? value.toFixed(1)
          : Math.round(value).toLocaleString();
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, target, suffix, prefix, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  );
}
