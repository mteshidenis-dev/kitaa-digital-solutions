import { Code2, CalendarCheck, LayoutDashboard, ShoppingCart, TabletSmartphone, Plug } from "lucide-react";
import ServicePage, { type ServicePageData } from "@/components/site/ServicePage";

const features = [
  {
    icon: Code2,
    title: "Custom web applications",
    text: "Purpose-built to your exact workflow — not moulded around a SaaS product's limitations or pricing tiers.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & scheduling systems",
    text: "Reservation and appointment systems that reduce admin load and improve the customer experience end-to-end.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboards",
    text: "Internal control panels to manage users, content, orders, or any operational data from a single interface.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce platforms",
    text: "Custom online stores with tailored checkout flows, inventory management, and payment gateway integration.",
  },
  {
    icon: TabletSmartphone,
    title: "Progressive Web Apps",
    text: "App-like experiences delivered through the browser — fast, offline-capable, no app store required.",
  },
  {
    icon: Plug,
    title: "API & third-party integrations",
    text: "Connect your tools: payment processors, CRMs, email platforms, shipping providers, and more.",
  },
];

const includes = [
  "Requirements mapping and system architecture",
  "Full UI/UX design for every app flow",
  "Frontend and backend development",
  "Authentication and role-based access control",
  "Deployment, hosting setup, and environment configuration",
  "Technical documentation and team handover",
];

const data: ServicePageData = {
  name: "Applications",
  hero: {
    title: "Web applications built around",
    accent: "how your business actually operates",
    text: "Custom web apps, booking systems, portals, and dashboards — built to your exact workflow, not adapted from a generic template or constrained by a subscription tool.",
    cta: "Discuss your application",
  },
  features: { label: "What we build", title: "Applications designed for real business problems", items: features },
  includes: {
    label: "Scope",
    title: "What every application engagement includes",
    text: "We handle the full cycle from defining what the system needs to do, through to building, deploying, and handing over something your team can actually maintain.",
    items: includes,
  },
  cta: {
    title: "Have a system in mind?",
    accent: "Let's scope it.",
    text: "Tell us the problem. We'll map out what needs to be built and give you an honest scope before any commitment.",
  },
};

const ServiceApplications = () => <ServicePage data={data} />;

export default ServiceApplications;
