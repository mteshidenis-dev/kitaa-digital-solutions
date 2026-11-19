import { motion } from "framer-motion";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { legalMeta, siteContact } from "@/lib/site";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const sections = [
  {
    title: "Information We Collect",
    body:
      "We may collect personal information you choose to provide to us, including your name, phone number, email address, company name, project requirements, attachments, and any other information submitted through our contact form, email, WhatsApp, or direct communication with our team.",
  },
  {
    title: "How We Use Your Information",
    body:
      "We use submitted information to respond to enquiries, assess project fit, prepare proposals, deliver services, manage client communication, improve our website and service experience, and keep internal records related to enquiries, projects, and support requests.",
  },
  {
    title: "Analytics, Technical Data, and Cookies",
    body:
      "Like most websites, we may collect limited technical information such as browser type, device information, referral source, approximate location, and page activity through analytics or hosting tools. This helps us understand site usage, maintain performance, and improve the experience of visitors.",
  },
  {
    title: "How We Share Information",
    body:
      "We do not sell your personal information. We may share information with trusted service providers, hosting platforms, communication tools, payment processors, or technical partners only where needed to operate our business, respond to your request, deliver agreed services, or comply with legal obligations.",
  },
  {
    title: "Data Retention and Security",
    body:
      "We keep enquiry and client information only for as long as it is reasonably needed for communication, project delivery, internal record keeping, legal compliance, or legitimate business administration. We use reasonable administrative and technical safeguards to protect information, but no internet-based system can be guaranteed to be completely secure.",
  },
  {
    title: "Your Rights and Choices",
    body:
      "You may contact us to request access to the personal information we hold about you, to correct inaccurate details, or to request deletion where appropriate. You may also ask us how your information is being used in relation to an enquiry or project.",
  },
  {
    title: "Children's Privacy",
    body:
      "This website and our services are intended for business, professional, and general adult use. We do not knowingly collect personal information from children without appropriate legal basis or consent. If you believe a child has submitted personal information through this website, contact us so we can review and remove it where appropriate.",
  },
  {
    title: "Cross-Border Processing",
    body:
      "Some of the tools we use to host websites, manage communications, or process analytics may store or process information outside your country of residence. Where this happens, we aim to work only with providers that apply reasonable security and operational safeguards.",
  },
  {
    title: "Policy Updates",
    body:
      "We may update this privacy policy from time to time to reflect operational, legal, or technical changes. When changes are made, the updated version will appear on this page with the latest revision date.",
  },
];

const Privacy = () => (
  <div className="pt-20">
    <section className="px-4 pb-16 pt-16 md:pb-20 md:pt-20">
      <div className="container mx-auto mb-6">
        <PageBreadcrumb
          variant="light"
          pageTitle="Privacy Policy"
          items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        />
      </div>
      <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="section-kicker">Privacy Policy</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-foreground md:text-6xl">
            How Kitaa Digital Solutions collects, uses, and protects your information.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            This page explains the types of information we may receive through our website and communication channels, how that information is used, and the steps we take to manage it responsibly.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-muted-foreground">Effective date: {legalMeta.effectiveDate}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-[1.9rem] border border-primary/10 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(9,34,53,0.22)] md:p-8"
        >
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, title: "Business-use only", text: "Information is used for enquiries, project delivery, support, and improving how the studio operates online." },
              { icon: LockKeyhole, title: "Reasonable protection", text: "We use practical safeguards to reduce misuse, loss, unauthorized access, or unnecessary disclosure." },
              { icon: Mail, title: "Privacy contact", text: `Questions or requests about your data can be sent to ${siteContact.email}.` },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
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
      <div className="container mx-auto rounded-[2rem] border border-border/70 bg-card p-8 shadow-[0_20px_60px_rgba(9,34,53,0.05)] md:p-10">
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
            If you have questions about this policy or want to request an update, correction, or review of your information, contact us at <a href={`mailto:${siteContact.email}`} className="font-semibold text-accent">{siteContact.email}</a>.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-background p-6">
          <p className="text-sm leading-8 text-muted-foreground">
            This privacy policy is intended as a practical website policy for Kitaa Digital Solutions and should not be treated as a substitute for jurisdiction-specific legal advice. If you require a fully customized compliance document, it should be reviewed by a qualified legal professional.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Privacy;