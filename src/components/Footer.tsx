import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/lib/site";
import { Logo } from "./Navbar";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/[0.06] bg-background text-white">
    {/* top accent line */}
    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    {/* ambient glows */}
    <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/4 blur-3xl" />

    <div className="container relative z-10 mx-auto px-4 pb-10 pt-16">
      {/* ── MAIN GRID ── */}
      <div className="grid gap-12 grid-cols-1 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1fr]">

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
            className="mt-6 inline-flex items-center gap-2 btn-glow rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            Start a project
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-5 font-hero font-bold text-xs uppercase tracking-[0.22em] text-white/40">
            Navigation
          </h4>
          <div className="flex flex-col gap-3">
            {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map((label) => (
              <Link
                key={label}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* What We Build */}
        <div>
          <h4 className="mb-5 font-hero font-bold text-xs uppercase tracking-[0.22em] text-white/40">
            What We Build
          </h4>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <span>Websites &amp; landing pages</span>
            <span>Business systems &amp; portals</span>
            <span>Visual identity &amp; graphics</span>
            <span>Growth &amp; reporting</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 font-hero font-bold text-xs uppercase tracking-[0.22em] text-white/40">
            Contact
          </h4>
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Mail size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{siteContact.email}</span>
            </a>
            {siteContact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>{phone.display}</span>
              </a>
            ))}
            <div className="flex items-start gap-3 text-sm text-white/60">
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
          <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
