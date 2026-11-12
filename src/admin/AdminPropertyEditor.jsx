import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ImagePlus, ShieldCheck } from 'lucide-react'
import { api } from '../api'
import { displayImage } from '../propertyUtils'

const PROPERTY_TYPES = [
  'Apartment / Flat',
  'Independent house / Villa',
  'Plot / Land',
  'Agricultural land',
  'Commercial'
]

export default function AdminPropertyEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [preview, setPreview] = useState('')
  const [removeImages, setRemoveImages] = useState([])
  const [error, setError] = useState('')

  const propertyQuery = useQuery({
    queryKey: ['admin', 'property', id],
    queryFn: ({ signal }) => api.get(`/api/properties/${id}`, { signal }),
    enabled: Boolean(id)
  })

  const property = propertyQuery.data?.data

  useEffect(() => {
    if (property?.images?.[0]?.url) setPreview(property.images[0].url)
  }, [property])

  const saveMutation = useMutation({
    mutationFn: (body) =>
      id
        ? api.put(`/api/properties/${id}`, body, { timeout: 120_000 })
        : api.post('/api/properties', body, { timeout: 120_000 }),
    onSuccess: (_result, body) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'property'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
      queryClient.invalidateQueries({ queryKey: ['properties', 'public'] })
      const title = body.get('title')
      navigate('/admin/properties', {
        replace: true,
        state: { saved: id ? `“${title}” was updated.` : `“${title}” was added.` }
      })
    },
    onError: (err) => setError(err.message)
  })

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    if (id) body.append('removeImages', JSON.stringify(removeImages))
    setError('')
    saveMutation.mutate(body)
  }

  const toggleRemove = (publicId) => {
    setRemoveImages((list) =>
      list.includes(publicId) ? list.filter((item) => item !== publicId) : [...list, publicId]
    )
  }

  if (!isNew && propertyQuery.isPending) {
    return <div className="admin-inline-loading">Loading property…</div>
  }

  if (!isNew && propertyQuery.isError) {
    return (
      <div className="admin-empty admin-empty--roomy">
        <strong>Property not found.</strong>
        <p>{propertyQuery.error.message}</p>
        <Link className="btn btn-outline btn-sm" to="/admin/properties">
          Back to properties
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link className="admin-back" to="/admin/properties">
        <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
        All properties
      </Link>

      <div className="admin-page-head">
        <div>
          <span className="admin-eyebrow">{isNew ? 'New listing' : 'Editing listing'}</span>
          <h1>{isNew ? 'Add property' : 'Edit property'}</h1>
          <p>
            {isNew
              ? 'Create a listing, add gallery images and choose whether to publish it.'
              : `Updating “${property?.title || 'property'}”.`}
          </p>
        </div>
        {!isNew && property?.status && (
          <span className={`admin-status admin-status--${property.status === 'draft' ? 'draft' : 'published'}`}>
            {property.status === 'draft' ? 'Draft' : 'Published'}
          </span>
        )}
      </div>

      <div className="admin-editor">
        <form
          className="admin-card admin-editor__form"
          onSubmit={handleSubmit}
          key={property?.id || 'new'}
        >
          <section className="admin-fieldset">
            <div className="admin-fieldset__head">
              <h2>Property details</h2>
              <p>The essentials shown on listing cards and detail pages.</p>
            </div>
            <div className="admin-form__row">
              <div className="field">
                <label htmlFor="property-name">Property name</label>
                <input
                  id="property-name"
                  name="title"
                  type="text"
                  placeholder="e.g. Tridasa Rise"
                  defaultValue={property?.title || ''}
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
                  defaultValue={property?.price || ''}
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
                  defaultValue={property?.location || ''}
                />
              </div>
              <div className="field">
                <label htmlFor="property-type">Property type</label>
                <select id="property-type" name="type" defaultValue={property?.type || ''}>
                  <option value="">Select type</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="property-description">Description</label>
              <textarea
                id="property-description"
                name="description"
                rows="5"
                placeholder="A short description of the property, its approvals and highlights."
                defaultValue={property?.description || ''}
              ></textarea>
            </div>
          </section>

          <section className="admin-fieldset">
            <div className="admin-fieldset__head">
              <h2>Publication</h2>
              <p>Drafts are only visible in the admin panel.</p>
            </div>
            <div className="field">
              <label htmlFor="property-status">Visibility</label>
              <select
                id="property-status"
                name="status"
                defaultValue={property ? property.status || 'published' : 'draft'}
              >
                <option value="draft">Draft — admin only</option>
                <option value="published">Published — shown on the website</option>
              </select>
              <span className="field__hint">You can publish or unpublish at any time from the list.</span>
            </div>
          </section>

          <section className="admin-fieldset">
            <div className="admin-fieldset__head">
              <h2>Gallery</h2>
              <p>The first image becomes the cover on cards and the homepage.</p>
            </div>

            {property?.images?.length > 0 && (
              <div className="field">
                <label>
                  Existing images <span className="admin-hint">Tick an image to remove it on save</span>
                </label>
                <div className="admin-existing">
                  {property.images.map((image) => (
                    <label key={image.publicId} className="admin-existing__item">
                      <img src={displayImage(image.url)} alt="" loading="lazy" />
                      <input
                        type="checkbox"
                        checked={removeImages.includes(image.publicId)}
                        onChange={() => toggleRemove(image.publicId)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="field">
              <label className="admin-upload" htmlFor="property-images">
                <span className="admin-upload__icon">
                  <ImagePlus size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <strong>Choose images to upload</strong>
                <span>JPG, PNG or WebP, up to 5 MB each. You can select several at once.</span>
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
          </section>

          {error && <p className="form-alert">{error}</p>}

          <div className="admin-form__actions admin-editor__actions">
            <button className="btn btn-primary" type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving…' : isNew ? 'Create property' : 'Save changes'}
            </button>
            <Link className="btn btn-outline" to="/admin/properties">
              Cancel
            </Link>
          </div>
        </form>

        <aside className="admin-editor__aside">
          <div className="admin-card admin-preview">
            <span className="eyebrow">Cover preview</span>
            <div className="admin-preview__image">
              {preview ? (
                <img src={displayImage(preview)} alt="Selected property cover preview" />
              ) : (
                <span>Add an image to preview the listing cover</span>
              )}
            </div>
            <h3>{property?.title || 'Property name'}</h3>
            <p>{property?.location || 'Location will appear here'}</p>
            <div className="admin-preview__hint">
              <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />
              Published listings appear on the public properties page and homepage gallery.
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
