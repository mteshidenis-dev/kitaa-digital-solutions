import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Globe2, Layers3, MoveRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProjectPreview from "@/components/ProjectPreview";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, recentProjects } from "@/lib/projects";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="pt-20">
        <section className="px-4 pb-24 pt-20">
          <div className="container mx-auto max-w-3xl rounded-[2rem] border border-border/70 bg-card p-10 text-center shadow-[0_20px_60px_rgba(9,34,53,0.06)]">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Project not found</p>
            <h1 className="mt-4 font-heading text-5xl font-semibold tracking-[-0.04em] text-foreground">This case study is not available.</h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              The project link may have changed, or the case study has not been published yet.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/portfolio">
                <Button className="rounded-full px-6 font-semibold">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to portfolio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const relatedProjects = recentProjects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <div className="pt-20">
      <section className="px-4 pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="container mx-auto mb-4">
          <PageBreadcrumb
            variant="light"
            pageTitle={project.name}
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.name },
            ]}
          />
        </div>
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-card/80 px-4 py-2 text-sm text-foreground shadow-[0_10px_30px_rgba(9,34,53,0.06)] backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-accent" />
              {project.category}
            </div>
            <h1 className="mt-6 max-w-5xl font-heading text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-foreground md:text-7xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-muted-foreground">{project.headline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 rounded-full px-7 text-base font-semibold">
                  Visit live project
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-14 rounded-full border-primary/15 bg-card/70 px-7 text-base font-semibold">
                  Build something similar
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={`rounded-[2rem] border border-border/70 bg-gradient-to-br ${project.accent} p-8 shadow-[0_24px_80px_rgba(9,34,53,0.1)]`}
          >
            <ProjectPreview
              project={project}
              className="h-64 rounded-[1.6rem] border border-white/45 bg-white/70 shadow-[0_18px_40px_rgba(9,34,53,0.08)]"
              imageClassName="h-full w-full"
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Domain</p>
                <p className="mt-3 text-xl font-semibold text-foreground">{project.domain}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Best fit</p>
                <p className="mt-3 text-xl font-semibold text-foreground">{project.category}</p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/60 bg-white/70 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Audience value</p>
              <p className="mt-3 text-sm leading-8 text-foreground/85">{project.audience}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-panel rounded-[1.9rem] border border-border/70 p-7">
            <span className="section-kicker">Project Challenge</span>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">What needed to change</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">{project.challenge}</p>
          </div>
          <div className="premium-panel rounded-[1.9rem] border border-border/70 p-7">
            <span className="section-kicker">Our Approach</span>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">How the solution was shaped</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">{project.solution}</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="premium-panel rounded-[1.9rem] border border-border/70 p-7">
            <span className="section-kicker">Scope</span>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">What this kind of engagement includes</h2>
            <div className="mt-6 space-y-3">
              {project.deliverables.map((deliverable) => (
                <div key={deliverable} className="rounded-[1.4rem] border border-border/70 bg-white/70 p-4 text-sm leading-7 text-foreground/85">
                  {deliverable}
                </div>
              ))}
            </div>
          </div>

          <div className="premium-panel rounded-[1.9rem] border border-border/70 p-7">
            <div className="flex items-center gap-3 text-foreground">
              <Layers3 className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Why it attracts customers</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-[1.5rem] border border-border/70 bg-white/70 p-5 backdrop-blur">
                  <p className="text-sm leading-8 text-foreground/85">{outcome}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-accent/15 bg-accent/10 p-5">
              <p className="text-sm leading-8 text-foreground/90">
                This case study is designed to show potential clients not just what was built, but how premium presentation, stronger message structure, and cleaner user flow can improve trust and buying confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto rounded-[2rem] bg-navy-gradient px-7 py-10 text-white shadow-[0_30px_90px_rgba(9,34,53,0.26)] md:px-10 md:py-12">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
                <BadgeCheck className="h-4 w-4 text-orange-300" />
                Premium case study
              </span>
              <h2 className="mt-5 max-w-3xl font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.04em]">
                Want work that presents your business at this level?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                If you want a website or digital platform that looks more credible and helps attract better-fit customers, we can shape a project around the same level of clarity and premium presentation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link to="/contact">
                <Button size="lg" className="h-14 rounded-full bg-white px-7 text-base font-semibold text-slate-950 hover:bg-white/90">
                  Start a similar project
                </Button>
              </Link>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/10">
                  Visit live site
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <span className="section-kicker">More Projects</span>
              <h2 className="mt-4 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">Continue through the portfolio</h2>
            </div>
            <Link to="/portfolio" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              View all projects
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link key={item.slug} to={`/portfolio/${item.slug}`} className="premium-panel rounded-[1.7rem] border border-border/70 p-6 transition-transform hover:-translate-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.category}</p>
                <h3 className="mt-4 font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.03em] text-foreground">{item.name}</h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{item.summary}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-foreground">
                  View case study
                  <MoveRight className="h-4 w-4 text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCaseStudy;