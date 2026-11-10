import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Application error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="error-page" role="main">
        <div className="error-page__card">
          <span className="error-page__code">Something went wrong</span>
          <h1>This page could not be loaded.</h1>
          <p>Refresh the page to try again. If the problem continues, call us on +91 81252 91166.</p>
          <div className="error-page__actions">
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>
              Refresh page
            </button>
            <a className="btn btn-outline" href="/">
              Back to home
            </a>
          </div>
        </div>
      </main>
    )
  }
}
