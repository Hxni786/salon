import { useScroll, useTransform, motion } from 'framer-motion'

export default function ContactContent({ scrollRef, children }) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end']
  })

  // Opacity reaches 1.0, starts early, NO fade-out at end
  const opacity = useTransform(scrollYProgress, [0.20, 0.32], [0, 1])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-[30] flex items-start justify-center pointer-events-auto"
    >
      <div
        className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-0 pb-2 overflow-y-auto max-h-[100vh]"
        style={{
          background: 'rgba(0,0,0,0.96)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(201,169,110,0.18)',
          borderRadius: '4px',
          color: '#FAFAFA',
          boxShadow: `
            0 0 0 1px rgba(201,169,110,0.08),
            0 32px 80px rgba(0,0,0,0.8),
            inset 0 1px 0 rgba(201,169,110,0.12)
          `
        }}
      >
        <style>{`
          /* Shining Text Effect */
          .contact-content-wrapper h2,
          .contact-content-wrapper h3 {
            text-shadow:
              0 0 10px rgba(255,255,255,0.5),
              0 0 20px rgba(201,169,110,0.3) !important;
          }
          .contact-content-wrapper p,
          .contact-content-wrapper span,
          .contact-content-wrapper div {
            text-shadow:
              0 0 8px rgba(255,255,255,0.4);
          }
          .contact-content-wrapper label {
            text-shadow:
              0 0 8px rgba(201,169,110,0.6) !important;
          }
          
          /* Override to make canvas visible behind */
          .contact-content-wrapper > section,
          .contact-content-wrapper > div {
            background: transparent !important;
          }
          
          /* Fix 6 — Input styling for dark canvas context */
          .contact-content-wrapper input,
          .contact-content-wrapper textarea,
          .contact-content-wrapper select {
            background: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(201,169,110,0.25) !important;
            color: #FAFAFA !important;
          }
          .contact-content-wrapper input:focus,
          .contact-content-wrapper textarea:focus,
          .contact-content-wrapper select:focus {
            border-color: rgba(201,169,110,0.6) !important;
            background: rgba(255,255,255,0.09) !important;
            outline: none !important;
            box-shadow: 0 0 0 1px rgba(201,169,110,0.2) !important;
          }
          .contact-content-wrapper input::placeholder,
          .contact-content-wrapper textarea::placeholder {
            color: rgba(250,250,250,0.30) !important;
          }
          .contact-content-wrapper button {
            text-shadow: none;
          }
        `}</style>
        <div className="contact-content-wrapper relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

