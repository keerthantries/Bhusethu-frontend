import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Building2, MapPin, Plus, RefreshCw, Search } from 'lucide-react'
import { api } from '../api'
import { displayImage } from '../propertyUtils'
import Pagination from './Pagination'

const PAGE_SIZE = 20
const EMPTY_META = { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1 }

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminProperties() {
  const queryClient = useQueryClient()
  const location = useLocation()
  const [actionError, setActionError] = useState('')
  const [filters, setFilters] = useState({ page: 1, q: '', status: '' })
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = searchText.trim()
      setFilters((current) => (current.q === q ? current : { ...current, q, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchText])

  const propertiesQuery = useQuery({
    queryKey: ['admin', 'properties', filters],
    queryFn: ({ signal }) => {
      const params = new URLSearchParams({ page: String(filters.page), limit: String(PAGE_SIZE) })
      if (filters.q) params.set('q', filters.q)
      if (filters.status) params.set('status', filters.status)
      return api.get(`/api/properties?${params.toString()}`, { signal })
    },
    placeholderData: keepPreviousData
  })

  const payload = propertiesQuery.data || {}
  const properties = payload.data || []
  const meta = payload.meta || EMPTY_META
  const loading = propertiesQuery.isPending

  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] })
    queryClient.invalidateQueries({ queryKey: ['admin', 'property'] })
    queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
  }

  const statusMutation = useMutation({
    mutationFn: ({ id, next }) => api.patch(`/api/properties/${id}/status`, { status: next }),
    onSuccess: invalidateLists
  })

  const deleteMutation = useMutation({
    mutationFn: (property) => api.delete(`/api/properties/${property.id}`),
    onSuccess: (_result, property) => {
      if (properties.length === 1 && filters.page > 1) {
        setFilters((current) => ({ ...current, page: current.page - 1 }))
      }
      invalidateLists()
    }
  })

  const busyId = statusMutation.isPending
    ? statusMutation.variables?.id
    : deleteMutation.isPending
      ? deleteMutation.variables?.id
      : ''

  const error =
    actionError ||
    propertiesQuery.error?.message ||
    statusMutation.error?.message ||
    deleteMutation.error?.message ||
    ''

  const handleDelete = (property) => {
    if (!window.confirm(`Delete "${property.title}"? This cannot be undone.`)) return
    setActionError('')
    deleteMutation.mutate(property)
  }

  const toggleStatus = (property) => {
    setActionError('')
    statusMutation.mutate({
      id: property.id,
      next: property.status === 'draft' ? 'published' : 'draft'
    })
  }

  const statusFilters = payload.filters?.statuses || []
  const countFor = (value) => statusFilters.find((item) => item.value === value)?.count ?? 0
  const isFiltered = Boolean(filters.q || filters.status)
  const savedMessage = location.state?.saved ? location.state.saved : ''

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span className="admin-eyebrow">Catalogue</span>
          <h1>Properties</h1>
          <p>Manage every listing, gallery image and publication state in one place.</p>
        </div>
        <Link className="btn btn-primary btn-sm admin-head-action" to="/admin/properties/new">
          <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
          Add property
        </Link>
      </div>

      {savedMessage && <p className="admin-notice">{savedMessage}</p>}

      <div className="admin-summary">
        <div className="admin-summary__item">
          <span>Total listings</span>
          <strong>{loading ? '—' : countFor('')}</strong>
        </div>
        <div className="admin-summary__item admin-summary__item--live">
          <span>Published</span>
          <strong>{loading ? '—' : countFor('published')}</strong>
        </div>
        <div className="admin-summary__item admin-summary__item--draft">
          <span>Drafts</span>
          <strong>{loading ? '—' : countFor('draft')}</strong>
        </div>
      </div>

      <section className="admin-card admin-data admin-data--flush">
        <div className="admin-listbar">
          <div className="admin-search admin-search--icon">
            <Search size={16} strokeWidth={2} aria-hidden="true" />
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search name, location or description"
              aria-label="Search properties"
            />
          </div>
          <button
            type="button"
            className="admin-refresh"
            onClick={() => propertiesQuery.refetch()}
            disabled={propertiesQuery.isFetching}
            title="Refresh list"
            aria-label="Refresh list"
          >
            <RefreshCw size={16} strokeWidth={2} className={propertiesQuery.isFetching ? 'is-spinning' : ''} />
          </button>
        </div>

        {statusFilters.length > 0 && (
          <div className="admin-filters" role="group" aria-label="Filter properties by status">
            {statusFilters.map((item) => {
              const tone = item.value || 'all'
              return (
                <button
                  key={item.value || 'all'}
                  type="button"
                  className={`admin-filter admin-filter--${tone}${filters.status === item.value ? ' is-active' : ''}`}
                  onClick={() => setFilters((current) => ({ ...current, status: item.value, page: 1 }))}
                  aria-pressed={filters.status === item.value}
                >
                  {item.label}
                  <span>{item.count}</span>
                </button>
              )
            })}
          </div>
        )}

        {error && <p className="form-alert">{error}</p>}

        {loading ? (
          <div className="admin-table-skeleton" aria-hidden="true">
            {[0, 1, 2, 3].map((row) => (
              <div className="admin-table-skeleton__row" key={row}>
                <span className="admin-table-skeleton__thumb" />
                <span className="admin-table-skeleton__line" />
                <span className="admin-table-skeleton__line admin-table-skeleton__line--short" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="admin-empty admin-empty--roomy">
            <Building2 size={28} strokeWidth={1.6} aria-hidden="true" />
            <strong>{isFiltered ? 'No properties match this filter.' : 'No properties yet.'}</strong>
            <p>
              {isFiltered
                ? 'Try another status or clear the search.'
                : 'Publish your first listing to show it on the website.'}
            </p>
            {isFiltered ? (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchText('')
                  setFilters({ page: 1, q: '', status: '' })
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link className="btn btn-primary btn-sm" to="/admin/properties/new">
                <Plus size={15} strokeWidth={2.4} aria-hidden="true" />
                Add property
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="admin-table-wrap admin-table-wrap--pro">
              <table className="admin-table admin-table--pro">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Images</th>
                    <th>Added</th>
                    <th className="admin-table__actions-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td data-label="Property">
                        <div className="admin-property-cell">
                          <div className="admin-property-cell__thumb">
                            {property.images?.[0]?.url ? (
                              <img
                                src={displayImage(property.images[0].url)}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <Building2 size={18} strokeWidth={1.6} aria-hidden="true" />
                            )}
                          </div>
                          <div className="admin-property-cell__copy">
                            <Link to={`/admin/properties/${property.id}/edit`}>
                              {property.title}
                            </Link>
                            <span>
                              <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                              {property.location || 'Location not set'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Type">{property.type || '—'}</td>
                      <td data-label="Price" className="admin-table__price">{property.price || 'On request'}</td>
                      <td data-label="Status">
                        <span className={`admin-status admin-status--${property.status === 'draft' ? 'draft' : 'published'}`}>
                          {property.status === 'draft' ? 'Draft' : 'Published'}
                        </span>
                      </td>
                      <td data-label="Images">{property.images?.length || 0}</td>
                      <td data-label="Added">{formatDate(property.createdAt)}</td>
                      <td data-label="Actions">
                        <div className="admin-row-actions admin-row-actions--pro">
                          <Link className="admin-action admin-action--primary" to={`/admin/properties/${property.id}/edit`}>
                            Edit
                          </Link>
                          <button
                            className="admin-action"
                            type="button"
                            onClick={() => toggleStatus(property)}
                            disabled={busyId === property.id}
                          >
                            {busyId === property.id
                              ? 'Saving…'
                              : property.status === 'draft'
                                ? 'Publish'
                                : 'Unpublish'}
                          </button>
                          <button
                            className="admin-action admin-action--danger"
                            type="button"
                            onClick={() => handleDelete(property)}
                            disabled={busyId === property.id}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              label="properties"
              onPage={(page) => setFilters((current) => ({ ...current, page }))}
            />
          </>
        )}
      </section>
    </>
  )
}
