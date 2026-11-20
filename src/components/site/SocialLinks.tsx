import { Facebook, Instagram, Linkedin, Twitter, type LucideProps } from "lucide-react";
import { activeSocialLinks, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

/** TikTok isn't in the icon set, so it's drawn here in the same 24px line style. */
const TikTok = (props: LucideProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.6 2.6 2.4 4.3 5 4.6" />
  </svg>
);

const icons: Record<(typeof socialLinks)[number]["name"], (p: LucideProps) => JSX.Element> = {
  Instagram: (p) => <Instagram {...p} />,
  Facebook: (p) => <Facebook {...p} />,
  TikTok: (p) => <TikTok {...p} />,
  LinkedIn: (p) => <Linkedin {...p} />,
  X: (p) => <Twitter {...p} />,
};

/**
 * Row of social profile icons. Renders nothing until at least one profile URL
 * is set in src/lib/site.ts, so placeholder links never reach production.
 */
const SocialLinks = ({ className, label }: { className?: string; label?: string }) => {
  const links = activeSocialLinks();
  if (!links.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {label && <span className="mr-1 text-xs font-medium uppercase tracking-[0.2em] text-white/40">{label}</span>}
      {links.map((s) => {
        const Icon = icons[s.name];
        return (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Kitaa on ${s.name}`}
            title={s.name}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
