import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Small pill label with a blue dot, used above section titles. */
export const Chip = ({ children, className }: { children: string; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70",
      className,
    )}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    {children}
  </span>
);

/** Standard section title size used across the site. */
export const sectionTitleClass = "font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance";
export const sectionTitleStyle = { fontSize: "clamp(2rem, 3.6vw, 3rem)" } as const;

type SectionHeaderProps = {
  label: string;
  title: string;
  accent?: string;
  text?: string;
  action?: { to: string; label: string };
  center?: boolean;
  className?: string;
};

const SectionHeader = ({ label, title, accent, text, action, center, className }: SectionHeaderProps) => (
  <Reveal
    className={cn(
      "mb-12 flex flex-col gap-6 md:mb-16",
      center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      className,
    )}
  >
    <div className={cn("max-w-3xl", center && "mx-auto")}>
      <Chip>{label}</Chip>
      <h2 className={cn("mt-5", sectionTitleClass)} style={sectionTitleStyle}>
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h2>
      {text && (
        <p className={cn("mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground", center && "mx-auto")}>{text}</p>
      )}
    </div>
    {action && (
      <Link
        to={action.to}
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.04] md:self-auto"
      >
        {action.label}
        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    )}
  </Reveal>
);

export default SectionHeader;
