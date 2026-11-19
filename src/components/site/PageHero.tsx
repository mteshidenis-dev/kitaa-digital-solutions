import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import PageBreadcrumb, { type BreadcrumbItem } from "@/components/PageBreadcrumb";

type Action = { to: string; label: string; external?: boolean };

type PageHeroProps = {
  title: ReactNode;
  accent?: ReactNode;
  text?: ReactNode;
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  primary?: Action;
  secondary?: Action;
  children?: ReactNode;
};

const ActionLink = ({ action, className, children }: { action: Action; className: string; children: ReactNode }) =>
  action.external ? (
    <a href={action.to} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : action.to.startsWith("#") ? (
    <a
      href={action.to}
      className={className}
      onClick={(e) => {
        const el = document.querySelector(action.to);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </a>
  ) : (
    <Link to={action.to} className={className}>
      {children}
    </Link>
  );

/** Inner-page hero: same voice as the homepage hero, at a smaller scale. */
const PageHero = ({ title, accent, text, breadcrumb, pageTitle, primary, secondary, children }: PageHeroProps) => {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-32 md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[30rem] w-[60rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.28), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto max-w-4xl text-center">
        <PageBreadcrumb pageTitle={pageTitle} items={breadcrumb} className="sr-only" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1
            className="font-hero font-extrabold leading-[1.02] tracking-[-0.03em] text-white text-balance"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
          >
            {title} {accent && <span className="text-accent">{accent}</span>}
          </h1>
          {text && <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{text}</p>}
          {(primary || secondary) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primary && (
                <ActionLink
                  action={primary}
                  className="btn-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
                >
                  {primary.label} <ArrowRight className="h-4 w-4" />
                </ActionLink>
              )}
              {secondary && (
                <ActionLink
                  action={secondary}
                  className="btn-glass inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
                >
                  {secondary.label}
                </ActionLink>
              )}
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
