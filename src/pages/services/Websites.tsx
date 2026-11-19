import { Globe2, LayoutTemplate, Smartphone, Zap, Search, BarChart2 } from "lucide-react";
import ServicePage, { type ServicePageData } from "@/components/site/ServicePage";

const features = [
  {
    icon: LayoutTemplate,
    title: "Custom design, always",
    text: "Every site is designed from your brand and goals — no templates, no cloned layouts. Each screen is intentional.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    text: "Optimised for every screen size from day one. Tested across devices, not adapted as an afterthought.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    text: "Performance-tuned builds that pass Core Web Vitals and load under 3 seconds globally.",
  },
  {
    icon: Search,
    title: "SEO ready",
    text: "Semantic HTML, structured metadata, sitemaps, and canonical tags built in from the very start.",
  },
  {
    icon: Globe2,
    title: "CMS integration",
    text: "Edit any content without touching code. We configure and hand over a clean, user-friendly CMS.",
  },
  {
    icon: BarChart2,
    title: "Analytics & tracking",
    text: "GA4, conversion events, and goal tracking wired and verified before launch day.",
  },
];

const includes = [
  "Discovery session and wireframes",
  "Custom design in Figma",
  "Development in React, Next.js or WordPress",
  "Domain and hosting guidance",
  "Contact forms and third-party integrations",
  "Post-launch speed and SEO optimisation",
];

const data: ServicePageData = {
  name: "Websites",
  hero: {
    title: "Websites that earn",
    accent: "trust.",
    stacked: true,
    text: "We design and build custom websites from first principles — no templates, no shortcuts. Every site is optimised for speed, search, and conversion before it goes live.",
    cta: "Start your website",
  },
  features: { label: "What you get", title: "Everything a high-performing website needs", items: features },
  includes: {
    label: "Scope",
    title: "What's included in every website project",
    text: "We manage every stage from strategy to handoff so you're never left with an incomplete product or an unexplained process.",
    items: includes,
  },
  cta: {
    title: "Ready to build a website that",
    accent: "actually works?",
    text: "Let's talk about your goals, your audience, and what a well-built site would do for your business.",
  },
};

const ServiceWebsites = () => <ServicePage data={data} />;

export default ServiceWebsites;
