import { motion } from "framer-motion";
import { Globe, Settings, Palette, TrendingUp, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "We create responsive, modern websites for businesses, brands, and startups.",
    num: "01",
  },
  {
    icon: Settings,
    title: "System Design & Development",
    desc: "We build custom business systems, management platforms, and web applications.",
    num: "02",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Logos, branding, posters, and social media graphics that stand out.",
    num: "03",
  },
  {
    icon: TrendingUp,
    title: "Business Digital Consultation",
    desc: "Helping entrepreneurs start and grow businesses using digital solutions.",
    num: "04",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-3 leading-tight">
            Services that drive <span className="text-gradient">results</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 flex items-end"
        >
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            We offer end-to-end digital solutions to help your business thrive in the modern world.
          </p>
        </motion.div>
      </div>

      <div className="space-y-0">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group grid md:grid-cols-12 gap-6 items-center py-8 border-t border-border last:border-b cursor-pointer hover:bg-secondary/50 -mx-6 px-6 transition-colors rounded-xl"
          >
            <div className="md:col-span-1">
              <span className="text-sm font-heading font-bold text-muted-foreground">{s.num}</span>
            </div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <s.icon size={22} />
              </div>
            </div>
            <div className="md:col-span-4">
              <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                {s.title}
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <ArrowUpRight
                size={20}
                className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
