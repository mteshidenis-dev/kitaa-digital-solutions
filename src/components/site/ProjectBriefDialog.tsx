import { useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CheckCircle2, Send, X } from "lucide-react";
import { toast } from "sonner";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/components/SmoothScroll";
import { siteContact } from "@/lib/site";

const needs = ["Website", "Web app", "Business system", "Branding", "Social media", "Not sure yet"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/35 md:text-[15px] outline-none transition-colors focus:border-accent focus:bg-white/[0.05] focus:ring-4 focus:ring-accent/15";

const empty = { name: "", email: "", phone: "", need: "", idea: "", website: "" };

/**
 * A pop-up form for visitors who aren't sure what they need: they leave their
 * details and describe the problem or idea. It posts to the same /contact.php
 * handler as the Contact page, so messages arrive in the same inbox.
 */
type ProjectBriefDialogProps = {
  children: ReactNode;
  /** Pre-select a topic, e.g. "Website". */
  defaultNeed?: string;
  /** Package the visitor picked on the Pricing page, e.g. "Websites: Grow". */
  packageName?: string;
};

const ProjectBriefDialog = ({ children, defaultNeed, packageName }: ProjectBriefDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      pauseSmoothScroll();
      if (defaultNeed) setForm((f) => ({ ...f, need: f.need || defaultNeed }));
    }
    else {
      resumeSmoothScroll();
      // Reset after the closing animation so the next visitor starts fresh.
      setTimeout(() => setSent(false), 300);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const message = [
        form.idea.trim(),
        "",
        ...(packageName ? [`Package: ${packageName}`] : []),
        `Interested in: ${form.need || "Not specified"}`,
        `Phone / WhatsApp: ${form.phone.trim() || "Not provided"}`,
        "",
        packageName
          ? "(Sent from the Pricing page)"
          : "(Sent from the \"Not sure what you need?\" form on the Services section)",
      ].join("\n");
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: packageName
            ? `Package enquiry: ${packageName}`
            : `Free call request${form.need ? `: ${form.need}` : ""}`,
          message,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Could not send your request.");
      setSent(true);
      setForm(empty);
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : `Could not send your request. Please email ${siteContact.email}.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-lenis-prevent
          className="fixed left-1/2 top-1/2 z-[61] max-h-[92svh] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-popover p-6 text-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 md:p-8"
        >
          <DialogPrimitive.Close
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>

          {sent ? (
            <div className="py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <DialogPrimitive.Title className="mt-6 font-heading text-2xl font-extrabold">
                Thanks, we've got it.
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mx-auto mt-3 max-w-sm text-[15px] leading-7 text-muted-foreground">
                We'll read your idea and get back to you within 24 hours with honest advice and a suggested next step.
              </DialogPrimitive.Description>
              <DialogPrimitive.Close className="btn-glow mt-8 inline-flex h-11 items-center rounded-full px-7 text-sm font-semibold">
                Done
              </DialogPrimitive.Close>
            </div>
          ) : (
            <form onSubmit={submit}>
              <DialogPrimitive.Title className="pr-10 font-heading text-2xl font-extrabold leading-tight md:text-3xl">
                {packageName ? (
                  <>
                    Start with <span className="text-accent">{packageName.split(": ").pop()}</span>
                  </>
                ) : (
                  <>
                    Tell us the problem<span className="text-accent">.</span>
                  </>
                )}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm leading-6 text-muted-foreground">
                {packageName
                  ? "Tell us a little about your business and we'll confirm the scope and a fixed quote within 24 hours."
                  : "No need to know the technical side. Describe what you want to achieve and we'll suggest the right solution, free."}
              </DialogPrimitive.Description>

              <div className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pb-name" className="mb-1.5 block text-sm font-medium">
                      Your name
                    </label>
                    <input
                      id="pb-name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="pb-phone" className="mb-1.5 block text-sm font-medium">
                      Phone / WhatsApp <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      id="pb-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+255 7XX XXX XXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pb-email" className="mb-1.5 block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="pb-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium">What might you need?</legend>
                  <div className="flex flex-wrap gap-2">
                    {needs.map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={form.need === n}
                        onClick={() => setForm({ ...form, need: form.need === n ? "" : n })}
                        className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-colors ${
                          form.need === n
                            ? "border-accent bg-accent text-white"
                            : "border-white/10 text-white/65 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="pb-idea" className="mb-1.5 block text-sm font-medium">
                    Your problem or idea
                  </label>
                  <textarea
                    id="pb-idea"
                    required
                    rows={5}
                    value={form.idea}
                    onChange={(e) => setForm({ ...form, idea: e.target.value })}
                    placeholder="e.g. We take bookings by phone and lose track of them. We'd like customers to book online…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Honeypot: hidden from people, catches spam bots */}
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
                      Send my idea <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">We reply within 24 hours. No spam, ever.</p>
              </div>
            </form>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ProjectBriefDialog;
