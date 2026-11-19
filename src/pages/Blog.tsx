import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import CTABlock from "@/components/site/CTABlock";
import PageHero from "@/components/site/PageHero";
import { Chip } from "@/components/site/SectionHeader";
import { siteContact } from "@/lib/site";

/*
 * These articles are planned but not written yet, so they are shown as
 * "Coming soon" with no links. When an article is published, give it a page
 * and link the card to it.
 */
const posts = [
  {
    title: "How to Start a Successful Business in 2026",
    excerpt: "Essential steps and strategies for launching your business in the digital age, from positioning to infrastructure.",
    category: "Business",
    readTime: "5 min read",
  },
  {
    title: "Why Every Business Needs a Website",
    excerpt: "How a professional website transforms business growth and credibility beyond just having an online presence.",
    category: "Web Development",
    readTime: "4 min read",
  },
  {
    title: "Digital Marketing Tips for Small Businesses",
    excerpt: "Cost-effective digital marketing strategies that deliver real, measurable results for growing businesses.",
    category: "Marketing",
    readTime: "6 min read",
  },
  {
    title: "Top Technology Trends Shaping 2026",
    excerpt: "From AI to edge computing: the tech trends every business leader should understand and act on.",
    category: "Technology",
    readTime: "7 min read",
  },
  {
    title: "The Power of Branding for Startups",
    excerpt: "How a strong brand identity sets successful startups apart and builds long-term commercial momentum.",
    category: "Branding",
    readTime: "5 min read",
  },
  {
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for developing web apps that scale reliably and stay maintainable as the business grows.",
    category: "Development",
    readTime: "8 min read",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

const Blog = () => {
  const [active, setActive] = useState("All");
  const featured = posts[0];
  const filtered = active === "All" ? posts.slice(1) : posts.filter((p) => p.category === active);

  return (
    <div>
      <PageHero
        pageTitle="Blog"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        label="Insights"
        title="Ideas and notes for"
        accent="growing businesses."
        text="Practical thinking on websites, branding, systems, and the decisions businesses face when they outgrow improvised digital setups."
      />

      {/* Featured */}
      <section className="px-4 pb-12">
        <Reveal className="container mx-auto">
          <div className="relative grid overflow-hidden rounded-3xl border border-white/[0.07] bg-card md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 p-7 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Chip>Featured</Chip>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">Coming soon</span>
              </div>
              <h2 className="mt-6 font-heading text-3xl font-extrabold leading-tight text-white text-balance md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
            </div>
            <div className="relative min-h-[220px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(31,116,242,0.55), transparent 55%), radial-gradient(circle at 80% 80%, rgba(56,132,255,0.3), transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <p className="absolute bottom-6 right-6 font-heading text-7xl font-extrabold text-white/10 md:text-8xl">01</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Filters + grid */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="container mx-auto">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === c ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="blog-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <SpotlightCard className="flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{p.category}</span>
                      <span className="text-xs font-medium text-accent">Coming soon</span>
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-extrabold leading-snug text-white">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {p.readTime}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">Want a heads-up when new articles go live?</p>
            <a
              href={siteContact.phones[0].whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default Blog;
