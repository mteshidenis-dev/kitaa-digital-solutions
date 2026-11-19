import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const SITE = "https://kitaadigitalsolutions.tech";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  variant?: "dark" | "light";
  pageTitle?: string;
  className?: string;
};

/**
 * Renders a visual breadcrumb nav + injects JSON-LD BreadcrumbList schema for Google.
 * Also updates the document <title> when pageTitle is supplied.
 * variant="dark"  → white/muted text, for use inside dark (bg-[#050d1a]) hero sections
 * variant="light" → muted-foreground text, for use on light backgrounds
 */
const PageBreadcrumb = ({ items, variant = "dark", pageTitle, className }: Props) => {
  useEffect(() => {
    if (!pageTitle) return;
    const prev = document.title;
    document.title = `${pageTitle} | Kitaa Digital Solutions`;
    return () => { document.title = prev; };
  }, [pageTitle]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(item.href ? { item: `${SITE}${item.href}` } : {}),
      })),
    };

    const id = "breadcrumb-jsonld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    return () => { document.getElementById(id)?.remove(); };
  }, [items]);

  const linkCls =
    variant === "dark"
      ? "text-white/50 hover:text-white/85 transition-colors"
      : "text-muted-foreground hover:text-foreground transition-colors";
  const currentCls =
    variant === "dark" ? "text-white/80 font-medium" : "font-medium text-foreground";
  const sepCls =
    variant === "dark" ? "text-white/25" : "text-muted-foreground/40";

  return (
    <nav aria-label="breadcrumb" className={cn("text-left", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className={cn("h-3 w-3 flex-shrink-0", sepCls)} />}
            {item.href ? (
              <Link to={item.href} className={linkCls}>
                {i === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    <span className="sr-only">Home</span>
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            ) : (
              <span className={currentCls}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
