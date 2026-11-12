import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Eye,
  FileCheck2,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import EnquiryModal from "../components/EnquiryModal";
import { displayImage } from "../propertyUtils";
import { api } from "../api";

const FALLBACK_PROPERTY = {
  id: "tridasa-rise",
  title: "Tridasa Rise",
  type: "Apartment / Flat",
  location: "Nallagandla, Hyderabad",
  price: "₹1.38 Cr onwards",
  description: "Verified residential project in Nallagandla with clear title checks and RERA documentation.",
  images: [{ url: "/images/properties/bulding2.webp" }]
};

export default function PropertiesPage() {
  const [modal, setModal] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [budget, setBudget] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    document.body.classList.remove("nav-open");
  }, []);

  const params = { q: query, type, location, budget, sort };
  const { data: properties = [], isError } = useQuery({
    queryKey: ["properties", "public", params],
    queryFn: ({ signal }) =>
      api.get("/api/properties", { params, signal }),
    select: (res) => res.data || [],
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  const listing = isError ? [FALLBACK_PROPERTY] : properties;
  const activeFilters = [type, location, budget].filter((value) => value !== "all").length;

  const resetFilters = () => {
    setSearch("");
    setQuery("");
    setType("all");
    setLocation("all");
    setBudget("all");
    setSort("featured");
  };

  const heroImages = listing
    .map((p) => (p.images?.[0]?.url ? displayImage(p.images[0].url) : ""))
    .filter(Boolean)
    .slice(0, 2);
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
            <img
              className="brand-mark"
              src="/images/bhusethu_logo.webp"
              alt=""
              width="42"
              height="42"
            />
            <span className="brand-copy">
              <span className="brand-name">Bhusethu</span>
              <span className="brand-sub">Property Solutions</span>
            </span>
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/#services">Services</Link>
            <Link aria-current="page" to="/properties">
              Properties
            </Link>
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
              <use href="/images/icons.svg#icon-x" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link to="/">Home</Link>
          <Link to="/#services">Services</Link>
          <Link aria-current="page" to="/properties">
            Properties
          </Link>
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
              <use href="/images/icons.svg#icon-phone" />
            </svg>
            <strong>+91 81252 91166</strong>
          </a>
          <a className="contact-line" href="mailto:support@bhusethu.com">
            <svg width="17" height="17" aria-hidden="true">
              <use href="/images/icons.svg#icon-mail" />
            </svg>
            support@bhusethu.com
          </a>
        </div>
      </div>
      <div className="nav-backdrop" hidden></div>

      <main id="main" className="plp">
        <section className="plp-hero">
          <div className="container plp-hero__grid">
            <div className="plp-hero__copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Properties</span>
              </nav>
              <span className="eyebrow">Property discovery</span>
              <h1>Properties worth a closer look.</h1>
              <p className="plp-hero__intro">
                A focused collection of homes and land we currently handle —
                each one reviewed by our team before it reaches you.
              </p>
              <div className="plp-hero__actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setModal("buy")}
                >
                  Share your requirement
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </button>
                <a className="btn btn-outline" href="#how-we-verify">
                  How we verify listings
                </a>
              </div>
              <dl className="plp-stats">
                <div>
                  <dt>Live listings</dt>
                  <dd>{listing.length}</dd>
                </div>
                <div>
                  <dt>Documents checked</dt>
                  <dd>100%</dd>
                </div>
                <div>
                  <dt>Brokerage</dt>
                  <dd>Zero</dd>
                </div>
              </dl>
            </div>

            <div
              className={`plp-hero__media${heroImages.length < 2 ? " plp-hero__media--single" : ""}`}
              aria-hidden="true"
            >
              {heroImages[0] && (
                <figure className="plp-hero__main">
                  <img src={heroImages[0]} alt="" loading="eager" />
                </figure>
              )}
              {heroImages[1] && (
                <figure className="plp-hero__aside">
                  <img src={heroImages[1]} alt="" loading="lazy" />
                </figure>
              )}
              <div className="plp-hero__note">
                <span className="plp-hero__note-icon">
                  <ShieldCheck size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <strong>Documents first</strong>
                  <span>Ownership reviewed before listing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="plp-body" aria-labelledby="listings-title">
          <div className="container">
            <h2 id="listings-title" className="visually-hidden">
              Property listings
            </h2>

            <div className="plp-bar">
              <div className="plp-search">
                <Search size={18} strokeWidth={2} aria-hidden="true" />
                <label className="visually-hidden" htmlFor="property-search">
                  Search properties
                </label>
                <input
                  id="property-search"
                  type="search"
                  placeholder="Search projects or location"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search properties"
                  autoComplete="off"
                />
              </div>
              <div className="plp-bar__actions">
                <button
                  className="plp-filter-btn"
                  type="button"
                  onClick={() => setPanelOpen(true)}
                  aria-expanded={panelOpen}
                  aria-controls="filterPanel"
                >
                  <SlidersHorizontal size={17} strokeWidth={2} aria-hidden="true" />
                  Filters
                  <span className="count" hidden={activeFilters === 0}>
                    {activeFilters}
                  </span>
                </button>
                <div className="plp-sort">
                  <label htmlFor="sort-properties">Sort</label>
                  <select
                    id="sort-properties"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`plp-filter${panelOpen ? " is-open" : ""}`} id="filterPanel">
              <div className="plp-filter__inner">
                <div className="plp-filter__head">
                  <h3>Filter properties</h3>
                  <button
                    className="plp-filter__close"
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    aria-label="Close filters"
                  >
                    <X size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <div className="plp-filter__fields">
                  <div className="plp-field">
                    <label htmlFor="filter-type">Property type</label>
                    <select
                      id="filter-type"
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                    >
                      <option value="all">All types</option>
                      <option value="apartment">Apartment</option>
                      <option value="plot">Plot / land</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="plp-field">
                    <label htmlFor="filter-location">Location</label>
                    <select
                      id="filter-location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    >
                      <option value="all">All locations</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="telangana">Rest of Telangana</option>
                      <option value="andhra-pradesh">Andhra Pradesh</option>
                    </select>
                  </div>
                  <div className="plp-field">
                    <label htmlFor="filter-budget">Budget</label>
                    <select
                      id="filter-budget"
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                    >
                      <option value="all">Any budget</option>
                      <option value="under-1cr">Under ₹1 Cr</option>
                      <option value="1-3cr">₹1 Cr – ₹3 Cr</option>
                      <option value="above-3cr">Above ₹3 Cr</option>
                    </select>
                  </div>
                </div>
                <div className="plp-filter__actions">
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => setPanelOpen(false)}
                  >
                    Apply filters
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div
              className="plp-filter-backdrop"
              onClick={() => setPanelOpen(false)}
              hidden={!panelOpen}
            ></div>

            <div className="plp-meta">
              <p className="plp-meta__count" aria-live="polite">
                {listing.length} {listing.length === 1 ? "property" : "properties"}
              </p>
              <p className="plp-meta__hint">
                <BadgeCheck size={16} strokeWidth={2} aria-hidden="true" />
                Every listing is reviewed by our team
              </p>
            </div>

            <div className="plp-grid">
              {listing.map((property) => {
                const image = property.images?.[0]?.url
                  ? displayImage(property.images[0].url)
                  : "";
                return (
                  <article
                    className="plp-card"
                    key={property.id}
                  >
                    <div className="plp-card__media">
                      {image ? (
                        <img
                          src={image}
                          alt={`${property.title} — ${property.location || "property"}`}
                          width="404"
                          height="312"
                          loading="lazy"
                        />
                      ) : (
                        <span className="plp-card__ph">Photo coming soon</span>
                      )}
                      <div className="plp-card__badges">
                        <span className="plp-tag plp-tag--gold">New launch</span>
                        <span className="plp-tag">Zero brokerage</span>
                      </div>
                    </div>
                    <div className="plp-card__body">
                      <span className="plp-card__type">
                        {property.type || "Property"}
                      </span>
                      <h3>{property.title}</h3>
                      <p className="plp-card__place">
                        <MapPin size={14} strokeWidth={2} aria-hidden="true" />
                        {property.location || "Location on request"}
                      </p>
                      <p className="plp-card__desc">
                        {property.description || "Details shared on request."}
                      </p>
                      <div className="plp-card__foot">
                        <p className="plp-card__price">
                          {property.price || "Price on request"}
                          <small>Guide price</small>
                        </p>
                        <Link
                          className="plp-card__cta"
                          aria-label={`Enquire about ${property.title}`}
                          to="/contact"
                        >
                          Enquire
                          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="plp-empty" hidden={listing.length !== 0}>
              <span className="plp-empty__icon">
                <Search size={22} strokeWidth={2} aria-hidden="true" />
              </span>
              <h3>No properties match those filters.</h3>
              <p>
                Try a wider budget or a different location. We also work with
                off-market options that are not listed here.
              </p>
              <div className="plp-empty__actions">
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  type="button"
                  onClick={() => setModal("buy")}
                >
                  Tell us what you need
                </button>
              </div>
            </div>

            <section className="plp-verify" id="how-we-verify">
              <div className="plp-verify__head">
                <span className="eyebrow">Before it reaches you</span>
                <h2>Listings are reviewed, not just uploaded.</h2>
                <p>
                  We ask for the ownership and approval paperwork before we
                  promote a property. Some details are only shared after a
                  conversation, and we will always tell you what we could — and
                  could not — verify.
                </p>
              </div>
              <div className="plp-verify__grid">
                <div className="plp-principle">
                  <span className="plp-principle__num">01</span>
                  <span className="plp-principle__icon">
                    <FileCheck2 size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3>Ownership check</h3>
                  <p>
                    We look at the chain of title and the seller's authority to
                    transact.
                  </p>
                </div>
                <div className="plp-principle">
                  <span className="plp-principle__num">02</span>
                  <span className="plp-principle__icon">
                    <Eye size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3>Approval review</h3>
                  <p>
                    Relevant sanctions and project details are requested from
                    the seller.
                  </p>
                </div>
                <div className="plp-principle">
                  <span className="plp-principle__num">03</span>
                  <span className="plp-principle__icon">
                    <ShieldCheck size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3>Independent advice</h3>
                  <p>
                    You can commission a full due diligence report before paying
                    a token.
                  </p>
                </div>
              </div>
            </section>

            <aside className="plp-cta">
              <div className="plp-cta__copy">
                <span className="eyebrow">Off-market</span>
                <h2>The right property may not be listed yet.</h2>
                <p>
                  Share your preferred location, budget and configuration. We
                  will search our network and come back with options that fit.
                </p>
              </div>
              <button
                className="btn btn-light"
                type="button"
                onClick={() => setModal("buy")}
              >
                Send your requirement
                <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
              </button>
            </aside>
          </div>
        </section>
      </main>


      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link
                className="brand"
                aria-label="Bhusethu Property Solutions — home"
                to="/"
              >
                <img
                  className="brand-mark"
                  src="/images/bhusethu_logo.webp"
                  alt=""
                  width="42"
                  height="42"
                />
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
                <span style={{ color: "rgba(245,241,232,.6)" }}>
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
            <nav className="footer-col" aria-label="Services">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link to="/services/title-verification">
                    Title verification
                  </Link>
                </li>
                <li>
                  <Link to="/services/dispute-resolution">
                    Dispute resolution
                  </Link>
                </li>
                <li>
                  <Link to="/services/buying-assistance">
                    Buying assistance
                  </Link>
                </li>
                <li>
                  <Link to="/services/selling-assistance">
                    Selling assistance
                  </Link>
                </li>
                <li>
                  <Link to="/services/development">Development</Link>
                </li>
              </ul>
            </nav>
            <div className="footer-col">
              <h4>Visit us</h4>
              <p>
                CoWork Trendz, Capital Park,
                <br />
                Madhapur, Hyderabad,
                <br />
                Telangana 500081
              </p>
              <div className="footer-hours">
                <div>
                  <span>Mon – Fri</span>
                  <span>10:00 – 18:00</span>
                </div>
                <div>
                  <span>Saturday</span>
                  <span>By appointment</span>
                </div>
                <div>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © <span data-year="">2026</span> Bhusethu Property Solutions. All
              rights reserved.
            </p>
            <p>
              <Link to="/privacy">Privacy policy</Link> ·{" "}
              <Link to="/contact">Contact</Link>
            </p>
          </div>
        </div>
      </footer>

      {modal && <EnquiryModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
}
