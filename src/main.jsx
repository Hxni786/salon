import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Lenis smooth scroll — cinematic feel
import Lenis from 'lenis'

// Only init on desktop (>768px) — native scroll on mobile
if (window.innerWidth >= 768) {
  const lenis = new Lenis({
    lerp: 0.075,
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
