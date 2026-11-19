import { CalendarDays, FileText, MessageSquare, TrendingUp, Megaphone, Repeat2 } from "lucide-react";
import ServicePage, { type ServicePageData } from "@/components/site/ServicePage";

const features = [
  {
    icon: FileText,
    title: "Content strategy",
    text: "Monthly content plans aligned to your business goals, seasonal calendar, and target audience behaviour.",
  },
  {
    icon: Repeat2,
    title: "Post creation",
    text: "Designed graphics and copy written in your brand voice — consistent, on-brand, and ready to publish.",
  },
  {
    icon: CalendarDays,
    title: "Scheduling & publishing",
    text: "Content goes out at optimised times across your chosen platforms — handled, not just handed over.",
  },
  {
    icon: MessageSquare,
    title: "Community management",
    text: "Replies, DMs, and engagement handled professionally on your behalf so no conversation gets ignored.",
  },
  {
    icon: TrendingUp,
    title: "Performance reporting",
    text: "Monthly analytics reports covering reach, engagement, follower growth, and what to adjust next.",
  },
  {
    icon: Megaphone,
    title: "Paid social advertising",
    text: "Targeted ad campaigns managed from creative brief through to budget allocation and return reporting.",
  },
];

const includes = [
  "Platform audit and strategy document",
  "Monthly content calendar",
  "Custom-designed post graphics",
  "Caption writing and hashtag research",
  "Scheduling across all active platforms",
  "Monthly performance report and recommendations",
];

const data: ServicePageData = {
  name: "Social Media",
  hero: {
    title: "Social media that builds presence",
    accent: "without burning your time",
    text: "Strategy, content creation, scheduling, and reporting — handled consistently every month so your brand shows up where your audience is already paying attention.",
    cta: "Get started",
  },
  features: { label: "What we handle", title: "Everything your social presence needs to grow consistently", items: features },
  includes: {
    label: "Monthly retainer",
    title: "What's included every month",
    text: "We work as an extension of your team. You approve the content plan, we handle everything from creation to publishing to reporting.",
    items: includes,
  },
  cta: {
    title: "Last time you posted was",
    accent: "too long ago?",
    text: "Let's fix your social presence. We'll audit your current accounts and put together a plan that's consistent, on-brand, and actually manageable.",
  },
};

const ServiceSocialMedia = () => <ServicePage data={data} />;

export default ServiceSocialMedia;
