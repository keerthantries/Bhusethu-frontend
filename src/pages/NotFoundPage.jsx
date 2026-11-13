import SiteFooter from "../components/SiteFooter";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-bar">
          <Link
            className="brand"
            aria-label="Bhusethu Property Solutions - home"
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
            <Link to="/properties">Properties</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="page-hero nf-page">
          <div className="container">
            <span className="eyebrow">404 - Page not found</span>
            <h1>This page has moved or never existed.</h1>
            <p className="page-hero__intro">
              The link may be out of date. Browse our verified listings or talk
              to an advisor and we will point you in the right direction.
            </p>
            <div className="page-hero__actions">
              <Link className="btn btn-primary" to="/properties">
                View properties
              </Link>
              <Link className="btn btn-outline" to="/contact">
                Talk to an advisor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
