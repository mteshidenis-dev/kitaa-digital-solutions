import { AppWindow, Globe2, Megaphone, Palette, Workflow, type LucideIcon } from "lucide-react";

export type ServiceItem = { title: string; href: string; text: string; tags: string[]; icon: LucideIcon };

export const services: ServiceItem[] = [
  {
    title: "Websites",
    href: "/services/websites",
    text: "Fast, custom websites and landing pages that make your business look established and bring in enquiries.",
    tags: ["Business sites", "Landing pages", "SEO"],
    icon: Globe2,
  },
  {
    title: "Web Applications",
    href: "/services/applications",
    text: "Booking tools, dashboards, and customer portals built around how your team actually works.",
    tags: ["Dashboards", "Portals", "Booking"],
    icon: AppWindow,
  },
  {
    title: "Business Systems",
    href: "/services/systems",
    text: "Replace spreadsheets and paperwork with simple systems for sales, stock, staff, and reporting.",
    tags: ["Automation", "Reporting", "Admin tools"],
    icon: Workflow,
  },
  {
    title: "Brand & Graphics",
    href: "/services/graphics",
    text: "Logos, brand identity, company profiles, and print that make you memorable and consistent.",
    tags: ["Logo", "Identity", "Profiles"],
    icon: Palette,
  },
  {
    title: "Social Media",
    href: "/services/social-media",
    text: "Content and page management that keep your brand active, visible, and on-message.",
    tags: ["Content", "Management", "Ads"],
    icon: Megaphone,
  },
];

export const processSteps = [
  { title: "Discovery call", text: "We learn your business, your customers, and what success looks like for this project." },
  { title: "Design", text: "You see the look and structure early, and we refine it together before building." },
  { title: "Build & launch", text: "We develop, test on phones and desktops, and launch on your domain." },
  { title: "Grow", text: "After launch we keep improving based on real visitors and your feedback." },
];
