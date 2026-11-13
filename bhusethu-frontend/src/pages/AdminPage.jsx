import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function AdminPage() {
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contactRes, propertyRes] = await Promise.all([
        api.get("/api/contact"),
        api.get("/api/properties"),
      ]);
      setContacts(contactRes.data || []);
      setProperties(propertyRes.data || []);
    } catch {
      setError("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setStatus("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form);
    setStatus("saving");
    setError("");
    try {
      await api.post("/api/properties", body);
      form.reset();
      setPreview("");
      setStatus("saved");
      loadData();
    } catch (err) {
      setError(err.message);
      setStatus("");
    }
  };

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div className="container admin-top__bar">
          <Link className="admin-top__brand" to="/">
            <img
              src="/images/bhusethu_logo.png"
              alt=""
              width="32"
              height="32"
            />
            Bhusethu <span>Admin</span>
          </Link>
          <div className="admin-top__actions">
            <Link to="/">View website</Link>
            <Link to="/login">Log out</Link>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="container">
          <div className="admin-head">
            <div>
              <span className="eyebrow">Admin portal</span>
              <h1>Add a new property</h1>
              <p>
                Upload the property details and gallery images. It will appear
                in the homepage property gallery.
              </p>
            </div>
            <Link className="btn btn-outline btn-sm" to="/">
              Preview homepage
            </Link>
          </div>

          <div className="admin-grid">
            <section className="admin-card">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-form__row">
                  <div className="field">
                    <label htmlFor="property-name">Property name</label>
                    <input
                      id="property-name"
                      name="title"
                      type="text"
                      placeholder="e.g. Tridasa Rise"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="property-price">Price</label>
                    <input
                      id="property-price"
                      name="price"
                      type="text"
                      placeholder="e.g. ₹1.2 Cr onwards"
                    />
                  </div>
                </div>

                <div className="admin-form__row">
                  <div className="field">
                    <label htmlFor="property-location">Location</label>
                    <input
                      id="property-location"
                      name="location"
                      type="text"
                      placeholder="Area, city"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="property-type">Property type</label>
                    <select id="property-type" name="type" defaultValue="">
                      <option value="">Select type</option>
                      <option>Apartment / Flat</option>
                      <option>Independent house / Villa</option>
                      <option>Plot / Land</option>
                      <option>Agricultural land</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="property-description">Description</label>
                  <textarea
                    id="property-description"
                    name="description"
                    rows="4"
                    placeholder="A short description of the property, its approvals and highlights."
                  ></textarea>
                </div>

                <div className="field">
                  <label>Gallery images</label>
                  <label className="admin-upload" htmlFor="property-images">
                    <span className="admin-upload__icon">＋</span>
                    <strong>Choose images to upload</strong>
                    <span>
                      JPG, PNG or WebP. The first image will be used as the
                      property cover.
                    </span>
                    <input
                      id="property-images"
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImage}
                    />
                  </label>
                </div>

                <button
                  className="btn btn-primary admin-submit"
                  type="submit"
                  disabled={status === "saving"}
                >
                  {status === "saving" ? "Publishing…" : "Publish property"}
                </button>
                {status === "saved" && (
                  <p className="admin-success">
                    Property published successfully.
                  </p>
                )}
                {error && <p className="form-alert">{error}</p>}
              </form>
            </section>

            <aside className="admin-card admin-preview">
              <span className="eyebrow">Live preview</span>
              <div className="admin-preview__image">
                {preview ? (
                  <img src={preview} alt="Selected property preview" />
                ) : (
                  <span>Upload an image to see the cover preview</span>
                )}
              </div>
              <h3>Your property card</h3>
              <p>
                This is how the cover image will appear in the homepage gallery.
              </p>
              <p className="admin-preview__hint">
                The first uploaded image is used as the cover in the homepage
                gallery.
              </p>
            </aside>
          </div>

          <section className="admin-card admin-data">
            <div className="admin-data__head">
              <h2>Contact enquiries</h2>
              <span>{contacts.length} total</span>
            </div>
            {loading ? (
              <p>Loading…</p>
            ) : contacts.length === 0 ? (
              <p>No enquiries yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id}>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td>{c.client_name}</td>
                        <td>{c.client_phone}</td>
                        <td>{c.client_email || "—"}</td>
                        <td>{c.service_type || "—"}</td>
                        <td>{c.client_message || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="admin-card admin-data">
            <div className="admin-data__head">
              <h2>Uploaded properties</h2>
              <span>{properties.length} total</span>
            </div>
            {loading ? (
              <p>Loading…</p>
            ) : properties.length === 0 ? (
              <p>No properties uploaded yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Price</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.images?.[0]?.url ? (
                            <img
                              className="admin-table__cover"
                              src={p.images[0].url}
                              alt=""
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>{p.title}</td>
                        <td>{p.type || "—"}</td>
                        <td>{p.location || "—"}</td>
                        <td>{p.price || "—"}</td>
                        <td>{p.images?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
