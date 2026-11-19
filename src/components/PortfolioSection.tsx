import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ProjectPreview from "@/components/ProjectPreview";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { recentProjects } from "@/lib/projects";

const PortfolioCard = ({ p }: { p: (typeof recentProjects)[number] }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.12)]">
    {/* Image */}
    <div className="relative overflow-hidden">
      <ProjectPreview
        project={p}
        className="h-52"
        imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
        {p.category}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-hero text-lg font-bold leading-snug tracking-tight text-foreground">
          {p.name}
        </h3>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${p.name}`}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ArrowUpRight size={14} />
        </a>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-[1.75] text-muted-foreground">
        {p.headline}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-4 mt-4">
        <span className="text-[11px] font-medium text-muted-foreground/70">
          {p.domain}
        </span>
        <Link
          to={`/portfolio/${p.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Case study <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  </div>
);

const PortfolioSection = ({ limit }: { limit?: number }) => {
  const items = limit ? recentProjects.slice(0, limit) : recentProjects;
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <section id="portfolio" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-kicker">Recent Projects</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-heading font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">
              Recent launches designed to attract better customers.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              These are real projects from our recent work. Each one shows how premium presentation, clearer structure, and stronger business framing can improve how a brand is perceived online.
            </p>
          </motion.div>
          {limit && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link to="/portfolio">
                <Button variant="outline" className="rounded-full gap-2 font-semibold border-border">
                  View All Projects <ArrowUpRight size={16} />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {items.map((p) => (
                <CarouselItem key={p.domain} className="basis-full min-w-0">
                  <PortfolioCard p={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p, i) => (
            <motion.div
              key={p.domain}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <PortfolioCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
