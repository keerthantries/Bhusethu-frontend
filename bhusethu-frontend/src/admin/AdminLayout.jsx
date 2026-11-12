import React, { useEffect } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import bhusethuLogo from '../assets/images/bhusethu_logo.webp'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/properties', label: 'Properties' },
  { to: '/admin/enquiries', label: 'Enquiries' }
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const session = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: ({ signal }) => api.get('/api/auth/me', { signal }),
    retry: false,
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    const onUnauthorized = () => {
      queryClient.clear()
      navigate('/login', { replace: true })
    }
    window.addEventListener('bhusethu:unauthorized', onUnauthorized)
    return () => window.removeEventListener('bhusethu:unauthorized', onUnauthorized)
  }, [navigate, queryClient])

  const logout = useMutation({
    mutationFn: () => api.post('/api/auth/logout'),
    onSettled: () => {
      queryClient.clear()
      navigate('/login', { replace: true })
    }
  })

  if (session.isPending) {
    return <div className="admin-loading">Checking session…</div>
  }
  if (session.isError) return <Navigate to="/login" replace />

  return (
    <div className="admin-app">
      <header className="admin-side">
        <NavLink className="admin-side__brand" to="/admin">
          <img src={bhusethuLogo} alt="" width="40" height="40" />
          <span className="admin-side__brand-copy">
            <strong>Bhusethu</strong>
            <small>Admin panel</small>
          </span>
        </NavLink>

        <nav className="admin-side__nav" aria-label="Admin">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="admin-side__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-side__foot">
          <button type="button" onClick={() => logout.mutate()} disabled={logout.isPending}>
            {logout.isPending ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-main__inner">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
