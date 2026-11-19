import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { recentProjects } from "@/lib/projects";
import CTABlock from "./CTABlock";
import PageHero from "./PageHero";
import SectionHeader, { Chip, sectionTitleClass, sectionTitleStyle } from "./SectionHeader";
import WorkTile from "./WorkTile";

export type ServicePageData = {
  name: string;
  hero: { title: string; accent: string; text: string; cta: string };
  features: { label: string; title: string; items: { icon: LucideIcon; title: string; text: string }[] };
  includes: { label: string; title: string; text: string; items: string[] };
  cta: { title: string; accent: string; text: string };
};

const allServices = [
  { label: "Websites", href: "/services/websites" },
  { label: "Applications", href: "/services/applications" },
  { label: "Systems", href: "/services/systems" },
  { label: "Brand & Graphics", href: "/services/graphics" },
  { label: "Social Media", href: "/services/social-media" },
];

const relatedSlugs = ["masatu-tours", "become-beyond", "tulia-essence-tours"];

const ServicePage = ({ data }: { data: ServicePageData }) => {
  const { pathname } = useLocation();
  const related = relatedSlugs
    .map((s) => recentProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <PageHero
        pageTitle={data.name}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: data.name }]}
        title={data.hero.title}
        accent={data.hero.accent}
        text={data.hero.text}
        primary={{ to: "/contact", label: data.hero.cta }}
        secondary={{ to: "/portfolio", label: "See our work" }}
      />

      {/* Features */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader label={data.features.label} title={data.features.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.items.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08} y={30}>
                <SpotlightCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-extrabold text-white">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{f.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <Reveal>
            <div className="grid gap-10 rounded-3xl border border-white/[0.07] bg-card p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <Chip>{data.includes.label}</Chip>
                <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
                  {data.includes.title}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">{data.includes.text}</p>
                <Link
                  to="/contact"
                  className="btn-glow mt-8 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold"
                >
                  {data.hero.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {data.includes.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-white/85">
                      <span className="mr-2 text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recent work */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader
            label="Recent work"
            title="See how we've helped"
            accent="others."
            action={{ to: "/portfolio", label: "View all projects" }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} y={30} className="h-[320px]">
                <WorkTile project={p} />
              </Reveal>
            ))}
          </div>

          {/* Other services */}
          <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">Explore our other services</p>
            <div className="flex flex-wrap justify-center gap-2">
              {allServices
                .filter((s) => s.href !== pathname)
                .map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:border-accent hover:text-white"
                  >
                    {s.label}
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABlock title={data.cta.title} accent={data.cta.accent} text={data.cta.text} primaryLabel={data.hero.cta} />
    </div>
  );
};

export default ServicePage;
