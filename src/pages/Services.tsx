import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTABlock from "@/components/site/CTABlock";
import PageHero from "@/components/site/PageHero";
import ProcessTimeline from "@/components/site/ProcessTimeline";
import SectionHeader, { Chip, sectionTitleClass, sectionTitleStyle } from "@/components/site/SectionHeader";
import ServiceGrid from "@/components/site/ServiceGrid";
import { services } from "@/lib/services";

const engagementModel = [
  "Strategy and positioning before design",
  "Reusable design systems instead of isolated screens",
  "CMS, automation, and analytics where needed",
  "Post-launch refinement for commercial performance",
];

const Services = () => (
  <div>
    <PageHero
      pageTitle="Services"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      title="Digital work built around"
      accent="outcomes, not deliverables."
      text="Strategy, design, engineering, and support under one roof, so businesses launch faster and operate with more confidence."
      primary={{ to: "/contact", label: "Discuss your project" }}
      secondary={{ to: "/portfolio", label: "View our portfolio" }}
    >
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {services.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75 transition-colors hover:border-accent hover:text-white"
          >
            <s.icon className="h-3.5 w-3.5 text-accent" />
            {s.title}
          </Link>
        ))}
      </div>
    </PageHero>

    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeader
          label="What we do"
          title="Five ways we help your business"
          accent="grow online."
          text="Pick one service or combine them. Either way, one team handles design, development, and branding."
        />
        <ServiceGrid />
      </div>
    </section>

    {/* How we engage */}
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <Reveal>
          <div className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-card p-7 md:p-12 lg:grid-cols-2 lg:gap-16">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.25), transparent)" }}
            />
            <div className="relative">
              <Chip>How we engage</Chip>
              <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
                We scope around the problem, then build what solves it{" "}
                <span className="text-accent">properly.</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
                Some clients need a sharper site. Others need operations cleaned up behind the scenes. The work changes,
                but the standard stays the same.
              </p>
              <Link
                to="/contact"
                className="btn-glow mt-8 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <ol className="relative space-y-3 self-center">
              {engagementModel.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-xs font-extrabold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-white/85">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="px-4 py-16 md:py-24">
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

    <WhyChooseUs />
    <CTABlock />
  </div>
);

export default Services;
