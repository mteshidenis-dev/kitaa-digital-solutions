import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import CTABlock from "@/components/site/CTABlock";
import PageHero from "@/components/site/PageHero";
import WorkTile from "@/components/site/WorkTile";
import { recentProjects, type ProjectEntry } from "@/lib/projects";

/** Groups the detailed project categories into a few useful filters. */
const groupOf = (p: ProjectEntry) => {
  const c = p.category.toLowerCase();
  if (c.includes("hospitality")) return "Hospitality";
  if (c.includes("educat")) return "Education";
  if (c.includes("retail")) return "Retail";
  if (c.includes("travel") || c.includes("tour") || c.includes("adventure")) return "Tourism";
  if (c.includes("organisation")) return "Organisations";
  return "Other";
};

const FILTERS = ["All", ...Array.from(new Set(recentProjects.map(groupOf)))];

const stats = [
  { value: `${recentProjects.length}`, label: "Live projects" },
  { value: "6+", label: "Industries" },
  { value: "100%", label: "Custom builds" },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? recentProjects : recentProjects.filter((p) => groupOf(p) === active);

  return (
    <div>
      <PageHero
        pageTitle="Portfolio"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        title="Real projects."
        accent="Built to perform."
        text="Every project here was built from scratch, with no templates and no shortcuts. Each one is live, real, and designed to help a business grow."
      >
        <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-5">
              <CountUp value={s.value} className="font-heading text-2xl font-extrabold text-white md:text-3xl" />
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="px-4 pb-14 md:pb-20">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active === f ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const featured = active === "All" && i === 0;
                // Stretch the last card so the final row on desktop has no empty gap.
                const cells = filtered.length + (active === "All" ? 1 : 0);
                const isLast = i === filtered.length - 1;
                const fill = isLast && !featured ? (cells % 3 === 1 ? "lg:col-span-3" : cells % 3 === 2 ? "lg:col-span-2" : "") : "";
                return (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`${featured ? "h-[360px] sm:col-span-2 lg:h-[440px]" : "h-[340px] lg:h-[440px]"} ${fill}`}
                  >
                    <WorkTile project={p} featured={featured} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTABlock
        title="Want your business"
        accent="featured here next?"
        text="Tell us what you're building. We'll reply within 24 hours with honest advice and a clear next step."
      />
    </div>
  );
};

export default Portfolio;
