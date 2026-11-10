import React from 'react'
import { Link } from 'react-router-dom'
import PhoneField from '../components/PhoneField'
import { API_BASE } from '../api'

export default function PropertyTridasaRisePage() {
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
        <Link to="/#services">Services</Link>
        <Link aria-current="page" to="/properties">Properties</Link>
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
      <Link to="/#services">Services</Link>
      <Link aria-current="page" to="/properties">Properties</Link>
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
    <div className="container" style={{ paddingTop: "1.25rem" }}>
      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}>
        <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/properties">Properties</Link><span aria-hidden="true">/</span><span aria-current="page">Tridasa Rise</span>
      </nav>
    </div>

    <div className="container detail-layout">
      <div className="detail-main">
        <div className="gallery">
          <div className="gallery__main" data-gallery-main="" tabIndex="0" role="button" aria-label="Open Tridasa Rise images in a larger view">
            <img src="images/properties/bulding2.webp" alt="Tridasa Rise residential towers in Nallagandla, Hyderabad" width="404" height="312" />
          </div>
          <div className="gallery__thumbs" aria-label="Property images">
            <button className="gallery__thumb is-active" type="button" data-gallery-thumb="" data-src="images/properties/bulding2.webp" data-alt="Tridasa Rise residential towers in Nallagandla, Hyderabad" aria-label="View tower elevation">
              <img src="images/properties/bulding2.webp" alt="" width="404" height="312" loading="lazy" />
            </button>
            <button className="gallery__thumb" type="button" data-gallery-thumb="" data-src="images/properties/bulding1.jpg" data-alt="Tridasa Rise site entrance with flags and landscaped approach" aria-label="View site entrance">
              <img src="images/properties/bulding1.jpg" alt="" width="1092" height="540" loading="lazy" />
            </button>
          </div>
        </div>

        <div className="detail-head">
          <div className="detail-badges">
            <span className="badge badge--gold">New launch</span>
            <span className="badge">Zero brokerage</span>
            <span className="badge">RERA details on request</span>
          </div>
          <h1>Tridasa Rise</h1>
          <p className="property-meta"><svg aria-hidden="true"><use href="images/icons.svg#icon-map-pin" /></svg>Nallagandla, Hyderabad, Telangana</p>
          <div className="detail-price">₹1.38 Cr onwards<small>3 BHK ₹1.38 – ₹1.70 Cr · 4 BHK ₹2.22 Cr</small></div>
        </div>

        <section className="detail-section" aria-labelledby="overview-title">
          <h2 id="overview-title">Overview</h2>
          <p>A new residential launch by Tridasa Realty Ventures in Nallagandla, offering 3 and 4 BHK apartments. Pricing starts at ₹1.38 Cr for 3 BHK homes, with completion indicated for December 2028.</p>
          <p>Bhusethu can help you review the project documents, compare the available configurations and understand the payment terms before you commit. Ask us for the current price sheet and approval set.</p>
        </section>

        <section className="detail-section" aria-labelledby="facts-title">
          <h2 id="facts-title">Project facts</h2>
          <dl className="fact-grid">
            <div className="fact"><dt>Configuration</dt><dd>3 & 4 BHK apartments</dd></div>
            <div className="fact"><dt>Project type</dt><dd>Residential apartments</dd></div>
            <div className="fact"><dt>Status</dt><dd>New launch</dd></div>
            <div className="fact"><dt>Completion</dt><dd>December 2028</dd></div>
            <div className="fact"><dt>Builder</dt><dd>Tridasa Realty Ventures</dd></div>
            <div className="fact"><dt>Location</dt><dd>Nallagandla, Hyderabad</dd></div>
            <div className="fact"><dt>Price</dt><dd>₹1.38 Cr onwards</dd></div>
            <div className="fact"><dt>Brokerage</dt><dd>Zero brokerage</dd></div>
          </dl>
          <p style={{ marginTop: ".85rem", fontSize: ".78rem" }}>Prices, configurations and timelines are provided by the developer and may change. Please confirm current availability with our team.</p>
        </section>

        <section className="detail-section" aria-labelledby="checks-title">
          <h2 id="checks-title">What we can check for you</h2>
          <ul className="amenity-list">
            <li><svg aria-hidden="true"><use href="images/icons.svg#icon-check-circle" /></svg>Chain of title and seller / developer authority</li>
            <li><svg aria-hidden="true"><use href="images/icons.svg#icon-check-circle" /></svg>Encumbrance certificate and revenue records</li>
            <li><svg aria-hidden="true"><use href="images/icons.svg#icon-check-circle" /></svg>RERA registration and project approval documents</li>
            <li><svg aria-hidden="true"><use href="images/icons.svg#icon-check-circle" /></svg>Builder track record and delivery history</li>
            <li><svg aria-hidden="true"><use href="images/icons.svg#icon-check-circle" /></svg>Agreement review before you sign or pay a token</li>
          </ul>
          <div style={{ marginTop: "1.25rem" }}>
            <Link className="link-arrow" to="/services/title-verification">How title verification works <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg></Link>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="location-title">
          <h2 id="location-title">Location</h2>
          <p>Nallagandla is a residential neighbourhood in western Hyderabad, close to the city's IT and financial districts. <a href={"https://www.google.com/maps/search/?api=1&query=Tridasa+Rise+Nallagandla+Hyderabad"} target="_blank" rel="noopener" style={{ color: "var(--green)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Open in Google Maps</a>.</p>
          <div className="map-wrap" style={{ height: "280px", marginTop: "1rem" }}>
            <iframe src={"https://www.google.com/maps?q=Nallagandla,Hyderabad,Telangana&output=embed"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map showing Nallagandla, Hyderabad"></iframe>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="approvals-title">
          <h2 id="approvals-title">Approvals</h2>
          <p>The project is presented as RERA-registered. We recommend reviewing the current registration, sanctioned plans and relevant local approvals before booking. Ask us for the latest document set and we will help you go through it.</p>
        </section>
      </div>

      <aside className="detail-aside" id="property-enquiry">
        <div className="aside-card">
          <h2>Enquire about Tridasa Rise</h2>
          <p>Request the price sheet, floor plans and approval documents. A property advisor will call you back.</p>
          <form action={`${API_BASE}/api/contact`} method="POST" data-enquiry-form="" noValidate>
            <input type="hidden" name="service_type" value="property_enquiry" />
            <input type="hidden" name="property" value="Tridasa Rise" data-property-field="" />
            <div className="form-grid">
              <div className="field">
                <label htmlFor="pd-name">Full name *</label>
                <input id="pd-name" name="client_name" type="text" autoComplete="name" placeholder="Your name" required />
              </div>
              <PhoneField id="pd-phone" />
              <div className="field">
                <label htmlFor="pd-email">Email <span className="optional">(optional)</span></label>
                <input id="pd-email" name="client_email" type="email" autoComplete="email" placeholder="you@example.com" pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}" title="Enter a valid email address" maxLength="254" />
              </div>
              <div className="field">
                <label htmlFor="pd-message">Message <span className="optional">(optional)</span></label>
                <textarea id="pd-message" name="client_message" placeholder="Configuration or questions"></textarea>
              </div>
            </div>
            <div className="cf-turnstile" data-sitekey="0x4AAAAAAB_JtYwMFieSAtdO" data-theme="light" data-size="flexible"></div>
            <div className="form-alert" data-form-alert="" role="alert" aria-live="polite" hidden></div>
            <div className="form-actions">
              <button className="btn btn-primary btn-block" type="submit">Request details
                <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
              </button>
            </div>
            <p className="form-note">We do not share your details with third parties. <Link to="/privacy">Privacy policy</Link>.</p>
          </form>
          <div className="form-success" data-form-success="" role="status" aria-live="polite" hidden>
            <span className="form-success__icon"><svg aria-hidden="true"><use href="images/icons.svg#icon-check" /></svg></span>
            <h4>Thank you — request received.</h4>
            <p>Our team will share the Tridasa Rise details shortly. For anything urgent, call <a href="tel:+918125291166">+91 81252 91166</a>.</p>
            <button className="btn btn-outline btn-sm" type="button" data-form-again="">Send another enquiry</button>
          </div>
          <div className="aside-contact">
            <span>Prefer to speak to someone?</span>
            <a href="tel:+918125291166">+91 81252 91166</a>
            <a href="mailto:support@bhusethu.com">support@bhusethu.com</a>
          </div>
        </div>

        <div className="aside-card" style={{ background: "var(--ivory-deep)", borderColor: "transparent" }}>
          <h2 style={{ fontSize: "1.25rem" }}>Independent advice, not a sales pitch.</h2>
          <p>You can commission a full title and document review before paying a token amount. We will tell you what we find — even if it means walking away.</p>
          <Link className="link-arrow" to="/services/title-verification">See due diligence scope <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg></Link>
        </div>
      </aside>
    </div>

    <section className="section section--ivory-deep">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Keep looking</span>
            <h2 style={{ marginTop: ".8rem", maxWidth: "19ch", fontSize: "clamp(1.9rem, 1.5rem + 1.8vw, 2.8rem)" }}>Not quite the right fit?</h2>
          </div>
          <div>
            <p className="section-head__intro">Tell us what you are looking for and we will share alternatives from our current mandates and off-market network.</p>
            <p className="section-head__link"><Link className="link-arrow" to="/properties">Back to properties <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg></Link></p>
          </div>
        </div>
        <div className="property-aside__card" style={{ background: "var(--white)", border: "1px solid var(--line)", padding: "clamp(1.5rem, 4vw, 2.25rem)", borderRadius: "var(--radius)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "500" }}>Share your requirement</h3>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", marginTop: ".3rem" }}>Location, budget and configuration — we will do the searching.</p>
          </div>
          <Link className="btn btn-primary" to="/services/buying-assistance">Talk to an advisor
            <svg aria-hidden="true"><use href="images/icons.svg#icon-arrow-right" /></svg>
          </Link>
        </div>
      </div>
    </section>
  </main>

  <div className="mobile-cta">
    <a className="btn btn-outline" href="tel:+918125291166">
      <svg aria-hidden="true"><use href="images/icons.svg#icon-phone" /></svg>Call
    </a>
    <a className="btn btn-primary" href="#property-enquiry">Enquire about this property</a>
  </div>

  <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Property image viewer">
    <button className="lightbox__close" type="button" aria-label="Close image viewer"><svg width="20" height="20" aria-hidden="true"><use href="images/icons.svg#icon-x" /></svg></button>
    <button className="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image"><svg width="20" height="20" aria-hidden="true"><use href="images/icons.svg#icon-chevron-left" /></svg></button>
    <img src="images/properties/bulding2.webp" alt="" />
    <button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image"><svg width="20" height="20" aria-hidden="true"><use href="images/icons.svg#icon-chevron-right" /></svg></button>
  </div>

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
