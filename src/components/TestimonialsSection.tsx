import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  { name: "James Mwangi", role: "CEO, TechVentures", text: "Kitaa delivered an outstanding website that perfectly represents our brand. Their attention to detail and professionalism exceeded our expectations.", initials: "JM" },
  { name: "Amina Hassan", role: "Founder, StyleHub", text: "The e-commerce platform they built for us is incredible. Our online sales have grown 200% since launch. Highly recommend their services!", initials: "AH" },
  { name: "David Ochieng", role: "Director, GreenField Hotels", text: "From concept to launch, the Kitaa team was exceptional. They understood our vision and created a beautiful hotel website that our guests love.", initials: "DO" },
];

const TestimonialCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-colors group h-full">
    <div className="flex gap-1 mb-6">
      {Array.from({ length: 5 }).map((_, j) => (
        <Star key={j} size={14} className="fill-accent text-accent" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground mb-8 leading-relaxed italic">
      "{t.text}"
    </p>
    <div className="flex items-center gap-3 border-t border-border pt-6">
      <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center font-heading font-bold text-sm">
        {t.initials}
      </div>
      <div>
        <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-3">
          What Our Clients Say
        </h2>
      </motion.div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="basis-full min-w-0">
                <TestimonialCard t={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <TestimonialCard t={t} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default TestimonialsSection;
