import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContact } from "@/lib/site";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteContact.email,
    href: `mailto:${siteContact.email}`,
    note: "Replies within 24 hours",
  },
  ...siteContact.phones.map((phone, i) => ({
    icon: Phone,
    label: phone.label,
    value: phone.display,
    href: phone.href,
    note: i === 0 ? "WhatsApp available" : "Business hours",
  })),
  {
    icon: MapPin,
    label: "Location",
    value: siteContact.location,
    href: undefined as string | undefined,
    note: "Available for on-site meetings",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "Could not send your message.");
      }
      toast.success(data.message || "Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : `Could not send your message. Please email ${siteContact.email}.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-background px-4 pb-20 pt-28 md:pt-36">
        {/* Orb gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 75% 40%, rgba(31,116,242,0.09) 0%, transparent 55%), radial-gradient(ellipse at 18% 38%, rgba(31,116,242,0.16) 0%, transparent 55%)",
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
            pageTitle="Contact"
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            className="mb-7"
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
              Contact Us
            </span>
            <h1 className="mt-5 font-hero font-bold text-2xl leading-tight text-white sm:text-4xl sm:leading-[1.1] md:text-[3.25rem]">
              Start the conversation.
              <br />
              <span className="text-accent">We move fast.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60">
              Tell us what you need built, fixed, or sharpened. We'll respond within 24 hours with a clear next step — no vague proposals, no endless back-and-forth.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#contact-form">
                <Button size="lg" className="h-12 w-full rounded-sm px-8 font-hero font-bold sm:w-auto">
                  Send a message <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href={siteContact.phones[0].whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-sm border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10 sm:w-auto"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp us
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Response time strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-12 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
            style={{ width: "fit-content" }}
          >
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-white/70">
              Average first response: <span className="text-white font-semibold">under 4 hours</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact-form" className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">

            {/* Left – channels */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-4"
            >
              <div className="mb-2 text-center">
                <p className="text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">Reach us directly</p>
                <h2 className="mt-2 text-2xl font-hero font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
                  Multiple ways to connect
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Use the channel that fits best. We monitor all of them during business hours.
                </p>
              </div>

              {channels.map((ch) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <ch.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{ch.label}</p>
                      <p className="mt-0.5 truncate font-semibold text-foreground">{ch.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{ch.note}</p>
                    </div>
                  </div>
                );
                return ch.href ? (
                  <a
                    key={ch.value}
                    href={ch.href}
                    className="rounded-2xl border border-border/60 bg-card p-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-colors hover:border-accent/30"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={ch.value} className="rounded-2xl border border-border/60 bg-card p-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                    {inner}
                  </div>
                );
              })}

              <a
                href={siteContact.phones[0].whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-green-600 p-4 text-white transition-colors hover:bg-green-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="font-hero font-bold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-white/70">Quick questions, fast replies</p>
                </div>
                <ArrowRight size={16} className="ml-auto shrink-0 opacity-70" />
              </a>
            </motion.div>

            {/* Right – form */}
            <motion.form
              id="contact-form-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06 }}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_4px_32px_rgba(0,0,0,0.07)] md:p-10"
            >
              <h3 className="font-hero font-bold text-xl tracking-[-0.03em] text-foreground sm:text-2xl">
                Tell us about the project
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                The more context you give, the faster we can respond with something actually useful.
              </p>

              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Your name</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Email address</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">What do you need?</label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. New website, Brand refresh, Custom system…"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Message</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, goals, timeline, and any constraints you have in mind…"
                    rows={6}
                    required
                    className="rounded-xl resize-none"
                  />
                </div>

                {/* Honeypot field: hidden from people, catches spam bots */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="h-12 w-full gap-2 rounded-xl font-hero font-bold text-base"
                >
                  {sending ? "Sending…" : <>Send message <Send size={17} /></>}
                </Button>
              </div>
            </motion.form>
          </div>

          {/* ── Bottom CTA strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-10 rounded-3xl border border-border/60 bg-card p-8 shadow-[0_4px_32px_rgba(0,0,0,0.07)] md:flex md:items-center md:justify-between md:gap-8"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-hero font-bold uppercase tracking-[0.18em] text-accent">
                Still shaping the brief?
              </p>
              <h2 className="mt-3 text-xl font-hero font-normal tracking-[-0.02em] text-muted-foreground md:text-xl">
                Not sure exactly what you need yet? Start with our services page — it outlines every engagement type and what to expect.
              </h2>
            </div>
            <Link to="/services" className="mt-6 block shrink-0 md:mt-0">
              <Button size="lg" variant="outline" className="h-12 w-full rounded-xl border-border/60 px-7 font-hero font-bold md:w-auto">
                See our services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
