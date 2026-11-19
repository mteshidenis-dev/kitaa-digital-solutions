import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, MessageCircle, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";
import DotField from "@/components/DotField";
import Reveal from "@/components/Reveal";
import CTABlock from "@/components/site/CTABlock";
import SectionHeader, { Chip, sectionTitleClass, sectionTitleStyle } from "@/components/site/SectionHeader";
import WorkTile from "@/components/site/WorkTile";
import ServiceGrid from "@/components/site/ServiceGrid";
import ProcessTimeline from "@/components/site/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { recentProjects, type ProjectEntry } from "@/lib/projects";
import { siteContact } from "@/lib/site";

/* ── Content ─────────────────────────────────────────────────────────── */

const bySlug = (slug: string) => recentProjects.find((p) => p.slug === slug);
const workGrid = [
  { slug: "masatu-tours", span: "lg:col-span-2 lg:row-span-2" },
  { slug: "elem-adventures", span: "" },
  { slug: "tulia-essence-tours", span: "" },
  { slug: "bcb-safaris", span: "lg:col-span-2" },
  { slug: "divine-wonders-adventures", span: "" },
]
  .map((item) => ({ ...item, project: bySlug(item.slug) }))
  .filter((item): item is { slug: string; span: string; project: ProjectEntry } => Boolean(item.project));

const stats = [
  { value: "50+", label: "Projects delivered", count: true },
  { value: "100%", label: "Custom built, no templates", count: true },
  { value: "2019", label: "Building since", count: false },
  { value: "24h", label: "Typical reply time", count: false },
];

const faqs = [
  {
    q: "How long does a website take?",
    a: "It depends on the size of the project. After a short discovery call we give you a clear timeline before any work starts, and we keep you updated at every stage.",
  },
  {
    q: "How much does a website cost?",
    a: "Every business needs something different, so we quote per project. You get a clear written quote up front, so you know exactly what is included before we begin.",
  },
  {
    q: "Do you work with businesses outside Dar es Salaam?",
    a: "Yes. We work with clients across Tanzania and East Africa, remotely or in person.",
  },
  {
    q: "Can I update the website myself?",
    a: "Yes, where it makes sense we set up an easy editing system so your team can change text and images, and we show you how to use it at handover.",
  },
  {
    q: "Do you help after the website is live?",
    a: "Yes. We stay involved after launch to fix issues, make improvements, and help the site keep performing.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Page ────────────────────────────────────────────────────────────── */

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
        {/* Dots around the edges, centre kept clear for the headline */}
        <DotField className="absolute inset-0 -z-10" mode="edges" />
        {/* A very soft glow behind the headline */}
        <div
          className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[34rem] w-[64rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(31,116,242, 0.11), transparent)" }}
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

      {/* ── CLIENT STRIP ─────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-surface/60 py-7">
        <div className="container mx-auto flex flex-col items-center gap-5 px-4 md:flex-row md:gap-10">
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused]">
              {[...recentProjects, ...recentProjects].map((p, i) => (
                <Link
                  key={`${p.slug}-${i}`}
                  to={`/portfolio/${p.slug}`}
                  className="whitespace-nowrap py-2 font-heading text-lg font-extrabold text-white/35 transition-colors hover:text-white"
                  tabIndex={i >= recentProjects.length ? -1 : undefined}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK (bento) ────────────────────────────────────── */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader
            label="Selected work"
            title="Recent projects we're"
            accent="proud of."
            text="Tourism, hospitality, education, and organisations across Tanzania, each built to win trust and bring in enquiries."
            action={{ to: "/portfolio", label: "View all projects" }}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-3">
            {workGrid.map(({ slug, span, project }, i) => (
              <Reveal key={slug} className={`${span} ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`} delay={(i % 3) * 0.08} y={30}>
                <WorkTile project={project} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES (spotlight cards) ───────────────────────────────── */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader
            label="What we do"
            title="Everything your business needs"
            accent="online."
            text="One team for design, development, and branding, so everything looks and works as one."
            action={{ to: "/services", label: "All services" }}
          />

          <ServiceGrid />
        </div>
      </section>

      {/* ── NUMBERS ──────────────────────────────────────────────────── */}
      <section className="px-4">
        <div className="container mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-card lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative p-7 md:p-9 ${i % 2 === 1 ? "border-l border-white/[0.07]" : ""} ${
                    i >= 2 ? "border-t border-white/[0.07] lg:border-t-0 lg:border-l" : ""
                  }`}
                >
                  <p className="font-heading text-4xl font-extrabold text-white md:text-5xl">
                    {s.count ? <CountUp value={s.value} /> : s.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS (timeline) ───────────────────────────────────────── */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader
            label="How we work"
            title="A simple process,"
            accent="no surprises."
            text="You always know what's happening, what's next, and when it will be ready."
          />

          <ProcessTimeline />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Chip>FAQ</Chip>
            <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
              Questions, <span className="text-accent">answered.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted-foreground">
              Can't find what you're looking for? Message us on WhatsApp and we'll reply quickly.
            </p>
            <a
              href={siteContact.phones[0].whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 py-2.5 text-sm font-semibold text-white transition-colors hover:text-accent"
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              Chat on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/[0.07] bg-card px-5 transition-colors data-[state=open]:border-white/[0.14]"
                >
                  <AccordionTrigger className="py-5 text-left font-heading text-base font-bold text-white hover:no-underline [&>svg]:hidden">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 [[data-state=open]_&]:rotate-45" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default Index;
