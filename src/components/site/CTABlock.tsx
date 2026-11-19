import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { siteContact } from "@/lib/site";

type CTABlockProps = {
  title?: string;
  accent?: string;
  text?: string;
  primaryLabel?: string;
};

/** Closing call-to-action card with a gradient border, used at the end of pages. */
const CTABlock = ({
  title = "Ready to take your business",
  accent = "online?",
  text = "Tell us about your project. We'll reply within 24 hours with honest advice and a clear next step.",
  primaryLabel = "Start your project",
}: CTABlockProps) => (
  <section className="px-4 pb-4 md:pb-6">
    <Reveal className="container mx-auto">
      <div className="rounded-3xl bg-gradient-to-br from-accent/70 via-white/10 to-accent/30 p-px">
        <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-card px-6 py-14 text-center md:px-12 md:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.45), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <h2
            className="relative mx-auto max-w-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {title} <span className="text-accent">{accent}</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">{text}</p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="btn-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={siteContact.phones[0].whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default CTABlock;
