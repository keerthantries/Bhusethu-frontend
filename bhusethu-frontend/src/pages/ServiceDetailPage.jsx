import SiteFooter from "../components/SiteFooter";
import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { SERVICES, getService } from "../data/services";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (!service) return;
    const url = `https://www.bhusethu.com/services/${service.slug}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    const previous = {
      title: document.title,
      description: description?.getAttribute("content"),
      canonical: canonical?.getAttribute("href"),
      ogTitle: ogTitle?.getAttribute("content"),
      ogDescription: ogDescription?.getAttribute("content"),
    };

    document.title = service.seo.title;
    description?.setAttribute("content", service.seo.description);
    ogTitle?.setAttribute("content", service.seo.title);
    ogDescription?.setAttribute("content", service.seo.description);
    canonical?.setAttribute("href", url);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", url);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "service-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.summary,
          url,
          provider: {
            "@type": "LocalBusiness",
            name: "Bhusethu Property Solutions",
            url: "https://www.bhusethu.com",
          },
          areaServed: ["Hyderabad", "Telangana", "Andhra Pradesh"],
        },
        {
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.bhusethu.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://www.bhusethu.com/services",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.nav,
              item: url,
            },
          ],
        },
      ],
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previous.title;
      if (previous.description)
        description?.setAttribute("content", previous.description);
      if (previous.ogTitle) ogTitle?.setAttribute("content", previous.ogTitle);
      if (previous.ogDescription)
        ogDescription?.setAttribute("content", previous.ogDescription);
      if (previous.canonical)
        canonical?.setAttribute("href", previous.canonical);
      if (ogUrl) ogUrl.remove();
      schema.remove();
    };
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const related = SERVICES.filter((item) => item.slug !== service.slug).slice(
    0,
    3,
  );
  const contactHref = `/contact?service=${service.service}`;

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
              alt="Bhusethu"
            />
            <span className="brand-copy">
              <span className="brand-name">Bhusethu</span>
              <span className="brand-sub">Property Solutions</span>
            </span>
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/services" aria-current="page">
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
              <use href="/images/icons.svg#icon-x" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link to="/">Home</Link>
          <Link to="/services" aria-current="page">
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

      <main id="main" className="sp">
        <section className="sp-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.nav}</span>
            </nav>

            <div className="sp-hero__grid">
              <div className="sp-hero__copy">
                <span className="sp-kicker">{service.kicker}</span>
                <h1>{service.title}</h1>
                <p className="sp-hero__intro">{service.intro}</p>
                <div className="sp-hero__actions">
                  <Link className="btn btn-primary" to={contactHref}>
                    Get started
                    <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                  </Link>
                  <a className="btn btn-outline" href="tel:+918125291166">
                    <Phone size={16} strokeWidth={2} aria-hidden="true" />
                    Talk to us
                  </a>
                </div>
                <ul className="sp-chips">
                  {service.highlights.map((item) => (
                    <li key={item}>
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sp-hero__visual" aria-hidden="true">
                <span className="sp-hero__glow" />
                <span className="sp-hero__icon">
                  <Icon size={26} strokeWidth={1.9} />
                </span>
                <img src={service.image} alt="" />
                <span className="sp-hero__tag">Bhusethu advisory</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-body">
          <div className="container">
            <p className="sp-summary">{service.summary}</p>

            <div className="sp-split">
              <div className="sp-panel">
                <span className="sp-panel__label">Who it helps</span>
                <ul className="sp-list">
                  {service.helps.map((item) => (
                    <li key={item}>
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sp-panel sp-panel--accent">
                <span className="sp-panel__label">What is included</span>
                <ul className="sp-list">
                  {service.included.map((item) => (
                    <li key={item}>
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="sp-process" aria-labelledby="process-title">
              <div className="sp-process__head">
                <span className="eyebrow">How it works</span>
                <h2 id="process-title">
                  A clear path from question to decision.
                </h2>
              </div>
              <ol className="sp-steps">
                {service.process.map((step, index) => (
                  <li key={step}>
                    <span className="sp-steps__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="sp-faq" aria-labelledby="faq-title">
              <div className="sp-faq__head">
                <span className="eyebrow">Questions</span>
                <h2 id="faq-title">Before you begin.</h2>
              </div>
              <div className="sp-faq__list">
                {service.faq.map((item) => (
                  <details className="sp-faq__item" key={item.q}>
                    <summary>
                      {item.q}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="sp-related" aria-labelledby="related-title">
              <div className="sp-related__head">
                <h2 id="related-title">Other ways we can help</h2>
                <Link className="link-arrow" to="/services">
                  All services
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
              <div className="sp-related__grid">
                {related.map((item) => {
                  const RelatedIcon = item.icon;
                  return (
                    <Link
                      className="sp-related__card"
                      key={item.slug}
                      to={`/services/${item.slug}`}
                    >
                      <span className="sp-related__icon">
                        <RelatedIcon
                          size={19}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <h3>{item.nav}</h3>
                        <span className="sp-related__link">
                          View service
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="sp-cta">
              <div>
                <span className="eyebrow">Next step</span>
                <h2>Tell us the situation. We will tell you what it needs.</h2>
                <p>
                  A short conversation is usually enough to work out the right
                  scope — and what you can safely skip.
                </p>
              </div>
              <div className="sp-cta__actions">
                <Link className="btn btn-light" to={contactHref}>
                  Book a consultation
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </Link>
                <a className="btn btn-outline-light" href="tel:+918125291166">
                  Call +91 81252 91166
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
