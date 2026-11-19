import { motion, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Megaphone,
  MessageCircle,
  Palette,
  Plus,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { recentProjects, type ProjectEntry } from "@/lib/projects";
import { siteContact } from "@/lib/site";

/* ── Content ─────────────────────────────────────────────────────────── */

const bySlug = (slug: string) => recentProjects.find((p) => p.slug === slug);
const workGrid = [
  { slug: "masatu-tours", span: "lg:col-span-2 lg:row-span-2" },
  { slug: "become-beyond", span: "" },
  { slug: "tulia-essence-tours", span: "" },
  { slug: "elem-adventures", span: "lg:col-span-2" },
  { slug: "divine-wonders-adventures", span: "" },
]
  .map((item) => ({ ...item, project: bySlug(item.slug) }))
  .filter((item): item is { slug: string; span: string; project: ProjectEntry } => Boolean(item.project));

const services: { title: string; href: string; text: string; tags: string[]; icon: LucideIcon }[] = [
  {
    title: "Websites",
    href: "/services/websites",
    text: "Fast, custom websites and landing pages that make your business look established and bring in enquiries.",
    tags: ["Business sites", "Landing pages", "SEO"],
    icon: Globe2,
  },
  {
    title: "Web Applications",
    href: "/services/applications",
    text: "Booking tools, dashboards, and customer portals built around how your team actually works.",
    tags: ["Dashboards", "Portals", "Booking"],
    icon: AppWindow,
  },
  {
    title: "Business Systems",
    href: "/services/systems",
    text: "Replace spreadsheets and paperwork with simple systems for sales, stock, staff, and reporting.",
    tags: ["Automation", "Reporting", "Admin tools"],
    icon: Workflow,
  },
  {
    title: "Brand & Graphics",
    href: "/services/graphics",
    text: "Logos, brand identity, company profiles, and print that make you memorable and consistent.",
    tags: ["Logo", "Identity", "Profiles"],
    icon: Palette,
  },
  {
    title: "Social Media",
    href: "/services/social-media",
    text: "Content and page management that keep your brand active, visible, and on-message.",
    tags: ["Content", "Management", "Ads"],
    icon: Megaphone,
  },
];

const stats = [
  { value: "50+", label: "Projects delivered", count: true },
  { value: "100%", label: "Custom built, no templates", count: true },
  { value: "2019", label: "Building since", count: false },
  { value: "24h", label: "Typical reply time", count: false },
];

const processSteps = [
  { title: "Discovery call", text: "We learn your business, your customers, and what success looks like for this project." },
  { title: "Design", text: "You see the look and structure early, and we refine it together before building." },
  { title: "Build & launch", text: "We develop, test on phones and desktops, and launch on your domain." },
  { title: "Grow", text: "After launch we keep improving based on real visitors and your feedback." },
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

/* ── Small building blocks ───────────────────────────────────────────── */

const SectionHeader = ({
  label,
  title,
  accent,
  text,
  action,
}: {
  label: string;
  title: string;
  accent?: string;
  text?: string;
  action?: { to: string; label: string };
}) => (
  <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {label}
      </span>
      <h2
        className="mt-5 font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance"
        style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
      >
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h2>
      {text && <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">{text}</p>}
    </div>
    {action && (
      <Link
        to={action.to}
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.04] md:self-auto"
      >
        {action.label}
        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    )}
  </Reveal>
);

const WorkTile = ({ project, featured }: { project: ProjectEntry; featured: boolean }) => (
  <Link
    to={`/portfolio/${project.slug}`}
    className="group relative block h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.07] bg-card"
  >
    <img
      src={project.imageSrc}
      alt={project.imageAlt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
      {project.category}
    </span>
    <span className="absolute right-4 top-4 flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white text-background opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
      <ArrowUpRight className="h-4 w-4" />
    </span>
    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
      <h3 className={`font-heading font-extrabold text-white ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
        {project.name}
      </h3>
      <p
        className={`mt-2 max-w-md text-sm leading-6 text-white/70 ${
          featured ? "" : "line-clamp-2 md:max-h-0 md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-16 md:group-hover:opacity-100"
        }`}
      >
        {project.summary}
      </p>
    </div>
  </Link>
);

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
                  className="whitespace-nowrap font-heading text-lg font-extrabold text-white/35 transition-colors hover:text-white"
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
      <section className="px-4 py-20 md:py-28">
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
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto">
          <SectionHeader
            label="What we do"
            title="Everything your business needs"
            accent="online."
            text="One team for design, development, and branding, so everything looks and works as one."
            action={{ to: "/services", label: "All services" }}
          />

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
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-125"
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
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto">
          <SectionHeader
            label="How we work"
            title="A simple process,"
            accent="no surprises."
            text="You always know what's happening, what's next, and when it will be ready."
          />

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
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              FAQ
            </span>
            <h2
              className="mt-5 font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Questions, <span className="text-accent">answered.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted-foreground">
              Can't find what you're looking for? Message us on WhatsApp and we'll reply quickly.
            </p>
            <a
              href={siteContact.phones[0].whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-24 md:pb-32">
        <Reveal className="container mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-accent/70 via-white/10 to-accent/30 p-px">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-card px-6 py-14 text-center md:px-12 md:py-20">
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.45), transparent)" }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <h2
                className="relative mx-auto max-w-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Ready to take your business <span className="text-accent">online?</span>
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">
                Tell us about your project. We'll reply within 24 hours with honest advice and a clear next step.
              </p>
              <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="btn-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
                >
                  Start your project <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={siteContact.phones[0].whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Index;
