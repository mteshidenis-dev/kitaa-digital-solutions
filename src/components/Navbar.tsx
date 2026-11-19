import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`font-hero text-[17px] font-semibold tracking-[-0.02em] ${className}`}>
    <span className="text-accent">Kitaa</span>
    <span className="text-white"> Digital Solutions</span>
    <span className="text-accent">.</span>
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = () => {
    if (servicesTimer.current) clearTimeout(servicesTimer.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const linkClass = (href: string) =>
    `flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors ${
      isActive(href) ? "text-white" : "text-white/60 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-[72px]">
        <Link to="/" aria-label="Kitaa Digital Solutions home">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center lg:flex">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link to="/services" className={linkClass("/services")}>
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-[calc(100%+8px)] z-50 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-popover/95 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                    >
                      <div className="p-2">
                        <Link
                          to="/services"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
                        >
                          All Services
                          <ArrowUpRight size={14} className="text-accent" />
                        </Link>
                        <div className="my-1.5 h-px bg-white/[0.06]" />
                        {serviceItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06] ${
                              location.pathname === item.href ? "bg-white/[0.06]" : ""
                            }`}
                          >
                            <span className="text-sm font-medium text-white">{item.label}</span>
                            <span className="text-xs text-white/50">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.href} to={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link to="/portfolio" className="text-[13px] font-semibold text-white transition-colors hover:text-accent">
            See Our Work
          </Link>
          <Link
            to="/contact"
            className="btn-glow inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[13px] font-semibold"
          >
            Book a Call
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-5">
              {navLinks.map((link) =>
                link.label === "Services" ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive("/services") ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white"
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
                          <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-accent/40 pl-3">
                            <Link to="/services" className="block rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/[0.04]">
                              All Services
                            </Link>
                            {serviceItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/[0.04] hover:text-white ${
                                  location.pathname === item.href ? "text-white" : "text-white/60"
                                }`}
                              >
                                {item.label}
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
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.href) ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/contact"
                className="btn-glow mt-3 flex h-12 items-center justify-center rounded-lg text-base font-semibold"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
