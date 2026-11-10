import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Scale,
  KeyRound,
  Megaphone,
  House,
  Building2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Title verification",
    text: "Ownership, encumbrance, survey records and approvals checked before you purchase.",
    slug: "title-verification",
    badge: "Most requested",
  },
  {
    icon: Scale,
    title: "Dispute resolution",
    text: "Inheritance, boundary and ownership issues handled with a clear plan.",
    slug: "dispute-resolution",
  },
  {
    icon: KeyRound,
    title: "Buying assistance",
    text: "Shortlisting, valuation, negotiation and legal vetting on your side.",
    slug: "buying-assistance",
  },
  {
    icon: Megaphone,
    title: "Selling & marketing",
    text: "Pricing, document readiness and access to serious buyers.",
    slug: "selling-assistance",
  },
  {
    icon: House,
    title: "Property management",
    text: "Site checks, maintenance and leasing for owners away from home.",
    slug: "property-management",
  },
  {
    icon: Building2,
    title: "Development",
    text: "Feasibility, approvals and construction coordination for your project.",
    slug: "development",
  },
];

export default function ServicesSection() {
  return (
    <section className="svc" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="svc__head">
          <div className="svc__head-main">
            <span className="eyebrow">What we do</span>
            <h2 id="services-title">
              Start with the question on your mind.
            </h2>
          </div>
          <div className="svc__head-aside">
            <p>
              Most property problems begin with an unclear document. Pick the
              closest situation and we will take it from there.
            </p>
            <Link className="svc__head-link" to="/contact">
              Talk to an advisor
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="svc__grid">
          {SERVICES.map(({ icon: Icon, title, text, slug, badge }, index) => (
            <Link
              className="svc-card"
              key={slug}
              to={`/services/${slug}`}
            >
              {badge && <span className="svc-card__badge">{badge}</span>}
              <span className="svc-card__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="svc-card__icon">
                <Icon size={21} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="svc-card__link">
                Explore service
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <ol className="svc__flow" aria-label="How our service works">
          <li>
            <span>01</span>
            Share the details
          </li>
          <li>
            <span>02</span>
            We review the records
          </li>
          <li>
            <span>03</span>
            You get a written view
          </li>
        </ol>

        <div className="svc__foot">
          <p>
            Not sure which one fits? A short call is usually enough to point you
            in the right direction.
          </p>
          <Link className="btn btn-primary" to="/contact">
            Book a consultation
            <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
