import axios from 'axios'

const configuredBase = import.meta.env.VITE_API_URL

// Never let a production build silently call the developer's localhost.
export const API_BASE = configuredBase || (import.meta.env.DEV ? 'http://localhost:5000' : '')

if (!API_BASE) {
  throw new Error(
    'VITE_API_URL is not configured. Set it to the production API origin before building.'
  )
}

export const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 20000,
  headers: { Accept: 'application/json' }
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error)

    const status = error.response?.status
    const body = error.response?.data
    let message = typeof body?.error === 'string' ? body.error : ''

    if (!message) {
      if (error.code === 'ECONNABORTED') message = 'The request timed out. Please try again.'
      else if (!error.response) message = 'Could not reach the server. Check your connection and try again.'
      else message = `Request failed (${status})`
    }

    const normalized = new Error(message)
    normalized.status = status
    normalized.data = body

    if (status === 401 && !window.location.pathname.startsWith('/login')) {
      window.dispatchEvent(new CustomEvent('bhusethu:unauthorized'))
    }

    return Promise.reject(normalized)
  }
)

const unwrap = (request) => request.then((response) => response.data)

export const api = {
  get: (url, config) => unwrap(http.get(url, config)),
  post: (url, body, config) => unwrap(http.post(url, body, config)),
  put: (url, body, config) => unwrap(http.put(url, body, config)),
  patch: (url, body, config) => unwrap(http.patch(url, body, config)),
  delete: (url, config) => unwrap(http.delete(url, config))
}
