import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { id:1, quote:'LUMAE transformed not just my appearance but my entire sense of self. Every detail was attended to with extraordinary precision and care.',        name:'Hessa Al-Mansouri', city:'Dubai, UAE',      stars:5 },
  { id:2, quote:'The bridal experience was beyond anything I imagined. Layla understood exactly what I envisioned — timeless, ethereal, completely me.',         name:'Olivia Marchetti',  city:'Milan, Italy',    stars:5 },
  { id:3, quote:'I have visited salons across Paris and London. Nothing compares to the artistry and discretion that LUMAE delivers consistently.',              name:'Camille Fontaine',  city:'Paris, France',   stars:5 },
  { id:4, quote:'As someone in the public eye, I need absolute discretion and perfection. LUMAE delivers both, every single appointment, without exception.',    name:'A.K.',              city:'Abu Dhabi, UAE',  stars:5 },
  { id:5, quote:'The colour treatment elevated my entire look. Sofia is a genius — she saw exactly what my hair needed before I could even describe it.',        name:'Priya Nair',        city:'London, UK',      stars:5 },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [curr, setCurr] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)

  const paginate = (newDir) => {
    setDirection(newDir)
    setCurr(prev => (prev + newDir + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => paginate(1), 5000)
    return () => clearInterval(t)
  }, [paused])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)'
    })
  }

  return (
    <section id="stories" ref={ref} className="py-[160px] px-8 md:px-12 bg-[#0A0A0A] relative overflow-hidden">
      {/* Cinematic Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[400px] text-gold/[0.02] leading-none pointer-events-none select-none italic">"</div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.9 }} 
          className="max-w-2xl mx-auto text-center mb-24"
        >
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 block mb-5">Voices of Lumae</span>
          <h2 className="font-serif font-light text-[clamp(48px,7vw,82px)] text-snow tracking-[0.05em] leading-tight mb-8">
            Client <em className="text-gold not-italic">Stories</em>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative group/carousel">
          {/* Imperial Navigation Controls */}
          <div className="absolute top-1/2 -left-4 md:-left-24 -translate-y-1/2 z-30 hidden lg:block">
            <button 
              onClick={() => paginate(-1)}
              className="w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center group/btn hover:border-gold/40 transition-all duration-500 bg-bg/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-full bg-gold/5 scale-0 group-hover/btn:scale-100 transition-transform duration-500" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover/btn:-translate-x-1 transition-transform duration-500">
                <path d="M15 18L9 12L15 6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-24 -translate-y-1/2 z-30 hidden lg:block">
            <button 
              onClick={() => paginate(1)}
              className="w-16 h-16 rounded-full border border-gold/10 flex items-center justify-center group/btn hover:border-gold/40 transition-all duration-500 bg-bg/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-full bg-gold/5 scale-0 group-hover/btn:scale-100 transition-transform duration-500" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover/btn:translate-x-1 transition-transform duration-500">
                <path d="M9 18L15 12L9 6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }} 
            animate={isInView ? { opacity: 1 } : {}} 
            transition={{ delay: 0.2 }}
            className="relative min-h-[400px] md:min-h-[320px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={curr}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#111] border border-gold/5 p-10 md:p-14 relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/5 to-transparent pointer-events-none" />
                
                <div className="flex gap-1 mb-6">
                  {Array.from({length: TESTIMONIALS[curr].stars}).map((_, i) => (
                    <motion.svg 
                      key={i} 
                      width="14" height="14" viewBox="0 0 12 12" fill="#C9A96E"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      <path d="M6 1l1.4 2.8L10.5 4.2l-2.25 2.2.53 3.1L6 8l-2.78 1.5.53-3.1L1.5 4.2l3.1-.4z"/>
                    </motion.svg>
                  ))}
                </div>

                <p className="font-serif font-light italic text-snow/90 text-xl md:text-2xl leading-relaxed tracking-wide mb-10">
                  “{TESTIMONIALS[curr].quote}”
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-gold/15 flex items-center justify-center flex-shrink-0 group-hover/carousel:border-gold/40 transition-colors duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gold/5" />
                      <span className="font-serif text-lg text-gold/80 relative z-10">{TESTIMONIALS[curr].name[0]}</span>
                    </div>
                    <div>
                      <div className="font-sans text-[12px] tracking-[0.3em] uppercase text-gold mb-1">{TESTIMONIALS[curr].name}</div>
                      <div className="font-sans text-[10px] tracking-[0.2em] text-grey/30">{TESTIMONIALS[curr].city}</div>
                    </div>
                  </div>
                  
                  {/* Progress Counter */}
                  <div className="font-sans text-[10px] tracking-[0.4em] text-gold/20">
                    <span className="text-gold/60">{curr + 1}</span> / {TESTIMONIALS.length}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dot Pagination & Mobile Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button 
              onClick={() => paginate(-1)}
              className="lg:hidden w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    setDirection(i > curr ? 1 : -1)
                    setCurr(i)
                  }}
                  className={`transition-all duration-700 rounded-full ${i === curr ? 'w-8 h-[2px] bg-gold' : 'w-2 h-[2px] bg-gold/20 hover:bg-gold/40'}`}
                />
              ))}
            </div>

            <button 
              onClick={() => paginate(1)}
              className="lg:hidden w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
