import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Globe2, Sparkles, Target, TrendingUp, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import CTABlock from "@/components/site/CTABlock";
import SectionHeader, { Chip, sectionTitleClass, sectionTitleStyle } from "@/components/site/SectionHeader";
import WorkTile from "@/components/site/WorkTile";
import { getProjectBySlug, recentProjects } from "@/lib/projects";

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const reduce = useReducedMotion();

  if (!project) {
    return (
      <section className="flex min-h-[80vh] items-center px-4 pb-24 pt-36">
        <div className="container mx-auto max-w-2xl text-center">
          <Chip>Project not found</Chip>
          <h1 className={`mt-6 ${sectionTitleClass}`} style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
            This case study isn't available.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            The project link may have changed, or the case study has not been published yet.
          </p>
          <Link
            to="/portfolio"
            className="btn-glow mt-8 inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
        </div>
      </section>
    );
  }

  const index = recentProjects.findIndex((p) => p.slug === project.slug);
  const next = recentProjects[(index + 1) % recentProjects.length];
  const related = recentProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { icon: Sparkles, label: "Industry", value: project.category },
    { icon: Globe2, label: "Website", value: project.domain, href: project.url },
    { icon: Users, label: "Best for", value: project.audience },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-32 md:pt-40">
        <div
          className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[30rem] w-[60rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(31,116,242, 0.14), transparent)" }}
        />
        <div className="container mx-auto">
          <PageBreadcrumb
            pageTitle={project.name}
            items={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: project.name }]}
            className="sr-only"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
          >
            <div>
              <h1
                className="font-hero font-extrabold leading-[1] tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
              >
                {project.name}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{project.headline}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold"
              >
                Visit live site <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="btn-glass inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold"
              >
                Build something similar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Big screenshot in a browser frame ── */}
      <section className="px-4">
        <Reveal className="container mx-auto" y={50}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_40px_120px_-30px_rgba(31,116,242, 0.225)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="mx-auto rounded-md bg-white/[0.05] px-4 py-1 text-[11px] text-white/50">{project.domain}</span>
            </div>
            {project.imageSrc ? (
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                style={{ objectPosition: project.imagePosition }}
                className={`aspect-[16/9] w-full ${
                  project.imageFit === "contain" ? "object-contain bg-white/[0.02] p-12" : "object-cover object-top"
                }`}
              />
            ) : (
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-accent/10 to-card" />
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Quick facts ── */}
      <section className="px-4 pt-6">
        <div className="container mx-auto grid gap-4 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08} y={20}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/[0.07] bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <f.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.label}</p>
                  {f.href ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate font-medium text-white hover:text-accent"
                    >
                      {f.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-6 text-white/85">{f.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Challenge / Solution ── */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto grid gap-4 md:grid-cols-2">
          {[
            { icon: Target, label: "The challenge", title: "What needed to change", text: project.challenge },
            { icon: Sparkles, label: "Our approach", title: "How we solved it", text: project.solution },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.1}>
              <SpotlightCard className="h-full p-7 md:p-10">
                <Chip>{b.label}</Chip>
                <h2 className="mt-5 font-heading text-2xl font-extrabold text-white md:text-3xl">{b.title}</h2>
                <p className="mt-4 text-[15px] leading-8 text-muted-foreground">{b.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Deliverables + Outcomes ── */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="container mx-auto">
          <Reveal>
            <div className="grid gap-10 rounded-3xl border border-white/[0.07] bg-card p-7 md:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Chip>What we delivered</Chip>
                <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
                  The scope of <span className="text-accent">the work.</span>
                </h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-6 text-white/85">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Chip>The impact</Chip>
                <h2 className={`mt-5 ${sectionTitleClass}`} style={sectionTitleStyle}>
                  What it does for <span className="text-accent">the business.</span>
                </h2>
                <ul className="mt-8 space-y-3">
                  {[...project.outcomes, ...project.value].map((o) => (
                    <li key={o} className="flex items-center gap-4 border-b border-white/[0.06] pb-3 last:border-0">
                      <TrendingUp className="h-4 w-4 shrink-0 text-accent" />
                      <span className="text-[15px] text-white/85">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Next project ── */}
      {next && next.slug !== project.slug && (
        <section className="px-4 pb-12 md:pb-16">
          <Reveal className="container mx-auto">
            <Link
              to={`/portfolio/${next.slug}`}
              className="group flex flex-col gap-6 rounded-3xl border border-white/[0.07] bg-card p-7 transition-colors hover:border-accent/40 md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div>
                <p className="text-sm text-muted-foreground">Next project</p>
                <p className="mt-2 font-heading text-3xl font-extrabold text-white transition-colors group-hover:text-accent md:text-5xl">
                  {next.name}
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── More projects ── */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="container mx-auto">
          <SectionHeader
            label="More projects"
            title="Continue through"
            accent="the portfolio."
            action={{ to: "/portfolio", label: "View all projects" }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} y={30} className="h-[320px]">
                <WorkTile project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        title="Want work that presents your business"
        accent="at this level?"
        text="We can shape a project around the same clarity and premium presentation. Tell us about your business."
        primaryLabel="Start a similar project"
      />
    </div>
  );
};

export default ProjectCaseStudy;
