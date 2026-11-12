import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Building2, HandCoins, Scale } from "lucide-react";
import ServicesSection from "../components/ServicesSection";
import PhoneField from "../components/PhoneField";
import bhusethuLogo from "../assets/images/bhusethu_logo.webp";
import { api, API_BASE } from "../api";
import { toCard } from "../propertyUtils";
import { submitEnquiry, resetEnquiry } from "../enquirySubmit";

const FORM_URL = `${API_BASE}/api/contact`;
const TURNSTILE_KEY = "0x4AAAAAAB_JtYwMFieSAtdO";

const PROPERTY_TYPES = [
  "Apartment / Flat",
  "Independent house / Villa",
  "Plot / Land",
  "Agricultural land",
  "Commercial",
];

// Extra fields are packed into client_message, so the backend schema stays unchanged.
const SERVICE_FORMS = {
  buy: {
    title: "Buy a property",
    sub: "Three quick choices and we will shortlist verified options.",
    service: "buying_assistance",
    fields: [
      {
        name: "Property type",
        type: "choice",
        options: PROPERTY_TYPES,
        required: true,
      },
      { name: "Preferred area", type: "text" },
      {
        name: "Area guidance",
        type: "checkbox",
        label: "I need guidance on choosing the area",
        value: "Yes",
      },
      {
        name: "Budget",
        type: "choice",
        options: [
          "Under ₹50 L",
          "₹50 L – ₹1 Cr",
          "₹1 Cr – ₹2 Cr",
          "Above ₹2 Cr",
        ],
        required: true,
      },
    ],
  },
  sell: {
    title: "Sell a property",
    sub: "Three quick choices. We will advise on pricing and buyers.",
    service: "selling_assistance",
    uploads: true,
    fields: [
      {
        name: "Property type",
        type: "choice",
        options: PROPERTY_TYPES,
        required: true,
      },
      {
        name: "Location",
        type: "choice",
        options: ["Hyderabad", "Rest of Telangana", "Andhra Pradesh", "Other"],
        required: true,
      },
      {
        name: "Expected price",
        type: "choice",
        options: [
          "Under ₹50 L",
          "₹50 L – ₹1 Cr",
          "₹1 Cr – ₹2 Cr",
          "Above ₹2 Cr",
          "Not sure yet",
        ],
        required: true,
      },
    ],
  },
  legal: {
    title: "Legal & title help",
    sub: "Three quick choices. A property advisor will call you back.",
    service: "due_diligence",
    fields: [
      {
        name: "Help needed",
        type: "choice",
        options: [
          "Title verification before buying",
          "Property dispute",
          "Encumbrance / loan check",
          "Approvals & records",
        ],
        required: true,
      },
      {
        name: "Property location",
        type: "choice",
        options: ["Hyderabad", "Rest of Telangana", "Andhra Pradesh", "Other"],
        required: true,
      },
      {
        name: "Documents available",
        type: "choice",
        options: [
          "Sale deed",
          "EC / encumbrance",
          "Pahani / revenue records",
          "Not sure",
        ],
        required: true,
      },
    ],
  },
};

const FEATURED_PROPERTIES = [
  {
    id: "tridasa-rise",
    title: "Tridasa Rise",
    location: "Nallagandla, Hyderabad",
    type: "3 & 4 BHK apartments",
    price: "₹1.2 Cr onwards",
    badge: "Ready to move",
    image: "images/properties/bulding2.webp",
    gallery: [
      "images/properties/bulding2.webp",
      "images/properties/bulding1.jpg",
      "images/properties/apartment-buildings.png",
    ],
    facts: [
      { label: "Configuration", value: "3 & 4 BHK" },
      { label: "Location", value: "Nallagandla" },
      { label: "Status", value: "Ready" },
    ],
    description:
      "A verified residential project in Nallagandla with clear title checks, RERA documentation and a site inspection completed by our team.",
  },
  {
    id: "choutuppal-land",
    title: "Choutuppal Land",
    location: "Choutuppal, Telangana",
    type: "Surveyed land plots",
    price: "₹45 L onwards",
    badge: "Clear title",
    image:
      "https://res.cloudinary.com/doqbjnliq/image/upload/v1794396464/Surveyor_Walking_Through_Rice_Fields_mg73d1.png",
    gallery: [
      "https://res.cloudinary.com/doqbjnliq/image/upload/v1794396464/Surveyor_Walking_Through_Rice_Fields_mg73d1.png",
      "https://res.cloudinary.com/doqbjnliq/image/upload/v1794396464/Surveyor_Walking_Through_Rice_Fields_mg73d1.png",
      "https://res.cloudinary.com/doqbjnliq/image/upload/v1794396464/Surveyor_Walking_Through_Rice_Fields_mg73d1.png",
    ],
    facts: [
      { label: "Plot type", value: "Open land" },
      { label: "Records", value: "Verified" },
      { label: "Inspection", value: "Completed" },
    ],
    description:
      "Surveyed land parcels with ownership, revenue records and access checked on site. Suitable for buyers looking at medium-term land investment.",
  },
  {
    id: "financial-district-commercial",
    title: "Financial District Commercial",
    location: "Nanakramguda, Hyderabad",
    type: "Commercial office space",
    price: "₹3.5 Cr",
    badge: "Prime location",
    image: "images/properties/commercial-building.png",
    gallery: [
      "images/properties/commercial-building.png",
      "images/properties/apartment-buildings.png",
      "images/properties/bulding1.jpg",
    ],
    facts: [
      { label: "Asset", value: "Commercial" },
      { label: "Area", value: "12,000 sq ft" },
      { label: "Status", value: "Ready" },
    ],
    description:
      "A commercial asset in the Financial District with documentation reviewed and commercial terms supported by our advisory team.",
  },
  {
    id: "shadnagar-plots",
    title: "Shadnagar Open Plots",
    location: "Shadnagar, Telangana",
    type: "DTCP approved plots",
    price: "₹28 L onwards",
    badge: "New launch",
    image: "images/properties/land.jpg",
    gallery: [
      "images/properties/land.jpg",
      "images/properties/land-plots.png",
      "images/properties/choutuppal_land/property-2.webp",
    ],
    facts: [
      { label: "Approval", value: "DTCP" },
      { label: "Plot sizes", value: "150–300 sq yd" },
      { label: "Status", value: "New" },
    ],
    description:
      "Planned open plots with approval documents and layout details available for review before you commit.",
  },
  {
    id: "nallagandla-villa",
    title: "Nallagandla Residences",
    location: "Nallagandla, Hyderabad",
    type: "Independent villa",
    price: "₹2.4 Cr",
    badge: "Exclusive",
    image: "images/properties/bulding1.jpg",
    gallery: [
      "images/properties/bulding1.jpg",
      "images/properties/bulding2.webp",
      "images/hero/property-6.webp",
    ],
    facts: [
      { label: "Type", value: "Independent villa" },
      { label: "Configuration", value: "4 BHK" },
      { label: "Status", value: "Resale" },
    ],
    description:
      "A resale villa option with title, encumbrance and property condition reviewed before the buyer shortlist stage.",
  },
  {
    id: "gachibowli-apartments",
    title: "Gachibowli Apartments",
    location: "Gachibowli, Hyderabad",
    type: "Premium apartments",
    price: "₹95 L onwards",
    badge: "Verified",
    image: "images/properties/apartment-buildings.png",
    gallery: [
      "images/properties/apartment-buildings.png",
      "images/properties/bulding2.webp",
      "images/properties/bulding1.jpg",
    ],
    facts: [
      { label: "Configuration", value: "2 & 3 BHK" },
      { label: "Location", value: "Gachibowli" },
      { label: "Status", value: "Ready" },
    ],
    description:
      "Verified apartment options close to the city’s IT corridor, shortlisted around your budget, configuration and commute.",
  },
];

function PropertyModal({ property, onClose, onEnquire }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    setActiveImage(0);
  }, [property.id]);

  return (
    <div
      className="prop-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prop-modal-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="prop-modal__panel">
        <button
          className="prop-modal__close"
          type="button"
          aria-label="Close property details"
          onClick={onClose}
        >
          ×
        </button>

        <div className="prop-modal__media">
          <img
            className="prop-modal__main"
            src={property.gallery[activeImage]}
            alt={property.title}
          />
          <div className="prop-modal__thumbs">
            {property.gallery.map((src, i) => (
              <button
                className={`prop-modal__thumb ${i === activeImage ? "is-active" : ""}`}
                type="button"
                key={src}
                onClick={() => setActiveImage(i)}
              >
                <img src={src} alt={`${property.title} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="prop-modal__body">
          <span className="eyebrow">{property.badge}</span>
          <h2 id="prop-modal-title">{property.title}</h2>
          <p className="prop-modal__location">
            <svg aria-hidden="true">
              <use href="images/icons.svg#icon-map-pin" />
            </svg>
            {property.location}
          </p>

          <div className="prop-modal__facts">
            {property.facts.map((fact) => (
              <div className="prop-fact" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>

          <p className="prop-modal__desc">{property.description}</p>

          <div className="prop-modal__price">
            <span>Guide price</span>
            <strong>{property.price}</strong>
          </div>

          <div className="prop-modal__actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onEnquire}
            >
              Enquire about this property
            </button>
            <button className="btn btn-outline" type="button" onClick={onClose}>
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiryModal({ type, onClose }) {
  const cfg = SERVICE_FORMS[type];
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    let wid;
    if (window.turnstile) {
      try {
        wid = window.turnstile.render("#modal-turnstile", {
          sitekey: TURNSTILE_KEY,
          theme: "light",
          size: "flexible",
        });
      } catch (e) {
        /* noop */
      }
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (wid && window.turnstile) {
        try {
          window.turnstile.remove(wid);
        } catch (e) {
          /* noop */
        }
      }
    };
  }, [onClose]);

  if (!cfg) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const extra = cfg.fields
      .map((f) => {
        const value = (fd.get(f.name) || "").toString().trim();
        return value ? `${f.name}: ${value}` : null;
      })
      .filter(Boolean)
      .join("\n");

    const body = new FormData();
    body.append("client_name", (fd.get("client_name") || "").toString().trim());
    body.append(
      "client_phone",
      (fd.get("client_phone") || "").toString().trim(),
    );
    body.append("service_type", cfg.service);
    body.append("client_message", `[${cfg.title}]\n${extra}`);
    fd.getAll("images").forEach((file) => {
      if (file && file.size) body.append("images", file);
    });
    fd.getAll("documents").forEach((file) => {
      if (file && file.size) body.append("documents", file);
    });
    const token = fd.get("cf-turnstile-response");
    if (token) body.append("cf-turnstile-response", token);

    setStatus("sending");
    try {
      await api.post(FORM_URL, body, { timeout: 120_000 });
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__box">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        {status === "done" ? (
          <div className="modal__done">
            <h3 id="modal-title">Thank you — we have your enquiry.</h3>
            <p>
              A property advisor will call you shortly. For anything urgent,
              call <a href="tel:+918125291166">+91 81252 91166</a>.
            </p>
            <button className="btn btn-primary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="modal__eyebrow">Free consultation</span>
            <h3 id="modal-title">{cfg.title}</h3>
            <p className="modal__sub">{cfg.sub}</p>
            <div className="modal__grid">
              <div className="field">
                <label htmlFor="m-name">Full name *</label>
                <input
                  id="m-name"
                  name="client_name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>
              <PhoneField id="m-phone" />
              {cfg.fields.map((f) => {
                if (f.type === "choice") {
                  return (
                    <fieldset className="choice modal__full" key={f.name}>
                      <legend>
                        {f.name}
                        {f.required ? " *" : ""}
                      </legend>
                      <div className="choice__options">
                        {f.options.map((o) => (
                          <label className="choice__option" key={o}>
                            <input
                              type="radio"
                              name={f.name}
                              value={o}
                              required={!!f.required}
                            />
                            <span>{o}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  );
                }
                if (f.type === "checkbox") {
                  return (
                    <label className="check modal__full" key={f.name}>
                      <input
                        type="checkbox"
                        name={f.name}
                        value={f.value || "Yes"}
                      />
                      <span className="check__box" aria-hidden="true"></span>
                      <span>{f.label}</span>
                    </label>
                  );
                }
                const id = `m-${f.name.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <div className="field modal__full" key={f.name}>
                    <label htmlFor={id}>
                      {f.name} <span className="optional">(optional)</span>
                    </label>
                    <input id={id} name={f.name} type="text" />
                  </div>
                );
              })}
              {cfg.uploads && (
                <>
                  <div className="field modal__full">
                    <label htmlFor="m-images">Property photo</label>
                    <input
                      id="m-images"
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                    />
                    <span className="field__hint">
                      The first photo becomes the cover.
                    </span>
                  </div>
                  <div className="field modal__full">
                    <label htmlFor="m-documents">Ownership document</label>
                    <input
                      id="m-documents"
                      name="documents"
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                    />
                    <span className="field__hint">
                      PDF or photo of the deed, EC or records.
                    </span>
                  </div>
                </>
              )}
            </div>
            <div id="modal-turnstile"></div>
            {status === "error" && (
              <p className="modal__err" role="alert">
                Could not send. Please try again or call +91 81252 91166.
              </p>
            )}
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send my enquiry"}
            </button>
            <p className="form-note">
              We only use your details to respond to this enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [modal, setModal] = useState(null); // 'buy' | 'sell' | 'legal' | null
  const [activeProperty, setActiveProperty] = useState(null);

  const { data: liveProperties = [] } = useQuery({
    queryKey: ["properties", "public"],
    queryFn: ({ signal }) => api.get("/api/properties", { signal }),
    select: (res) => (res.data || []).map(toCard),
    staleTime: 60_000,
  });

  const displayProperties =
    liveProperties.length > 0 ? liveProperties : FEATURED_PROPERTIES;
  const galleryCount =
    displayProperties.length <= 6 ? displayProperties.length : "many";
  const closeModal = () => setModal(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-bar">
          <Link
            className="brand"
            aria-label="Bhusethu Property Solutions — home"
            to="/"
          >
            <img className="brand-mark" src={bhusethuLogo} alt="Bhusethu" />
            <span className="brand-copy">
              <span className="brand-name">Bhusethu</span>
              <span className="brand-sub">Property Solutions</span>
            </span>
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            <Link aria-current="page" to="/">
              Home
            </Link>
            <Link to="/#services">Services</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-cta">
            <Link className="btn btn-primary btn-sm header-btn" to="/contact">
              <span className="short">Enquire</span>
              <span className="long">Book a consultation</span>
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="mobileNav"
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-nav" id="mobileNav" hidden>
        <div className="mobile-nav-head">
          <span className="brand-name">Bhusethu</span>
          <button
            className="mobile-close"
            type="button"
            aria-label="Close menu"
          >
            <svg width="20" height="20" aria-hidden="true">
              <use href="images/icons.svg#icon-x" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link aria-current="page" to="/">
            Home
          </Link>
          <Link to="/#services">Services</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="mobile-nav-foot">
          <Link className="btn btn-primary btn-block" to="/contact">
            Book a consultation
          </Link>
          <a className="contact-line" href="tel:+918125291166">
            <svg width="17" height="17" aria-hidden="true">
              <use href="images/icons.svg#icon-phone" />
            </svg>
            <strong>+91 81252 91166</strong>
          </a>
          <a className="contact-line" href="mailto:support@bhusethu.com">
            <svg width="17" height="17" aria-hidden="true">
              <use href="images/icons.svg#icon-mail" />
            </svg>
            support@bhusethu.com
          </a>
        </div>
      </div>
      <div className="nav-backdrop" hidden></div>

      <main id="main">
        {/*  Hero  */}
        {/*  Hero (mobile only)  */}
        {/*  Hero (mobile only)  */}
        <section className="hn" aria-labelledby="hn-title">
          <div className="hn__card" data-hn="">
            <div className="hn__slides">
              <img
                className="hn__slide is-on"
                src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_nm7gj0nm7gj0nm7g_tvn1nl.png"
                alt="Bhusethu property advisory"
                data-label="Property advisory"
                width="1024"
                height="1024"
                fetchPriority="high"
              />
              <img
                className="hn__slide"
                src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_lre5uplre5uplre5_meele4.png"
                alt="Bhusethu legal verification"
                data-label="Legal verification"
                width="1024"
                height="1024"
                loading="lazy"
              />
              <img
                className="hn__slide"
                src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_v02aftv02aftv02a_lspozv.png"
                alt="Bhusethu land due diligence"
                data-label="Land due diligence"
                width="1024"
                height="1024"
                loading="lazy"
              />
              <img
                className="hn__slide"
                src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_ybwvm7ybwvm7ybwv_cls4i3.png"
                alt="Bhusethu title checks"
                data-label="Title checks"
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>

            <div className="hn__dots" role="group" aria-label="Property images">
              <button
                className="is-on"
                type="button"
                data-hn-dot=""
                aria-label="Image 1"
              ></button>
              <button
                type="button"
                data-hn-dot=""
                aria-label="Image 2"
              ></button>
              <button
                type="button"
                data-hn-dot=""
                aria-label="Image 3"
              ></button>
              <button
                type="button"
                data-hn-dot=""
                aria-label="Image 4"
              ></button>
            </div>
          </div>

          <div className="hn__body">
            <h1 id="hn-title" className="hn__title">
              Verify Property <em>Before You Purchase.</em>
            </h1>
            <p className="hn__sub">Independent Legal & Property Advisory.</p>
            <p className="hn__lead">
              Ownership verification, title checks, encumbrance verification and
              property advisory across Telangana & Andhra Pradesh.
            </p>
            <Link className="hn__btn hn__btn--solid" to="/contact">
              Book a free consultation →
            </Link>
            <div className="hn__row">
              <Link className="hn__btn hn__btn--line" to="/properties">
                Explore Properties
              </Link>
              <a className="hn__btn hn__btn--call" href="tel:+918125291166">
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-phone" />
                </svg>
                Call us
              </a>
            </div>
          </div>

          <div className="hn__verify">
            <span className="hn__kicker">Before you buy</span>
            <h2>We verify first, so you buy the right property.</h2>
            <p>
              Many property disputes surface only after the money is paid.
              Before you commit, our team checks who owns the property, whether
              it carries any loans or claims, and whether the approvals and land
              records are in order. We also inspect the site in person, so you
              can be sure it is the correct one.
            </p>
            <ul className="hn__checks">
              <li>
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-shield" />
                </svg>
                <b>Ownership</b>
                <span>Who really owns it</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-scale" />
                </svg>
                <b>Encumbrance</b>
                <span>Loans, liens, disputes</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-building" />
                </svg>
                <b>Approvals</b>
                <span>Layout & building permits</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-home" />
                </svg>
                <b>Revenue records</b>
                <span>Survey & land records</span>
              </li>
            </ul>
            <p className="hn__proof">
              <strong className="hero-highlight">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                Sites inspected in person
              </strong>
              <span>Documents reviewed by our team</span>
            </p>
          </div>

          <div className="hn__stats">
            <div>
              <strong>10+</strong>
              <span>Years experience</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Properties transacted</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>Title issues cleared</span>
            </div>
          </div>
        </section>

        <section className="hz" aria-labelledby="hero-title">
          <div className="hz__grid">
            <div className="hz__copy">
              <p className="hz__tag">
                <i>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </i>
                Telangana & Andhra Pradesh
              </p>

              <h1 id="hero-title">
                <span>Verify Property</span>
                <span className="hz__blue">Before You Purchase.</span>
              </h1>

              <p className="hz__sub">Independent Legal & Property Advisory.</p>

              <p className="hz__lead">
                Ownership verification, title checks, encumbrance verification
                and property advisory across Telangana & Andhra Pradesh.
              </p>

              <div className="hz__actions">
                <Link className="hz__btn hz__btn--solid" to="/contact">
                  Book Consultation
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link className="hz__btn hz__btn--line" to="/properties">
                  Explore Properties
                </Link>
              </div>

              <p className="hz__call">
                Prefer a call? <a href="tel:+918125291166">+91 81252 91166</a>
              </p>

              <div className="hz__quick">
                <button type="button" onClick={() => setModal("buy")}>
                  <Building2 size={18} strokeWidth={2} aria-hidden="true" />
                  <span>Buy a property</span>
                </button>
                <button type="button" onClick={() => setModal("sell")}>
                  <HandCoins size={18} strokeWidth={2} aria-hidden="true" />
                  <span>Sell a property</span>
                </button>
                <button type="button" onClick={() => setModal("legal")}>
                  <Scale size={18} strokeWidth={2} aria-hidden="true" />
                  <span>Legal help</span>
                </button>
              </div>
            </div>

            <div className="hz__visual">
              <div className="hz__frame">
                <div
                  className="hz__slides"
                  data-hz-slides=""
                  data-hero-slides=""
                >
                  <img
                    className="hz__slide is-on"
                    src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_nm7gj0nm7gj0nm7g_tvn1nl.png"
                    alt="Bhusethu property advisory"
                    data-label="Property advisory"
                    width="1024"
                    height="1024"
                    fetchPriority="high"
                  />
                  <img
                    className="hz__slide"
                    src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_lre5uplre5uplre5_meele4.png"
                    alt="Bhusethu legal verification"
                    data-label="Legal verification"
                    width="1024"
                    height="1024"
                  />
                  <img
                    className="hz__slide"
                    src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_v02aftv02aftv02a_lspozv.png"
                    alt="Bhusethu land due diligence"
                    data-label="Land due diligence"
                    width="1024"
                    height="1024"
                  />
                  <img
                    className="hz__slide"
                    src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794393112/Gemini_Generated_Image_ybwvm7ybwvm7ybwv_cls4i3.png"
                    alt="Bhusethu title checks"
                    data-label="Title checks"
                    width="1024"
                    height="1024"
                  />
                </div>

                <div
                  className="hz__bars"
                  role="group"
                  aria-label="Property images"
                >
                  <button
                    className="hz__bar is-on"
                    type="button"
                    data-hz-bar=""
                    aria-label="Show image 1 of 4"
                  ></button>
                  <button
                    className="hz__bar"
                    type="button"
                    data-hz-bar=""
                    aria-label="Show image 2 of 4"
                  ></button>
                  <button
                    className="hz__bar"
                    type="button"
                    data-hz-bar=""
                    aria-label="Show image 3 of 4"
                  ></button>
                  <button
                    className="hz__bar"
                    type="button"
                    data-hz-bar=""
                    aria-label="Show image 4 of 4"
                  ></button>
                </div>
              </div>

              <aside className="hz__report" aria-label="What we verify">
                <header className="hz__report-head">
                  <span className="hz__report-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l8 3v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3z" />
                      <path d="M8.5 12l2.5 2.5 4.5-5" />
                    </svg>
                  </span>
                  <span>
                    <b>Our verification checklist</b>
                    <small>Before you purchase a rupee</small>
                  </span>
                </header>
                <ul className="hz__checks">
                  <li>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    Ownership & title
                  </li>
                  <li>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    Encumbrance
                  </li>
                  <li>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    Approvals
                  </li>
                  <li>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    Revenue records
                  </li>
                </ul>
                <p className="hz__report-foot">
                  <strong className="hero-highlight">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    Sites inspected in person
                  </strong>
                </p>
              </aside>

              <div className="hz__chip">
                <strong>10+</strong>
                <span>
                  Years of
                  <br />
                  experience
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="property-gallery section"
          id="properties"
          aria-labelledby="gallery-title"
        >
          <div className="container">
            <div className="gallery-head">
              <div>
                <span className="eyebrow">Our properties</span>
                <h2 id="gallery-title">
                  A closer look at what we are handling.
                </h2>
              </div>
              <p>
                Verified listings, site inspections and documented checks — tap
                any property to see the full picture.
              </p>
            </div>

            <div className={`gallery-grid gallery-grid--count-${galleryCount}`}>
              {displayProperties.map((property, index) => (
                <button
                  className="gallery-card"
                  type="button"
                  key={property.id}
                  onClick={() => setActiveProperty(property)}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <span className="gallery-card__shade" />
                  <span className="gallery-card__badge">{property.badge}</span>
                  <span className="gallery-card__arrow">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-arrow-up-right" />
                    </svg>
                  </span>
                  <span className="gallery-card__content">
                    <span className="gallery-card__type">{property.type}</span>
                    <strong>{property.title}</strong>
                    <span className="gallery-card__location">
                      <svg aria-hidden="true">
                        <use href="images/icons.svg#icon-map-pin" />
                      </svg>
                      {property.location}
                    </span>
                    <span className="gallery-card__price">
                      {property.price}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <Link className="gallery-all" to="/properties">
              View all properties →
            </Link>
          </div>
        </section>

        {/*  Properties / projects carousel  */}
        <section className="rail-section" aria-labelledby="focus-title">
          <div className="container">
            <div className="rail-head">
              <div>
                <span className="eyebrow">In focus</span>
                <h2 id="focus-title">
                  Properties and projects we are handling.
                </h2>
              </div>
              <div className="rail-arrows">
                <button
                  className="rail-arrow"
                  type="button"
                  data-rail-prev=""
                  aria-label="Previous card"
                >
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-chevron-left" />
                  </svg>
                </button>
                <button
                  className="rail-arrow"
                  type="button"
                  data-rail-next=""
                  aria-label="Next card"
                >
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-chevron-right" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="rail"
              data-rail=""
              aria-label="Properties and projects"
            >
              <article className="p-card">
                <div className="p-card__badges">
                  <span className="badge badge--gold">New launch</span>
                  <span className="badge">Zero brokerage</span>
                </div>
                <img
                  src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794396962/Unfinished_High-Rise_Construction_Site_z9mlu8.png"
                  alt="Tridasa Rise residential towers in Nallagandla, Hyderabad"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
                <div className="p-card__body">
                  <h3>Tridasa Rise</h3>
                  <p className="p-card__place">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-map-pin" />
                    </svg>
                    Nallagandla, Hyderabad · 3 & 4 BHK
                  </p>
                  <div className="p-card__foot">
                    <div className="p-card__price">
                      ₹1.38 Cr onwards<small>4 BHK at ₹2.22 Cr</small>
                    </div>
                    <Link
                      className="p-card__link"
                      aria-label="View Tridasa Rise details"
                      to="/contact?service=property_enquiry&property=Tridasa%20Rise"
                    >
                      <svg aria-hidden="true">
                        <use href="images/icons.svg#icon-arrow-up-right" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="p-card">
                <div className="p-card__badges">
                  <span className="badge badge--gold">Land</span>
                  <span className="badge">Site inspected</span>
                </div>
                <img
                  src="https://res.cloudinary.com/doqbjnliq/image/upload/v1794396464/Surveyor_Walking_Through_Rice_Fields_mg73d1.png"
                  alt="Land parcel at Choutuppal, Telangana"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
                <div className="p-card__body">
                  <h3>Choutuppal land parcel</h3>
                  <p className="p-card__place">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-map-pin" />
                    </svg>
                    Choutuppal, Telangana
                  </p>
                  <div className="p-card__foot">
                    <div className="p-card__price">
                      Details on request
                      <small>Documents reviewed by our team</small>
                    </div>
                    <Link
                      className="p-card__link"
                      aria-label="Enquire about the Choutuppal land parcel"
                      to={
                        "/contact?service=property_enquiry&property=Choutuppal%20land"
                      }
                    >
                      <svg aria-hidden="true">
                        <use href="images/icons.svg#icon-arrow-up-right" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="p-card p-card--cta">
                <div>
                  <span className="eyebrow">Your requirement</span>
                  <h3>Looking for something specific?</h3>
                  <p>
                    Tell us the location, budget and configuration. We will
                    search our network, including off-market options.
                  </p>
                </div>
                <Link className="btn btn-gold" to="/contact#send-message">
                  Send your requirement
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-arrow-right" />
                  </svg>
                </Link>
              </article>
            </div>
            <div
              className="rail-dots"
              data-rail-dots=""
              aria-hidden="true"
            ></div>
          </div>
        </section>

        {/*  Services  */}
        <ServicesSection />

        {/*  Trust  */}
        <section className="trust-band" aria-labelledby="trust-title">
          <div className="container trust-grid">
            <div>
              <span className="eyebrow">Why Bhusethu</span>
              <div className="trust-stats" style={{ marginTop: "1.25rem" }}>
                <div>
                  <strong>10+</strong>
                  <span>Years across Telangana & AP</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>Properties transacted</span>
                </div>
                <div>
                  <strong>40+</strong>
                  <span>Title issues cleared</span>
                </div>
              </div>
            </div>
            <figure className="trust-quote">
              <blockquote>
                “I had been struggling with an inheritance dispute over land.
                The team gave clear counsel, handled the documentation
                meticulously and reached a fair resolution.”
              </blockquote>
              <footer>Ramesh Kumar · Property investor, Hyderabad</footer>
            </figure>
            <h2
              id="trust-title"
              className="visually-hidden"
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
              }}
            >
              Why Bhusethu
            </h2>
          </div>
        </section>

        {/*  Enquiry  */}
        <section
          className="enquiry enquiry--compact"
          id="enquire"
          aria-labelledby="enquire-title"
        >
          <div className="container enquiry-grid">
            <div>
              <span className="eyebrow">Talk to us</span>
              <h2 id="enquire-title">Tell us what you are planning.</h2>
              <p className="enquiry-lead">
                A few details and a property advisor will call you back —
                usually within one working day.
              </p>
              <div className="enquiry-contact">
                <span>Prefer to call?</span>
                <a href="tel:+918125291166">+91 81252 91166</a>
                <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
              </div>
            </div>

            <div className="form-card">
              <h3 className="form-card__title">Request a consultation</h3>
              <p className="form-card__sub">
                Fields marked with * are required.
              </p>
              <form
                action={`${API_BASE}/api/contact`}
                method="POST"
                onSubmit={submitEnquiry}
                noValidate
              >
                <div className="form-grid form-grid--two">
                  <div className="field">
                    <label htmlFor="home-name">Full name *</label>
                    <input
                      id="home-name"
                      name="client_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <PhoneField id="home-phone" />
                  <div className="field field--full">
                    <label htmlFor="home-service">How can we help? *</label>
                    <select
                      id="home-service"
                      name="service_type"
                      required
                      data-service-select=""
                    >
                      <option value="">Select a service</option>
                      <option value="due_diligence">
                        Title verification & due diligence
                      </option>
                      <option value="title_dispute">
                        Property dispute resolution
                      </option>
                      <option value="buying_assistance">
                        Buying assistance
                      </option>
                      <option value="selling_assistance">
                        Selling assistance
                      </option>
                      <option value="property_management">
                        Property management
                      </option>
                      <option value="development_approval">
                        Development & construction
                      </option>
                      <option value="property_enquiry">
                        Enquiry about a listed property
                      </option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                </div>
                <div
                  className="cf-turnstile"
                  data-sitekey="0x4AAAAAAB_JtYwMFieSAtdO"
                  data-theme="light"
                  data-size="flexible"
                ></div>
                <div
                  className="form-alert"
                  data-form-alert=""
                  role="alert"
                  aria-live="polite"
                  hidden
                ></div>
                <div className="form-actions">
                  <button className="btn btn-primary btn-block" type="submit">
                    Send my enquiry
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-arrow-right" />
                    </svg>
                  </button>
                </div>
                <p className="form-note">
                  By sending this enquiry you agree to be contacted about your
                  request. We do not share your details with third parties.
                  <Link to="/privacy">Privacy policy</Link>.
                </p>
              </form>

              <div
                className="form-success"
                data-form-success=""
                role="status"
                aria-live="polite"
                hidden
              >
                <span className="form-success__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-check" />
                  </svg>
                </span>
                <h4>Thank you — we have your enquiry.</h4>
                <p>
                  A property advisor will be in touch shortly. For anything
                  urgent, call
                  <a
                    href="tel:+918125291166"
                    style={{ color: "var(--green)", fontWeight: "600" }}
                  >
                    +91 81252 91166
                  </a>
                  .
                </p>
                <button
                  className="btn btn-outline btn-sm"
                  type="button"
                  data-form-again=""
                  onClick={resetEnquiry}
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer site-footer--slim">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link
                className="brand"
                aria-label="Bhusethu Property Solutions — home"
                to="/"
              >
                <img className="brand-mark" src={bhusethuLogo} alt="Bhusethu" />
                <span className="brand-copy">
                  <span className="brand-name">Bhusethu</span>
                  <span className="brand-sub">Property Solutions</span>
                </span>
              </Link>
              <p>
                Property verification, advisory and transaction support across
                Telangana and Andhra Pradesh.
              </p>
              <div className="footer-contact">
                <a href="tel:+918125291166">+91 81252 91166</a>
                <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
                <span style={{ color: "rgba(245, 240, 230, 0.55)" }}>
                  CoWork Trendz, Capital Park, Madhapur, Hyderabad
                </span>
              </div>
            </div>
            <nav className="footer-col" aria-label="Explore">
              <h4>Explore</h4>
              <ul>
                <li>
                  <Link to="/properties">Properties</Link>
                </li>
                <li>
                  <Link to="/#services">Services</Link>
                </li>
                <li>
                  <Link to="/projects">Projects</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>
              © <span data-year="">2026</span> Bhusethu Property Solutions. All
              rights reserved.
            </p>
            <p>
              <Link to="/privacy">Privacy policy</Link> ·
              <Link to="/contact">Contact</Link>
            </p>
          </div>
        </div>
      </footer>

      <div className="mobile-cta mobile-cta--3">
        <button
          type="button"
          className="mbtn mbtn--buy"
          onClick={() => setModal("buy")}
        >
          <svg aria-hidden="true">
            <use href="images/icons.svg#icon-key" />
          </svg>
          Buy a property
        </button>
        <button
          type="button"
          className="mbtn mbtn--sell"
          onClick={() => setModal("sell")}
        >
          <svg aria-hidden="true">
            <use href="images/icons.svg#icon-megaphone" />
          </svg>
          Sell a property
        </button>
        <button
          type="button"
          className="mbtn mbtn--legal"
          onClick={() => setModal("legal")}
        >
          <svg aria-hidden="true">
            <use href="images/icons.svg#icon-scale" />
          </svg>
          Legal Help
        </button>
      </div>

      {modal && <EnquiryModal type={modal} onClose={closeModal} />}

      {activeProperty && (
        <PropertyModal
          property={activeProperty}
          onClose={() => setActiveProperty(null)}
          onEnquire={() => {
            setActiveProperty(null);
            setModal("buy");
          }}
        />
      )}

      <div className="mfloat">
        <Link className="mfloat__chip" to="/services/property-management">
          <svg aria-hidden="true">
            <use href="images/icons.svg#icon-home" />
          </svg>
          Property maintenance
        </Link>
        <Link
          className="mfloat__chip mfloat__chip--2"
          to="/services/dispute-resolution"
        >
          <svg aria-hidden="true">
            <use href="images/icons.svg#icon-scale" />
          </svg>
          Dispute resolution
        </Link>
      </div>
    </>
  );
}
