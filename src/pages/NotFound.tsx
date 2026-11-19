import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Chip } from "@/components/site/SectionHeader";

const suggestions = [
  { label: "Our work", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "About us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-20 pt-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[50rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.3), transparent)" }}
      />
      <div className="container mx-auto max-w-3xl text-center">
        <p
          className="font-hero font-extrabold leading-none tracking-[-0.04em] text-white/[0.06]"
          style={{ fontSize: "clamp(7rem, 22vw, 14rem)" }}
          aria-hidden="true"
        >
          404
        </p>
        <div className="-mt-10 md:-mt-16">
          <Chip>Page not found</Chip>
          <h1
            className="mt-6 font-hero font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            This page took a wrong turn<span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-muted-foreground">
            We couldn't find <span className="font-medium text-white">{location.pathname}</span>. It may have moved,
            or the link may be mistyped.
          </p>
          <Link
            to="/"
            className="btn-glow mt-9 inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-accent hover:text-white"
              >
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
