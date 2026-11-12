import React from 'react'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  return (
    <>

  <a className="skip-link" href="#main">Skip to content</a>

  <header className="site-header">
    <div className="container header-bar">
      <Link className="brand" aria-label="Bhusethu Property Solutions — home" to="/">
        <img className="brand-mark" src="/images/bhusethu_logo.webp" alt="" width="42" height="42" />
        <span className="brand-copy"><span className="brand-name">Bhusethu</span><span className="brand-sub">Property Solutions</span></span>
      </Link>
      <nav className="primary-nav" aria-label="Primary">
        <Link to="/">Home</Link>
        <Link aria-current="page" to="/#services">Services</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-cta">
        <Link className="btn btn-primary btn-sm header-btn" to="/contact"><span className="short">Enquire</span><span className="long">Book a consultation</span></Link>
        <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><span></span><span></span></button>
      </div>
    </div>
  </header>

  <div className="mobile-nav" id="mobileNav" hidden>
    <div className="mobile-nav-head">
      <span className="brand-name">Bhusethu</span>
      <button className="mobile-close" type="button" aria-label="Close menu"><svg width="20" height="20" aria-hidden="true"><use href="images/icons.svg#icon-x" /></svg></button>
    </div>
    <nav aria-label="Mobile">
      <Link to="/">Home</Link>
      <Link aria-current="page" to="/#services">Services</Link>
      <Link to="/properties">Properties</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <div className="mobile-nav-foot">
      <Link className="btn btn-primary btn-block" to="/contact">Book a consultation</Link>
      <a className="contact-line" href="tel:+918125291166"><svg width="17" height="17" aria-hidden="true"><use href="images/icons.svg#icon-phone" /></svg><strong>+91 81252 91166</strong></a>
      <a className="contact-line" href="mailto:support@bhusethu.com"><svg width="17" height="17" aria-hidden="true"><use href="images/icons.svg#icon-mail" /></svg>support@bhusethu.com</a>
    </div>
  </div>
  <div className="nav-backdrop" hidden></div>

  <main id="main">
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span>
        </nav>
        <span className="eyebrow">What we do</span>
        <h1>The right help, at the right moment.</h1>
        <p className="page-hero__intro">Property decisions rarely involve just one question. Start with the service closest to your situation — we will tell you honestly if you need something else.</p>
        <nav className="anchor-nav" aria-label="Services on this page">
          <a href="#title-verification">Title verification</a>
          <a href="#dispute-resolution">Disputes</a>
          <a href="#buying-assistance">Buying</a>
          <a href="#selling-assistance">Selling</a>
          <a href="#property-management">Management</a>
          <a href="#development">Development</a>
          <a href="#advertising">Advertising</a>
        </nav>
      </div>
    </section>

    <section className="service-block" id="title-verification">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">01 · Verify</span>
          <h2>Title verification & due diligence</h2>
          <p>An independent check of the property's ownership, records and approvals — carried out before you pay a token, sign an agreement or release funds.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/title-verification">Request a title check
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>First-time buyers who want to understand what they are signing.</li>
              <li>NRI and out-of-state investors buying without regular site access.</li>
              <li>Sellers preparing a clean document set before listing.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Chain of title and seller / developer authority.</li>
              <li>Encumbrance certificate and revenue records.</li>
              <li>Survey numbers, boundaries and extent reconciliation.</li>
              <li>Approval and agreement review, with findings explained in plain language.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>Share the property details and available documents.</li>
              <li>We review records and, where needed, inspect the site.</li>
              <li>You receive a written view of the risks and next steps.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="dispute-resolution">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">02 · Resolve</span>
          <h2>Property dispute resolution</h2>
          <p>Clear, practical support when ownership, inheritance, boundaries or missing records stand between you and a usable property.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/dispute-resolution">Discuss your issue
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>Families dealing with inheritance or partition of land.</li>
              <li>Landowners facing boundary or encroachment concerns.</li>
              <li>Buyers who discover a problem after agreeing to purchase.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Case review and a clear map of the documents involved.</li>
              <li>Retrieval of missing revenue records such as ROR and EC.</li>
              <li>A practical resolution path — negotiation, correction or escalation.</li>
              <li>Coordination with your advocate where litigation is involved.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>We listen first, then review the papers you have.</li>
              <li>We establish what the records show — and what is missing.</li>
              <li>You get a documented strategy before any formal step is taken.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="buying-assistance">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">03 · Buy</span>
          <h2>Property buying assistance</h2>
          <p>From the first shortlist to registration, we act on the buyer's side — checking the property, testing the price and protecting your terms.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/buying-assistance">Start your search
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>Buyers who want verified options rather than endless listings.</li>
              <li>Investors comparing locations, builders and payment plans.</li>
              <li>NRI buyers who need someone reliable on the ground.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Requirement brief, shortlist and accompanied site visits.</li>
              <li>Fair-market view and negotiation support.</li>
              <li>Due diligence before the token or agreement.</li>
              <li>Coordination through registration and handover.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>We define the brief: location, budget, use and timeline.</li>
              <li>We shortlist and verify before you visit.</li>
              <li>We negotiate and coordinate the transaction to closing.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="selling-assistance">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">04 · Sell</span>
          <h2>Property selling & marketing</h2>
          <p>A structured sale process that starts with document readiness and pricing, not just an advertisement.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/selling-assistance">List your property
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>Owners who need a realistic price and a serious buyer.</li>
              <li>Families selling inherited or jointly owned property.</li>
              <li>NRI owners unable to manage viewings and paperwork remotely.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Document readiness check before the property is shown.</li>
              <li>Pricing guidance grounded in the local market.</li>
              <li>Access to a verified buyer network and qualified viewings.</li>
              <li>Negotiation, registration and handover coordination.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>We review the property and the papers.</li>
              <li>We agree a pricing and presentation strategy.</li>
              <li>We introduce qualified buyers and manage the closing.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="property-management">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">05 · Manage</span>
          <h2>Property management</h2>
          <p>Keep a vacant plot, farmland or home secure and productive — whether you live nearby or on another continent.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/property-management">Discuss management
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>NRI owners with property in Telangana or Andhra Pradesh.</li>
              <li>Landowners with vacant plots or farmland.</li>
              <li>Owners who want help leasing and maintaining a home.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Periodic site checks and condition reporting.</li>
              <li>Coordination of maintenance, repairs and utilities.</li>
              <li>Leasing support and tenant coordination.</li>
              <li>Document and record organisation.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>We inspect and document the property's current state.</li>
              <li>We agree a management scope and reporting rhythm.</li>
              <li>You receive updates and approvals stay in your hands.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="development">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">06 · Build</span>
          <h2>Development & construction</h2>
          <p>Project support for landowners and developers — from feasibility and approvals through construction coordination and handover.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/services/development">Discuss a project
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>Landowners exploring a joint development or self-build.</li>
              <li>Developers who need local coordination on the ground.</li>
              <li>Societies and institutions planning a property upgrade.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Site and feasibility review before design is finalised.</li>
              <li>Coordination of regulatory and local approvals.</li>
              <li>Construction planning, vendor coordination and progress checks.</li>
              <li>Quality reviews and handover support.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>Understand the land, permissions and commercial goal.</li>
              <li>Build a realistic plan with approvals and milestones.</li>
              <li>Coordinate delivery and keep you informed at each stage.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="service-block" id="advertising">
      <div className="container service-block__grid">
        <div className="service-block__intro">
          <span className="eyebrow">07 · Advertise</span>
          <h2>Property advertising</h2>
          <p>Put your land, apartment or project in front of buyers who are already looking — with a clear, credible presentation.</p>
          <div className="service-block__cta">
            <Link className="btn btn-primary btn-sm" to="/contact?service=advertising">Promote your property
              <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </div>
        <div className="service-block__body">
          <div>
            <h3>Who it helps</h3>
            <ul>
              <li>Owners who need visibility beyond their own network.</li>
              <li>Developers launching a new project.</li>
              <li>Sellers who want qualified enquiries, not raw clicks.</li>
            </ul>
          </div>
          <div>
            <h3>What is included</h3>
            <ul>
              <li>Target audience and positioning discussion.</li>
              <li>Listing copy and visual presentation review.</li>
              <li>Placement across relevant digital property channels.</li>
              <li>Enquiry handling and follow-up coordination.</li>
            </ul>
          </div>
          <div>
            <h3>How it works</h3>
            <ol className="service-block__process">
              <li>We agree the audience and the property's strongest story.</li>
              <li>We prepare and place the listing.</li>
              <li>We track responses and connect genuine buyers to you.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="section section--dark">
      <div className="container">
        <div className="section-head" style={{ marginBottom: "1.5rem" }}>
          <div>
            <span className="eyebrow">Not sure where to start?</span>
            <h2 style={{ marginTop: ".8rem", maxWidth: "18ch" }}>Tell us the situation. We will point you to the right service.</h2>
          </div>
          <div>
            <p className="section-head__intro">A short conversation is usually enough to work out what the property needs — and what it does not.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".65rem", marginTop: "1rem" }}>
              <Link className="btn btn-light" to="/contact">Book a consultation
                <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
              </Link>
              <a className="btn btn-outline-light" href="tel:+918125291166">Call +91 81252 91166</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer className="site-footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand" aria-label="Bhusethu Property Solutions — home" to="/">
            <img className="brand-mark" src="/images/bhusethu_logo.webp" alt="" width="42" height="42" />
            <span className="brand-copy"><span className="brand-name">Bhusethu</span><span className="brand-sub">Property Solutions</span></span>
          </Link>
          <p>Property verification, advisory and transaction support across Telangana and Andhra Pradesh.</p>
          <div className="footer-contact">
            <a href="tel:+918125291166">+91 81252 91166</a>
            <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
            <span style={{ color: "rgba(245,241,232,.6)" }}>CoWork Trendz, Capital Park, Madhapur, Hyderabad</span>
          </div>
        </div>
        <nav className="footer-col" aria-label="Explore">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Services">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services/title-verification">Title verification</Link></li>
            <li><Link to="/services/dispute-resolution">Dispute resolution</Link></li>
            <li><Link to="/services/buying-assistance">Buying assistance</Link></li>
            <li><Link to="/services/selling-assistance">Selling assistance</Link></li>
            <li><Link to="/services/development">Development</Link></li>
          </ul>
        </nav>
        <div className="footer-col">
          <h4>Visit us</h4>
          <p>CoWork Trendz, Capital Park,<br />Madhapur, Hyderabad,<br />Telangana 500081</p>
          <div className="footer-hours">
            <div><span>Mon – Fri</span><span>10:00 – 18:00</span></div>
            <div><span>Saturday</span><span>By appointment</span></div>
            <div><span>Sunday</span><span>Closed</span></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© <span data-year="">2026</span> Bhusethu Property Solutions. All rights reserved.</p>
        <p><Link to="/privacy">Privacy policy</Link> · <Link to="/contact">Contact</Link></p>
      </div>
    </div>
  </footer>

  

    </>
  )
}
