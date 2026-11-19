import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectPreview from "@/components/ProjectPreview";
import CTASection from "@/components/CTASection";
import { recentProjects } from "@/lib/projects";
import CountUp from "@/components/CountUp";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(recentProjects.map((p) => p.category))),
];

const stats = [
  { value: `${recentProjects.length}`, label: "Live projects" },
  { value: "6+", label: "Industries" },
  { value: "100%", label: "Custom builds" },
  { value: "Real", label: "Businesses" },
];

const ProjectCard = ({
  p,
  index,
}: {
  p: (typeof recentProjects)[number];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.32, delay: index * 0.04 }}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.12)]"
  >
    {/* Image */}
    <div className="relative overflow-hidden">
      <ProjectPreview
        project={p}
        className="h-52"
        imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
        {p.category}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-hero text-lg font-bold leading-snug tracking-tight text-foreground">
          {p.name}
        </h3>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${p.name}`}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-[1.75] text-muted-foreground">
        {p.headline}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-4 mt-4">
        <span className="text-[11px] font-medium text-muted-foreground/70">
          {p.domain}
        </span>
        <Link
          to={`/portfolio/${p.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Case study <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? recentProjects
      : recentProjects.filter((p) => p.category === active);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-background px-4 pb-20 pt-28 md:pt-36">
        {/* Orbs */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, rgba(31,116,242,0.08) 0%, transparent 55%), radial-gradient(ellipse at 15% 40%, rgba(31,116,242,0.16) 0%, transparent 55%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <PageBreadcrumb
            pageTitle="Portfolio"
            items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
            className="mb-7"
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
              Our Work
            </span>
            <h1 className="mt-5 font-hero font-bold text-2xl leading-tight text-white sm:text-4xl sm:leading-[1.1] md:text-[3.5rem]">
              Real projects.
              <br />
              <span className="text-accent">Built to perform.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60">
              Every project here was built from scratch — no templates, no shortcuts. Each one is live, real, and designed to help a business grow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full h-12 rounded-sm px-8 font-hero font-bold"
                >
                  Start a project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-sm border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10 sm:w-auto"
                >
                  Explore services
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mx-auto mt-14 grid max-w-lg grid-cols-4 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-3 py-4">
                <CountUp value={value} className="font-hero text-xl font-bold text-white sm:text-2xl" />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          {/* Filter tabs */}
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  active === cat
                    ? "border-accent bg-accent text-white"
                    : "border-border/60 bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.slug} p={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Portfolio;
