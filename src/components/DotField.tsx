import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; r: number; base: number; accent: boolean; phase: number; speed: number };

/**
 * A grid of tiny dots in the brand colours: soft off-white dots with brighter
 * electric-blue ones scattered in clusters, a few of them slowly twinkling.
 * Drawn on a canvas, paused when off screen, static for reduced-motion users.
 */
const DotField = ({ className, gap = 22 }: { className?: string; gap?: number }) => {
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

    // Smooth pseudo-random "clouds" so blue dots appear in soft clusters, not evenly.
    const cloud = (x: number, y: number) =>
      (Math.sin(x * 0.011 + 1.3) + Math.sin(y * 0.017 + 0.7) + Math.sin((x + y) * 0.007 + 2.1)) / 3;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          // Stronger near the top edge of the footer, fading down so text stays readable.
          const fade = Math.max(0, 1 - y / (height * 0.95));
          const c = cloud(x, y);
          const accent = c > 0.25 && Math.random() < 0.55;
          const base = accent ? 0.35 + Math.random() * 0.5 : 0.06 + Math.random() * 0.12;
          dots.push({
            x,
            y,
            r: accent ? 1.4 + Math.random() * 0.9 : 0.9 + Math.random() * 0.5,
            base: base * (0.35 + 0.65 * fade),
            accent,
            phase: Math.random() * Math.PI * 2,
            speed: accent && Math.random() < 0.35 ? 0.6 + Math.random() * 1.2 : 0,
          });
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const twinkle = d.speed && !reduce ? 0.55 + 0.45 * Math.sin(t * 0.001 * d.speed + d.phase) : 1;
        const a = d.base * twinkle;
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

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [gap]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none h-full w-full", className)} />;
};

export default DotField;
