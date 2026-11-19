import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/** Pause smooth scrolling (e.g. while a dialog is open) so the page behind stays still. */
export const pauseSmoothScroll = () => lenis?.stop();
/** Resume smooth scrolling after pauseSmoothScroll(). */
export const resumeSmoothScroll = () => lenis?.start();

/**
 * Gives the page a soft, inertial scroll on desktop (mouse wheel / trackpad).
 * Touch devices keep native scrolling, and it is skipped entirely for people
 * who ask their system for reduced motion.
 */
export default function SmoothScroll() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New pages start at the top immediately (ScrollManager restores back/forward positions).
  useEffect(() => {
    if (navType !== "POP") lenis?.scrollTo(0, { immediate: true, force: true });
  }, [location.key, navType]);

  return null;
}
