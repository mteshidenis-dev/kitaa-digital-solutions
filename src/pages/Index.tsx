import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  LineChart,
  LucideIcon,
  MoveUpRight,
  Palette,
  Workflow,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProjectPreview from "@/components/ProjectPreview";
import { Button } from "@/components/ui/button";
import { recentProjects } from "@/lib/projects";
import { siteContact } from "@/lib/site";

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const serviceCards: ServiceCard[] = [
  {
    title: "Signature Websites",
    description: "Editorially led websites and launch pages that feel established, persuasive, and commercially sharp.",
    icon: Globe2,
  },
  {
    title: "Operational Systems",
    description: "Internal portals and structured workflows that replace manual processes with usable digital infrastructure.",
    icon: Workflow,
  },
  {
    title: "Brand Expression",
    description: "Identity direction, campaign surfaces, and visual systems built to improve perception and recall.",
    icon: Palette,
  },
  {
    title: "Performance Insight",
    description: "Reporting layers and decision dashboards that show what is working, leaking, or ready to scale.",
    icon: LineChart,
  },
];

const processSteps = [
  {
    title: "Clarify the business posture",
    text: "Before design starts, we define the audience, the commercial tension, and what the business needs to communicate with more authority.",
  },
  {
    title: "Design the experience with restraint",
    text: "We shape layout, rhythm, visual hierarchy, and interaction so the interface feels refined without becoming decorative noise.",
  },
  {
    title: "Build the real operating layer",
    text: "We implement the platform, CMS structure, or internal workflow tooling that keeps the product practical after handoff.",
  },
  {
    title: "Refine after contact with reality",
    text: "After launch, we improve weak points, tighten conversion paths, and adjust the product using actual usage rather than assumptions.",
  },
];

const featuredProjects = recentProjects.slice(0, 3);

const credentials = [
  "Premium website design",
  "Operational systems",
  "Brand expression",
  "East Africa focused",
  "100% custom builds",
  "Fast launch tempo",
];



const Index = () => {
  const manifestoAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const serviceCardsAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const selectedWorkAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const processAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const stripAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <div className="relative bg-background">

    {/* ── HERO ──────────────────────────────────────────────────────── */}
    <section className="relative isolate overflow-hidden bg-[#050d1a] px-4 pt-28 md:pt-36">
      {/* Dark background radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 72% 45%, rgba(233,120,17,0.07) 0%, transparent 55%), radial-gradient(ellipse at 14% 35%, rgba(9,34,90,0.7) 0%, transparent 55%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="container mx-auto pb-20">
        {/* Left col */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10"
        >
          {/* Tagline with side dashes */}
          <div className="mb-7 flex items-center gap-3">
            <div className="h-[1px] w-10 bg-[#22d3ee]" />
            <span className="font-hero text-[10px] font-bold uppercase tracking-[0.42em] text-[#22d3ee]">
              Craft.&nbsp;&nbsp;Code.&nbsp;&nbsp;Convert.
            </span>
            <div className="h-[1px] w-10 bg-[#22d3ee]" />
          </div>

          <h1
            className="font-hero font-black leading-[1.0] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            Take Your Website<br />
            to <span className="text-accent">The Next Level.</span>
          </h1>

          <p className="mt-8 max-w-[500px] font-body text-base leading-8 text-white/55">
            Need a website? With Kitaa Digital Solutions, gone are the days when your business struggled with an online presence. Website design, development, and digital strategy all under one roof.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/portfolio">
              <Button
                size="lg"
                className="h-14 rounded-sm bg-[#0d6e80] px-9 font-hero text-base font-bold text-white shadow-none hover:bg-[#0b5e6e]"
              >
                Our Portfolio
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="h-14 rounded-sm border border-white/25 bg-transparent px-9 font-hero text-base font-bold text-white hover:bg-white/10"
                variant="ghost"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

{/* ── Services strip ─────────────────────────────────────────── */}
      <div className="relative z-10 px-4 pb-6 md:px-6">
        <div className="container mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_8px_30px_rgba(9,34,53,0.12)]">
          {(() => {
            const stripItems = [
              { icon: Globe2,     title: "Website Design",    subtitle: "Responsive websites for you!",       color: "text-sky-500",    bg: "bg-sky-50" },
              { icon: LineChart,  title: "Digital Marketing", subtitle: "Social Media + SEO",                 color: "text-green-600", bg: "bg-green-50" },
              { icon: Workflow,   title: "Mobile Apps",       subtitle: "Turn your idea into an app",         color: "text-violet-600", bg: "bg-violet-50" },
              { icon: Palette,    title: "Brand & Identity",  subtitle: "Logos, branding, company profiles",  color: "text-accent",    bg: "bg-accent/10" },
            ];
            const StripCard = ({ icon: Icon, title, subtitle, color, bg }: (typeof stripItems)[number]) => (
              <div className="flex items-center gap-4 px-6 py-6">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            );
            return (
              <>
                {/* Mobile carousel */}
                <div className="md:hidden">
                  <Carousel opts={{ loop: true, align: "start" }} plugins={[stripAutoplay.current]} className="w-full">
                    <CarouselContent>
                      {stripItems.map((item) => (
                        <CarouselItem key={item.title} className="basis-full">
                          <StripCard {...item} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
                {/* Desktop grid */}
                <div className="hidden md:grid md:grid-cols-4 divide-x divide-border">
                  {stripItems.map((item) => <StripCard key={item.title} {...item} />)}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>

    {/* ── CREDENTIALS MARQUEE ─────────────────────────────────────── */}
    <div className="overflow-hidden border-y border-border bg-primary py-4">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[...credentials, ...credentials].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-white/60"
          >
            {item}
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>

    {/* ── MANIFESTO (navy bg) ──────────────────────────────────────── */}
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <div className="overflow-hidden rounded-[2.4rem] bg-primary px-8 py-12 text-white shadow-[0_40px_120px_rgba(9,34,53,0.24)] md:px-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
            <div>
              <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/[0.12] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-accent">
                Studio Standard
              </span>
              <h2 className="mt-5 font-display text-5xl font-black leading-[0.9] tracking-[-0.03em] text-white md:text-6xl">
                Luxury in feel.<br />
                <span className="text-accent">Practical</span>{" "}
                in structure.
              </h2>
            </div>
{(() => {
                const manifCards = [
                  "A premium business should not look improvised online.",
                  "Presentation quality and operational clarity should reinforce each other.",
                  "Digital work needs to remain useful after the launch presentation is over.",
                ];
                const MCard = ({ item }: { item: string }) => (
                  <div className="rounded-[1.5rem] border border-white/[0.09] bg-white/[0.06] p-6 h-full">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-accent" />
                    <p className="text-sm leading-7 text-white/72">{item}</p>
                  </div>
                );
                return (
                  <>
                    {/* Mobile carousel */}
                    <div className="sm:hidden">
                      <Carousel opts={{ loop: true, align: "start" }} plugins={[manifestoAutoplay.current]} className="w-full">
                        <CarouselContent>
                          {manifCards.map((item) => (
                            <CarouselItem key={item} className="basis-full min-w-0">
                              <MCard item={item} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                    {/* Desktop grid */}
                    <div className="hidden sm:grid gap-4 sm:grid-cols-3">
                      {manifCards.map((item) => <MCard key={item} item={item} />)}
                    </div>
                  </>
                );
              })()}
          </div>
        </div>
      </div>
    </section>

    {/* ── SERVICES ────────────────────────────────────────────────── */}
    <section className="bg-[#f7f6f3] px-4 py-20 overflow-x-clip">
      <div className="container mx-auto">

        {/* Centred header */}
        <div className="mb-14 text-center">
          <span className="mb-5 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-accent">
            Core Services
          </span>
          <h2
            className="mx-auto font-hero font-black leading-[1.0] tracking-[-0.02em] text-primary"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          >
            What we <span className="text-accent">build</span> for you
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Each discipline is delivered as part of a considered engagement — combining message clarity, visual control, and systems that stay usable after launch.
          </p>
        </div>

        {/* Main content: cards + sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">

{/* Service cards */}
          {(() => {
            const SvcCard = ({ card }: { card: ServiceCard }) => (
              <div className="group relative rounded-2xl bg-white p-7 shadow-[0_6px_24px_rgba(9,34,53,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(9,34,53,0.13)] h-full">
                <div className="absolute left-0 right-0 top-0 h-1 bg-accent" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-hero text-[1.05rem] font-black leading-snug text-primary">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">{card.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-accent">
                  Part of every engagement
                  <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            );
            return (
              <>
                {/* Mobile carousel */}
                <div className="sm:hidden">
                  <Carousel opts={{ loop: true, align: "start" }} plugins={[serviceCardsAutoplay.current]} className="w-full min-w-0">
                    <CarouselContent>
                      {serviceCards.map((card) => (
                        <CarouselItem key={card.title} className="basis-full min-w-0">
                          <SvcCard card={card} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
                {/* Tablet/Desktop grid */}
                <div className="hidden sm:grid gap-5 sm:grid-cols-2">
                  {serviceCards.map((card, index) => (
                    <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.07 }}>
                      <SvcCard card={card} />
                    </motion.div>
                  ))}
                </div>
              </>
            );
          })()}

          {/* Sidebar */}
          <div className="flex flex-col gap-5 min-w-0">

            {/* Why Choose Us */}
            <div className="relative rounded-2xl bg-primary p-7 text-white shadow-[0_8px_30px_rgba(6,16,31,0.22)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent">Why choose us</p>
              <h3 className="mt-3 font-hero text-xl font-black leading-snug text-white break-words">Built for businesses that want to look established.</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "100% custom — no templates",
                  "East Africa–focused studio",
                  "Fast launch tempo",
                  "Ongoing refinement support",
                  "50+ projects delivered",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="relative rounded-2xl border border-accent/20 bg-white p-7 shadow-[0_6px_24px_rgba(9,34,53,0.07)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent">Contact us</p>
              <h3 className="mt-3 font-hero text-lg font-black leading-snug text-primary">Ready to start your project?</h3>
              <div className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-bold text-primary">📞</span>
                  {siteContact.phones[1].display}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-primary">✉️</span>
                  {siteContact.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-primary">📍</span>
                  {siteContact.location}
                </p>
              </div>
              <Link to="/contact" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90">
                Book a free call <ArrowUpRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* ── SELECTED WORK ───────────────────────────────────────────── */}
    <section className="bg-[#f5f0e8] px-4 py-20">
      <div className="container mx-auto">

        {/* Header — centred */}
        <div className="mb-14 text-center">
          <span className="mb-5 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-accent">
            Selected Work
          </span>
          <h2
            className="font-hero font-black leading-[1.0] tracking-[-0.02em] text-primary"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
          >
            Recent work,<br />
            <span className="text-accent">real results</span>
          </h2>
        </div>

{/* 3-column card grid */}
        {(() => {
          const WorkCard = ({ project }: { project: (typeof featuredProjects)[number] }) => (
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(9,34,53,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(9,34,53,0.14)] h-full">
              <ProjectPreview project={project} className="h-52 w-full" imageClassName="h-full w-full" showFallbackLabel={false} />
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="font-hero text-sm font-black leading-tight text-primary">{project.name}</h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-accent transition-colors hover:bg-accent hover:text-white">
                  Visit site <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          );
          return (
            <>
              {/* Mobile carousel */}
              <div className="md:hidden">
                <Carousel opts={{ loop: true, align: "start" }} plugins={[selectedWorkAutoplay.current]} className="w-full">
                  <CarouselContent>
                    {featuredProjects.map((project) => (
                      <CarouselItem key={project.domain} className="basis-full min-w-0">
                        <WorkCard project={project} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid gap-6 md:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <motion.div key={project.domain} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.08 }}>
                    <WorkCard project={project} />
                  </motion.div>
                ))}
              </div>
            </>
          );
        })()}

        {/* CTA below cards — orange */}
        <div className="mt-12 text-center">
          <Link to="/portfolio">
            <Button className="gap-2 rounded-full bg-accent px-9 py-6 text-base font-bold text-white shadow-[0_16px_40px_rgba(233,120,17,0.30)] hover:bg-accent/90">
              View all projects <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>

      </div>
    </section>

    {/* ── PROCESS ─────────────────────────────────────────────────── */}
    <section className="bg-[#050d1a] px-4 py-14">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-[10px] font-hero font-bold uppercase tracking-[0.18em] text-accent">
            Our Process
          </span>
          <h2 className="mt-3 font-hero font-black text-2xl leading-tight text-white md:text-3xl">
            How we work <span className="text-accent">with you</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-white/45">
            Every engagement follows the same disciplined spine — strategy, design, build, and refinement.
          </p>
        </div>

{/* Steps */}
        {(() => {
          const StepCard = ({ step, index }: { step: (typeof processSteps)[number]; index: number }) => (
            <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm h-full">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
              <span className="pointer-events-none absolute -right-2 -top-3 select-none font-hero font-black text-[5rem] leading-none text-white/5">{String(index + 1).padStart(2, "0")}</span>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-hero font-black text-xs text-white">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="font-hero font-bold text-sm leading-snug text-white">{step.title}</h3>
              <p className="mt-2 text-xs leading-6 text-white/45">{step.text}</p>
            </div>
          );
          return (
            <>
              {/* Mobile carousel */}
              <div className="md:hidden">
                <Carousel opts={{ loop: true, align: "start" }} plugins={[processAutoplay.current]} className="w-full">
                  <CarouselContent>
                    {processSteps.map((step, index) => (
                      <CarouselItem key={step.title} className="basis-full min-w-0">
                        <StepCard step={step} index={index} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              {/* Desktop grid */}
              <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => (
                  <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.1 }}>
                    <StepCard step={step} index={index} />
                  </motion.div>
                ))}
              </div>
            </>
          );
        })()}

      </div>
    </section>

  </div>
  );
};

export default Index;
