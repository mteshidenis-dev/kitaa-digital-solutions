import { ArrowUpRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { publishedTestimonials, type Testimonial } from "@/lib/testimonials";
import SectionHeader from "./SectionHeader";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** A single client quote. Reused on the homepage and on case studies. */
export const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <figure className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card p-7">
    <Quote className="h-6 w-6 text-accent" aria-hidden="true" />
    <blockquote className="mt-5 flex-1 text-[15px] leading-7 text-white/85">“{t.quote}”</blockquote>
    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
      {t.photo ? (
        <img src={t.photo} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-heading text-sm font-extrabold text-white">
          {initials(t.name)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-white">{t.name}</span>
        <span className="block text-xs text-muted-foreground">
          {t.role}, {t.business}
        </span>
      </span>
      {t.projectSlug && (
        <Link
          to={`/portfolio/${t.projectSlug}`}
          aria-label={`Read the ${t.business} case study`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-accent hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </figcaption>
  </figure>
);

/** Homepage testimonials. Renders nothing until at least one testimonial is published. */
const Testimonials = () => {
  const items = publishedTestimonials();
  if (!items.length) return null;
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="container mx-auto">
        <SectionHeader label="Testimonials" title="What our clients" accent="say." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name + t.business} delay={(i % 3) * 0.08} y={24}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
        {/* TODO: add a "See our Google reviews" link here once the Google Business Profile has reviews */}
      </div>
    </section>
  );
};

export default Testimonials;
