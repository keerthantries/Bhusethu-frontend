import React from 'react'

export default function Pagination({ page = 1, totalPages = 1, total = 0, label = 'items', onPage }) {
  if (total === 0) return null
  return (
    <div className="admin-pagination">
      <span>
        Page {page} of {totalPages} · {total} {label}
      </span>
      <div className="admin-pagination__actions">
        <button type="button" disabled={page <= 1} onClick={() => onPage(1)}>
          First
        </button>
        <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </button>
        <button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
          Next
        </button>
        <button type="button" disabled={page >= totalPages} onClick={() => onPage(totalPages)}>
          Last
        </button>
      </div>
    </div>
  )
}
