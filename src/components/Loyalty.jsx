import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, X, ShieldCheck, Sparkles } from 'lucide-react'

const TIERS = [
  {
    name: 'Silver',
    threshold: 'From first visit',
    color: '#A8A8A8',
    borderColor: 'rgba(168,168,168,0.4)',
    benefits: ['5% off all services','Birthday treatment gift','Early access to bookings'],
  },
  {
    name: 'Gold',
    threshold: 'After AED 5,000 spend',
    color: '#C9A96E',
    borderColor: 'rgba(201,169,110,0.6)',
    benefits: ['15% off all services','Quarterly complimentary treatment','Priority scheduling & concierge'],
  },
  {
    name: 'Diamond',
    threshold: 'After AED 20,000 spend',
    color: '#B8D4E8',
    borderColor: 'rgba(184,212,232,0.5)',
    benefits: ['25% off everything, always','Monthly VIP treatment included','Private suite & lifestyle access'],
  },
]

export default function Loyalty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="rewards" ref={ref} className="py-[160px] px-8 md:px-12 bg-[#080808] relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* Left: Tier diagram - Synchronized Imperial Entrance */}
        <motion.div 
          initial={{ opacity:0, y: 50 }} 
          animate={isInView ? { opacity:1, y: 0 } : {}} 
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="relative"
        >
          {/* Animated Clip Overlay to match Portfolio style */}
          <motion.div 
            className="absolute inset-0 z-40 bg-[#080808] pointer-events-none"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={isInView ? { clipPath: "inset(100% 0% 0% 0%)" } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="relative flex flex-col gap-0 max-w-xs mx-auto lg:mx-0">
            {TIERS.map((tier, i) => (
              <div key={tier.name} className="relative flex items-center gap-8">
                {/* Vertical connector */}
                {i < TIERS.length - 1 && (
                  <div className="absolute left-[31px] top-12 bottom-0 w-px -translate-x-1/2 bg-gold/10 z-0" style={{ height:'calc(100% + 32px)' }}>
                    <motion.div
                      initial={{ scaleY:0 }}
                      animate={isInView ? { scaleY:1 } : {}}
                      transition={{ duration:1.2, delay: i*0.4 + 0.6, ease:[0.16,1,0.3,1] }}
                      className="absolute inset-0 origin-top"
                      style={{ background:`linear-gradient(to bottom, ${tier.color}60, ${TIERS[i+1].color}40)` }}
                    />
                  </div>
                )}

                <motion.div
                  initial={{ scale:0, opacity:0 }}
                  animate={isInView ? { scale:1, opacity:1 } : {}}
                  transition={{ duration:0.6, delay: i*0.3 + 0.8, ease:[0.16,1,0.3,1] }}
                  className="relative z-10 flex-shrink-0"
                >
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-[#0D0D0D] shadow-lg"
                    style={{ borderColor: tier.borderColor, boxShadow:`0 0 30px ${tier.color}15` }}
                  >
                    <span className="font-serif font-light text-sm" style={{ color: tier.color }}>
                      {tier.name[0]}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity:0, x:-20 }}
                  animate={isInView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.7, delay: i*0.3 + 1.0 }}
                  className={`py-10 flex flex-col gap-2 ${i < TIERS.length - 1 ? 'pb-14' : ''}`}
                >
                  <div className="font-sans text-[12px] tracking-[0.35em] uppercase mb-1" style={{ color: tier.color }}>{tier.name}</div>
                  <div className="font-sans text-[10px] tracking-[0.2em] text-grey/40 uppercase">{tier.threshold}</div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {tier.benefits.map(b => (
                      <li key={b} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                        <span className="font-sans text-xs text-grey/55 leading-relaxed tracking-wide">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity:0, y:30 }} 
          animate={isInView?{opacity:1,y:0}:{}} 
          transition={{ duration:0.9, delay:0.4 }} 
          className="flex flex-col gap-10"
        >
          <div>
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 block mb-6">Rewards Programme</span>
            <h2 className="font-serif font-light text-[clamp(42px,6vw,68px)] text-snow leading-tight tracking-[0.04em]">
              Rewards that <em className="text-gold not-italic">Recognise</em> You
            </h2>
          </div>

          <div className="h-px bg-gradient-to-r from-gold/30 to-transparent w-full" />

          <p className="font-sans font-light text-[#9A8F8A]/70 text-base leading-[1.8] tracking-wide">
            Every visit deepens your relationship with LUMAE. Our loyalty programme evolves with you — from your first appointment to a lifetime of curated privileges. The more you invest in yourself, the more we invest in you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {['Join free — no minimum spend','Points accumulate automatically','Tier upgrades apply instantly','Benefits never expire'].map(b => (
              <div key={b} className="flex items-center gap-3 group">
                <Check size={14} className="text-gold flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-sans text-[13px] text-grey/70 tracking-wide">{b}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative font-sans text-[11px] tracking-[0.4em] uppercase text-bg bg-gold border border-gold px-14 py-5 hover:bg-transparent hover:text-gold transition-all duration-500 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              Join Free
            </button>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-grey/30 mt-6 flex items-center gap-2">
              <ShieldCheck size={10} className="text-gold/40" />
              No credit card required · Instant Silver status
            </p>
          </div>
        </motion.div>
      </div>

      {/* High-End "Coming Soon" Modal with Synchronized Imperial Animation */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Card with Imperial Upward Clip Reveal */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0D0D0D] border border-gold/10 p-10 md:p-16 overflow-hidden"
            >
              {/* Imperial Clip Overlay for Modal */}
              <motion.div 
                className="absolute inset-0 z-40 bg-[#0D0D0D] pointer-events-none"
                initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(100% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              />

              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-grey/40 hover:text-gold transition-colors duration-300 z-50"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                  className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mb-8 bg-gold/[0.03]"
                >
                  <Sparkles size={24} className="text-gold" strokeWidth={1.2} />
                </motion.div>

                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold mb-6 block"
                >
                  Evolving Excellence
                </motion.span>

                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="font-serif text-[clamp(32px,5vw,48px)] text-snow leading-tight tracking-[0.04em] mb-8"
                >
                  Digital <em className="text-gold not-italic">Concierge</em> <br/> Coming Soon
                </motion.h3>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full mb-10" 
                />

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="font-sans font-light text-grey/60 text-sm leading-relaxed mb-12 max-w-sm"
                >
                  We are currently refining the digital LUMAE experience. Our exclusive membership portal and automated rewards tracking will be unveiled in the coming weeks.
                </motion.p>

                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  onClick={() => setIsModalOpen(false)}
                  className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 px-12 py-4 hover:bg-gold hover:text-bg transition-all duration-500"
                >
                  Continue Exploration
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
