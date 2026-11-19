import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_center,rgba(31,116,242,0.35),transparent_65%)] bg-card p-12 md:p-20 text-center overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px]" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Let's Build Something
            <br />
            <span className="text-accent">Great Together</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-10 text-lg">
            Ready to take your business to the next level? Let's discuss your project and create something amazing.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-orange-dark text-accent-foreground font-semibold gap-2 px-10 rounded-full h-14 text-base"
            >
              Start Your Project <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
