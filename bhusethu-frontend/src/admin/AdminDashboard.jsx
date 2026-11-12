import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { displayImage } from '../propertyUtils'

const EMPTY_STATS = {
  properties: { total: 0, published: 0, draft: 0 },
  enquiries: { total: 0, latestAt: null },
  recentEnquiries: [],
  recentProperties: []
}

export default function AdminDashboard() {
  const statsQuery = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: ({ signal }) => api.get('/api/admin/stats', { signal }).then((res) => res.data)
  })

  const stats = statsQuery.data || EMPTY_STATS
  const loading = statsQuery.isPending
  const contacts = stats.recentEnquiries
  const properties = stats.recentProperties

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of listings and enquiries from the website.</p>
        </div>
        <Link className="btn btn-primary btn-sm" to="/admin/properties/new">Add property</Link>
      </div>

      {statsQuery.isError && <p className="form-alert">{statsQuery.error.message}</p>}

      <div className="admin-stats">
        <div className="admin-stat">
          <span>Properties</span>
          <strong>{loading ? '—' : stats.properties.total}</strong>
        </div>
        <div className="admin-stat">
          <span>Published</span>
          <strong>{loading ? '—' : stats.properties.published}</strong>
        </div>
        <div className="admin-stat">
          <span>Enquiries</span>
          <strong>{loading ? '—' : stats.enquiries.total}</strong>
        </div>
        <div className="admin-stat">
          <span>Latest enquiry</span>
          <strong>
            {loading || !stats.enquiries.latestAt
              ? '—'
              : new Date(stats.enquiries.latestAt).toLocaleDateString()}
          </strong>
        </div>
      </div>

      <section className="admin-card admin-data">
        <div className="admin-data__head">
          <h2>Recent enquiries</h2>
          <Link to="/admin/enquiries">View all →</Link>
        </div>
        {loading ? (
          <p className="admin-muted">Loading…</p>
        ) : contacts.length === 0 ? (
          <p className="admin-muted">No enquiries yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Date</th><th>Name</th><th>Phone</th><th>Service</th></tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>{c.client_name}</td>
                    <td>{c.client_phone}</td>
                    <td>{c.service_type || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-card admin-data">
        <div className="admin-data__head">
          <h2>Recent properties</h2>
          <Link to="/admin/properties">Manage →</Link>
        </div>
        {loading ? (
          <p className="admin-muted">Loading…</p>
        ) : properties.length === 0 ? (
          <p className="admin-muted">No properties uploaded yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Cover</th><th>Name</th><th>Location</th><th>Price</th><th>Status</th></tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image ? (
                        <img className="admin-table__cover" src={displayImage(p.image)} alt="" loading="lazy" />
                      ) : '—'}
                    </td>
                    <td>{p.title}</td>
                    <td>{p.location || '—'}</td>
                    <td>{p.price || '—'}</td>
                    <td>
                      <span className={`admin-status admin-status--${p.status === 'draft' ? 'draft' : 'published'}`}>
                        {p.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
