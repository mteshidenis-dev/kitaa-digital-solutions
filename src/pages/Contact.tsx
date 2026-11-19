import { useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/site/PageHero";
import { Chip } from "@/components/site/SectionHeader";
import { siteContact } from "@/lib/site";

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

const topics = ["New website", "Web app", "Business system", "Branding", "Social media", "Something else"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-accent focus:bg-white/[0.05] focus:ring-4 focus:ring-accent/15";

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
      <PageHero
        pageTitle="Contact"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Start the conversation."
        accent="We move fast."
        text="Tell us what you need built, fixed, or sharpened. We'll respond within 24 hours with a clear next step, no vague proposals and no endless back-and-forth."
        primary={{ to: "#contact-form", label: "Send a message", external: false }}
        secondary={{ to: siteContact.phones[0].whatsappHref ?? "/contact", label: "WhatsApp us", external: true }}
      >
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
          <Clock className="h-4 w-4 text-accent" />
          We reply within <span className="font-semibold text-white">24 hours</span>
        </div>
      </PageHero>

      <section id="contact-form" className="scroll-mt-24 px-4 pb-14 md:pb-20">
        <div className="container mx-auto grid gap-6 lg:grid-cols-[0.85fr_1.15fr] [&>*]:min-w-0">
          {/* Channels */}
          <Reveal className="flex flex-col gap-3">
            <div className="mb-3">
              <Chip>Reach us directly</Chip>
              <h2 className="mt-5 font-heading text-3xl font-extrabold text-white">Multiple ways to connect</h2>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                Use the channel that fits best. We monitor all of them during business hours.
              </p>
            </div>
            {channels.map((ch) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ch.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">{ch.label}</span>
                    <span className="mt-0.5 block truncate font-medium text-white">{ch.value}</span>
                    <span className="block text-xs text-muted-foreground">{ch.note}</span>
                  </span>
                  {ch.href && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-accent" />
                  )}
                </>
              );
              const cls =
                "group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-card p-4 transition-colors hover:border-accent/40";
              return ch.href ? (
                <a key={ch.label + ch.value} href={ch.href} className={cls}>
                  {body}
                </a>
              ) : (
                <div key={ch.label + ch.value} className={cls}>
                  {body}
                </div>
              );
            })}
            <a
              href={siteContact.phones[0].whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 flex items-center gap-4 rounded-2xl bg-accent p-4 text-white transition-colors hover:bg-accent/90"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="block text-xs text-white/75">Quick questions, fast replies</span>
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-card p-6 md:p-10"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(31,116,242, 0.11), transparent)" }}
              />
              <div className="relative">
                <h2 className="font-heading text-2xl font-extrabold text-white md:text-3xl">Tell us about the project</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The more context you give, the faster we can respond with something actually useful.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-white">
                        Your name
                      </label>
                      <input
                        id="cf-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Doe"
                        autoComplete="name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-white">
                        Email address
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@company.com"
                        autoComplete="email"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-subject" className="mb-2 block text-sm font-medium text-white">
                      What do you need?
                    </label>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, subject: t })}
                          className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-colors ${
                            form.subject === t
                              ? "border-accent bg-accent text-white"
                              : "border-white/10 text-white/65 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <input
                      id="cf-subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Or type it here, e.g. a booking website for our lodge"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your project, goals, timeline, and any constraints you have in mind…"
                      rows={6}
                      required
                      className={`${inputClass} resize-none`}
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

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold disabled:opacity-70"
                  >
                    {sending ? (
                      "Sending…"
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    By sending this form you agree to our{" "}
                    <Link to="/privacy" className="underline underline-offset-4 hover:text-white">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Nudge to services */}
      <section className="px-4 pb-16 md:pb-20">
        <Reveal className="container mx-auto">
          <Link
            to="/services"
            className="group flex flex-col gap-6 rounded-3xl border border-white/[0.07] bg-card p-7 transition-colors hover:border-accent/40 md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div>
              <Chip>Still shaping the brief?</Chip>
              <p className="mt-4 max-w-2xl font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
                Not sure exactly what you need yet? Our services page outlines every engagement type and what to expect.
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Contact;
