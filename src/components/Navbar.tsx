import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, LayoutGrid, Mail, MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SHOW_BLOG, siteContact } from "@/lib/site";
import { services } from "@/lib/services";
import DotField from "./DotField";
import { pauseSmoothScroll, resumeSmoothScroll } from "./SmoothScroll";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-hero text-[18px] font-extrabold tracking-[-0.01em] text-white ${className}`}>
    Kitaa Digital Solutions
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll (and pause smooth scrolling) while the full-screen mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) pauseSmoothScroll();
    else resumeSmoothScroll();
    return () => {
      document.documentElement.style.overflow = "";
      resumeSmoothScroll();
    };
  }, [open]);

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ].filter((l) => SHOW_BLOG || l.href !== "/blog");
  const ease = [0.22, 1, 0.36, 1] as const;

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open ? "bg-background/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
          <Link to="/" aria-label="Kitaa Digital Solutions home" className="inline-flex py-2.5">
            <Logo />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`group relative py-3 text-sm transition-colors ${
                  isActive(link.href) ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent"
            >
              Let's talk <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] flex flex-col overflow-hidden bg-background lg:hidden"
          >
            <DotField className="absolute inset-0 -z-10" mode="edges" />
            <div
              className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(31,116,242,0.12), transparent)" }}
            />

            {/* Scrollable body */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 pb-8 pt-24">
              <div className="mx-auto max-w-xl">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">Menu</p>
                <ul className="border-t border-white/[0.08]">
                  {menuLinks.map((link, i) => {
                    const active = link.href === "/" ? location.pathname === "/" : isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease }}
                        className="border-b border-white/[0.08]"
                      >
                        <Link to={link.href} className="group flex items-center gap-4 py-4">
                          <span className={`w-6 text-xs tabular-nums ${active ? "text-accent" : "text-white/35"}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`flex-1 font-heading text-[2rem] font-extrabold leading-none tracking-[-0.02em] ${
                              active ? "text-accent" : "text-white"
                            }`}
                          >
                            {link.label}
                          </span>
                          <ArrowUpRight
                            className={`h-5 w-5 transition-transform group-active:translate-x-0.5 ${
                              active ? "text-accent" : "text-white/35"
                            }`}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease }}
                  className="mt-8"
                >
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    Services
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((sv) => (
                      <Link
                        key={sv.href}
                        to={sv.href}
                        className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                          location.pathname === sv.href
                            ? "border-accent/50 bg-accent/10"
                            : "border-white/[0.07] bg-card/80 active:bg-white/[0.06]"
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <sv.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium leading-tight text-white">{sv.title}</span>
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      className="flex items-center gap-3 rounded-2xl border border-dashed border-white/15 p-3 transition-colors active:bg-white/[0.06]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white">
                        <LayoutGrid className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium leading-tight text-white">All services</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Fixed action bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              className="border-t border-white/[0.08] bg-surface/90 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl"
            >
              <div className="mx-auto max-w-xl">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    className="btn-glow inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold"
                  >
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={siteContact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
                <div className="mt-3 flex items-center justify-center gap-5 text-xs text-muted-foreground">
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="inline-flex items-center gap-1.5 py-1.5 hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent" /> {siteContact.email}
                  </a>
                  <a href={siteContact.phones[0].href} className="inline-flex items-center gap-1.5 py-1.5 hover:text-white">
                    <Phone className="h-3.5 w-3.5 text-accent" /> Call us
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
