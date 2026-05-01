import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetDate) - new Date())
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function CountdownBox({ val, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-serif font-light text-3xl md:text-4xl text-gold tracking-wider w-14 text-center border border-gold/15 py-2 bg-bg/40">
        {String(val).padStart(2,'0')}
      </div>
      <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-grey/40">{label}</span>
    </div>
  )
}

export default function Offers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deadline = new Date(Date.now() + 3*24*3600*1000 + 14*3600*1000 + 37*60*1000)
  const time = useCountdown(deadline)

  return (
    <section id="offers" ref={ref} className="py-[160px] px-8 md:px-12 bg-[#0D0D0D] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.9 }} 
          className="text-center mb-24"
        >
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 block mb-5">Limited Time</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-tight">
            Exclusive <em className="text-gold not-italic">Offers</em>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-48 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1 — Bridal Offer with Imperial Entrance */}
          <motion.div
            initial={{ opacity:0, y: 50 }}
            animate={isInView ? { opacity:1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="group relative overflow-hidden border border-rose/10 hover:border-rose/30 transition-all duration-700 p-10 md:p-14 flex flex-col justify-between min-h-[480px] bg-[#0F0909]"
          >
            {/* Imperial Clip Reveal for Card 1 */}
            <motion.div 
              className="absolute inset-0 z-40 bg-[#0F0909] pointer-events-none"
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={isInView ? { clipPath: "inset(100% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="absolute inset-0 pointer-events-none"
              style={{ background:'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(183,110,121,0.05) 0%, transparent 70%)' }} />
            
            <div className="relative z-10">
              <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose/60 mb-6">Bridal Season</div>
              <h3 className="font-serif font-light text-snow text-[clamp(36px,4vw,52px)] leading-[1.1] tracking-[0.05em] mb-4">
                20<span className="text-rose">%</span> Off<br/>Bridal Package
              </h3>
              <p className="font-sans font-light text-grey/50 text-sm leading-relaxed mb-10 max-w-sm">
                Book your complete bridal experience — hair, makeup, and prep package — at an exceptional rate. Limited availability.
              </p>
            </div>

            <div className="relative z-10">
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-grey/30 mb-5">Offer expires in</div>
              <div className="flex items-end gap-3 mb-10">
                <CountdownBox val={time.d} label="Days" />
                <div className="font-serif text-2xl text-gold/20 mb-3">:</div>
                <CountdownBox val={time.h} label="Hours" />
                <div className="font-serif text-2xl text-gold/20 mb-3">:</div>
                <CountdownBox val={time.m} label="Min" />
                <div className="font-serif text-2xl text-gold/20 mb-3">:</div>
                <CountdownBox val={time.s} label="Sec" />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="font-sans text-[11px] tracking-[0.4em] uppercase text-rose border border-rose/20 px-10 py-4 hover:bg-rose hover:text-snow transition-all duration-500 overflow-hidden relative group/btn"
              >
                <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                Claim Offer
              </button>
            </div>
          </motion.div>

          {/* Card 2 — Free Consultation with Imperial Entrance */}
          <motion.div
            initial={{ opacity:0, y: 50 }}
            animate={isInView ? { opacity:1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="group relative overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-700 p-10 md:p-14 flex flex-col justify-between min-h-[480px] bg-[#0D0B07]"
          >
            {/* Imperial Clip Reveal for Card 2 */}
            <motion.div 
              className="absolute inset-0 z-40 bg-[#0D0B07] pointer-events-none"
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={isInView ? { clipPath: "inset(100% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="absolute inset-0 pointer-events-none"
              style={{ background:'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">New Guests</div>
              <h3 className="font-serif font-light text-snow text-[clamp(36px,4vw,52px)] leading-[1.1] tracking-[0.05em] mb-4">
                Complimentary<br/><em className="text-gold not-italic">Consultation</em>
              </h3>
              <p className="font-sans font-light text-grey/50 text-sm leading-relaxed mb-10 max-w-sm">
                Your first visit includes a 30-minute private consultation with a senior specialist — discover your bespoke treatment path.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col gap-5 mb-10">
                {['Personalized treatment assessment','Skin & hair analysis','Custom recommendation plan','No purchase necessary'].map(b => (
                  <div key={b} className="flex items-center gap-4 group/item">
                    <div className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="font-sans text-[13px] text-grey/60 tracking-wide">{b}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="font-sans text-[11px] tracking-[0.4em] uppercase text-bg bg-gold border border-gold px-10 py-4 hover:bg-transparent hover:text-gold transition-all duration-500 overflow-hidden relative group/btn"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                Claim Offer
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* High-End "Coming Soon" Modal (Same as Loyalty) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0D0D0D] border border-gold/10 p-10 md:p-16 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 z-40 bg-[#0D0D0D] pointer-events-none"
                initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(100% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              />

              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              
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
                  Limited Engagement
                </motion.span>

                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="font-serif text-[clamp(32px,5vw,48px)] text-snow leading-tight tracking-[0.04em] mb-8"
                >
                  Priority <em className="text-gold not-italic">Booking</em> <br/> Coming Soon
                </motion.h3>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full mb-10" 
                />

                <p className="font-sans font-light text-grey/60 text-sm leading-relaxed mb-12 max-w-sm">
                  We are currently integrating our exclusive offer claim system. Online redemption for bridal and consultation packages will be live in the coming weeks.
                </p>

                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  onClick={() => setIsModalOpen(false)}
                  className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 px-12 py-4 hover:bg-gold hover:text-bg transition-all duration-500"
                >
                  Return to Portfolio
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
