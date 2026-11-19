import type { ProjectEntry } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Two letters from the project name, e.g. "Tulia Essence Tours" → "TE". */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** Small round company logo; shows the company's initials when no logo is available. */
const ProjectLogo = ({ project, className }: { project: ProjectEntry; className?: string }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-card",
      className,
    )}
  >
    {project.logoSrc ? (
      <img src={project.logoSrc} alt={`${project.name} logo`} className="h-full w-full object-cover" />
    ) : (
      <span className="font-heading text-[0.4em] font-extrabold tracking-wide text-white" aria-label={`${project.name} logo`}>
        {initials(project.name)}
      </span>
    )}
  </span>
);

export default ProjectLogo;
