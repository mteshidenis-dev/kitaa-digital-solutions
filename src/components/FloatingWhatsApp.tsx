import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const contacts = [
  {
    name: "Steven",
    role: "Founder & Lead Developer",
    number: "+255 759 352 572",
    href: "https://wa.me/255759352572",
  },
  {
    name: "Denis",
    role: "Co-Founder & Creative Director",
    number: "+255 763 346 078",
    href: "https://wa.me/255763346078",
  },
];

const FloatingWhatsApp = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-4 z-50 flex flex-col-reverse items-start gap-3 sm:left-6">
      {/* Contact cards */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-1 flex flex-col gap-2"
          >
            {contacts.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card px-4 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-colors hover:border-accent/50"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <MessageCircle size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-hero font-bold leading-tight text-white">{c.name}</p>
                  <p className="text-[11px] text-white/50 leading-tight">{c.number}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        aria-label="WhatsApp chat"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-card text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors hover:border-accent hover:bg-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
