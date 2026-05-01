import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageIntro({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1400)
    const t3 = setTimeout(() => { setPhase(3); onDone?.() }, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0D0D0D] flex flex-col items-center justify-center"
        >
          {/* Top/bottom wipe lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-px bg-gold/30 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gold/30 origin-right"
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              letterSpacing: phase >= 1 ? '0.6em' : '0.2em',
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light text-5xl text-gold"
          >
            LUMAE
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[9px] tracking-[0.4em] uppercase text-gold/60 mt-4"
          >
            Beauty Atelier · Dubai
          </motion.div>

          {/* Loading bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-gold/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gold/40 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
