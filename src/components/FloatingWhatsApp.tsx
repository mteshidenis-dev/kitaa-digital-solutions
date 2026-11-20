import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { siteContact } from "@/lib/site";

/**
 * Floating button (bottom-right) that opens a WhatsApp chat with a pre-filled
 * message. Hidden on /contact so it never covers the form's send button; that
 * page already has its own WhatsApp options.
 */
const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/contact")) return null;

  return (
    <motion.a
      href={siteContact.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.92 }}
      aria-label="Chat with Kitaa on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-card text-white transition-colors hover:border-accent hover:bg-accent sm:right-6"
    >
      <MessageCircle size={22} />
    </motion.a>
  );
};

export default FloatingWhatsApp;
