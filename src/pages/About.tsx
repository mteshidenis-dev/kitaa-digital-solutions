import { BadgeCheck, Check, Compass, Globe2, Layers3, MapPin, Target, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABlock from "@/components/site/CTABlock";
import PageHero from "@/components/site/PageHero";
import SectionHeader, { Chip, sectionTitleClass, sectionTitleStyle } from "@/components/site/SectionHeader";

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

const values = ["Clarity over complexity", "Speed without shortcuts", "Design for purpose", "Honest communication"];

const team = [
  {
    name: "Steven Shiyo",
    role: "Founder & Lead Developer",
    bio: "Focused on turning complex briefs into clear, fast, maintainable digital products.",
    photo: "/STEVEN.webp",
  },
  {
    name: "Denis Mteshi",
    role: "Co-Founder & Creative Director",
    bio: "Shapes every project's visual language so it feels credible, current, and conversion-ready.",
    photo: "/DENIS.webp",
  },
];

const About = () => (
  <div>
    <PageHero
      pageTitle="About"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      label="About us"
      title="Built to help brands grow."
      accent="Designed to last."
      text="Kitaa Digital Solutions is a creative and engineering studio that helps growing businesses present themselves with more credibility and operate with less friction."
      primary={{ to: "/contact", label: "Work with us" }}
      secondary={{ to: "/portfolio", label: "See our work" }}
    >
      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur sm:grid-cols-4 sm:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-5">
            <CountUp value={s.value} className="font-heading text-2xl font-extrabold text-white md:text-3xl" />
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </PageHero>

    {/* Mission / Vision / Method */}
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} y={30}>
            <SpotlightCard className="h-full p-7 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-extrabold text-white">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{p.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>

    {/* How we work + facts */}
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-12">
        <Reveal>
          <Chip>How we work</Chip>
          <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
            Less like an agency. <span className="text-accent">More like a focused studio.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
            Clients choose us because they need clarity, speed, and output that still makes sense when the project moves
            from launch into daily business use.
          </p>
          <ul className="mt-8 space-y-3">
            {principles.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-card p-4 transition-colors hover:border-accent/40"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-[15px] leading-6 text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Quick facts</p>
            <ul className="mt-5 space-y-4">
              {quickFacts.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <f.icon className="h-4 w-4" />
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Core values</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {values.map((v) => (
                <span key={v} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/80">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Team */}
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeader
          center
          label="Leadership"
          title="The people behind"
          accent="Kitaa."
          text="A focused team building digital products with clarity and purpose."
        />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1} y={30}>
              <div className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="relative -mt-12 p-6">
                  <h3 className="font-heading text-2xl font-extrabold text-white">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{m.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <WhyChooseUs />
    <CTABlock />
  </div>
);

export default About;
