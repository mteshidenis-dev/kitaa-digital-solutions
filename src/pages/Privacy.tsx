import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import LegalPage from "@/components/site/LegalPage";
import { siteContact } from "@/lib/site";

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

const highlights = [
  { icon: ShieldCheck, title: "Business-use only", text: "Information is used for enquiries, project delivery, support, and improving how the studio operates online." },
              { icon: LockKeyhole, title: "Reasonable protection", text: "We use practical safeguards to reduce misuse, loss, unauthorized access, or unnecessary disclosure." },
              { icon: Mail, title: "Privacy contact", text: `Questions or requests about your data can be sent to ${siteContact.email}.` },
];

const Privacy = () => (
  <LegalPage
    name="Privacy Policy"
    title="How Kitaa Digital Solutions collects, uses, and protects your information."
    intro="This page explains the types of information we may receive through our website and communication channels, how that information is used, and the steps we take to manage it responsibly."
    highlights={highlights}
    sections={sections}
    contactNote="If you have questions about this policy or want to request an update, correction, or review of your information, contact us at"
    disclaimer="This privacy policy is intended as a practical website policy for Kitaa Digital Solutions and should not be treated as a substitute for jurisdiction-specific legal advice. If you require a fully customized compliance document, it should be reviewed by a qualified legal professional."
  />
);

export default Privacy;
