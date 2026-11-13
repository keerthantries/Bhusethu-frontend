import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PropertiesPage from './pages/PropertiesPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import PropertyListPage from './pages/PropertyListPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'))
const AdminProperties = lazy(() => import('./admin/AdminProperties.jsx'))
const AdminPropertyEditor = lazy(() => import('./admin/AdminPropertyEditor.jsx'))
const AdminEnquiries = lazy(() => import('./admin/AdminEnquiries.jsx'))

function SiteRuntime() {
  const location = useLocation()

  useEffect(() => {
    const siteScript = document.createElement('script')
    siteScript.src = '/js/site.js?v=' + Date.now()
    document.body.appendChild(siteScript)

    const scrollTimers = []
    const timer = setTimeout(() => {
      const hero = document.querySelector('.hz')
      const hzBox = document.querySelector('[data-hz-slides]')
      if (hero && hzBox) {
        const slides = Array.from(hzBox.querySelectorAll('.hz__slide'))
        const bars = Array.from(hero.querySelectorAll('[data-hz-bar]'))
        const cap = hero.querySelector('[data-hz-caption]')
        const DELAY = 5000
        let i = 0
        hero.style.setProperty('--hz-delay', DELAY + 'ms')
        const show = (n) => {
          slides[i]?.classList.remove('is-on')
          bars[i]?.classList.remove('is-on')
          i = (n + slides.length) % slides.length
          slides[i]?.classList.add('is-on')
          bars[i]?.classList.add('is-on')
          if (cap) cap.textContent = slides[i]?.getAttribute('data-label') || ''
        }
        bars.forEach((b, n) => {
          b.onclick = () => show(n)
        })
        scrollTimers.push(setInterval(() => show(i + 1), DELAY))
      }

      const hnRoot = document.querySelector('[data-hn]')
      if (hnRoot) {
        const slides = Array.from(hnRoot.querySelectorAll('.hn__slide'))
        const dots = Array.from(hnRoot.querySelectorAll('[data-hn-dot]'))
        const label = hnRoot.querySelector('[data-hn-label]')
        let i = 0
        const show = (n) => {
          slides[i]?.classList.remove('is-on')
          dots[i]?.classList.remove('is-on')
          i = (n + slides.length) % slides.length
          slides[i]?.classList.add('is-on')
          dots[i]?.classList.add('is-on')
          if (label) label.textContent = slides[i]?.getAttribute('data-label') || ''
        }
        dots.forEach((d, n) => {
          d.onclick = () => show(n)
        })
        scrollTimers.push(setInterval(() => show(i + 1), 5000))
      }

      if (location.hash) {
        const scrollToHash = () => {
          const target = document.querySelector(location.hash)
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        scrollToHash()
        scrollTimers.push(setTimeout(scrollToHash, 350), setTimeout(scrollToHash, 900))
      } else {
        window.scrollTo(0, 0)
      }
    }, 50)

    return () => {
      clearTimeout(timer)
      scrollTimers.forEach(clearTimeout)
      if (siteScript.parentNode) {
        siteScript.parentNode.removeChild(siteScript)
      }
    }
  }, [location])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteRuntime />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/about.html" element={<AboutPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact.html" element={<ContactPage />} />

        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties.html" element={<PropertiesPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects.html" element={<ProjectsPage />} />

        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services.html" element={<Navigate to="/services" replace />} />

        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy.html" element={<PrivacyPage />} />

        <Route path="/property-List" element={<PropertyListPage />} />
        <Route path="/property-List.html" element={<PropertyListPage />} />

        <Route path="/login" element={<Suspense fallback={<div className="admin-loading">Loading…</div>}><LoginPage /></Suspense>} />
        <Route path="/admin" element={<Suspense fallback={<div className="admin-loading">Loading…</div>}><AdminLayout /></Suspense>}>
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/new" element={<AdminPropertyEditor />} />
          <Route path="properties/:id/edit" element={<AdminPropertyEditor />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
