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
 * Shows `end` by default, so pre-rendered HTML, crawlers and reduced-motion users
 * always see the real number. Only counters that start off-screen are reset to 0
 * (out of sight) and counted up when they scroll into view. Counters already on
 * screen at load keep their final value, so a visitor never sees 0 or a negative.
 */
export function useCountUp(end: number, duration = 1600) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(end);
  const armed = useRef(false);
  const started = useRef(false);

  // Decide once, on mount, whether this counter should animate.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const automated = navigator.webdriver; // pre-rendering and test browsers
    const r = el.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    if (!reduce && !automated && !onScreen) {
      armed.current = true;
      setCount(0);
    }
  }, []);

  useEffect(() => {
    if (!isInView || !armed.current || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      // Clamp: the first frame's timestamp can be slightly before startTime.
      const progress = Math.min(Math.max((now - startTime) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return { ref, count };
}
