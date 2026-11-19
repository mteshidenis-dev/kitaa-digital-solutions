import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Sparkles, Shield, HeadphonesIcon, DollarSign, Cpu } from "lucide-react";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const reasons = [
  { icon: Sparkles, title: "Creative Solutions", desc: "Unique designs tailored to your brand identity." },
  { icon: Shield, title: "Professional Development", desc: "Clean, scalable code built with best practices." },
  { icon: HeadphonesIcon, title: "Reliable Support", desc: "Ongoing maintenance and quick response times." },
  { icon: DollarSign, title: "Affordable Services", desc: "Quality solutions that fit your budget." },
  { icon: Cpu, title: "Modern Technology", desc: "Latest frameworks and tools for optimal performance." },
];

const ReasonCard = ({ r }: { r: (typeof reasons)[number] }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors h-full">
    <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
      <r.icon size={20} />
    </div>
    <div>
      <h3 className="font-heading font-semibold text-sm mb-1">{r.title}</h3>
      <p className="text-xs text-primary-foreground/60 leading-relaxed">{r.desc}</p>
    </div>
  </div>
);

const WhyChooseUs = () => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <section className="section-padding bg-primary text-primary-foreground">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
            Why Choose Kitaa?
          </h2>
          <p className="text-primary-foreground/60 leading-relaxed">
            We combine creativity and technology to deliver solutions that make a real difference for your business.
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          {/* Mobile carousel */}
          <div className="sm:hidden">
            <Carousel
              opts={{ loop: true, align: "start" }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {reasons.map((r) => (
                  <CarouselItem key={r.title} className="basis-full min-w-0">
                    <ReasonCard r={r} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Tablet/Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ReasonCard r={r} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default WhyChooseUs;
