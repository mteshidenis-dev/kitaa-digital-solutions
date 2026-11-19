import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; r: number; base: number; accent: boolean; phase: number; speed: number };

type DotFieldProps = {
  className?: string;
  gap?: number;
  /** Element the dots should frame: no dots are drawn under it, and they glow brightest right next to it. */
  frameRef?: RefObject<HTMLElement>;
  /** How far (px) the glow spreads out from the framed element. */
  reach?: number;
  /** "edges": keep the centre clear (for text) and let dots build up toward the sides and corners. */
  mode?: "frame" | "edges";
};

/**
 * A grid of tiny dots in the brand colours (soft off-white plus electric blue),
 * arranged around an element like a frame: brightest at its edges, fading with
 * distance, with some blue dots slowly twinkling. Drawn on a canvas, paused when
 * off screen, and static for people who prefer reduced motion.
 */
const DotField = ({ className, gap = 22, frameRef, reach = 140, mode = "frame" }: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;

    // Soft pseudo-random "clouds" so blue dots gather in loose clusters.
    const cloud = (x: number, y: number) =>
      (Math.sin(x * 0.013 + 1.3) + Math.sin(y * 0.021 + 0.7) + Math.sin((x - y) * 0.009 + 2.1)) / 3;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rectangle of the framed element, relative to the canvas.
      const c = canvas.getBoundingClientRect();
      const f = frameRef?.current?.getBoundingClientRect();
      const box = f
        ? { l: f.left - c.left, t: f.top - c.top, r: f.right - c.left, b: f.bottom - c.top }
        : null;

      dots = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          let weight: number;
          if (box) {
            const inside = x > box.l + 4 && x < box.r - 4 && y > box.t + 4 && y < box.b - 4;
            if (inside) continue; // hidden under the card anyway
            const dx = Math.max(box.l - x, 0, x - box.r);
            const dy = Math.max(box.t - y, 0, y - box.b);
            const d = Math.hypot(dx, dy);
            weight = Math.max(0, 1 - d / reach) ** 1.15;
          } else if (mode === "edges") {
            // Elliptical clear zone in the middle; dots grow stronger toward the edges and fade at the bottom.
            const nx = (x - width / 2) / (width * 0.5);
            const ny = (y - height * 0.45) / (height * 0.55);
            const nd = Math.hypot(nx, ny);
            const bottomFade = Math.min(1, (height - y) / (height * 0.25));
            weight = Math.min(1, Math.max(0, (nd - 0.55) / 0.6)) * bottomFade;
          } else {
            weight = Math.max(0, 1 - y / height);
          }
          if (weight < 0.02 && Math.random() < 0.6) continue;

          const accent = Math.random() < 0.08 + weight * 0.3 + Math.max(0, cloud(x, y)) * 0.3;
          const base = accent ? 0.45 + Math.random() * 0.55 : 0.1 + Math.random() * 0.16;
          dots.push({
            x,
            y,
            r: accent ? 1.1 + Math.random() * 0.7 : 0.9 + Math.random() * 0.35,
            base: base * (0.25 + 0.75 * weight),
            accent,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() < (accent ? 0.5 : 0.15) ? 0.4 + Math.random() * 1.4 : 0,
          });
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const twinkle = d.speed && !reduce ? 0.45 + 0.55 * Math.sin(t * 0.001 * d.speed + d.phase) : 1;
        const a = Math.max(0, d.base * twinkle);
        if (a < 0.01) continue;
        ctx.fillStyle = d.accent ? `rgba(56, 132, 255, ${a})` : `rgba(243, 241, 236, ${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      frame = requestAnimationFrame(loop);
    };

    build();
    draw(0);
    if (!reduce) frame = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);
    if (frameRef?.current) ro.observe(frameRef.current);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [gap, frameRef, reach, mode]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none h-full w-full", className)} />;
};

export default DotField;
