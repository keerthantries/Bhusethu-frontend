import {
  ShieldCheck,
  Scale,
  KeyRound,
  Megaphone,
  House,
  Building2,
} from "lucide-react";

export const SERVICES = [
  {
    slug: "title-verification",
    seo: {
      title: "Property Title Verification in Hyderabad | Bhusethu",
      description:
        "Independent title verification and due diligence in Hyderabad, Telangana and Andhra Pradesh. Ownership, encumbrance and approval checks before you pay.",
    },
    kicker: "01 · Verify",
    nav: "Title verification",
    title: "Title verification & due diligence",
    service: "due_diligence",
    icon: ShieldCheck,
    image: "/images/services/verfied_buy.svg",
    intro:
      "An independent check of the property's ownership, records and approvals — carried out before you pay a token, sign an agreement or release funds.",
    summary:
      "Buying a property is mostly a document exercise. We read the file the way a cautious buyer should: chain of title, encumbrance, survey records and approvals, explained in plain language.",
    highlights: ["Chain of title", "Encumbrance & revenue records", "Approval review"],
    helps: [
      "First-time buyers who want to understand what they are signing.",
      "NRI and out-of-state investors buying without regular site access.",
      "Sellers preparing a clean document set before listing.",
    ],
    included: [
      "Chain of title and seller / developer authority.",
      "Encumbrance certificate and revenue records.",
      "Survey numbers, boundaries and extent reconciliation.",
      "Approval and agreement review, with findings explained in plain language.",
    ],
    process: [
      "Share the property details and available documents.",
      "We review records and, where needed, inspect the site.",
      "You receive a written view of the risks and next steps.",
    ],
    faq: [
      {
        q: "How long does a title check take?",
        a: "Typically 5–10 working days once we have the complete document set. Missing records can extend this, and we tell you early if that is the case.",
      },
      {
        q: "Do you replace a lawyer?",
        a: "No. We prepare the record and risk picture; for registration or litigation we coordinate with your advocate.",
      },
      {
        q: "Can you check a property I have not visited?",
        a: "Yes. We combine record checks with a site inspection and share photographs and notes.",
      },
    ],
  },
  {
    slug: "dispute-resolution",
    seo: {
      title: "Property Dispute Resolution in Telangana & AP | Bhusethu",
      description:
        "Property dispute help for inheritance, boundary and ownership issues. Document review, missing record retrieval and a clear resolution plan.",
    },
    kicker: "02 · Resolve",
    nav: "Dispute resolution",
    title: "Property dispute resolution",
    service: "title_dispute",
    icon: Scale,
    image: "/images/services/legal_issues.svg",
    intro:
      "Clear, practical support when ownership, inheritance, boundaries or missing records stand between you and a usable property.",
    summary:
      "Disputes get harder the longer they stay undocumented. We establish what the records actually show, then agree a resolution path before anything formal begins.",
    highlights: ["Case review", "Missing record retrieval", "Resolution roadmap"],
    helps: [
      "Families dealing with inheritance or partition of land.",
      "Landowners facing boundary or encroachment concerns.",
      "Buyers who discover a problem after agreeing to purchase.",
    ],
    included: [
      "Case review and a clear map of the documents involved.",
      "Retrieval of missing revenue records such as ROR and EC.",
      "A practical resolution path — negotiation, correction or escalation.",
      "Coordination with your advocate where litigation is involved.",
    ],
    process: [
      "We listen first, then review the papers you have.",
      "We establish what the records show — and what is missing.",
      "You get a documented strategy before any formal step is taken.",
    ],
    faq: [
      {
        q: "Should I wait until the dispute escalates?",
        a: "Earlier is cheaper. A records review often reveals a correction route that closes before lawyers are needed.",
      },
      {
        q: "Can you handle family partition matters?",
        a: "We coordinate the documentation and records; the family settlement itself is drafted with your advocate.",
      },
      {
        q: "What if records are missing entirely?",
        a: "We map what exists, raise retrieval requests and tell you honestly what can and cannot be reconstructed.",
      },
    ],
  },
  {
    slug: "buying-assistance",
    seo: {
      title: "Property Buying Assistance in Hyderabad | Bhusethu",
      description:
        "Buy property with independent advice in Hyderabad and Andhra Pradesh. Curated shortlists, site visits, title checks and negotiation support.",
    },
    kicker: "03 · Buy",
    nav: "Buying assistance",
    title: "Property buying assistance",
    service: "buying_assistance",
    icon: KeyRound,
    image: "/images/services/verfied_buy.svg",
    intro:
      "From the first shortlist to registration, we act on the buyer's side — checking the property, testing the price and protecting your terms.",
    summary:
      "A good purchase is not the first property you like. It is the one that survives a document check, a fair price test and clear negotiation.",
    highlights: ["Curated shortlist", "Price & document checks", "Negotiation support"],
    helps: [
      "Buyers new to Hyderabad, Telangana or Andhra Pradesh.",
      "NRI buyers who need a trusted set of eyes on the ground.",
      "Families upgrading or investing in land and apartments.",
    ],
    included: [
      "Requirement mapping and a focused shortlist.",
      "Site visits with notes, photographs and comparisons.",
      "Title and approval checks before any advance.",
      "Offer, negotiation and agreement coordination.",
    ],
    process: [
      "We agree on budget, location and what the property must deliver.",
      "We shortlist and inspect, removing options that fail the basics.",
      "You negotiate with our support, then we coordinate documents to registration.",
    ],
    faq: [
      {
        q: "Do you charge brokerage?",
        a: "Our advisory fee is agreed upfront and depends on the scope. We do not take a hidden cut from the seller.",
      },
      {
        q: "Will you show me off-market options?",
        a: "Where our network has them, yes. Some owners prefer not to advertise publicly.",
      },
      {
        q: "Can you help after I pay the token?",
        a: "Yes — document checks continue through agreement and registration.",
      },
    ],
  },
  {
    slug: "selling-assistance",
    seo: {
      title: "Sell Your Property in Hyderabad | Bhusethu",
      description:
        "Sell your apartment, plot or land with document readiness, realistic pricing and qualified buyers. Advisory support across Telangana and AP.",
    },
    kicker: "04 · Sell",
    nav: "Selling assistance",
    title: "Property selling & marketing",
    service: "selling_assistance",
    icon: Megaphone,
    image: "/images/services/fast_sell.svg",
    intro:
      "Sell at the right price, to a buyer who is ready — with the documents prepared before the first visit.",
    summary:
      "Most delays in a sale come from documents and pricing, not from the market. We fix both before the listing goes live.",
    highlights: ["Pricing guidance", "Document readiness", "Qualified buyers"],
    helps: [
      "Owners who need visibility beyond their own network.",
      "Sellers preparing documents before listing.",
      "Families selling inherited or jointly owned property.",
    ],
    included: [
      "Pricing review against comparable local transactions.",
      "Document readiness before any site visit.",
      "Presentation, photographs and listing copy.",
      "Buyer screening, visits and negotiation coordination.",
    ],
    process: [
      "We assess the property, paperwork and realistic price band.",
      "We prepare the listing and qualify incoming interest.",
      "We coordinate site visits, negotiation and registration.",
    ],
    faq: [
      {
        q: "How long does a sale usually take?",
        a: "With clean documents, six to ten weeks is common. Documentation gaps are the main source of delay.",
      },
      {
        q: "Can you sell a property I live away from?",
        a: "Yes — we handle visits and updates remotely and keep approvals with you.",
      },
      {
        q: "Do I need to be present for every visit?",
        a: "No. We accompany buyers and share a short report after each visit.",
      },
    ],
  },
  {
    slug: "property-management",
    seo: {
      title: "NRI Property Management in Telangana & AP | Bhusethu",
      description:
        "Property management for NRI and remote owners: site checks, maintenance coordination, leasing support and documented updates.",
    },
    kicker: "05 · Manage",
    nav: "Property management",
    title: "Property management",
    service: "property_management",
    icon: House,
    image: "/images/services/property_development.svg",
    intro:
      "Keep a vacant plot, farmland or home secure and productive — whether you live nearby or on another continent.",
    summary:
      "An empty property decays quietly. Routine checks, documented updates and someone local make the difference.",
    highlights: ["Site checks", "Maintenance coordination", "Leasing support"],
    helps: [
      "NRI owners with property in Telangana or Andhra Pradesh.",
      "Landowners with vacant plots or farmland.",
      "Owners who want help leasing and maintaining a home.",
    ],
    included: [
      "Periodic site checks and condition reporting.",
      "Coordination of maintenance, repairs and utilities.",
      "Leasing support and tenant coordination.",
      "Document and record organisation.",
    ],
    process: [
      "We inspect and document the property's current state.",
      "We agree a management scope and reporting rhythm.",
      "You receive updates and approvals stay in your hands.",
    ],
    faq: [
      {
        q: "How often are site checks done?",
        a: "Monthly by default, or more frequently for properties under repair or lease.",
      },
      {
        q: "Who approves repairs?",
        a: "You do. We share a quote and photographs, and proceed only after your approval.",
      },
      {
        q: "Can you manage farmland?",
        a: "Yes — including fencing, access, encroachment checks and basic upkeep coordination.",
      },
    ],
  },
  {
    slug: "development",
    seo: {
      title: "Property Development & Construction Support | Bhusethu",
      description:
        "Feasibility, approvals and construction coordination for landowners and developers in Telangana and Andhra Pradesh.",
    },
    kicker: "06 · Build",
    nav: "Development",
    title: "Development & construction",
    service: "development_approval",
    icon: Building2,
    image: "/images/services/property_development.svg",
    intro:
      "Project support for landowners and developers — from feasibility and approvals through construction coordination and handover.",
    summary:
      "A project fails on permissions and sequencing long before it fails on design. We keep both in view from the first site walk.",
    highlights: ["Feasibility review", "Approval coordination", "Site supervision"],
    helps: [
      "Landowners exploring a joint development or self-build.",
      "Developers who need local coordination on the ground.",
      "Societies and institutions planning a property upgrade.",
    ],
    included: [
      "Site and feasibility review before design is finalised.",
      "Coordination of regulatory and local approvals.",
      "Construction planning, vendor coordination and progress checks.",
      "Quality reviews and handover support.",
    ],
    process: [
      "Understand the land, permissions and commercial goal.",
      "Build a realistic plan with approvals and milestones.",
      "Coordinate delivery and keep you informed at each stage.",
    ],
    faq: [
      {
        q: "Can you take over a stalled project?",
        a: "Often yes. We start with a document and site audit, then agree a recovery plan.",
      },
      {
        q: "Do you provide architects and contractors?",
        a: "We coordinate with your team or recommend vetted local partners.",
      },
      {
        q: "Do you handle joint development agreements?",
        a: "We prepare the commercial and documentation groundwork with your advocate.",
      },
    ],
  },
];

export function getService(slug) {
  return SERVICES.find((item) => item.slug === slug);
}
