import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { siteContact } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceItems = [
  { label: "Websites", href: "/services/websites", desc: "Custom sites & landing pages" },
  { label: "Applications", href: "/services/applications", desc: "Web apps & dashboards" },
  { label: "Systems", href: "/services/systems", desc: "Portals & automation" },
  { label: "Graphics", href: "/services/graphics", desc: "Brand & visual identity" },
  { label: "Social Media", href: "/services/social-media", desc: "Management & content" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const openDropdown = () => {
    if (servicesTimer.current) clearTimeout(servicesTimer.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      {/* ── TOP INFO BAR ─────────────────────────────────────────── */}
      <div className="fixed left-0 right-0 top-0 z-50 hidden border-b border-black/[0.08] bg-accent md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4">
          {/* Left: phone + email */}
          <div className="flex items-center gap-5">
            <a
              href={siteContact.phones[1].href}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" />
              {siteContact.phones[1].display}
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" />
              {siteContact.email}
            </a>
          </div>
          {/* Right: location */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
            <MapPin className="h-3 w-3" />
            Arusha, Tanzania
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 md:top-9 border-b border-border/70 bg-background shadow-[0_10px_40px_rgba(9,34,53,0.08)]`}
      >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="font-hero text-2xl font-black leading-none text-primary">Kitaa</span>
          <span className="font-hero text-2xl font-black leading-none text-accent">&nbsp;Digital Solutions</span>
        </Link>

        <div className="hidden items-center rounded-full border border-border/70 bg-white/70 px-3 py-2 shadow-[0_18px_45px_rgba(9,34,53,0.06)] backdrop-blur md:flex">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/services"
                  className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    location.pathname.startsWith("/services")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                  {location.pathname.startsWith("/services") && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-[calc(100%+6px)] z-50 w-60 overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_20px_60px_rgba(9,34,53,0.14)]"
                    >
                      <div className="p-2">
                        <Link
                          to="/services"
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
                        >
                          All Services
                          <ArrowUpRight size={14} className="text-accent" />
                        </Link>
                        <div className="my-1.5 h-px bg-border/50" />
                        {serviceItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary ${
                              location.pathname === item.href ? "bg-secondary" : ""
                            }`}
                          >
                            <span className="text-sm font-semibold text-foreground">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                  />
                )}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:block">
          <Link to="/contact">
            <Button className="gap-2 rounded-full px-6 font-semibold shadow-[0_16px_35px_rgba(233,120,17,0.24)]">
              Book a Call <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-white/70 shadow-[0_12px_30px_rgba(9,34,53,0.05)] backdrop-blur md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border/70 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-2 px-4 py-6">
              {navLinks.map((link, i) =>
                link.label === "Services" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                        location.pathname.startsWith("/services")
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      Services
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-accent/30 pl-3">
                            <Link
                              to="/services"
                              className="block rounded-xl px-3 py-2 text-sm font-bold text-foreground hover:bg-secondary"
                            >
                              All Services
                            </Link>
                            {serviceItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-card hover:text-foreground ${
                                  location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                        location.pathname === link.href
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
              <Link to="/contact" className="mt-2">
                <Button className="w-full rounded-full font-semibold">
                  Book a Call
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;
