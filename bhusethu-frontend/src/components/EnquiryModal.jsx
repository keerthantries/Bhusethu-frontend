import React, { useEffect, useState } from "react";
import { api, API_BASE } from "../api";
import PhoneField from "./PhoneField";

const FORM_URL = `${API_BASE}/api/contact`;
const TURNSTILE_KEY = "0x4AAAAAAB_JtYwMFieSAtdO";

const PROPERTY_TYPES = [
  "Apartment / Flat",
  "Independent house / Villa",
  "Plot / Land",
  "Agricultural land",
  "Commercial",
];

const SERVICE_FORMS = {
  buy: {
    title: "Buy a property",
    sub: "Three quick choices and we will shortlist verified options.",
    service: "buying_assistance",
    fields: [
      {
        name: "Property type",
        type: "choice",
        options: PROPERTY_TYPES,
        required: true,
      },
      { name: "Preferred area", type: "text" },
      {
        name: "Area guidance",
        type: "checkbox",
        label: "I need guidance on choosing the area",
        value: "Yes",
      },
      {
        name: "Budget",
        type: "choice",
        options: [
          "Under ₹50 L",
          "₹50 L – ₹1 Cr",
          "₹1 Cr – ₹2 Cr",
          "Above ₹2 Cr",
        ],
        required: true,
      },
    ],
  },
  sell: {
    title: "Sell a property",
    sub: "Three quick choices. We will advise on pricing and buyers.",
    service: "selling_assistance",
    uploads: true,
    fields: [
      {
        name: "Property type",
        type: "choice",
        options: PROPERTY_TYPES,
        required: true,
      },
      {
        name: "Location",
        type: "choice",
        options: ["Hyderabad", "Rest of Telangana", "Andhra Pradesh", "Other"],
        required: true,
      },
      {
        name: "Expected price",
        type: "choice",
        options: [
          "Under ₹50 L",
          "₹50 L – ₹1 Cr",
          "₹1 Cr – ₹2 Cr",
          "Above ₹2 Cr",
          "Not sure yet",
        ],
        required: true,
      },
    ],
  },
  legal: {
    title: "Legal & title help",
    sub: "Three quick choices. A property advisor will call you back.",
    service: "due_diligence",
    fields: [
      {
        name: "Help needed",
        type: "choice",
        options: [
          "Title verification before buying",
          "Property dispute",
          "Encumbrance / loan check",
          "Approvals & records",
        ],
        required: true,
      },
      {
        name: "Property location",
        type: "choice",
        options: ["Hyderabad", "Rest of Telangana", "Andhra Pradesh", "Other"],
        required: true,
      },
      {
        name: "Documents available",
        type: "choice",
        options: [
          "Sale deed",
          "EC / encumbrance",
          "Pahani / revenue records",
          "Not sure",
        ],
        required: true,
      },
    ],
  },
};

export default function EnquiryModal({ type, property, onClose }) {
  const cfg = property
    ? {
        title: "Enquire about this property",
        sub: "Share your name and phone number. An advisor will call you back.",
        service: "property_enquiry",
        fields: [],
        property,
      }
    : SERVICE_FORMS[type];
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    let wid;
    if (window.turnstile) {
      try {
        wid = window.turnstile.render("#modal-turnstile", {
          sitekey: TURNSTILE_KEY,
          theme: "light",
          size: "flexible",
        });
      } catch (e) {
        /* noop */
      }
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (wid && window.turnstile) {
        try {
          window.turnstile.remove(wid);
        } catch (e) {
          /* noop */
        }
      }
    };
  }, [onClose]);

  if (!cfg) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const propertyLines = cfg.property
      ? [
          `Property: ${cfg.property.title || ""}`,
          `Property ID: ${cfg.property.id || ""}`,
        ]
      : [];
    const extra = [
      ...propertyLines,
      ...cfg.fields
        .map((f) => {
          const value = (fd.get(f.name) || "").toString().trim();
          return value ? `${f.name}: ${value}` : null;
        })
        .filter(Boolean),
    ].join("\n");

    const body = new FormData();
    body.append("client_name", (fd.get("client_name") || "").toString().trim());
    body.append(
      "client_phone",
      (fd.get("client_phone") || "").toString().trim(),
    );
    body.append("service_type", cfg.service);
    if (cfg.property?.id) body.append("property_id", cfg.property.id);
    body.append("client_message", `[${cfg.title}]\n${extra}`);
    fd.getAll("images").forEach((file) => {
      if (file && file.size) body.append("images", file);
    });
    fd.getAll("documents").forEach((file) => {
      if (file && file.size) body.append("documents", file);
    });
    const token = fd.get("cf-turnstile-response");
    if (token) body.append("cf-turnstile-response", token);

    setStatus("sending");
    try {
      await api.post(FORM_URL, body, { timeout: 120_000 });
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__box">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        {status === "done" ? (
          <div className="modal__done">
            <h3 id="modal-title">Thank you — we have your enquiry.</h3>
            <p>
              A property advisor will call you shortly. For anything urgent,
              call <a href="tel:+918125291166">+91 81252 91166</a>.
            </p>
            <button className="btn btn-primary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="modal__eyebrow">Free consultation</span>
            <h3 id="modal-title">{cfg.title}</h3>
            <p className="modal__sub">{cfg.sub}</p>
            <div className="modal__grid">
              {cfg.property && (
                <div className="field modal__full">
                  <label htmlFor="m-property">Property</label>
                  <input
                    id="m-property"
                    type="text"
                    value={cfg.property.title || ""}
                    readOnly
                  />
                </div>
              )}
              <div className="field">
                <label htmlFor="m-name">Full name *</label>
                <input
                  id="m-name"
                  name="client_name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>
              <PhoneField id="m-phone" />
              {cfg.fields.map((f) => {
                if (f.type === "choice") {
                  return (
                    <fieldset className="choice modal__full" key={f.name}>
                      <legend>
                        {f.name}
                        {f.required ? " *" : ""}
                      </legend>
                      <div className="choice__options">
                        {f.options.map((o) => (
                          <label className="choice__option" key={o}>
                            <input
                              type="radio"
                              name={f.name}
                              value={o}
                              required={!!f.required}
                            />
                            <span>{o}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  );
                }
                if (f.type === "checkbox") {
                  return (
                    <label className="check modal__full" key={f.name}>
                      <input
                        type="checkbox"
                        name={f.name}
                        value={f.value || "Yes"}
                      />
                      <span className="check__box" aria-hidden="true"></span>
                      <span>{f.label}</span>
                    </label>
                  );
                }
                const id = `m-${f.name.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <div className="field modal__full" key={f.name}>
                    <label htmlFor={id}>
                      {f.name} <span className="optional">(optional)</span>
                    </label>
                    <input id={id} name={f.name} type="text" />
                  </div>
                );
              })}
              {cfg.uploads && (
                <>
                  <div className="field modal__full">
                    <label htmlFor="m-images">Property photo</label>
                    <input id="m-images" name="images" type="file" accept="image/*" multiple />
                    <span className="field__hint">
                      The first photo becomes the cover.
                    </span>
                  </div>
                  <div className="field modal__full">
                    <label htmlFor="m-documents">Ownership document</label>
                    <input id="m-documents" name="documents" type="file" accept=".pdf,.doc,.docx,image/*" />
                    <span className="field__hint">
                      PDF or photo of the deed, EC or records.
                    </span>
                  </div>
                </>
              )}
            </div>
            <div id="modal-turnstile"></div>
            {status === "error" && (
              <p className="modal__err" role="alert">
                Could not send. Please try again or call +91 81252 91166.
              </p>
            )}
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send my enquiry"}
            </button>
            <p className="form-note">
              We only use your details to respond to this enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
