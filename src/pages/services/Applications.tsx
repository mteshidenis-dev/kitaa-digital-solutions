import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  CalendarCheck,
  LayoutDashboard,
  ShoppingCart,
  TabletSmartphone,
  Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const features = [
  {
    icon: Code2,
    title: "Custom web applications",
    text: "Purpose-built to your exact workflow — not moulded around a SaaS product's limitations or pricing tiers.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & scheduling systems",
    text: "Reservation and appointment systems that reduce admin load and improve the customer experience end-to-end.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboards",
    text: "Internal control panels to manage users, content, orders, or any operational data from a single interface.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce platforms",
    text: "Custom online stores with tailored checkout flows, inventory management, and payment gateway integration.",
  },
  {
    icon: TabletSmartphone,
    title: "Progressive Web Apps",
    text: "App-like experiences delivered through the browser — fast, offline-capable, no app store required.",
  },
  {
    icon: Plug,
    title: "API & third-party integrations",
    text: "Connect your tools: payment processors, CRMs, email platforms, shipping providers, and more.",
  },
];

const includes = [
  "Requirements mapping and system architecture",
  "Full UI/UX design for every app flow",
  "Frontend and backend development",
  "Authentication and role-based access control",
  "Deployment, hosting setup, and environment configuration",
  "Technical documentation and team handover",
];

const ServiceApplications = () => {
  const featAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const inclAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <div>
    {/* ── HERO ── */}
    <section className="relative isolate overflow-hidden bg-[#050d1a] px-4 pb-20 pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 72% 45%, rgba(233,120,17,0.07) 0%, transparent 55%), radial-gradient(ellipse at 14% 35%, rgba(9,34,90,0.7) 0%, transparent 55%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <PageBreadcrumb
          pageTitle="Applications"
          items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Applications" }]}
          className="mb-7"
        />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
            Applications
          </span>
          <h1 className="mt-5 font-hero font-black text-2xl leading-tight text-white sm:text-4xl md:text-6xl">
            Web applications built around<br />
            <span className="text-accent">how your business actually operates</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60">
            Custom web apps, booking systems, portals, and dashboards — built to your exact workflow, not adapted from a generic template or constrained by a subscription tool.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 rounded-sm px-8 font-hero font-bold">
                Discuss your application <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10"
              >
                See our work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── FEATURES ── */}
    <section className="bg-[#f7f6f3] px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
            What we build
          </span>
          <h2 className="mt-4 font-hero font-black text-2xl text-foreground sm:text-3xl md:text-4xl">
            Applications designed for real business problems
          </h2>
        </div>
        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel opts={{ loop: true, align: "start" }} plugins={[featAutoplay.current]} className="w-full">
            <CarouselContent>
              {features.map((f) => (
                <CarouselItem key={f.title} className="basis-full min-w-0">
                  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_8px_30px_rgba(9,34,53,0.06)] h-full">
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-hero font-bold text-base text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07 }}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_8px_30px_rgba(9,34,53,0.06)]"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-hero font-bold text-base text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHAT'S INCLUDED ── */}
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
            Scope
          </span>
          <h2 className="mt-4 font-hero font-black text-2xl text-foreground sm:text-3xl md:text-4xl">
            What every application engagement includes
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            We handle the full cycle from defining what the system needs to do, through to building, deploying, and handing over something your team can actually maintain.
          </p>
        </div>
        {/* Mobile carousel */}
        <div className="lg:hidden">
          <Carousel opts={{ loop: true, align: "start" }} plugins={[inclAutoplay.current]} className="w-full">
            <CarouselContent>
              {includes.map((item) => (
                <CarouselItem key={item} className="basis-full min-w-0">
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-[#f7f6f3] px-5 py-4 h-full">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop list */}
        <div className="hidden lg:grid gap-3">
          {includes.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-[#f7f6f3] px-5 py-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-[#050d1a] px-4 py-16">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-hero font-black text-2xl text-white sm:text-3xl md:text-4xl">
          Have a system in mind? <span className="text-accent">Let's scope it.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
          Tell us the problem. We'll map out what needs to be built and give you an honest scope before any commitment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-12 rounded-sm px-8 font-hero font-bold">
              Start the conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-white/20 bg-transparent px-8 font-semibold text-white hover:bg-white/5"
            >
              View our portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ServiceApplications;
