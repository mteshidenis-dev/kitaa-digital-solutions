import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Parses a stat string like "50+", "98%", "100%", "5+" into
 * { end: number, suffix: string }
 */
export function parseStat(value: string): { end: number; suffix: string } {
  const match = value.match(/^(\d+)([+%]?)$/);
  if (!match) return { end: 0, suffix: "" };
  return { end: parseInt(match[1], 10), suffix: match[2] };
}

/**
 * Counts from 0 → end over `duration` ms once the ref element enters the viewport.
 */
export function useCountUp(end: number, duration = 1600) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return { ref, count };
}
