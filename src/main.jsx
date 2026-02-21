import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// If the server served our SPA at a path (e.g. /trades/millwright/year-2) with no hash, redirect to the hash
// version so HashRouter can route correctly. This makes /trades/* work even when the host doesn't rewrite paths.
const path = window.location.pathname
if (path && path !== '/' && !window.location.hash) {
  window.location.replace(window.location.origin + '/#' + path + window.location.search)
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
  )
}
