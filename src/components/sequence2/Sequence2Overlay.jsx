import { useScroll, useTransform, motion } from 'framer-motion'

const textShadow = `
  0 2px 20px rgba(0,0,0,0.95),
  0 0 40px rgba(0,0,0,0.80),
  0 4px 40px rgba(0,0,0,0.70)
`

/**
 * Sequence2Overlay — 4-phase scroll-linked text overlays for Sequence 2.
 * Mirrors the HeroOverlay architecture exactly.
 * All text: pointer-events none. CTA button: pointer-events auto.
 */
export default function Sequence2Overlay({ scrollRef }) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  /* ─── OVERLAY 1 — Center intro (0% → 22%) ─── */
  const o1Opacity = useTransform(scrollYProgress, [0.00, 0.05, 0.17, 0.22], [0, 1, 1, 0])
  const o1Y = useTransform(scrollYProgress, [0.00, 0.22], ['40px', '-20px'])

  /* ─── OVERLAY 2 — Bottom-left (25% → 47%) ─── */
  const o2Opacity = useTransform(scrollYProgress, [0.25, 0.31, 0.42, 0.47], [0, 1, 1, 0])
  const o2X = useTransform(scrollYProgress, [0.25, 0.47], ['-60px', '0px'])

  /* ─── OVERLAY 3 — Bottom-right (52% → 74%) ─── */
  const o3Opacity = useTransform(scrollYProgress, [0.52, 0.57, 0.69, 0.74], [0, 1, 1, 0])
  const o3X = useTransform(scrollYProgress, [0.52, 0.74], ['60px', '0px'])

  /* ─── OVERLAY 4 — Center CTA (80% → 100%) ─── */
  const o4Opacity = useTransform(scrollYProgress, [0.80, 0.86, 0.97, 1.0], [0, 1, 1, 0])
  const o4Y = useTransform(scrollYProgress, [0.80, 1.0], ['50px', '0px'])
  const o4Scale = useTransform(scrollYProgress, [0.80, 1.0], [0.95, 1])

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">

      {/* ═══════════════════════════════════════════
          OVERLAY 1 — "Begin Your Journey." (center)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o1Opacity, y: o1Y }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Gold overline */}
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#C9A96E',
          marginBottom: '20px',
          fontWeight: 400,
          textShadow,
        }}>
          LUMAE · DUBAI
        </p>

        {/* Main heading line 1 */}
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 300,
          color: '#FAFAFA',
          lineHeight: 1.0,
          letterSpacing: '0.02em',
          marginBottom: '8px',
          textShadow,
        }}>
          Begin Your
        </h2>

        {/* Main heading line 2 — gold italic */}
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#C9A96E',
          lineHeight: 1.0,
          letterSpacing: '0.02em',
          marginBottom: '32px',
          textShadow,
        }}>
          Journey.
        </h2>

        {/* Hairline gold divider */}
        <div style={{
          width: '80px',
          height: '1px',
          background: 'rgba(201,169,110,0.5)',
          margin: '0 auto 24px auto',
        }} />

        {/* Subtitle */}
        <p style={{
          fontSize: '13px',
          letterSpacing: '0.15em',
          color: 'rgba(250,250,250,0.55)',
          fontWeight: 300,
          textTransform: 'uppercase',
          textShadow,
        }}>
          A sanctuary of beauty awaits you
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 2 — "Every visit is an experience." (bottom-left)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o2Opacity, x: o2X }}
        className="absolute inset-0 flex items-end"
      >
        <div style={{
          paddingLeft: '8vw',
          paddingBottom: '10vh',
          maxWidth: '480px',
        }}>
          {/* Gold overline */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '16px',
            textShadow,
          }}>
            YOUR EXPERIENCE
          </p>

          {/* Heading line 1 */}
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300,
            color: '#FAFAFA',
            lineHeight: 1.1,
            marginBottom: '4px',
            textShadow,
          }}>
            Every visit is
          </h3>

          {/* Heading line 2 — gold italic */}
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#C9A96E',
            lineHeight: 1.1,
            marginBottom: '20px',
            textShadow,
          }}>
            an experience.
          </h3>

          {/* Body paragraph */}
          <p style={{
            fontSize: '13px',
            lineHeight: 1.8,
            color: 'rgba(250,250,250,0.55)',
            fontWeight: 300,
            maxWidth: '340px',
            marginBottom: '24px',
            textShadow,
          }}>
            Private suites. Expert artisans.
            Moments crafted entirely for you.
          </p>

          {/* 3 feature lines */}
          {[
            'Complimentary consultation included',
            'Premium international products only',
            'Private suite available on request',
          ].map((feature, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#C9A96E', fontSize: '8px' }}>✦</span>
              <span style={{
                fontSize: '12px',
                color: 'rgba(250,250,250,0.65)',
                letterSpacing: '0.05em',
                fontWeight: 300,
                textShadow,
              }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 3 — "Dubai's most exclusive space." (bottom-right)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o3Opacity, x: o3X }}
        className="absolute inset-0 flex items-end justify-end"
      >
        <div style={{
          paddingRight: '8vw',
          paddingBottom: '10vh',
          maxWidth: '420px',
          textAlign: 'right',
        }}>
          {/* Gold overline */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '16px',
            textAlign: 'right',
            textShadow,
          }}>
            THE ATELIER
          </p>

          {/* Heading line 1 */}
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300,
            color: '#FAFAFA',
            lineHeight: 1.1,
            marginBottom: '4px',
            textAlign: 'right',
            textShadow,
          }}>
            Dubai's most
          </h3>

          {/* Heading line 2 — gold italic */}
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#C9A96E',
            lineHeight: 1.1,
            marginBottom: '28px',
            textAlign: 'right',
            textShadow,
          }}>
            exclusive space.
          </h3>

          {/* 3 stats row */}
          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}>
            {[
              { number: '12+', label: 'Years of Mastery' },
              { number: '4800+', label: 'Happy Clients' },
              { number: '22', label: 'Awards Won' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 300,
                  color: '#C9A96E',
                  lineHeight: 1.0,
                  marginBottom: '4px',
                  textShadow,
                }}>
                  {stat.number}
                </p>
                <p style={{
                  fontSize: '10px',
                  color: 'rgba(250,250,250,0.45)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 300,
                  textShadow,
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Hairline gold divider — right aligned */}
          <div style={{
            width: '60px',
            height: '1px',
            background: 'rgba(201,169,110,0.45)',
            marginLeft: 'auto',
            marginBottom: '12px',
          }} />

          {/* Location tag */}
          <p style={{
            fontSize: '10px',
            color: '#C9A96E',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textAlign: 'right',
            textShadow,
          }}>
            Dubai · UAE
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          OVERLAY 4 — "Schedule a Consultation." (center CTA)
          ═══════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: o4Opacity, y: o4Y, scale: o4Scale }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Dark scrim backdrop — ensures text readability over bright frames */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse 80% 70% at 50% 50%,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.75) 40%,
              rgba(0,0,0,0.55) 70%,
              rgba(0,0,0,0.30) 100%
            )`,
          }}
        />

        {/* Content container — relative to sit above scrim */}
        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Gold overline */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '20px',
            textShadow,
          }}>
            YOUR TRANSFORMATION AWAITS
          </p>

          {/* Heading line 1 */}
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 300,
            color: '#FFFFFF',
            lineHeight: 1.0,
            letterSpacing: '0.02em',
            marginBottom: '8px',
            textShadow: '0 2px 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9), 0 4px 50px rgba(0,0,0,0.8)',
          }}>
            Schedule a
          </h2>

          {/* Heading line 2 — gold italic */}
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#C9A96E',
            lineHeight: 1.0,
            letterSpacing: '0.02em',
            marginBottom: '20px',
            textShadow: '0 2px 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9)',
          }}>
            Consultation.
          </h2>

          {/* Hairline divider */}
          <div style={{
            width: '80px',
            height: '1px',
            background: 'rgba(201,169,110,0.6)',
            margin: '0 auto 20px auto',
          }} />

          {/* Subtitle */}
          <p style={{
            fontSize: '13px',
            color: 'rgba(250,250,250,0.80)',
            letterSpacing: '0.12em',
            fontWeight: 300,
            textTransform: 'uppercase',
            marginBottom: '36px',
            textShadow: '0 2px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)',
          }}>
            Reserve your private session at LUMAE Atelier
          </p>

          {/* CTA Button — pointer-events AUTO */}
          <motion.button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto"
            style={{
              border: '1px solid rgba(201,169,110,0.7)',
              color: '#C9A96E',
              background: 'rgba(0,0,0,0.4)',
              padding: '16px 48px',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 400,
              borderRadius: '0px',
              transition: 'all 0.4s ease',
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#C9A96E'
              e.currentTarget.style.color = '#0D0D0D'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.4)'
              e.currentTarget.style.color = '#C9A96E'
            }}
          >
            Book Your Consultation →
          </motion.button>

        </div>
      </motion.div>

    </div>
  )
}
