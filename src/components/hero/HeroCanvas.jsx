import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImageSequence } from '../../hooks/useImageSequence'
import HeroOverlay from './HeroOverlay'

/**
 * HeroCanvas — Scroll-linked image sequence hero.
 * 500vh outer scroll container → sticky 100vh viewport → fullscreen canvas.
 * Premium depth layering: vignettes, film grain, radial glow.
 */
export default function HeroCanvas() {
  const scrollRef = useRef(null)

  const { canvasRef, isLoaded, loadProgress } = useImageSequence({
    folder: '/sequence1',
    frameCount: 63,
    filePattern: 'frame_{n}_delay-0.066s.png',
    scrollRef,
  })

  return (
    <div
      ref={scrollRef}
      style={{ height: '500vh', position: 'relative' }}
    >
      {/* ═══ Loading Screen ═══ */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Brand mark */}
            <div className="font-serif font-light text-4xl text-[#C9A96E] tracking-[0.5em] mb-8">
              LUMAE
            </div>

            {/* Gold thin progress bar */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C9A96E]"
                style={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-3 text-white/30 text-xs tracking-[0.2em] uppercase">
              {loadProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Sticky Canvas Container ═══ */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Canvas — Layer 0 */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* ─── 3D Premium Depth Layers ─── */}

        {/* Top vignette — deep fade */}
        <div
          className="absolute inset-x-0 top-0 h-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
        />

        {/* Bottom vignette — fade into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
        />

        {/* Left edge vignette */}
        <div
          className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }}
        />

        {/* Right edge vignette */}
        <div
          className="absolute inset-y-0 right-0 w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)' }}
        />

        {/* Noise texture overlay — film grain premium feel */}
        <div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Radial center glow — 3D spotlight depth */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse 70% 60% at 50% 50%,
              transparent 40%,
              rgba(0,0,0,0.35) 100%
            )`,
          }}
        />

        {/* Text Overlay — z-index 20, above all depth layers */}
        <HeroOverlay scrollRef={scrollRef} />
      </div>
    </div>
  )
}
