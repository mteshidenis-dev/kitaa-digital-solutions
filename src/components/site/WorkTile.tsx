import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectEntry } from "@/lib/projects";

/** Project card: full-bleed screenshot, category chip, name and summary over a dark fade. */
const WorkTile = ({ project, featured = false }: { project: ProjectEntry; featured?: boolean }) => (
  <Link
    to={`/portfolio/${project.slug}`}
    className="group relative block h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.07] bg-card"
  >
    {project.imageSrc ? (
      <img
        src={project.imageSrc}
        alt={project.imageAlt}
        loading="lazy"
        style={{ objectPosition: project.imagePosition }}
        className={`absolute inset-0 h-full w-full transition-transform [transition-duration:1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
          project.imageFit === "contain" ? "object-contain bg-white/[0.03] p-10" : "object-cover object-top"
        }`}
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-card" />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
      {project.category}
    </span>
    <span className="absolute right-4 top-4 flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white text-background opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
      <ArrowUpRight className="h-4 w-4" />
    </span>
    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
      <h3 className={`font-heading font-extrabold text-white ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
        {project.name}
      </h3>
      <p className={`mt-1.5 max-w-md leading-6 text-white/75 ${featured ? "text-[15px]" : "text-sm"}`}>{project.short}</p>
    </div>
  </Link>
);

export default WorkTile;
