import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { getLang, onLangChange } from './i18n'

// Re-render the whole site when the language changes (keyed remount keeps it simple:
// every component calls t() while rendering, so a remount shows the new language).
function Root() {
  const [lang, setLangState] = useState(getLang)
  useEffect(() => onLangChange(setLangState), [])
  return (
    <BrowserRouter key={lang} basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
