import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BarChart3, Globe2, LayoutTemplate, Megaphone, Palette, ServerCog, Workflow } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const serviceLinks = [
  { label: "Websites", href: "/services/websites", icon: Globe2 },
  { label: "Applications", href: "/services/applications", icon: ServerCog },
  { label: "Systems", href: "/services/systems", icon: Workflow },
  { label: "Graphics", href: "/services/graphics", icon: Palette },
  { label: "Social Media", href: "/services/social-media", icon: Megaphone },
];

const deliveryAreas = [
  {
    title: "Brand-first websites",
    text: "High-credibility websites and landing pages designed to explain value quickly and convert interest cleanly.",
    icon: Globe2,
  },
  {
    title: "Operational systems",
    text: "Custom portals, workflows, and admin tools that remove repetitive work and improve business visibility.",
    icon: Workflow,
  },
  {
    title: "Identity and creative",
    text: "Visual systems and marketing design that make the company look consistent, established, and easier to trust.",
    icon: Palette,
  },
  {
    title: "Reporting layers",
    text: "Dashboards and tracking setups that help teams understand demand, performance, and next actions.",
    icon: BarChart3,
  },
];

const engagementModel = [
  "Strategy and positioning before design",
  "Reusable design systems instead of isolated screens",
  "CMS, automation, and analytics where needed",
  "Post-launch refinement for commercial performance",
];

const DeliveryCard = ({ area }: { area: (typeof deliveryAreas)[number] }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_8px_30px_rgba(9,34,53,0.05)] h-full">
    <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
      <area.icon className="h-4 w-4" />
    </div>
    <h3 className="mt-4 font-hero font-bold text-sm text-foreground">{area.title}</h3>
    <p className="mt-2 text-xs leading-6 text-muted-foreground">{area.text}</p>
  </div>
);

const Services = () => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <div className="pt-20">

    {/* ── HERO ── */}
    <section className="relative isolate overflow-hidden bg-[#050d1a] px-4 pb-14 pt-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 72% 45%, rgba(233,120,17,0.07) 0%, transparent 55%), radial-gradient(ellipse at 14% 35%, rgba(9,34,90,0.7) 0%, transparent 55%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <PageBreadcrumb
          pageTitle="Services"
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          className="mb-7"
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-[10px] font-hero font-bold uppercase tracking-[0.22em] text-accent">
            Our Services
          </span>
          <h1 className="mt-4 font-hero font-black text-3xl leading-tight text-white md:text-5xl">
            Digital work built around<br />
            <span className="text-accent">outcomes, not deliverables</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
            Strategy, design, engineering, and support under one roof — so businesses launch faster and operate with more confidence.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/contact">
              <Button className="h-11 rounded-sm px-7 font-hero font-bold">
                Discuss your project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="h-11 rounded-sm border-white/20 bg-white/5 px-7 font-hero font-bold text-white hover:bg-white/10">
                View our portfolio
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Service quick-nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {serviceLinks.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-hero font-bold text-white/70 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-white"
            >
              <s.icon className="h-3.5 w-3.5 text-accent" />
              {s.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── DELIVERY AREAS ── */}
    <section className="bg-[#f7f6f3] px-4 py-14">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-hero font-bold uppercase tracking-[0.18em] text-accent">
            What we deliver
          </span>
          <h2 className="mt-3 font-hero font-black text-2xl text-foreground md:text-3xl">
            Four core areas of work
          </h2>
        </div>
        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {deliveryAreas.map((area) => (
                <CarouselItem key={area.title} className="basis-full min-w-0">
                  <DeliveryCard area={area} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {deliveryAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
            >
              <DeliveryCard area={area} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ServicesSection />

    {/* ── ENGAGEMENT MODEL ── */}
    <section className="bg-[#050d1a] px-4 py-14">
      <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-[10px] font-hero font-bold uppercase tracking-[0.18em] text-accent">
            <LayoutTemplate className="h-3 w-3" />
            How we engage
          </span>
          <h2 className="mt-4 font-hero font-black text-2xl text-white md:text-3xl">
            We scope around the problem, then build the minimum system that solves it <span className="text-accent">properly.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/50">
            Some clients need a sharper site. Others need operations cleaned up behind the scenes. The work changes, but the standard stays the same.
          </p>
          <Link to="/contact" className="mt-6 inline-flex">
            <Button className="h-10 rounded-sm px-6 font-hero font-bold text-sm">
              Start a project <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-3">
          {engagementModel.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 px-5 py-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent font-hero font-black text-[10px] text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-6 text-white/70">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ProcessSection />
    <WhyChooseUs />
    <CTASection />
  </div>
  );
};

export default Services;
