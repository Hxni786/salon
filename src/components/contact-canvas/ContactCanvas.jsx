import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImageSequence } from '../../hooks/useImageSequence'
import ContactOverlay from './ContactOverlay'
import ContactContent from './ContactContent'

export default function ContactCanvas({ children }) {
  const scrollRef = useRef(null)

  const { canvasRef, isLoaded, loadProgress } = useImageSequence({
    folder: '/sequence2',
    frameCount: 120, // 000 to 119
    filePattern: 'frame_{n}_delay-0.066s.png',
    scrollRef: scrollRef,
  })

  return (
    <>
      {/* Top seamless bleed — hides edge from section above */}
      <div 
        className="h-40 w-full"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, #0D0D0D)'
        }} 
      />

      {/* Main scroll container — 600vh */}
      <div
        ref={scrollRef}
        style={{ height: '600vh', position: 'relative', isolation: 'isolate' }}
        className="bg-[#0D0D0D]"
      >

        {/* Inline subtle loader */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              className="sticky top-0 h-screen w-full z-50 flex items-center justify-center bg-[#0D0D0D]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#C9A96E]"
                    style={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                  Loading Final Scene
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STICKY CONTAINER ── */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#0D0D0D]"
          style={{ willChange: 'transform' }}
        >

          {/* ── CANVAS — z-index 0 ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block"
            style={{ width: '100%', height: '100%' }}
          />

          {/* ── DEPTH LAYERS — z-index 10 ── */}

          {/* Top vignette — heavy */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: '300px',
              background: 'linear-gradient(to bottom, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.5) 60%, transparent 100%)'
            }}
          />

          {/* Bottom vignette — heavy, blends into true bg */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: '360px',
              background: 'linear-gradient(to top, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.6) 60%, transparent 100%)'
            }}
          />

          {/* Left edge */}
          <div
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{
              width: '280px',
              background: 'linear-gradient(to right, rgba(13,13,13,0.82) 0%, transparent 100%)'
            }}
          />

          {/* Right edge */}
          <div
            className="absolute inset-y-0 right-0 z-10 pointer-events-none"
            style={{
              width: '280px',
              background: 'linear-gradient(to left, rgba(13,13,13,0.82) 0%, transparent 100%)'
            }}
          />

          {/* GLOBAL DARK OVERLAY — z-index 11 above vignettes */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none"
            style={{ background: 'rgba(13,13,13,0.75)' }}
          />

          {/* Radial center cutout */}
          <div
            className="absolute inset-0 z-[12] pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 80% 70% at 50% 50%,
                rgba(0,0,0,0.0) 0%,
                rgba(0,0,0,0.25) 60%,
                rgba(0,0,0,0.55) 100%
              )`
            }}
          />

          {/* Film grain */}
          <div
            className="absolute inset-0 z-[12] pointer-events-none"
            style={{
              opacity: 0.035,
              mixBlendMode: 'overlay',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px'
            }}
          />

          {/* Warm gold tint */}
          <div
            className="absolute inset-0 z-[12] pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 70% 60% at 50% 50%,
                rgba(201,169,110,0.06) 0%,
                transparent 65%
              )`
            }}
          />

          {/* ── CINEMATIC TEXT OVERLAYS — z-index 20 ── */}
          <ContactOverlay scrollRef={scrollRef} />

          {/* ── EXISTING CONTACT CONTENT — z-index 30 ── */}
          <ContactContent scrollRef={scrollRef}>
            {children}
          </ContactContent>

        </div>
      </div>

      {/* Bottom true background — page ends cleanly */}
      <div className="h-px bg-[#0D0D0D]" />
    </>
  )
}
