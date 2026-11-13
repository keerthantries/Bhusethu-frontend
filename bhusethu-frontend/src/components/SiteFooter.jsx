import React from "react";
import { Link } from "react-router-dom";
import bhusethuLogo from "../assets/images/bhusethu_logo.png";

export default function SiteFooter() {
  return (
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
                src={bhusethuLogo}
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
                <Link to="/services">Services</Link>
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
                <Link to="/services/buying-assistance">Buying assistance</Link>
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
  );
}
