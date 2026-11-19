import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/lib/site";
import { Logo } from "./Navbar";
import DotField from "./DotField";

const Footer = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="relative isolate overflow-hidden px-3 pb-3 pt-40 text-white md:px-6 md:pb-6 md:pt-52">
      {/* Dots frame the card: brightest at its edges, rising and fading into the page above */}
      <DotField className="absolute inset-0 -z-10" frameRef={cardRef} reach={230} />

      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface"
      >
        {/* thin blue light along the top edge */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

        <div className="container relative mx-auto px-6 pb-8 pt-14 md:px-10">
          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1fr]">
            {/* Brand column */}
            <div>
              <div className="mb-4">
                <Logo className="text-xl" />
              </div>
              <p className="max-w-[260px] text-sm leading-7 text-white/55">
                Premium websites and digital systems for growing businesses.
              </p>
              <Link
                to="/contact"
                className="btn-glow mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
              >
                Start a project
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-5 font-hero text-xs font-bold uppercase tracking-[0.22em] text-white/40">Navigation</h4>
              <div className="flex flex-col">
                {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map((label) => (
                  <Link
                    key={label}
                    to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    className="py-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* What We Build */}
            <div>
              <h4 className="mb-5 font-hero text-xs font-bold uppercase tracking-[0.22em] text-white/40">What We Build</h4>
              <div className="flex flex-col gap-4 py-2 text-sm text-white/60">
                <span>Websites &amp; landing pages</span>
                <span>Business systems &amp; portals</span>
                <span>Visual identity &amp; graphics</span>
                <span>Growth &amp; reporting</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-5 font-hero text-xs font-bold uppercase tracking-[0.22em] text-white/40">Contact</h4>
              <div className="flex flex-col">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="flex items-start gap-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{siteContact.email}</span>
                </a>
                {siteContact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="flex items-start gap-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
                    <span>{phone.display}</span>
                  </a>
                ))}
                <div className="flex items-start gap-3 py-2 text-sm text-white/60">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{siteContact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Kitaa Digital Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="py-2 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="py-2 transition-colors hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
