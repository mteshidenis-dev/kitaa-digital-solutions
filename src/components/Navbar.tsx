import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContact } from "@/lib/site";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
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

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

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

          <div className="hidden items-center gap-10 md:flex">
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
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-4 pb-10 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, ...navLinks, { label: "Blog", href: "/blog" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    className={`block font-heading text-5xl font-extrabold tracking-[-0.02em] ${
                      (link.href === "/" ? location.pathname === "/" : isActive(link.href)) ? "text-accent" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${siteContact.email}`} className="block text-white">
                {siteContact.email}
              </a>
              <a href={siteContact.phones[0].href} className="block">
                {siteContact.phones[0].display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
