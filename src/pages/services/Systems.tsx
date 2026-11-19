import { Database, GitMerge, BarChart3, Shield, Puzzle, Workflow } from "lucide-react";
import ServicePage, { type ServicePageData } from "@/components/site/ServicePage";

const features = [
  {
    icon: Workflow,
    title: "Custom portals",
    text: "Client portals, staff panels, and self-service tools built precisely to your workflows — nothing generic.",
  },
  {
    icon: GitMerge,
    title: "Workflow automation",
    text: "Repetitive manual processes replaced with reliable automated pipelines that run without supervision.",
  },
  {
    icon: Database,
    title: "Data management",
    text: "Structured databases with clean interfaces for records that are searchable, filterable, and exportable.",
  },
  {
    icon: BarChart3,
    title: "Reporting dashboards",
    text: "Visual summaries of the metrics that matter to your business — updated in real time or on schedule.",
  },
  {
    icon: Shield,
    title: "Role-based access",
    text: "Team members see and do only what their role requires. No more shared credentials or over-exposure.",
  },
  {
    icon: Puzzle,
    title: "Third-party integrations",
    text: "Connect your CRM, accounting software, email platform, logistics tools, and more into one coherent system.",
  },
];

const includes = [
  "Process mapping and system design",
  "Database architecture and schema design",
  "Backend API development",
  "Frontend dashboard and interface build",
  "Access control and permissions setup",
  "Integration testing, deployment, and documentation",
];

const data: ServicePageData = {
  name: "Systems",
  hero: {
    title: "Swap spreadsheets for",
    accent: "real systems.",
    text: "Custom portals, automation tools, and reporting layers that make your team faster and give you a clearer picture of how your business is actually running.",
    cta: "Book a free call",
  },
  features: { label: "What we build", title: "Systems that make operations measurable and manageable", items: features },
  includes: {
    label: "Scope",
    title: "What a systems engagement covers",
    text: "We start by understanding the process before writing any code. The result is a system that fits your team, not one that forces your team to fit it.",
    items: includes,
  },
  cta: {
    title: "Running something on spreadsheets",
    accent: "that shouldn't be?",
    text: "Let's talk about the process. We'll identify where a proper system would save your team the most time and build it correctly from the ground up.",
  },
};

const ServiceSystems = () => <ServicePage data={data} />;

export default ServiceSystems;
