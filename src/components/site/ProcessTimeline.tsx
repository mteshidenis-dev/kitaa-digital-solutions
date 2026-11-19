import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/services";

/** Four numbered steps joined by a line on desktop, stacked on mobile. */
const ProcessTimeline = () => (
  <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
    {/* connecting line (desktop) */}
    <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-accent/60 via-white/10 to-white/5 md:block" />
    {processSteps.map((step, i) => (
      <Reveal key={step.title} delay={i * 0.1} y={24}>
        <div className="relative flex gap-5 md:block">
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-background font-heading text-sm font-extrabold text-white ring-8 ring-background">
            <span className={i === 0 ? "text-accent" : ""}>{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="md:mt-6">
            <h3 className="font-heading text-lg font-extrabold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

export default ProcessTimeline;
