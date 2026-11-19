import { FileText, Scale, ShieldAlert } from "lucide-react";
import LegalPage from "@/components/site/LegalPage";
import { legalMeta, siteContact } from "@/lib/site";

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

const highlights = [
  { icon: FileText, title: "Guidance, not contract", text: "Website content explains the studio and its services, but project terms are confirmed separately in writing." },
              { icon: Scale, title: "Lawful use", text: "Visitors are expected to use the website responsibly and without interfering with access or operation." },
              { icon: ShieldAlert, title: "Separate engagement terms", text: "Client work is governed by proposals, invoices, quotations, and signed agreements where applicable." },
];

const Terms = () => (
  <LegalPage
    name="Terms & Conditions"
    title="The basic terms that apply when using this website and engaging with our content."
    intro="These terms explain how website content may be used, what information is provided for guidance only, and the limits that apply unless a separate client agreement is in place."
    highlights={highlights}
    sections={sections}
    contactNote="For questions about these terms or a current or proposed engagement, contact us at"
    disclaimer="These terms govern use of the website itself and do not replace a signed agreement, quotation, or scope document for client work. Where a separate written contract exists, that contract controls the project relationship."
  />
);

export default Terms;
