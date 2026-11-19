import { Paintbrush, PenTool, Image, FileImage, Presentation, Printer } from "lucide-react";
import ServicePage, { type ServicePageData } from "@/components/site/ServicePage";

const features = [
  {
    icon: Paintbrush,
    title: "Brand identity systems",
    text: "Complete visual systems: logo, colour palette, typography, iconography, and clear usage guidelines.",
  },
  {
    icon: PenTool,
    title: "Logo design",
    text: "Mark, wordmark, or combination lock — developed with strategic intent, not just visual preference.",
  },
  {
    icon: Image,
    title: "Social media graphics",
    text: "Templated and custom graphics that keep your feed looking consistent across every platform and format.",
  },
  {
    icon: FileImage,
    title: "Marketing materials",
    text: "Brochures, flyers, proposals, and digital collateral that match your brand standard without exception.",
  },
  {
    icon: Presentation,
    title: "Presentation design",
    text: "Pitch decks and company presentations that look as polished as the content they're built to carry.",
  },
  {
    icon: Printer,
    title: "Print-ready design",
    text: "Business cards, banners, signage, and physical materials prepared to exact print production standards.",
  },
];

const includes = [
  "Brand strategy and positioning session",
  "Logo concepts and refinement rounds",
  "Full brand guidelines document",
  "Social media graphic templates",
  "Print and digital format exports",
  "Ongoing design retainer available",
];

const data: ServicePageData = {
  name: "Graphics",
  hero: {
    title: "A brand that looks",
    accent: "established.",
    stacked: true,
    text: "Brand systems, logo design, and marketing graphics built from strategy — so your business looks consistent, established, and easier to trust everywhere it shows up.",
    cta: "Build your brand",
  },
  features: { label: "What we create", title: "Design that communicates authority before you speak", items: features },
  includes: {
    label: "Scope",
    title: "What a brand identity project delivers",
    text: "We don't hand over a logo file and call it done. You leave with a complete visual system your team can apply consistently across every touchpoint.",
    items: includes,
  },
  cta: {
    title: "Your brand should be working for you,",
    accent: "not against you.",
    text: "Let's talk about where your visual identity is falling short and what a well-built brand system would change for your business.",
  },
};

const ServiceGraphics = () => <ServicePage data={data} />;

export default ServiceGraphics;
