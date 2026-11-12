import React from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";
import PhoneField from "../components/PhoneField";
import { submitEnquiry, resetEnquiry } from "../enquirySubmit";

export default function ContactPage() {
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
            <Link to="/properties">Properties</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link aria-current="page" to="/contact">
              Contact
            </Link>
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
          <Link to="/">Home</Link>
          <Link to="/#services">Services</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link aria-current="page" to="/contact">
            Contact
          </Link>
        </nav>
        <div className="mobile-nav-foot">
          <a className="btn btn-primary btn-block" href="tel:+918125291166">
            Call +91 81252 91166
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
        <section className="contact-hero">
          <div className="container contact-hero__grid">
            <div className="contact-hero__intro">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Contact</span>
              </nav>
              <span className="eyebrow">Contact us</span>
              <h1>Start with a conversation.</h1>
              <p className="page-hero__intro">
                Tell us about the property or the problem. A property advisor
                will respond — usually within one working day. There is no
                obligation to proceed.
              </p>
              <ul className="contact-quick">
                <li>
                  <span className="contact-quick__icon">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-phone" />
                    </svg>
                  </span>
                  <div>
                    <strong>Call us</strong>
                    <a href="tel:+918125291166">+91 81252 91166</a>
                  </div>
                </li>
                <li>
                  <span className="contact-quick__icon">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-mail" />
                    </svg>
                  </span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:support@bhusethu.com">
                      support@bhusethu.com
                    </a>
                  </div>
                </li>
                <li>
                  <span className="contact-quick__icon">
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-map-pin" />
                    </svg>
                  </span>
                  <div>
                    <strong>Office</strong>
                    <span>Madhapur, Hyderabad</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-form-card" id="send-message">
              <h2 className="form-card__title" style={{ fontSize: "1.8rem" }}>
                Send us a message
              </h2>
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
                    <label htmlFor="contact-name">Full name *</label>
                    <input
                      id="contact-name"
                      name="client_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <PhoneField id="contact-phone" />
                  <div className="field">
                    <label htmlFor="contact-email">Email address *</label>
                    <input
                      id="contact-email"
                      name="client_email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                      title="Enter a valid email address"
                      maxLength="254"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-service">How can we help? *</label>
                    <select
                      id="contact-service"
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
                      <option value="advertising">Property advertising</option>
                      <option value="property_enquiry">
                        Enquiry about a listed property
                      </option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div className="field field--full">
                    <label htmlFor="contact-message">
                      Property details or your question{" "}
                      <span className="optional">(optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="client_message"
                      placeholder="Location, property type, budget, or the issue you are facing"
                    ></textarea>
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
                  <button className="btn btn-primary" type="submit">
                    Send my enquiry
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-arrow-right" />
                    </svg>
                  </button>
                </div>
                <p className="form-note">
                  By sending this enquiry you agree to be contacted about your
                  request. We do not share your details with third parties.{" "}
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
                  urgent, call{" "}
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

        <section className="contact-details">
          <div className="container contact-details__grid">
            <aside className="contact-info">
              <div className="contact-card">
                <span className="contact-card__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-phone" />
                  </svg>
                </span>
                <h3>Call us</h3>
                <a href="tel:+918125291166">+91 81252 91166</a>
                <p className="muted-line">Mon – Fri, 10:00 – 18:00</p>
              </div>

              <div className="contact-card">
                <span className="contact-card__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-mail" />
                  </svg>
                </span>
                <h3>Email</h3>
                <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
                <p className="muted-line">
                  For documents, referrals and general enquiries
                </p>
              </div>

              <div className="contact-card">
                <span className="contact-card__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-map-pin" />
                  </svg>
                </span>
                <h3>Office</h3>
                <p>
                  CoWork Trendz, Capital Park, Madhapur, Hyderabad, Telangana
                  500081
                </p>
                <a
                  className="muted-line"
                  href={
                    "https://www.google.com/maps/search/?api=1&query=CoWork+Trendz+Capital+Park+Madhapur+Hyderabad"
                  }
                  target="_blank"
                  rel="noopener"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="contact-card">
                <span className="contact-card__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-clock" />
                  </svg>
                </span>
                <h3>Consultation hours</h3>
                <div className="hours-list">
                  <div>
                    <span>Monday – Friday</span>
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
            </aside>

            <div className="map-wrap">
              <iframe
                src={
                  "https://www.google.com/maps?q=CoWork+Trendz+Capital+Park+Madhapur+Hyderabad&output=embed"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhusethu office location in Madhapur, Hyderabad"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="section section--ivory-deep section--tight">
          <div className="container">
            <div className="section-head" style={{ marginBottom: "1.5rem" }}>
              <div>
                <span className="eyebrow">What happens next</span>
                <h2
                  style={{
                    marginTop: ".8rem",
                    maxWidth: "19ch",
                    fontSize: "clamp(1.8rem, 1.5rem + 1.4vw, 2.5rem)",
                  }}
                >
                  A short, useful first call.
                </h2>
              </div>
              <div>
                <p className="section-head__intro">
                  We will ask what the property is, what you are trying to do
                  and what you already have. If we can help, we will explain
                  how. If we cannot, we will tell you that too.
                </p>
              </div>
            </div>
            <ol className="steps">
              <li className="step">
                <span className="step__num">01</span>
                <h3>We listen</h3>
                <p>
                  A focused call to understand the property, the documents and
                  your timeline.
                </p>
              </li>
              <li className="step">
                <span className="step__num">02</span>
                <h3>We scope</h3>
                <p>
                  You receive a clear view of what needs checking and what it
                  will involve.
                </p>
              </li>
              <li className="step">
                <span className="step__num">03</span>
                <h3>You decide</h3>
                <p>
                  No pressure and no obligation. Proceed only when the scope
                  makes sense to you.
                </p>
              </li>
            </ol>
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
    </>
  );
}
