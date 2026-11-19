import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { services } from "@/lib/services";

/** Five service cards with a cursor spotlight, plus a "not sure?" nudge card. */
const ServiceGrid = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {services.map((s, i) => (
      <Reveal key={s.href} delay={(i % 3) * 0.08} y={30}>
        <Link to={s.href} className="block h-full">
          <SpotlightCard className="h-full p-7">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-accent" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-extrabold text-white">{s.title}</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{s.text}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </Link>
      </Reveal>
    ))}

    {/* Sixth tile: a nudge to talk */}
    <Reveal delay={0.16} y={30}>
      <Link
        to="/contact"
        className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-primary p-7"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />
        <p className="relative text-sm font-medium text-white/80">Not sure what you need?</p>
        <div className="relative">
          <h3 className="font-heading text-2xl font-extrabold leading-tight text-white">
            Tell us the problem. We'll suggest the right solution.
          </h3>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Book a free call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  </div>
);

export default ServiceGrid;
