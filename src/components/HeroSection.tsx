import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.webp";
import CountUp from "@/components/CountUp";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden">
    {/* Bold background */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
    </div>

    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        {/* Text — spans 7 cols */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Digital Agency — Est. 2021
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-foreground leading-[1.05] mb-8">
            Building Digital
            <br />
            Solutions for{" "}
            <span className="relative inline-block">
              <span className="text-gradient">Modern</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C40 2 160 2 198 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            Businesses
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
            We design websites, develop business systems, create powerful brands,
            and help businesses grow digitally.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link to="/portfolio">
              <Button
                size="lg"
                className="bg-accent hover:bg-orange-dark text-accent-foreground font-semibold gap-2 px-8 rounded-full h-14 text-base"
              >
                View Our Work <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold gap-2 border-border text-foreground hover:bg-secondary px-8 rounded-full h-14 text-base"
              >
                <Play size={16} className="text-accent" /> Start Your Project
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-10 border-t border-border pt-8">
            {[
              { num: "50+", label: "Projects Delivered" },
              { num: "30+", label: "Happy Clients" },
              { num: "5+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <CountUp value={stat.num} className="text-3xl font-heading font-extrabold text-foreground" />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image — spans 5 cols */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative hidden lg:flex justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl rotate-3" />
            <img
              src={heroImg}
              alt="Digital solutions illustration"
              fetchPriority="high"
              className="relative w-full max-w-md rounded-2xl"
            />
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/3 bg-card shadow-xl rounded-2xl p-4 border border-border"
            >
              <p className="text-2xl font-heading font-bold text-accent">98%</p>
              <p className="text-xs text-muted-foreground">Client Satisfaction</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
