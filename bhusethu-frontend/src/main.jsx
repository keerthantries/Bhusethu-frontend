import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { queryClient } from './queryClient.js'
import { api } from './api.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// The vanilla interaction script is loaded outside the bundle, so expose the
// shared axios client for its form submissions.
window.bhusethuApi = api

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
)
