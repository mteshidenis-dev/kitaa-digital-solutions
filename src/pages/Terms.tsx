import { motion } from "framer-motion";
import { FileText, Scale, ShieldAlert } from "lucide-react";
import { legalMeta, siteContact } from "@/lib/site";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const sections = [
  {
    title: "Use of This Website",
    body:
      "By accessing or using this website, you agree to use it lawfully, respectfully, and in a manner that does not damage the site, interfere with its operation, attempt unauthorized access, or restrict use by other visitors.",
  },
  {
    title: "Website Content and Service Information",
    body:
      "Content on this website is provided for general information about Kitaa Digital Solutions, our capabilities, and the types of work we offer. Nothing on this website should be treated as a binding quotation, guaranteed project scope, or formal service agreement unless confirmed separately in writing.",
  },
  {
    title: "Intellectual Property",
    body:
      "Unless otherwise stated, the content, written copy, layouts, design elements, graphics, branding, and other materials on this website are owned by Kitaa Digital Solutions or used with permission. They may not be copied, republished, adapted, or distributed without prior written consent.",
  },
  {
    title: "Enquiries and Client Engagements",
    body:
      "Submitting an enquiry through this website does not create a client relationship by itself. Any project work, timelines, pricing, revisions, and deliverables are governed by a separate proposal, quotation, contract, or written agreement where applicable.",
  },
  {
    title: "Third-Party Services and Links",
    body:
      "This website may include links to third-party platforms, tools, or services for convenience. We do not control those third-party websites and are not responsible for their content, availability, privacy practices, or terms of use.",
  },
  {
    title: "Limitation of Liability",
    body:
      "We aim to keep this website accurate, current, and available, but we do not guarantee uninterrupted access, complete accuracy at all times, or that the website will always be free from technical issues. To the maximum extent permitted by law, Kitaa Digital Solutions is not liable for losses arising solely from reliance on website content without a formal written agreement.",
  },
  {
    title: "Governing Law",
    body:
      `These website terms are intended to be interpreted in accordance with the laws applicable in the ${legalMeta.governingLaw}, unless another governing law is expressly agreed in a separate written client contract.`,
  },
  {
    title: "Notices and Contact",
    body:
      `Questions, complaints, or formal notices relating to these website terms may be sent to ${siteContact.email}. Project-specific legal or commercial notices should also follow the communication method stated in any separate proposal, contract, or invoice documentation where applicable.`,
  },
  {
    title: "Changes to These Terms",
    body:
      "We may revise these terms from time to time to reflect legal, operational, or business updates. Continued use of the website after changes are published means you accept the updated terms.",
  },
];

const Terms = () => (
  <div className="pt-20">
    <section className="px-4 pb-16 pt-16 md:pb-20 md:pt-20">
      <div className="container mx-auto mb-6">
        <PageBreadcrumb
          variant="light"
          pageTitle="Terms & Conditions"
          items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
        />
      </div>
      <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="section-kicker">Terms & Conditions</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-foreground md:text-6xl">
            The basic terms that apply when using this website and engaging with our content.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            These terms explain how website content may be used, what information is provided for guidance only, and the limits that apply unless a separate client agreement is in place.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-muted-foreground">Effective date: {legalMeta.effectiveDate}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-[1.9rem] border border-primary/10 bg-card p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-8"
        >
          <div className="space-y-4">
            {[
              { icon: FileText, title: "Guidance, not contract", text: "Website content explains the studio and its services, but project terms are confirmed separately in writing." },
              { icon: Scale, title: "Lawful use", text: "Visitors are expected to use the website responsibly and without interfering with access or operation." },
              { icon: ShieldAlert, title: "Separate engagement terms", text: "Client work is governed by proposals, invoices, quotations, and signed agreements where applicable." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="px-4 pb-24">
      <div className="container mx-auto rounded-[2rem] border border-border/70 bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:p-10">
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[1.5rem] border border-border/70 bg-background p-6"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{section.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-accent/15 bg-accent/10 p-6">
          <p className="text-sm leading-8 text-foreground">
            For questions about these terms or a current or proposed engagement, contact us at <a href={`mailto:${siteContact.email}`} className="font-semibold text-accent">{siteContact.email}</a>.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-background p-6">
          <p className="text-sm leading-8 text-muted-foreground">
            These terms govern use of the website itself and do not replace a signed agreement, quotation, or scope document for client work. Where a separate written contract exists, that contract controls the project relationship.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Terms;