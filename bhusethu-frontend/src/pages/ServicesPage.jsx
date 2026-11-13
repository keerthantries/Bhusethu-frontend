import SiteFooter from "../components/SiteFooter";
import React from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../data/services";

export default function ServicesPage() {
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
            <Link aria-current="page" to="/services">
              Services
            </Link>
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
          <Link aria-current="page" to="/services">
            Services
          </Link>
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

      <main id="main" className="svc-page">
        <section className="svc-hero">
          <div className="container svc-hero__inner">
            <div className="svc-hero__copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Services</span>
              </nav>
              <span className="eyebrow">What we do</span>
              <h1>
                The right help,
                <span className="svc-hero__accent">at the right moment.</span>
              </h1>
              <p className="svc-hero__intro">
                Property decisions rarely involve just one question. Choose the
                service closest to your situation — we will tell you honestly if
                you need something else.
              </p>
              <div className="svc-hero__actions">
                <Link className="btn btn-primary" to="/contact">
                  Book a consultation
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-arrow-right" />
                  </svg>
                </Link>
                <a className="btn btn-outline" href="tel:+918125291166">
                  +91 81252 91166
                </a>
              </div>
              <ul className="svc-hero__trust">
                <li>Independent advice</li>
                <li>Telangana &amp; Andhra Pradesh</li>
                <li>Written findings</li>
              </ul>
            </div>

            <nav className="svc-index" aria-label="All services">
              <div className="svc-index__head">
                <span>All services</span>
                <span className="svc-index__count">
                  {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>
              <ul>
                {SERVICES.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.slug}>
                      <a href={`#${service.slug}`}>
                        <span className="svc-index__num">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="svc-index__icon">
                          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <span className="svc-index__label">{service.nav}</span>
                        <svg
                          className="svc-index__arrow"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </section>

        <section className="svc-list" aria-labelledby="svc-list-title">
          <div className="container">
            <div className="svc-list__head">
              <div>
                <span className="eyebrow">Our services</span>
                <h2 id="svc-list-title">
                  Six ways we help with property.
                </h2>
              </div>
              <p className="svc-list__intro">
                Every engagement starts with the documents you already have and
                ends with a clear view of the risks, the options and the next
                step.
              </p>
            </div>

            <div className="svc-grid">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className="svc-card"
                    id={service.slug}
                    key={service.slug}
                  >
                    <div className="svc-card__top">
                      <span className="svc-card__icon">
                        <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="svc-card__num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>{service.title}</h3>
                    <p className="svc-card__summary">{service.summary}</p>
                    <ul className="svc-card__tags">
                      {service.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <Link className="svc-card__link" to={`/services/${service.slug}`}>
                      Explore service
                      <svg aria-hidden="true">
                        <use href="images/icons.svg#icon-arrow-right" />
                      </svg>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="svc-steps" aria-labelledby="svc-steps-title">
          <div className="container">
            <div className="svc-steps__head">
              <span className="eyebrow">How it works</span>
              <h2 id="svc-steps-title">Simple, documented, unhurried.</h2>
            </div>
            <ol className="svc-steps__list">
              <li>
                <span>01</span>
                <h3>Share the details</h3>
                <p>
                  Tell us the property and send the documents you already have.
                </p>
              </li>
              <li>
                <span>02</span>
                <h3>We review the records</h3>
                <p>
                  Ownership, approvals and site checks — with findings explained
                  in plain language.
                </p>
              </li>
              <li>
                <span>03</span>
                <h3>You decide with clarity</h3>
                <p>
                  A written view of the risks, the options and the next step
                  before money moves.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="svc-cta">
          <div className="container svc-cta__inner">
            <div>
              <span className="eyebrow">Not sure where to start?</span>
              <h2>Tell us the situation.</h2>
              <p>
                We will point you to the right service — and tell you if you do
                not need one yet.
              </p>
            </div>
            <div className="svc-cta__actions">
              <Link className="btn btn-light" to="/contact">
                Book a consultation
                <svg aria-hidden="true">
                  <use href="images/icons.svg#icon-arrow-right" />
                </svg>
              </Link>
              <a className="btn btn-outline-light" href="tel:+918125291166">
                Call +91 81252 91166
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
