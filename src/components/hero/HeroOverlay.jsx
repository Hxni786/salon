import { useScroll, useTransform, motion } from 'framer-motion'

const textShadow = '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)'

/**
 * HeroOverlay — 4-phase scroll-linked text overlays.
 * All text is position: absolute, z-20, pointer-events: none.
 * Buttons re-enable pointer-events.
 */
export default function HeroOverlay({ scrollRef }) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  /* ─── OVERLAY 1 — Center intro (0% → 28%) ─── */
  const o1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0])
  const o1Y = useTransform(scrollYProgress, [0, 0.28], [30, -30])

  /* ─── OVERLAY 2 — Expertise, left (30% → 55%) ─── */
  const o2Opacity = useTransform(scrollYProgress, [0.30, 0.36, 0.50, 0.55], [0, 1, 1, 0])
  const o2X = useTransform(scrollYProgress, [0.30, 0.55], [-50, 0])

  /* ─── OVERLAY 3 — Approach, right (62% → 88%) ─── */
  const o3Opacity = useTransform(scrollYProgress, [0.62, 0.68, 0.83, 0.88], [0, 1, 1, 0])
  const o3X = useTransform(scrollYProgress, [0.62, 0.88], [50, 0])

  /* ─── OVERLAY 4 — CTA, bottom center (90% → 100%) ─── */
  const o4Opacity = useTransform(scrollYProgress, [0.90, 0.95, 0.99, 1.0], [0, 1, 1, 0])
  const o4Y = useTransform(scrollYProgress, [0.90, 1.0], [40, 0])

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">

      {/* ═══════════════════════════════════════════
          OVERLAY 1 — HERO INTRO (center)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o1Opacity, y: o1Y }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
      >
        {/* Overline */}
        <span className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-6" style={{ textShadow }}>
          Dubai's Premier Beauty Atelier
        </span>

        {/* Main Title */}
        <h1 className="font-serif font-light text-[clamp(72px,12vw,160px)] text-[#FAFAFA] leading-none tracking-[0.1em] mb-4">
          LUMAE
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic font-medium text-[clamp(20px,3vw,32px)] text-[#C9A96E] tracking-[0.12em] mb-8" style={{ textShadow }}>
          Redefine Your Radiance
        </p>

        {/* Gold Divider */}
        <div
          className="mx-auto mb-10"
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />

        {/* Scroll Hint */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">
            Scroll to explore
          </span>
          <div className="hero-scroll-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 pointer-events-auto">
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            <span>Book Appointment</span>
          </button>
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            <span>Explore Services</span>
          </button>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 2 — EXPERTISE (left)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o2Opacity, x: o2X }}
        className="absolute inset-0 flex items-center"
      >
        <div className="pl-[8vw] max-w-xl">
          <span className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A96E]/70 block mb-5" style={{ textShadow }}>
            Expertise
          </span>
          <h2 className="font-serif font-light text-[clamp(36px,5vw,64px)] text-[#FAFAFA] leading-[1.1] tracking-[0.04em] mb-2">
            Masterful
          </h2>
          <h2 className="font-serif font-medium text-[clamp(36px,5vw,64px)] text-[#C9A96E] italic leading-[1.1] tracking-[0.04em] mb-6" style={{ textShadow }}>
            Artistry
          </h2>
          <p className="font-sans font-light text-[#9A8F8A]/70 text-sm leading-relaxed mb-8 max-w-md">
            Our atelier blends timeless technique with avant-garde innovation — 
            every creation is a bespoke work of art tailored to your unique beauty.
          </p>
          {/* Skill Pills */}
          <div className="flex flex-wrap gap-3">
            {['Hair Design', 'Color Alchemy', 'Bridal Couture'].map((skill) => (
              <span
                key={skill}
                className="font-sans text-[9px] tracking-[0.2em] uppercase px-5 py-2.5 border border-[#C9A96E]/20 text-[#C9A96E]/80"
                style={{
                  background: 'rgba(201,169,110,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 3 — APPROACH (right)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o3Opacity, x: o3X }}
        className="absolute inset-0 flex items-center justify-end"
      >
        <div className="pr-[8vw] max-w-xl text-right">
          <span className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A96E]/70 block mb-5" style={{ textShadow }}>
            Approach
          </span>
          <h2 className="font-serif font-light text-[clamp(36px,5vw,64px)] text-[#FAFAFA] leading-[1.1] tracking-[0.04em] mb-2">
            Luxurious
          </h2>
          <h2 className="font-serif font-medium text-[clamp(36px,5vw,64px)] text-[#C9A96E] italic leading-[1.1] tracking-[0.04em] mb-6" style={{ textShadow }}>
            Experience
          </h2>
          <p className="font-sans font-light text-[#9A8F8A]/70 text-sm leading-relaxed mb-10 max-w-md ml-auto">
            From the moment you step in, every detail is curated to immerse you 
            in an atmosphere of refined elegance and personalized care.
          </p>
          {/* Stats */}
          <div className="flex justify-end gap-12">
            {[
              { num: '12+', label: 'Years' },
              { num: '5K+', label: 'Clients' },
              { num: '20+', label: 'Awards' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif font-medium text-3xl text-[#C9A96E] tracking-wider mb-1" style={{ textShadow }}>
                  {stat.num}
                </div>
                <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 4 — CTA / TRANSITION (bottom center)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o4Opacity, y: o4Y }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh]"
      >
        <span className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A96E]/70 block mb-4" style={{ textShadow }}>
          Selected Work
        </span>
        <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-[#FAFAFA] tracking-[0.06em] leading-none mb-4">
          The Work.
        </h2>
        <p className="font-sans text-[11px] tracking-[0.2em] text-white/30">
          Scroll ends here — explore below ↓
        </p>
      </motion.div>
    </div>
  )
}
