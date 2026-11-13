import SiteFooter from "../components/SiteFooter";
import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
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
            <Link aria-current="page" to="/about">
              About
            </Link>
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
          <Link aria-current="page" to="/about">
            About
          </Link>
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
        <section className="ab-hero">
          <div className="container ab-hero__grid">
            <div className="ab-hero__copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">About</span>
              </nav>
              <span className="eyebrow">About Bhusethu</span>
              <h1>Property decisions are personal. We treat them that way.</h1>
              <p className="ab-hero__intro">
                We are the people you call when the paperwork is confusing, the
                seller is rushing you, or the land your family has owned for
                years suddenly has a problem. Our job is simple: find the truth
                early, explain it plainly, and help you decide with confidence.
              </p>
              <div className="ab-hero__actions">
                <Link className="btn btn-primary" to="/contact#send-message">
                  Tell us about your property
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-arrow-right" />
                  </svg>
                </Link>
                <Link className="btn btn-outline" to="/services">
                  Explore our services
                </Link>
              </div>
            </div>

            <div className="ab-hero__visual">
              <img
                src="images/about_us.png"
                alt="Bhusethu advisors reviewing a property plan with the Hyderabad skyline behind them"
                width="1024"
                height="1024"
              />
              <span className="ab-hero__tag">Madhapur, Hyderabad</span>
              <div className="ab-hero__card">
                <strong>10+</strong>
                <span>years helping families decide with confidence</span>
              </div>
            </div>
          </div>

          <div className="container ab-hero__stats">
            <div>
              <strong>100+</strong>
              <span>properties transacted</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>title issues cleared</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>clients across TG &amp; AP</span>
            </div>
          </div>
        </section>

        <section className="ab-manifesto">
          <div className="container">
            <span className="eyebrow">What we believe</span>
            <p>
              Most property problems are not property problems. They are{" "}
              <em>information problems.</em> Clear information changes the
              decision.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="ab-head">
              <span className="eyebrow">Our story</span>
              <h2>We started by answering one question honestly.</h2>
              <p>
                “Can you just check if this is safe to buy?” We kept hearing it
                — from first-time buyers, from families dividing ancestral land,
                and from NRIs trying to trust a deal from another continent.
              </p>
            </div>

            <div className="ab-chapters">
              <article className="ab-chapter">
                <span className="ab-chapter__num">01</span>
                <h3>The question</h3>
                <p>
                  People did not want another broker. They wanted someone to
                  read the documents, visit the site and tell them the truth —
                  even when the truth was “wait”.
                </p>
              </article>
              <article className="ab-chapter">
                <span className="ab-chapter__num">02</span>
                <h3>The work</h3>
                <p>
                  So we started with title verification and due diligence, the
                  unglamorous work where small details carry the biggest
                  consequences. We built our name on being willing to say no.
                </p>
              </article>
              <article className="ab-chapter">
                <span className="ab-chapter__num">03</span>
                <h3>The relationship</h3>
                <p>
                  One decision led to the next: the purchase, the sale, the
                  construction, the years of ownership that follow. Clients
                  stayed because the advice stayed honest.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section ab-process-section">
          <div className="container">
            <div className="ab-head ab-head--row">
              <div>
                <span className="eyebrow">How it works</span>
                <h2>Three steps. No guesswork.</h2>
              </div>
              <p>
                We keep the process simple so you always know where things stand
                and what happens next.
              </p>
            </div>
            <ol className="ab-process">
              <li>
                <span className="ab-process__num">01</span>
                <div>
                  <h3>Tell us what you are facing</h3>
                  <p>
                    A short call to understand the property, the documents and
                    your timeline. No sales pitch.
                  </p>
                </div>
              </li>
              <li>
                <span className="ab-process__num">02</span>
                <div>
                  <h3>We check and explain</h3>
                  <p>
                    We review the records, inspect the site and put the risks in
                    writing — in language you can use.
                  </p>
                </div>
              </li>
              <li>
                <span className="ab-process__num">03</span>
                <div>
                  <h3>You decide with confidence</h3>
                  <p>
                    Proceed, renegotiate or walk away. The decision stays yours,
                    and we stay reachable until it is made.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section section--ivory-deep">
          <div className="container ab-values">
            <div className="ab-values__media">
              <img
                src="images/contact.png"
                alt="A property advisor explaining documents to a client"
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>
            <div className="ab-values__copy">
              <span className="eyebrow">The Bhusethu way</span>
              <h2>Documents first. Plain answers. No pressure.</h2>
              <p>
                We start with the paperwork because that is where most avoidable
                problems live. From there, we look at the site, the commercial
                terms and what you actually need.
              </p>
              <ul className="check-list">
                <li>
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-check-circle" />
                  </svg>
                  <div>
                    <strong>A written view of the risks</strong>
                    <span>
                      Not a verbal reassurance. You get findings you can share
                      with your family or advocate.
                    </span>
                  </div>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-check-circle" />
                  </svg>
                  <div>
                    <strong>One point of contact</strong>
                    <span>
                      The person who understands your file stays with it from
                      enquiry to closure.
                    </span>
                  </div>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-check-circle" />
                  </svg>
                  <div>
                    <strong>Clear scope and fees</strong>
                    <span>
                      We agree what is included before work begins. No surprises
                      at the end.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="ab-head">
              <span className="eyebrow">Who we help</span>
              <h2>Different people. The same need for clarity.</h2>
              <p>
                Most of our clients are not property experts. They are people
                making one of the biggest decisions of their lives — and they
                want someone honest in their corner.
              </p>
            </div>
            <div className="ab-people">
              <article className="ab-person">
                <span className="ab-person__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-home" />
                  </svg>
                </span>
                <h3>Families buying a home</h3>
                <p>
                  You have found a property you love but the documents are hard
                  to read. We check the title, approvals and risks before you
                  commit.
                </p>
              </article>
              <article className="ab-person">
                <span className="ab-person__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-map-pin" />
                  </svg>
                </span>
                <h3>NRIs and out-of-town owners</h3>
                <p>
                  You cannot visit every site or stand in every queue. We become
                  your eyes on the ground and report back in a way you can act
                  on.
                </p>
              </article>
              <article className="ab-person">
                <span className="ab-person__icon">
                  <svg aria-hidden="true">
                    <use href="images/icons.svg#icon-clock" />
                  </svg>
                </span>
                <h3>Owners and developers</h3>
                <p>
                  You need a transaction to move without surprises. We handle
                  the checks, coordination and paperwork so decisions are not
                  delayed.
                </p>
              </article>
            </div>
            <p className="ab-people__foot">
              Wherever you are in the journey, the first step is the same:{" "}
              <Link to="/contact#send-message">
                tell us what you are facing
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="section section--dark">
          <div className="container">
            <div className="section-head" style={{ marginBottom: "0" }}>
              <div>
                <span className="eyebrow">Your next step</span>
                <h2 style={{ marginTop: ".8rem", maxWidth: "19ch" }}>
                  Tell us the property. We will tell you what we see.
                </h2>
              </div>
              <div>
                <p className="section-head__intro">
                  No pressure and no obligation. A short conversation will tell
                  you whether you need help, what kind, and what it should cost.
                  If we are not the right fit, we will say so.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".65rem",
                    marginTop: "1rem",
                  }}
                >
                  <Link className="btn btn-light" to="/contact#send-message">
                    Start a conversation
                    <svg aria-hidden="true">
                      <use href="images/icons.svg#icon-arrow-right" />
                    </svg>
                  </Link>
                  <Link className="btn btn-outline-light" to="/properties">
                    Browse properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
