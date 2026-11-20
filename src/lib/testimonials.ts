/*
 * Client testimonials shown on the homepage.
 *
 * Only entries with `published: true` are displayed, and the whole section is
 * hidden while none are published, so placeholders can never go live.
 * Never invent quotes: use real words from real clients, with their permission.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  business: string;
  /** Optional square photo in /public, e.g. "/testimonials/jane.webp". */
  photo?: string;
  /** Optional case study slug, e.g. "masatu-tours". */
  projectSlug?: string;
  published: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "TODO: client quote",
    name: "TODO: client name",
    role: "TODO: role, e.g. Founder",
    business: "Masatu Tours",
    projectSlug: "masatu-tours",
    published: false,
  },
  {
    quote: "TODO: client quote",
    name: "TODO: client name",
    role: "TODO: role",
    business: "BCB Safaris",
    projectSlug: "bcb-safaris",
    published: false,
  },
  {
    quote: "TODO: client quote",
    name: "TODO: client name",
    role: "TODO: role",
    business: "Elem Adventures",
    projectSlug: "elem-adventures",
    published: false,
  },
];

export const publishedTestimonials = () => testimonials.filter((t) => t.published);
