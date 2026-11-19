import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const posts = [
  {
    title: "How to Start a Successful Business in 2026",
    excerpt: "Essential steps and strategies for launching your business in the digital age — from positioning to infrastructure.",
    date: "Mar 1, 2026",
    category: "Business",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "Why Every Business Needs a Website",
    excerpt: "Discover how a professional website transforms business growth and credibility beyond just having an online presence.",
    date: "Feb 20, 2026",
    category: "Web Development",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "Digital Marketing Tips for Small Businesses",
    excerpt: "Cost-effective digital marketing strategies that deliver real, measurable results for growing businesses.",
    date: "Feb 10, 2026",
    category: "Marketing",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Top Technology Trends Shaping 2026",
    excerpt: "From AI to edge computing — the tech trends every business leader should understand and act on.",
    date: "Jan 28, 2026",
    category: "Technology",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "The Power of Branding for Startups",
    excerpt: "How a strong brand identity sets successful startups apart and builds long-term commercial momentum.",
    date: "Jan 15, 2026",
    category: "Branding",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for developing web apps that scale reliably and stay maintainable as the business grows.",
    date: "Jan 5, 2026",
    category: "Development",
    readTime: "8 min read",
    featured: false,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

const Blog = () => {
  const [active, setActive] = useState("All");
  const featured = posts[0];
  const rest = posts.slice(1);
  const filtered = active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-[#050d1a] px-4 pb-20 pt-28 md:pt-36">
        {/* Orb gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 42%, rgba(233,120,17,0.09) 0%, transparent 55%), radial-gradient(ellipse at 16% 36%, rgba(9,34,90,0.7) 0%, transparent 55%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <PageBreadcrumb
            pageTitle="Blog"
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            className="mb-7"
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
              Insights
            </span>
            <h1 className="mt-5 font-hero font-black text-2xl leading-tight text-white sm:text-4xl md:text-[3.25rem]">
              Ideas and notes for
              <br />
              <span className="text-accent">growing businesses.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60">
              Practical thinking on websites, branding, systems, and the decisions businesses face when they outgrow improvised digital setups.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-12 grid max-w-sm grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            {[
              { value: `${posts.length}`, label: "Articles" },
              { value: `${CATEGORIES.length - 1}`, label: "Topics" },
              { value: "Free", label: "Always" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-3 py-4">
                <span className="font-hero text-xl font-black text-white sm:text-2xl">{value}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="px-4 pt-16 md:pt-20">
        <div className="container mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-[#050d1a] shadow-[0_8px_48px_rgba(9,34,53,0.18)]"
          >
            {/* subtle orb inside the card */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 80% 50%, rgba(233,120,17,0.07) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 grid gap-8 p-8 md:p-12 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-hero font-bold uppercase tracking-[0.14em] text-accent">
                    Featured
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                    {featured.category}
                  </span>
                </div>
                <h2 className="mt-5 font-hero font-black text-xl leading-snug text-white sm:text-2xl md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/60">{featured.excerpt}</p>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <Calendar size={14} className="text-accent" />
                  {featured.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <Clock size={14} className="text-accent" />
                  {featured.readTime}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm font-hero font-bold text-white group-hover:text-accent transition-colors">
                  Read article <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── ALL POSTS ── */}
      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto">
          {/* Category filter */}
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-hero font-bold uppercase tracking-[0.14em] transition-colors ${
                  active === cat
                    ? "border-accent bg-accent text-white"
                    : "border-border/60 bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-border/60 bg-card shadow-[0_2px_16px_rgba(9,34,53,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(9,34,53,0.12)]"
                >
                  {/* Category colour bar */}
                  <div className="h-1 w-full rounded-t-2xl bg-accent/40" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="self-start rounded-full bg-accent/10 px-3 py-1 text-[11px] font-hero font-bold uppercase tracking-[0.13em] text-accent">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-hero font-bold text-base leading-snug text-foreground transition-colors group-hover:text-accent sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground line-clamp-3">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {p.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {p.readTime}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/60 bg-card p-8 shadow-[0_4px_32px_rgba(9,34,53,0.07)] md:flex md:items-center md:justify-between md:gap-8"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
                Content strategy
              </p>
              <h2 className="mt-3 text-xl font-hero font-black tracking-[-0.03em] text-foreground md:text-2xl">
                Want us to build a blog content plan that actually supports your business goals?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground font-normal">
                We help clients turn the blog into a real trust layer — not just a placeholder page.
              </p>
            </div>
            <Link to="/contact" className="mt-6 block shrink-0 md:mt-0">
              <Button size="lg" className="h-12 w-full rounded-xl px-7 font-hero font-bold md:w-auto">
                Plan content with us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

