import React, { useEffect, useMemo, useState } from 'react'
import {
  ShieldCheck,
  Scale,
  KeyRound,
  Megaphone,
  House,
  Building2,
  Tag,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Inbox,
  RefreshCw
} from 'lucide-react'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import Pagination from './Pagination'

const PAGE_SIZE = 20
const EMPTY_META = { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1 }
const EMPTY_COUNTS = { all: 0 }

const TYPES = {
  buying_assistance: { label: 'Buying assistance', tone: 'buy', Icon: KeyRound },
  selling_assistance: { label: 'Selling assistance', tone: 'sell', Icon: Megaphone },
  due_diligence: { label: 'Title verification', tone: 'verify', Icon: ShieldCheck },
  title_dispute: { label: 'Dispute resolution', tone: 'dispute', Icon: Scale },
  property_management: { label: 'Property management', tone: 'manage', Icon: House },
  development_approval: { label: 'Development', tone: 'develop', Icon: Building2 },
  advertising: { label: 'Property advertising', tone: 'ads', Icon: Tag },
  property_enquiry: { label: 'Property enquiry', tone: 'property', Icon: MapPin },
  other: { label: 'Other enquiry', tone: 'general', Icon: MessageSquare }
}

const FALLBACK = { label: 'General enquiry', tone: 'general', Icon: MessageSquare }

// Modal forms pack extra answers into client_message as
// "[Form title]\nField: value" lines; contact forms send plain text.
function parseMessage(raw) {
  if (!raw) return { title: '', fields: [], note: '' }
  const text = String(raw).trim()
  const head = text.match(/^\[([^\]]+)\]\s*\n?([\s\S]*)$/)
  const title = head ? head[1].trim() : ''
  const body = (head ? head[2] : text).trim()
  const fields = []
  const noteLines = []

  body.split(/\r?\n/).forEach((line) => {
    const pair = line.trim().match(/^([A-Za-z][^:]{0,38}):\s*(.+)$/)
    if (pair) fields.push({ label: pair[1].trim(), value: pair[2].trim() })
    else if (line.trim()) noteLines.push(line.trim())
  })

  return { title, fields, note: noteLines.join('\n') }
}

export default function AdminEnquiries() {
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState({ page: 1, q: '', type: '' })
  const [actionError, setActionError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = searchText.trim()
      setFilters((current) => (current.q === q ? current : { ...current, q, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchText])

  const enquiriesQuery = useQuery({
    queryKey: ['admin', 'enquiries', filters],
    queryFn: ({ signal }) => {
      const params = new URLSearchParams({ page: String(filters.page), limit: String(PAGE_SIZE) })
      if (filters.q) params.set('q', filters.q)
      if (filters.type) params.set('type', filters.type)
      return api.get(`/api/contact?${params.toString()}`, { signal })
    },
    placeholderData: keepPreviousData
  })

  const payload = enquiriesQuery.data || {}
  const contacts = payload.data || []
  const meta = payload.meta || EMPTY_META
  const counts = payload.counts || EMPTY_COUNTS
  const loading = enquiriesQuery.isPending

  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'enquiries'] })
    queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
  }

  const deleteMutation = useMutation({
    mutationFn: (contact) => api.delete(`/api/contact/${contact.id}`),
    onSuccess: (_result, contact) => {
      if (contacts.length === 1 && filters.page > 1) {
        setFilters((current) => ({ ...current, page: current.page - 1 }))
      }
      invalidateLists()
    }
  })

  const approveMutation = useMutation({
    mutationFn: (contact) => api.post(`/api/contact/${contact.id}/approve`),
    onSuccess: (json, contact) => {
      setNotice(
        `Draft property created for ${contact.client_name}. Edit the details and publish it in Properties.`
      )
      invalidateLists()
    },
    onError: (err) => {
      if (err.status === 409) {
        setNotice('A draft property already exists for this enquiry.')
        invalidateLists()
      } else {
        setActionError(err.message)
      }
    }
  })

  const error =
    actionError ||
    enquiriesQuery.error?.message ||
    deleteMutation.error?.message ||
    (approveMutation.error?.status === 409 ? '' : approveMutation.error?.message) ||
    ''
  const approving = approveMutation.isPending ? approveMutation.variables?.id : ''

  const handleDelete = (contact) => {
    if (!window.confirm(`Delete enquiry from "${contact.client_name}"?`)) return
    setActionError('')
    deleteMutation.mutate(contact)
  }

  const approveAsProperty = (contact) => {
    setActionError('')
    setNotice('')
    approveMutation.mutate(contact)
  }

  const filtersUi = useMemo(() => {
    return (payload.filters?.types || []).map((item) => ({
      key: item.value,
      label: item.label,
      count: item.count,
      tone: item.value ? TYPES[item.value]?.tone || 'general' : 'all'
    }))
  }, [payload.filters])

  const isFiltered = Boolean(filters.q || filters.type)
  const globallyEmpty = (counts.all || 0) === 0 && !isFiltered

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Enquiries</h1>
          <p>Every contact form submission from the website, newest first.</p>
        </div>
        <span className="admin-pill">{meta.total} total</span>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search name, phone, service or answer"
          aria-label="Search enquiries"
        />
        <button
          type="button"
          className="admin-refresh"
          onClick={() => enquiriesQuery.refetch()}
          disabled={enquiriesQuery.isFetching}
          title="Refresh enquiries"
          aria-label="Refresh enquiries"
        >
          <RefreshCw size={16} strokeWidth={2} className={enquiriesQuery.isFetching ? 'is-spinning' : ''} />
        </button>
      </div>

      {filtersUi.length > 1 && (
        <div className="admin-filters" role="group" aria-label="Filter enquiries by form type">
          {filtersUi.map((f) => (
            <button
              key={f.key || 'all'}
              type="button"
              className={`admin-filter admin-filter--${f.tone}${filters.type === f.key ? ' is-active' : ''}`}
              onClick={() => setFilters((current) => ({ ...current, type: f.key, page: 1 }))}
              aria-pressed={filters.type === f.key}
            >
              {f.label}
              <span>{f.count}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="form-alert">{error}</p>}
      {notice && <p className="admin-notice">{notice}</p>}

      {loading ? (
        <p className="admin-muted">Loading enquiries…</p>
      ) : contacts.length === 0 ? (
        <div className="admin-empty">
          <Inbox size={26} strokeWidth={1.6} aria-hidden="true" />
          <strong>{isFiltered ? 'No enquiries match this filter.' : 'No enquiries yet.'}</strong>
          <p>
            {isFiltered
              ? 'Try another form type or clear the search.'
              : 'New contact form submissions will appear here.'}
          </p>
          {isFiltered && !globallyEmpty && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchText('')
                setFilters({ page: 1, q: '', type: '' })
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="admin-enquiry-list">
            {contacts.map((c) => {
              const type = TYPES[c.service_type] || FALLBACK
              const { title, fields, note } = parseMessage(c.client_message)
              const Icon = type.Icon
              const badge = title || type.label
              return (
                <article
                  className={`admin-enquiry admin-enquiry--${type.tone}`}
                  key={c.id}
                >
                  <div className="admin-enquiry__top">
                    <div className="admin-enquiry__identity">
                      <span className="admin-enquiry__icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <div>
                        <span className="admin-enquiry__badge">{badge}</span>
                        <h2>{c.client_name}</h2>
                      </div>
                    </div>
                    <div className="admin-enquiry__meta">
                      <time dateTime={c.createdAt}>
                        {new Date(c.createdAt).toLocaleString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </time>
                      <span>Ref #{c.id}</span>
                    </div>
                  </div>

                  <div className="admin-enquiry__contact">
                    <a href={`tel:${c.client_phone}`}>
                      <Phone size={14} strokeWidth={2} aria-hidden="true" />
                      {c.client_phone}
                    </a>
                    {c.client_email && (
                      <a href={`mailto:${c.client_email}`}>
                        <Mail size={14} strokeWidth={2} aria-hidden="true" />
                        {c.client_email}
                      </a>
                    )}
                  </div>

                  {fields.length > 0 && (
                    <dl className="admin-enquiry__details">
                      {fields.map((field) => (
                        <div key={field.label}>
                          <dt>{field.label}</dt>
                          <dd>{field.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {note && <p className="admin-enquiry__message">{note}</p>}

                  {(c.images?.length > 0 || c.documents?.length > 0) && (
                    <div className="admin-enquiry__attach">
                      {c.images?.length > 0 && (
                        <div>
                          <span className="admin-enquiry__attach-label">
                            Property photos ({c.images.length})
                          </span>
                          <div className="admin-enquiry__photos">
                            {c.images.map((img) => (
                              <a
                                key={img.publicId || img.url}
                                href={img.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src={img.url} alt="Property submitted by seller" loading="lazy" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      {c.documents?.length > 0 && (
                        <div>
                          <span className="admin-enquiry__attach-label">
                            Ownership documents (admin only)
                          </span>
                          <ul className="admin-enquiry__docs">
                            {c.documents.map((doc) => (
                              <li key={doc.publicId || doc.url}>
                                <a href={doc.url} target="_blank" rel="noreferrer">
                                  {doc.name || 'Document'}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="admin-enquiry__foot">
                    <span className="admin-enquiry__form">via {type.label}</span>
                    <div className="admin-enquiry__actions">
                      {c.service_type === 'selling_assistance' &&
                        c.images?.length > 0 &&
                        (c.property_id ? (
                          <span className="admin-enquiry__done">Draft property created</span>
                        ) : (
                          <button
                            type="button"
                            className="admin-approve"
                            onClick={() => approveAsProperty(c)}
                            disabled={approving === c.id}
                          >
                            {approving === c.id ? 'Creating draft…' : 'Create draft property'}
                          </button>
                        ))}
                      <button type="button" className="admin-delete" onClick={() => handleDelete(c)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            label="enquiries"
            onPage={(page) => setFilters((current) => ({ ...current, page }))}
          />
        </>
      )}
    </>
  )
}
