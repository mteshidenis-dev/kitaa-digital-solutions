import { Cpu, HeadphonesIcon, Shield, Sparkles, Wallet } from "lucide-react";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import SectionHeader from "@/components/site/SectionHeader";

const reasons = [
  { icon: Sparkles, title: "Creative solutions", desc: "Unique designs tailored to your brand identity, never a template." },
  { icon: Shield, title: "Professional development", desc: "Clean, scalable code built with best practices." },
  { icon: HeadphonesIcon, title: "Reliable support", desc: "Ongoing maintenance and quick response times." },
  { icon: Wallet, title: "Fair pricing", desc: "Quality work with a clear quote that fits your budget." },
  { icon: Cpu, title: "Modern technology", desc: "Current frameworks and tools for fast, secure sites." },
];

const WhyChooseUs = () => (
  <section className="px-4 py-12 md:py-16">
    <div className="container mx-auto">
      <SectionHeader
        label="Why Kitaa"
        title="Why businesses choose"
        accent="Kitaa."
        text="We combine creativity and technology to deliver solutions that make a real difference for your business."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.06} y={24}>
            <SpotlightCard className="h-full p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                <r.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-5 font-heading text-base font-extrabold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
