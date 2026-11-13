import SiteFooter from "../components/SiteFooter";
import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
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
              src="/images/bhusethu_logo.png"
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
            <Link to="/services">Services</Link>
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
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
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
        </div>
      </div>
      <div className="nav-backdrop" hidden></div>

      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Privacy policy</span>
            </nav>
            <span className="eyebrow">Legal</span>
            <h1>Privacy policy</h1>
            <p className="page-hero__intro">
              This policy explains what information Bhusethu Property Solutions
              collects through this website and how it is used.
            </p>
          </div>
        </section>

        <div className="container">
          <div className="prose">
            <p>
              <strong>Last updated:</strong> October 2026
            </p>

            <h2>Information we collect</h2>
            <p>
              When you submit an enquiry, we collect the details you choose to
              provide — typically your name, phone number, email address, the
              service you are interested in and a description of your
              requirement. We also receive the technical response from the
              spam-protection check on the form.
            </p>
            <p>
              We do not ask for property documents or financial information
              through this website. If a matter requires documents, our team
              will tell you how to share them securely.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry and understand what you need.</li>
              <li>
                To arrange a consultation or share property details you have
                requested.
              </li>
              <li>
                To keep a record of our communication and the advice provided.
              </li>
              <li>To protect the website and our team from spam or misuse.</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We may share limited
              details with a colleague or professional partner directly involved
              in handling your request, and only where that is necessary to
              respond. We may also disclose information where required by law.
            </p>

            <h2>Form processing and cookies</h2>
            <p>
              Enquiries are submitted to a Google Apps Script endpoint and may
              be recorded in a Google Workspace account operated by Bhusethu.
              The form also uses Cloudflare Turnstile, which may set technical
              cookies or process signals to distinguish people from automated
              submissions. We do not use advertising or analytics cookies on
              this website.
            </p>

            <h2>Retention</h2>
            <p>
              We keep enquiry records only for as long as they are needed for
              the purpose above, for our professional records, or as required by
              applicable law.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to correct or delete the personal information you
              have shared, or ask what we hold, by writing to{" "}
              <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>. If
              you no longer wish to be contacted, tell us and we will stop.
            </p>

            <h2>Contact</h2>
            <p>
              Bhusethu Property Solutions
              <br />
              CoWork Trendz, Capital Park, Madhapur, Hyderabad, Telangana 500081
              <br />
              <a href="tel:+918125291166">+91 81252 91166</a> ·{" "}
              <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
            </p>

            <p>
              <Link to="/contact">Return to contact</Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
