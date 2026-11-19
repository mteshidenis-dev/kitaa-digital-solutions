import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { legalMeta, siteContact } from "@/lib/site";
import PageHero from "./PageHero";

type LegalPageProps = {
  name: string;
  title: string;
  intro: string;
  highlights: { icon: LucideIcon; title: string; text: string }[];
  sections: { title: string; body: string }[];
  contactNote: string;
  disclaimer: string;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Shared layout for Privacy and Terms: hero, sticky contents list, numbered sections. */
const LegalPage = ({ name, title, intro, highlights, sections, contactNote, disclaimer }: LegalPageProps) => (
  <div>
    <PageHero
      pageTitle={name}
      breadcrumb={[{ label: "Home", href: "/" }, { label: name }]}
      title={title}
      text={intro}
    >
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Effective date: {legalMeta.effectiveDate}
      </p>
    </PageHero>

    <section className="px-4 pb-12">
      <div className="container mx-auto grid gap-4 md:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.08} y={20}>
            <div className="h-full rounded-2xl border border-white/[0.07] bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <h.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-heading text-lg font-extrabold text-white">{h.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{h.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="px-4 pb-24 md:pb-32">
      <div className="container mx-auto grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 rounded-2xl border border-white/[0.07] bg-card p-5" aria-label="On this page">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">On this page</p>
            <ol className="mt-4 space-y-2.5">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${slug(s.title)}`}
                    className="flex gap-2 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <Reveal key={s.title} y={16}>
              <article id={slug(s.title)} className="scroll-mt-28 rounded-2xl border border-white/[0.07] bg-card p-6 md:p-8">
                <p className="text-sm font-medium text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-heading text-xl font-extrabold text-white md:text-2xl">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-8 text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}

          <div className="rounded-2xl border border-accent/25 bg-accent/10 p-6">
            <p className="text-[15px] leading-8 text-white/85">
              {contactNote}{" "}
              <a href={`mailto:${siteContact.email}`} className="font-semibold text-accent hover:underline">
                {siteContact.email}
              </a>
              .
            </p>
          </div>
          <p className="px-1 text-sm leading-7 text-muted-foreground">{disclaimer}</p>
        </div>
      </div>
    </section>
  </div>
);

export default LegalPage;
