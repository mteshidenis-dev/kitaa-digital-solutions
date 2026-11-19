import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Check,
  ClipboardCheck,
  FileSignature,
  Globe2,
  KeyRound,
  Lock,
  MessageCircle,
  Rocket,
  Smartphone,
  Wallet,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CTABlock from "@/components/site/CTABlock";
import PageHero from "@/components/site/PageHero";
import ProjectBriefDialog from "@/components/site/ProjectBriefDialog";
import SectionHeader, { Chip } from "@/components/site/SectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import {
  addOns,
  billingLabel,
  formatTZS,
  formatUSD,
  pricingCategories,
  USD_RATE,
  type Plan,
  type PricingCategory,
} from "@/lib/pricing";

const included = [
  { icon: Globe2, title: "Domain, hosting and email", text: "Free for the first year on every website." },
  { icon: Lock, title: "SSL security", text: "The padlock that tells visitors your site is safe." },
  { icon: Smartphone, title: "Mobile-first design", text: "Looks and works great on every phone." },
  { icon: MessageCircle, title: "WhatsApp button", text: "Visitors reach you in one tap." },
  { icon: Zap, title: "Speed-optimised", text: "Fast pages that keep visitors and help SEO." },
  { icon: KeyRound, title: "You own it", text: "Your domain, content and design belong to you." },
];

const promises = [
  {
    icon: FileSignature,
    title: "Fixed quote, in writing",
    text: "You agree the scope and price before we start. No surprise invoices.",
  },
  {
    icon: ClipboardCheck,
    title: "Approve the design first",
    text: "You see and approve the design before any building begins.",
  },
  {
    icon: BadgeCheck,
    title: "Support after launch",
    text: "Every project includes free support, so you're never left alone.",
  },
];

const paymentSteps = [
  { title: "50% to start", text: "A deposit books your project and starts the design." },
  { title: "Approve the design", text: "We refine it with you until it's right." },
  { title: "50% at launch", text: "Pay the balance when your project goes live." },
];

const faqs = [
  {
    q: "Are there any hidden costs?",
    a: "No. You get a written quote before we start, and that's what you pay. For websites, the only recurring cost is renewing your domain, hosting and email from year two (TZS 150,000 per year).",
  },
  {
    q: "Why do some prices say “From”?",
    a: "Online shops, booking sites and systems vary a lot in size. The “From” price is the starting point; after a short call we give you a fixed quote for your exact needs.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. Websites and branding are paid 50% to start and 50% at launch. Systems are paid in milestones as each stage is delivered. If you need a different arrangement, just ask.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "M-Pesa, Mixx by Yas (Tigo Pesa), Airtel Money and bank transfer.",
  },
  {
    q: "Can I start small and upgrade later?",
    a: "Yes. Start with the package that fits today and upgrade later by paying only the difference.",
  },
  {
    q: "Is ad spend included in social media plans?",
    a: "No. Our fee covers strategy, design and management. Ad spend is paid directly to Facebook, Instagram or TikTok, so you always see exactly where your budget goes.",
  },
];

const PlanCard = ({ plan, category, usd }: { plan: Plan; category: PricingCategory; usd: boolean }) => {
  const primary = usd ? formatUSD(plan.price).replace("≈ ", "") : formatTZS(plan.price);
  const secondary = usd ? formatTZS(plan.price) : formatUSD(plan.price);
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-7 md:p-8 ${
        plan.popular ? "border-accent/60 bg-accent/[0.06]" : "border-white/[0.08] bg-card"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h3 className="font-heading text-2xl font-extrabold text-white">{plan.name}</h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">{plan.tagline}</p>

      <div className="mt-6">
        {plan.from && <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">From</p>}
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-3xl font-extrabold tracking-[-0.02em] text-white md:text-4xl">
            {usd && "≈ "}
            {primary}
          </span>
          <span className="text-sm text-muted-foreground">{billingLabel[plan.billing]}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{secondary}</p>
      </div>

      {plan.delivery && (
        <p className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-white/75">
          <Rocket className="h-3.5 w-3.5 text-accent" /> {plan.delivery}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.06] pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm leading-6 text-white/85">
            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      <ProjectBriefDialog defaultNeed={category.need} packageName={`${category.label}: ${plan.name}`}>
        <button
          type="button"
          className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold ${
            plan.popular ? "btn-glow" : "btn-glass"
          }`}
        >
          Choose {plan.name}
        </button>
      </ProjectBriefDialog>
    </div>
  );
};

const Pricing = () => {
  const [active, setActive] = useState(pricingCategories[0].id);
  const [usd, setUsd] = useState(false);
  const category = pricingCategories.find((c) => c.id === active) ?? pricingCategories[0];

  // Structured data so search engines and AI assistants can read the prices.
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Kitaa Digital Solutions pricing",
      itemListElement: pricingCategories.flatMap((c) =>
        c.plans.map((p) => ({
          "@type": "Offer",
          name: `${c.label}: ${p.name}`,
          description: p.tagline,
          priceCurrency: "TZS",
          price: p.price,
          ...(p.billing === "month"
            ? { priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "TZS", unitCode: "MON" } }
            : {}),
        })),
      ),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "pricing-schema";
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <div>
      <PageHero
        pageTitle="Pricing"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        title="Clear prices."
        accent="No surprises."
        stacked
        text="Honest starting prices in Tanzanian shillings for every service. You always get a fixed, written quote before any work begins."
      >
        <div
          className="mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1"
          role="group"
          aria-label="Choose currency"
        >
          {[
            { id: false, label: "TZS" },
            { id: true, label: "US$" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={usd === o.id}
              onClick={() => setUsd(o.id)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                usd === o.id ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {usd === o.id && (
                <motion.span layoutId="currency-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" />
              )}
              {o.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          US$ amounts are approximate (1 US$ ≈ TZS {USD_RATE.toLocaleString("en-US")}). We invoice in TZS.
        </p>
      </PageHero>

      {/* Category tabs */}
      <section className="sticky top-16 z-30 border-y border-white/[0.06] bg-background/80 px-4 backdrop-blur-xl md:top-20">
        <div className="container mx-auto">
          <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 py-3 md:justify-center" role="tablist">
            {pricingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === c.id ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="pricing-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-7 text-muted-foreground">
                {category.intro}
              </p>
              <div className="grid gap-5 pt-3 lg:grid-cols-3">
                {category.plans.map((p) => (
                  <PlanCard key={p.name} plan={p} category={category} usd={usd} />
                ))}
              </div>
              {category.note && <p className="mt-8 text-center text-sm text-muted-foreground">{category.note}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Included with every website */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader center label="Included" title="Every website comes with" accent="the essentials." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06} y={20}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/[0.07] bg-card p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading font-extrabold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promises + payment */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/[0.07] bg-card p-7 md:p-10">
              <Chip>Our promise</Chip>
              <h2 className="mt-5 font-heading text-2xl font-extrabold text-white md:text-3xl">
                Working with us is <span className="text-accent">low-risk.</span>
              </h2>
              <ul className="mt-8 space-y-5">
                {promises.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-white/[0.07] bg-card p-7 md:p-10">
              <Chip>How payment works</Chip>
              <h2 className="mt-5 font-heading text-2xl font-extrabold text-white md:text-3xl">
                Simple, fair <span className="text-accent">instalments.</span>
              </h2>
              <ol className="mt-8 space-y-5">
                {paymentSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-6">
                <Wallet className="mr-1 h-4 w-4 text-accent" />
                {["M-Pesa", "Mixx by Yas", "Airtel Money", "Bank transfer"].map((m) => (
                  <span key={m} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/75">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Add-ons */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <SectionHeader label="Add-ons" title="Need a little" accent="extra?" text="Add these to any package." />
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
              {addOns.map((a, i) => (
                <div
                  key={a.name}
                  className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    i ? "border-t border-white/[0.06]" : ""
                  }`}
                >
                  <span className="text-[15px] text-white/90">{a.name}</span>
                  <span className="text-sm">
                    <span className="font-semibold text-white">
                      {usd ? formatUSD(a.price) : formatTZS(a.price)}
                    </span>
                    {a.unit && <span className="ml-1.5 text-muted-foreground">{a.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl">
          <SectionHeader center label="Pricing FAQ" title="Questions about" accent="pricing." />
          <Reveal>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/[0.07] bg-card px-5 transition-colors data-[state=open]:border-white/[0.14]"
                >
                  <AccordionTrigger className="py-5 text-left font-heading text-base font-bold text-white hover:no-underline [&>svg]:hidden">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 [[data-state=open]_&]:rotate-45" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CTABlock
        title="Not sure which package"
        accent="fits?"
        text="Tell us what you're trying to achieve. We'll recommend the right package and send a fixed quote within 24 hours."
        primaryLabel="Get a free quote"
      />
    </div>
  );
};

export default Pricing;
