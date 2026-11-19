import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { recentProjects, type ProjectEntry } from "@/lib/projects";
import { siteContact } from "@/lib/site";

const featuredSlugs = ["masatu-tours", "become-beyond", "tulia-essence-tours", "elem-adventures"];
const featuredProjects = featuredSlugs
  .map((slug) => recentProjects.find((p) => p.slug === slug))
  .filter((p): p is ProjectEntry => Boolean(p));

const services = [
  { title: "Websites", href: "/services/websites", text: "Custom sites and landing pages that make a business look established." },
  { title: "Applications", href: "/services/applications", text: "Web apps and dashboards built around how your team really works." },
  { title: "Systems", href: "/services/systems", text: "Portals and automation that replace manual, error-prone processes." },
  { title: "Brand & Graphics", href: "/services/graphics", text: "Identity, visual systems, and print that improve recall and trust." },
  { title: "Social Media", href: "/services/social-media", text: "Content and management that keep your brand present and consistent." },
];

const processSteps = [
  { title: "Clarify", text: "We define the audience, the goal, and what the business needs to say with more authority." },
  { title: "Design", text: "Layout, rhythm, and hierarchy shaped with restraint, so it feels refined, not decorated." },
  { title: "Build", text: "We ship the real thing: the site, the CMS, or the internal tools that keep it practical." },
  { title: "Refine", text: "After launch we tighten weak points using real usage, not assumptions." },
];

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "100%", label: "Custom builds" },
  { value: "2019", label: "Studio founded" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const SectionLabel = ({ children }: { children: string }) => (
  <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
    <span className="h-px w-8 bg-accent" />
    {children}
  </p>
);

const WorkCard = ({ project, large = false }: { project: ProjectEntry; large?: boolean }) => (
  <Link to={`/portfolio/${project.slug}`} className="group block">
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card">
      <img
        src={project.imageSrc}
        alt={project.imageAlt}
        loading="lazy"
        className={`w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
          large ? "aspect-[4/3] md:aspect-[16/8]" : "aspect-[4/3]"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </div>
    <div className="mt-5 flex items-baseline justify-between gap-4">
      <h3 className="font-heading text-2xl font-bold tracking-[-0.01em] text-white md:text-3xl">{project.name}</h3>
      <p className="shrink-0 text-sm text-muted-foreground">{project.category}</p>
    </div>
  </Link>
);

const Index = () => {
  const reduce = useReducedMotion();
  const heroLine = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: "100%" },
          animate: { opacity: 1, y: "0%" },
          transition: { duration: 1.1, delay, ease },
        };

  return (
    <div className="relative bg-background">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-32">
        {/* One soft glow, kept quiet */}
        <div
          className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[38rem] w-[70rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.32), transparent)" }}
        />

        <div className="container mx-auto text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex items-center justify-center gap-3"
          >
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
              ))}
            </div>
            <span className="text-[13px] text-muted-foreground">50+ projects delivered across East Africa</span>
          </motion.div>

          <h1
            className="mx-auto font-hero font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(3.2rem, 10.5vw, 10rem)" }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...heroLine(0.1)}>Take your</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...heroLine(0.22)}>
                business online<span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            <p className="mx-auto mt-10 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Kitaa Digital Solutions designs websites, apps, and brands that make your business look established, win trust, and turn visitors into customers.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="btn-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
              >
                Start your project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="btn-glass inline-flex h-12 w-full items-center justify-center rounded-full px-7 text-sm font-semibold sm:w-auto"
              >
                See our work
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── SELECTED WORK (large imagery) ────────────────────────────── */}
      <section className="px-4 py-28 md:py-40">
        <div className="container mx-auto">
          <Reveal className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <h2
                className="font-extrabold leading-[0.98] tracking-[-0.025em] text-white"
                style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
              >
                Work that earns
                <br />
                trust<span className="text-accent">.</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 self-start text-sm font-medium text-white md:self-auto"
            >
              All projects
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
            {featuredProjects.map((project, i) => {
              const large = i === 0 || i === 3;
              return (
                <Reveal key={project.slug} className={large ? "md:col-span-2" : ""} delay={large ? 0 : (i % 2) * 0.12}>
                  <WorkCard project={project} large={large} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATEMENT ────────────────────────────────────────────────── */}
      <section className="px-4 py-28 md:py-40">
        <div className="container mx-auto">
          <Reveal>
            <SectionLabel>The studio</SectionLabel>
            <p
              className="max-w-6xl font-heading font-bold leading-[1.15] tracking-[-0.015em] text-muted-foreground"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 4rem)" }}
            >
              A focused studio in Dar es Salaam building{" "}
              <span className="text-white">websites, systems, and brands</span> for businesses that want to{" "}
              <span className="text-white">look established</span>, and stay useful long after launch.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-10 border-t border-white/[0.08] pt-12 sm:grid-cols-3 md:mt-28">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <p className="font-heading font-extrabold tracking-[-0.03em] text-white" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES (big list) ─────────────────────────────────────── */}
      <section className="px-4 py-28 md:py-40">
        <div className="container mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <SectionLabel>What we do</SectionLabel>
            <h2
              className="font-extrabold leading-[0.98] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
            >
              Services<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <div className="border-t border-white/[0.08]">
            {services.map((s, i) => (
              <Reveal key={s.href} y={24} delay={i * 0.05}>
                <Link
                  to={s.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/[0.08] py-8 md:grid-cols-[5rem_1fr_1fr_auto] md:py-10"
                >
                  <span className="text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="font-heading font-bold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-accent"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
                  >
                    {s.title}
                  </span>
                  <span className="hidden max-w-sm text-sm leading-7 text-muted-foreground md:block">{s.text}</span>
                  <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="px-4 py-28 md:py-40">
        <div className="container mx-auto">
          <Reveal className="mb-16 md:mb-24">
            <SectionLabel>How we work</SectionLabel>
            <h2
              className="max-w-4xl font-extrabold leading-[0.98] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Four steps. No guesswork<span className="text-accent">.</span>
            </h2>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="border-t border-white/[0.12] pt-8">
                  <p className="text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white">{step.title}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-32 md:py-48">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[60rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.28), transparent)" }}
        />
        <Reveal className="container mx-auto text-center">
          <div className="flex justify-center">
            <SectionLabel>Next step</SectionLabel>
          </div>
          <h2
            className="mx-auto font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            Let's build
            <br />
            something<span className="text-accent">.</span>
          </h2>
          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/contact"
              className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-full px-9 text-base font-semibold"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${siteContact.email}`}
              className="text-base text-muted-foreground underline-offset-8 transition-colors hover:text-white hover:underline"
            >
              {siteContact.email}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Index;
