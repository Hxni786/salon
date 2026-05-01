import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImageSequence } from '../../hooks/useImageSequence'
import Sequence2Overlay from './Sequence2Overlay'

/**
 * Sequence2Canvas — Second scroll-linked image sequence.
 * 700vh outer scroll container → sticky 100vh viewport → fullscreen canvas.
 * Premium depth layering: vignettes, film grain, radial spotlight, gold tint.
 *
 * 120 frames (000–119), PNG, 3-digit padding.
 * Plays immediately after HeroCanvas in the page flow.
 */
export default function Sequence2Canvas() {
  const scrollRef = useRef(null)

  const { canvasRef, isLoaded, loadProgress } = useImageSequence({
    folder: '/sequence2',
    frameCount: 120,
    filePattern: 'frame_{n}_delay-0.066s.png',
    scrollRef,
  })

  return (
    <>
      {/* Top seamless bleed */}
      <div className="h-32 bg-[#121212]" />

      {/* Main 700vh scroll container */}
      <div
        ref={scrollRef}
        style={{ height: '700vh', position: 'relative' }}
        className="bg-[#121212]"
      >

        {/* ═══ Inline Loader ═══ */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              className="sticky top-0 h-screen w-full z-50 flex items-center justify-center bg-[#121212]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#C9A96E]"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase">
                  Preparing Your Journey
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ Sticky Canvas Container ═══ */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]"
          style={{ willChange: 'transform' }}
        >

          {/* Canvas — z-index 0 */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block"
            style={{ width: '100%', height: '100%' }}
          />

          {/* ─── 3D PREMIUM DEPTH LAYERS — z-index 10 ─── */}

          {/* Top vignette */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: '180px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
            }}
          />

          {/* Bottom vignette */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: '220px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            }}
          />

          {/* Left edge depth */}
          <div
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{
              width: '160px',
              background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)',
            }}
          />

          {/* Right edge depth */}
          <div
            className="absolute inset-y-0 right-0 z-10 pointer-events-none"
            style={{
              width: '160px',
              background: 'linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 100%)',
            }}
          />

          {/* Radial spotlight — 3D depth */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 75% 65% at 50% 48%,
                transparent 35%,
                rgba(0,0,0,0.30) 70%,
                rgba(0,0,0,0.55) 100%
              )`,
            }}
          />

          {/* Film grain — cinematic texture */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              opacity: 0.04,
              mixBlendMode: 'overlay',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
            }}
          />

          {/* Gold tint — luxury warmth */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 60% 50% at 50% 50%,
                rgba(201,169,110,0.04) 0%,
                transparent 70%
              )`,
            }}
          />

          {/* Text Overlay — z-index 20 */}
          <Sequence2Overlay scrollRef={scrollRef} />

        </div>
      </div>

      {/* Bottom seamless bleed */}
      <div className="h-32 bg-[#121212]" />
    </>
  )
}
