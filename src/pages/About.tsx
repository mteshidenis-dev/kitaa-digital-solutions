import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Layers3,
  MapPin,
  Target,
  Zap,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import CountUp from "@/components/CountUp";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "98%", label: "Satisfied" },
];

const pillars = [
  {
    icon: Target,
    title: "Mission",
    desc: "Help businesses communicate clearly online and run with stronger digital infrastructure behind the scenes.",
  },
  {
    icon: Compass,
    title: "Vision",
    desc: "Be the trusted regional studio for businesses that want thoughtful design and dependable execution in one place.",
  },
  {
    icon: Layers3,
    title: "Method",
    desc: "Keep strategy, design, and engineering close enough that decisions stay grounded and commercially useful.",
  },
];

const principles = [
  "Small enough to move quickly, experienced enough to keep standards high.",
  "Design decisions are tied to business messaging, not decoration.",
  "Engineering focuses on durability, maintainability, and operator usability.",
  "We stay involved after launch where refinement actually matters.",
];

const quickFacts = [
  { icon: MapPin, label: "Based in Tanzania" },
  { icon: Globe2, label: "Serving clients regionally" },
  { icon: Zap, label: "Studio founded in 2019" },
  { icon: BadgeCheck, label: "100% custom builds" },
];

const team = [
  {
    name: "Steven Shiyo",
    role: "Founder & Lead Developer",
    initials: "SS",
    bio: "Focused on turning complex briefs into clear, fast, maintainable digital products.",
    photo: "/STEVEN.webp",
  },
  {
    name: "Denis Mteshi",
    role: "Co-Founder & Creative Director",
    initials: "DM",
    bio: "Shapes every project's visual language so it feels credible, current, and conversion-ready.",
    photo: "/DENIS.webp",
  },
];

const About = () => (
  <div>
    {/* ── HERO ── */}
    <section className="relative isolate overflow-hidden bg-[#050d1a] px-4 pb-20 pt-28 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 72% 45%, rgba(233,120,17,0.08) 0%, transparent 55%), radial-gradient(ellipse at 14% 35%, rgba(9,34,90,0.7) 0%, transparent 55%)",
        }}
      />
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
          pageTitle="About"
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
          className="mb-7"
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
            About Us
          </span>
          <h1 className="mt-5 font-hero font-black text-2xl leading-tight text-white sm:text-4xl md:text-[3.5rem]">
            Built to help brands grow.
            <br />
            <span className="text-accent">Designed to last.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60">
            Kitaa Digital Solutions is a creative and engineering studio that helps growing businesses present themselves with more credibility and operate with less friction.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 rounded-sm px-8 font-hero font-bold">
                Work with us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-sm border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                See our work
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mx-auto mt-14 grid max-w-lg grid-cols-4 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-3 py-4">
              <CountUp value={value} className="font-hero text-xl font-black text-white sm:text-2xl" />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── MISSION / VISION / METHOD ── */}
    <section className="px-4 py-16 md:py-20">
      <div className="container mx-auto grid grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/60 bg-card p-7 shadow-[0_2px_16px_rgba(9,34,53,0.06)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <item.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-hero text-xl font-bold tracking-tight text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── HOW WE WORK  +  SIDEBAR ── */}
    <section className="px-4 pb-16 md:pb-20">
      <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px] lg:items-start">

        {/* Main content */}
        <div>
          <span className="section-kicker">How We Work</span>
          <h2 className="mt-4 font-hero text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Less like an agency. More like a focused studio.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Clients choose us because they need clarity, speed, and output that still makes sense when the project moves from launch into daily business use.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            {principles.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-[0_2px_12px_rgba(9,34,53,0.05)]"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                  <BadgeCheck className="h-4 w-4" />
                </div>
                <p className="text-sm leading-7 text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ── SIDEBAR ── */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28">

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-[0_2px_16px_rgba(9,34,53,0.06)]"
          >
            <h3 className="font-hero text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Quick facts
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {quickFacts.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-[0_2px_16px_rgba(9,34,53,0.06)]"
          >
            <h3 className="font-hero text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Core values
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {["Clarity over complexity", "Speed without shortcuts", "Design for purpose", "Honest communication"].map(
                (v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {v}
                  </li>
                )
              )}
            </ul>
          </motion.div>

        </aside>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="px-4 pb-16 md:pb-20">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <span className="section-kicker">Leadership</span>
          <h2 className="mt-4 font-hero text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            The people behind Kitaa Digital Solutions.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A focused team building digital products with clarity and purpose.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_16px_rgba(9,34,53,0.07)] transition-shadow hover:shadow-[0_10px_40px_rgba(9,34,53,0.14)]"
            >
              {/* Photo */}
              <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "3/4" }}>
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-accent/8">
                    <span className="font-hero text-6xl font-black text-accent/25">{m.initials}</span>
                  </div>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-bold text-white shadow-lg">
                  {m.role.split(" & ")[0]}
                </span>
              </div>
              {/* Info */}
              <div className="px-5 pb-5 pt-4">
                <h3 className="font-hero text-lg font-bold text-foreground">{m.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{m.role}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <WhyChooseUs />
    <CTASection />
  </div>
);

export default About;
