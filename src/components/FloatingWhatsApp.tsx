import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteContact } from "@/lib/site";

/** Floating button that opens a WhatsApp chat with Kitaa in one tap. */
const FloatingWhatsApp = () => (
  <motion.a
    href={siteContact.whatsapp.href}
    target="_blank"
    rel="noopener noreferrer"
    whileTap={{ scale: 0.92 }}
    aria-label={`Chat with us on WhatsApp (${siteContact.whatsapp.display})`}
    title="Chat on WhatsApp"
    className="fixed bottom-6 left-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-card text-white transition-colors hover:border-accent hover:bg-accent sm:left-6"
  >
    <MessageCircle size={22} />
  </motion.a>
);

export default FloatingWhatsApp;
