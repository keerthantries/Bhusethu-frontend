import { api, API_BASE } from "./api";

const URL = `${API_BASE}/api/contact`;
const ERROR_MSG =
  "We could not send your enquiry. Please check your connection and try again, or call +91 81252 91166.";

const toggle = (el, show) => {
  if (!el) return;
  el.hidden = !show;
  el.style.display = show ? "" : "none";
};

// onSubmit handler for the two plain-markup enquiry forms (Home + Contact).
// Expects the form's sibling [data-form-success] block inside the same card.
export async function submitEnquiry(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const alertEl = form.querySelector("[data-form-alert]");
  const success = form.parentElement?.querySelector("[data-form-success]");
  const btn = form.querySelector('button[type="submit"]');

  const showError = (msg) => {
    if (alertEl) alertEl.textContent = msg;
    toggle(alertEl, true);
  };

  toggle(alertEl, false);

  if (!form.reportValidity()) return;
  const phone = (form.elements.client_phone?.value || "").trim();
  if (!phone) return showError("Please enter a valid phone number.");

  if (btn) btn.disabled = true;
  try {
    await api.post(URL, new FormData(form));
    toggle(form, false);
    toggle(success, true);
  } catch (err) {
    showError(err?.status === 400 && err?.message ? err.message : ERROR_MSG);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// onClick handler for the "Send another enquiry" button.
export function resetEnquiry(e) {
  const card = e.currentTarget.closest("[data-form-success]")?.parentElement;
  const form = card?.querySelector("form");
  if (!form) return;
  form.reset();
  toggle(card.querySelector("[data-form-success]"), false);
  toggle(form, true);
  try {
    window.turnstile?.reset();
  } catch (_) {
    /* noop */
  }
}
