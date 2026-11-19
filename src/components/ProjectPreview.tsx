import { type ProjectEntry } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectPreviewProps = {
  project: ProjectEntry;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  showFallbackLabel?: boolean;
};

const ProjectPreview = ({
  project,
  className,
  imageClassName,
  overlayClassName,
  showFallbackLabel = true,
}: ProjectPreviewProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {project.imageSrc ? (
        <>
          <img
            src={project.imageSrc}
            alt={project.imageAlt}
            loading="lazy"
            className={cn(
              "h-full w-full",
              project.imageFit === "contain" ? "object-contain bg-card p-6" : "object-cover",
              imageClassName,
            )}
          />
          <div className={cn("absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/8 to-transparent", overlayClassName)} />
        </>
      ) : (
        <div className={cn("flex h-full w-full flex-col justify-end bg-gradient-to-br p-6", project.accent)}>
          {showFallbackLabel && (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/60">Project preview unavailable</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.03em] text-foreground">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{project.domain}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;