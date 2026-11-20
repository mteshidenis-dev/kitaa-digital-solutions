import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SHOW_BLOG, siteContact } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Navbar";
import DotField from "./DotField";
import SocialLinks from "./site/SocialLinks";

const explore = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
].filter((l) => SHOW_BLOG || l.href !== "/blog");

const whatsapp = siteContact.whatsapp.href;

const quickContacts = [
  { icon: Mail, label: "Email", href: `mailto:${siteContact.email}` },
  { icon: Phone, label: "Call", href: siteContact.phones[0].href },
  { icon: MessageCircle, label: "WhatsApp", href: whatsapp, external: true },
];

const heading = "mb-4 font-hero text-[11px] font-bold uppercase tracking-[0.22em] text-white/40 lg:mb-5 lg:text-xs";
const link = "block py-1.5 text-sm text-white/60 transition-colors hover:text-white lg:py-2";

const Footer = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="relative isolate overflow-hidden px-3 pb-24 pt-14 text-white md:px-6 md:pt-16 lg:pb-6">
      {/* Dots frame the card: brightest at its edges, rising and fading into the page above */}
      <DotField className="absolute inset-0 -z-10" frameRef={cardRef} reach={230} />

      <div ref={cardRef} className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface">
        {/* thin blue light along the top edge */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

        <div className="container relative mx-auto px-5 pb-6 pt-10 md:px-10 md:pb-8 md:pt-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1fr] lg:gap-12">
            {/* Brand */}
            <div>
              <Logo className="text-xl" />
              <p className="mt-3 max-w-[300px] text-sm leading-7 text-white/55">
                Premium websites and digital systems for growing businesses.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Link
                  to="/contact"
                  className="btn-glow inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-semibold sm:px-5"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-semibold sm:px-5 lg:hidden"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
              <SocialLinks className="mt-6" />
            </div>

            {/* Quick contact tiles (phones and tablets) */}
            <div className="grid grid-cols-3 gap-2 lg:hidden">
              {quickContacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] py-4 transition-colors active:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-white/80">{c.label}</span>
                </a>
              ))}
            </div>

            {/* Link columns: side by side on phones, separate grid columns on desktop */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-8 text-center lg:contents lg:text-left">
              <nav aria-label="Footer">
                <h4 className={heading}>Explore</h4>
                {explore.map((l) => (
                  <Link key={l.href} to={l.href} className={link}>
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div>
                <h4 className={heading}>Services</h4>
                {services.map((s) => (
                  <Link key={s.href} to={s.href} className={link}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact details (desktop) */}
            <div className="hidden lg:block">
              <h4 className={heading}>Contact</h4>
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
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-white transition-colors hover:text-accent"
              >
                Chat on WhatsApp <ArrowUpRight className="h-4 w-4 text-accent" />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/40 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <p className="flex items-center gap-1.5 lg:hidden">
              <MapPin className="h-3.5 w-3.5 text-accent" /> {siteContact.location}
            </p>
            <p>© {new Date().getFullYear()} Kitaa Digital Solutions. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy" className="py-2.5 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="py-2.5 transition-colors hover:text-white">
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
