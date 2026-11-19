import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code, Rocket } from "lucide-react";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const steps = [
  { icon: Lightbulb, title: "Idea & Planning", desc: "We discuss your goals and plan the perfect solution." },
  { icon: PenTool, title: "Design", desc: "Crafting beautiful, user-friendly designs and prototypes." },
  { icon: Code, title: "Development", desc: "Building robust, scalable solutions with modern tech." },
  { icon: Rocket, title: "Launch & Support", desc: "Deploying your project and providing ongoing support." },
];

const StepCard = ({ s, i }: { s: (typeof steps)[number]; i: number }) => (
  <div className="relative text-center">
    <div className="relative z-10 w-20 h-20 rounded-2xl bg-accent mx-auto mb-6 flex items-center justify-center text-accent-foreground shadow-lg shadow-accent/20">
      <s.icon size={32} />
    </div>
    <span className="inline-block text-xs font-heading font-bold text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
      Step {i + 1}
    </span>
    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{s.title}</h3>
    <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">{s.desc}</p>
  </div>
);

const ProcessSection = () => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-wider">How We Work</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-3">Our Process</h2>
      </motion.div>

{/* Mobile carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {steps.map((s, i) => (
              <CarouselItem key={s.title} className="basis-full min-w-0">
                <StepCard s={s} i={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop grid */}
      <div className="relative hidden md:block">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <StepCard s={s} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default ProcessSection;
