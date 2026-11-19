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
  CalendarDays,
  FileText,
  MessageSquare,
  TrendingUp,
  Megaphone,
  Repeat2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const features = [
  {
    icon: FileText,
    title: "Content strategy",
    text: "Monthly content plans aligned to your business goals, seasonal calendar, and target audience behaviour.",
  },
  {
    icon: Repeat2,
    title: "Post creation",
    text: "Designed graphics and copy written in your brand voice — consistent, on-brand, and ready to publish.",
  },
  {
    icon: CalendarDays,
    title: "Scheduling & publishing",
    text: "Content goes out at optimised times across your chosen platforms — handled, not just handed over.",
  },
  {
    icon: MessageSquare,
    title: "Community management",
    text: "Replies, DMs, and engagement handled professionally on your behalf so no conversation gets ignored.",
  },
  {
    icon: TrendingUp,
    title: "Performance reporting",
    text: "Monthly analytics reports covering reach, engagement, follower growth, and what to adjust next.",
  },
  {
    icon: Megaphone,
    title: "Paid social advertising",
    text: "Targeted ad campaigns managed from creative brief through to budget allocation and return reporting.",
  },
];

const includes = [
  "Platform audit and strategy document",
  "Monthly content calendar",
  "Custom-designed post graphics",
  "Caption writing and hashtag research",
  "Scheduling across all active platforms",
  "Monthly performance report and recommendations",
];

const ServiceSocialMedia = () => {
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
          pageTitle="Social Media"
          items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Social Media" }]}
          className="mb-7"
        />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
            Social Media Management
          </span>
          <h1 className="mt-5 font-hero font-black text-2xl leading-tight text-white sm:text-4xl md:text-6xl">
            Social media that builds presence<br />
            <span className="text-accent">without burning your time</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60">
            Strategy, content creation, scheduling, and reporting — handled consistently every month so your brand shows up where your audience is already paying attention.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 rounded-sm px-8 font-hero font-bold">
                Get started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10"
              >
                See our packages
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
            What we handle
          </span>
          <h2 className="mt-4 font-hero font-black text-2xl text-foreground sm:text-3xl md:text-4xl">
            Everything your social presence needs to grow consistently
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
            Monthly retainer
          </span>
          <h2 className="mt-4 font-hero font-black text-2xl text-foreground sm:text-3xl md:text-4xl">
            What's included every month
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            We work as an extension of your team. You approve the content plan, we handle everything from creation to publishing to reporting.
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
          Last time you posted was <span className="text-accent">too long ago</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
          Let's fix your social presence. We'll audit your current accounts and put together a plan that's consistent, on-brand, and actually manageable.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-12 rounded-sm px-8 font-hero font-bold">
              Book a free audit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-white/20 bg-transparent px-8 font-semibold text-white hover:bg-white/5"
            >
              View all services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ServiceSocialMedia;
