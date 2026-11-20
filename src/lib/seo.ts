import { getProjectBySlug } from "./projects";
import { SITE_URL } from "./site";

export type PageMeta = { title: string; description: string; noindex?: boolean };

const brand = "Kitaa Digital Solutions";

/** Per-route titles and descriptions. Case studies are generated from project data below. */
const pages: Record<string, PageMeta> = {
  "/": {
    title: `${brand} | Web Design in Arusha, Tanzania`,
    description:
      "Kitaa Digital Solutions builds fast, custom websites, booking systems, brands and social media for businesses in Arusha and across Tanzania.",
  },
  "/services": {
    title: `Services | ${brand}`,
    description:
      "Websites, web apps, business systems, branding and social media management from one Arusha-based team.",
  },
  "/services/websites": {
    title: `Website Design in Tanzania | ${brand}`,
    description:
      "Custom website design in Arusha and across Tanzania: fast, mobile-friendly business, booking and safari and tour websites built to win enquiries.",
  },
  "/services/applications": {
    title: `Web Applications | ${brand}`,
    description:
      "Custom web apps, booking systems, customer portals and dashboards built around how your Tanzanian business actually works.",
  },
  "/services/systems": {
    title: `Business Systems | ${brand}`,
    description:
      "Business systems that replace spreadsheets: stock, invoicing, reporting and staff tools, built by an Arusha-based team.",
  },
  "/services/graphics": {
    title: `Logo & Brand Design | ${brand}`,
    description:
      "Logo design, brand identity and company profiles for businesses in Arusha and across Tanzania that want to look established.",
  },
  "/services/social-media": {
    title: `Social Media Management in Tanzania | ${brand}`,
    description:
      "Social media management in Tanzania: designed posts, Swahili or English captions, community management and paid ads.",
  },
  "/pricing": {
    title: `Pricing | ${brand}`,
    description:
      "Clear starting prices in TZS for websites, systems, branding, social media and SEO. Fixed written quote before any work starts.",
  },
  "/portfolio": {
    title: `Our Work | ${brand}`,
    description:
      "Websites we've built for safari, tour, hospitality and education businesses across Tanzania.",
  },
  "/about": {
    title: `About | ${brand}`,
    description:
      "Meet the team behind Kitaa Digital Solutions, a design and engineering studio in Arusha, Tanzania.",
  },
  "/contact": {
    title: `Contact | ${brand}`,
    description: "Talk to Kitaa Digital Solutions by WhatsApp, phone or email. We reply within 24 hours.",
  },
  "/blog": {
    title: `Blog | ${brand}`,
    description: "Practical ideas on websites, branding and digital systems for growing businesses in Tanzania.",
  },
  "/privacy": {
    title: `Privacy Policy | ${brand}`,
    description: "How Kitaa Digital Solutions collects, uses and protects your information.",
  },
  "/terms": {
    title: `Terms & Conditions | ${brand}`,
    description: "The terms that apply when you use the Kitaa Digital Solutions website.",
  },
};

const notFound: PageMeta = {
  title: `Page not found | ${brand}`,
  description: "This page could not be found.",
  noindex: true,
};

/** Canonical form: absolute URL, no trailing slash except the root. */
export const canonicalUrl = (path: string) => {
  const clean = path !== "/" ? path.replace(/\/+$/, "") : "/";
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};

export const getPageMeta = (path: string): PageMeta => {
  const clean = path !== "/" ? path.replace(/\/+$/, "") : "/";
  if (pages[clean]) return pages[clean];
  const caseStudy = clean.match(/^\/portfolio\/([^/]+)$/);
  if (caseStudy) {
    const project = getProjectBySlug(caseStudy[1]);
    if (project)
      return {
        title: `${project.name} Case Study | ${brand}`,
        description: `${project.summary} A ${project.category.toLowerCase()} project by Kitaa Digital Solutions, Tanzania.`,
      };
  }
  return notFound;
};

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
