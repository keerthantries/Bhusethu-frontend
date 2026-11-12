import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  MapPin,
  ShieldCheck
} from 'lucide-react'

const CASES = [
  {
    id: 'title-clearance',
    number: '01',
    tag: 'Dispute resolution',
    title: 'Complex land title clearance',
    lead: 'A land parcel with a complicated ownership history needed its records reconciled before it could move toward a transaction.',
    image: 'images/properties/land-plots.png',
    alt: 'Aerial view of agricultural land with a plot boundary marked',
    steps: [
      {
        label: 'The situation',
        text: 'Conflicting entries and missing documents made the ownership chain difficult to follow.'
      },
      {
        label: 'What we did',
        text: 'Reviewed the available title chain, retrieved revenue records and coordinated corrections with the relevant offices.'
      },
      {
        label: 'The outcome',
        text: 'The parcel reached a documented, transaction-ready position with the remaining risks clearly explained to the owner.'
      }
    ],
    service: '/services/dispute-resolution',
    serviceLabel: 'Dispute resolution'
  },
  {
    id: 'development',
    number: '02',
    tag: 'Development',
    title: 'Luxury apartment development',
    lead: 'End-to-end coordination for a residential apartment project, from early planning through construction and handover.',
    image: 'images/properties/apartment-buildings.png',
    alt: 'Completed residential apartment development with landscaped frontage',
    steps: [
      {
        label: 'The brief',
        text: 'A residential development that needed local coordination across design, approvals and construction.'
      },
      {
        label: 'What we did',
        text: 'Managed the project schedule, coordinated vendors and kept the regulatory milestones on track.'
      },
      {
        label: 'The outcome',
        text: 'The project was delivered with a documented approval trail and a clear handover process.'
      }
    ],
    service: '/services/development',
    serviceLabel: 'Development & construction'
  },
  {
    id: 'commercial',
    number: '03',
    tag: 'Acquisition',
    title: 'High-value commercial acquisition',
    lead: 'Buy-side support for a commercial property, where the numbers only made sense if the legal position held up.',
    image: 'images/properties/commercial-building.png',
    alt: 'Commercial building under construction',
    steps: [
      {
        label: 'The situation',
        text: 'A commercial asset required thorough review before the buyer committed to a significant investment.'
      },
      {
        label: 'What we did',
        text: 'Carried out due diligence, reviewed the commercial terms and supported the negotiation.'
      },
      {
        label: 'The outcome',
        text: 'The buyer proceeded with a clear understanding of the title position, obligations and financial exposure.'
      }
    ],
    service: '/services/buying-assistance',
    serviceLabel: 'Buying assistance'
  }
]

const SITE_PHOTOS = [
  {
    src: 'images/properties/choutuppal_land/property-1.webp',
    alt: 'Bhusethu team inspecting land at Choutuppal',
    caption: 'Site walk-through'
  },
  {
    src: 'images/properties/choutuppal_land/property-3.webp',
    alt: 'Rocky boundary area during a land inspection at Choutuppal',
    caption: 'Boundary and terrain'
  },
  {
    src: 'images/properties/choutuppal_land/property-5.webp',
    alt: 'Team member reviewing notes during a site inspection',
    caption: 'Survey notes'
  },
  {
    src: 'images/properties/choutuppal_land/property-7.webp',
    alt: 'Approach and access check during a land inspection',
    caption: 'Access review'
  }
]

export default function ProjectsPage() {
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
            <Link to="/properties">Properties</Link>
            <Link aria-current="page" to="/projects">Projects</Link>
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
          <Link to="/properties">Properties</Link>
          <Link aria-current="page" to="/projects">Projects</Link>
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

      <main id="main" className="pj">
        <section className="pj-hero">
          <div className="container pj-hero__grid">
            <div className="pj-hero__copy">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Projects</span>
              </nav>
              <span className="eyebrow">Selected work</span>
              <h1>Mandates that begin with the paperwork.</h1>
              <p className="pj-hero__intro">
                A look at the mandates we take on — clearing title complications,
                coordinating development and supporting acquisitions across
                Telangana and Andhra Pradesh.
              </p>
              <div className="pj-hero__actions">
                <Link className="btn btn-primary" to="/contact">
                  Discuss a similar project
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </Link>
                <a className="btn btn-outline" href="#case-studies">Read the case studies</a>
              </div>
              <dl className="pj-stats">
                <div>
                  <dt>Case studies</dt>
                  <dd>03</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>Telangana & AP</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>Document-led</dd>
                </div>
              </dl>
            </div>

            <div className="pj-hero__media" aria-hidden="true">
              <figure className="pj-hero__main">
                <img src="images/properties/apartment-buildings.png" alt="" loading="eager" />
              </figure>
              <figure className="pj-hero__aside">
                <img src="images/properties/land-plots.png" alt="" loading="lazy" />
              </figure>
              <div className="pj-hero__note">
                <span className="pj-hero__note-icon">
                  <FileCheck2 size={19} strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <strong>Documents first</strong>
                  <span>Every mandate starts with the record</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="pj-anchors" aria-label="Case studies">
          <div className="container">
            {CASES.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                <span>{item.number}</span>
                {item.tag}
              </a>
            ))}
            <a href="#site-inspection"><span>04</span> Site inspections</a>
          </div>
        </nav>

        <section className="pj-body" id="case-studies" aria-labelledby="cases-title">
          <div className="container">
            <div className="pj-head">
              <div>
                <span className="eyebrow">Case studies</span>
                <h2 id="cases-title">What the work actually involved.</h2>
              </div>
              <p>
                Each mandate below started with a problem that was not obvious on
                paper. The work was to make the position clear enough to act on.
              </p>
            </div>

            <div className="pj-cases">
              {CASES.map((item, index) => (
                <article
                  className={`pj-case${index % 2 === 1 ? ' pj-case--reverse' : ''}`}
                  id={item.id}
                  key={item.id}
                >
                  <div className="pj-case__media">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <span className="pj-case__tag">Case {item.number}</span>
                  </div>
                  <div className="pj-case__body">
                    <span className="pj-kicker">{item.number} · {item.tag}</span>
                    <h3>{item.title}</h3>
                    <p className="pj-case__lead">{item.lead}</p>
                    <ol className="pj-case__steps">
                      {item.steps.map((step, stepIndex) => (
                        <li key={step.label}>
                          <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                          <div>
                            <strong>{step.label}</strong>
                            <p>{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Link className="pj-case__link" to={item.service}>
                      {item.serviceLabel}
                      <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pj-site" id="site-inspection" aria-labelledby="field-title">
          <div className="container">
            <div className="pj-site__head">
              <div>
                <span className="eyebrow">On the ground</span>
                <h2 id="field-title">Site inspections, not desk assumptions.</h2>
              </div>
              <p>
                Records tell one part of the story. A site visit tells the rest —
                access, boundaries, neighbouring use and the condition of the land.
                These images are from a land inspection at Choutuppal.
              </p>
            </div>

            <div className="pj-gallery">
              {SITE_PHOTOS.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="pj-site__note">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              Photographs from a Bhusethu site inspection at Choutuppal, Telangana.
            </p>
          </div>
        </section>

        <section className="pj-cta-section">
          <div className="container">
            <div className="pj-cta">
              <div>
                <span className="eyebrow">Your project</span>
                <h2>Every mandate begins with a conversation.</h2>
                <p>
                  Tell us what you are trying to achieve and what is getting in the
                  way. We will suggest a practical scope before you commit to anything.
                </p>
              </div>
              <div className="pj-cta__actions">
                <Link className="btn btn-light" to="/contact">
                  Talk to our team
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </Link>
                <a className="btn btn-outline-light" href="tel:+918125291166">
                  Call +91 81252 91166
                </a>
              </div>
            </div>

            <div className="pj-assurance">
              <div>
                <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
                <span>Documents reviewed before advice</span>
              </div>
              <div>
                <FileCheck2 size={18} strokeWidth={2} aria-hidden="true" />
                <span>Findings explained in plain language</span>
              </div>
              <div>
                <MapPin size={18} strokeWidth={2} aria-hidden="true" />
                <span>Local site checks across Telangana & AP</span>
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
                <span style={{ color: 'rgba(245,241,232,.6)' }}>CoWork Trendz, Capital Park, Madhapur, Hyderabad</span>
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
