import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import salonImg from '../assets/salon-interior.webp'

const stats = [
  { value: 12, suffix: '+', label: 'Years of Excellence' },
  { value: 4800, suffix: '+', label: 'Clients Transformed' },
  { value: 22, suffix: '', label: 'Industry Awards' },
]

function CountUp({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 1800
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0D0D0D] relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent hidden md:block" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

        {/* Left — Image Section with Premium Reveals */}
        <div className="relative">
          {/* Main Container — 3:4 Aspect Ratio */}
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2px] bg-card border border-gold/15 group">
            
            {/* 1. Image Entrance & Ken Burns Hover */}
            <motion.img
              src={salonImg}
              alt="LUMAE Salon Interior"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
              transition={{ 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.3 
              }}
              className="w-full h-full object-cover object-[center_top] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />

            {/* 2. Gold Curtain Wipe (slides UP and exits) */}
            <motion.div
              initial={{ scaleY: 1 }}
              animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.76, 0, 0.24, 1], 
                delay: 0.2 
              }}
              style={{ originY: 0 }} // transformOrigin: "top" ensures it wipes UPWARDS
              className="absolute inset-0 z-10 bg-[#C9A96E] pointer-events-none"
            />

            {/* 3. Corner Accents Drawing In */}
            {/* TOP LEFT */}
            <div className="absolute top-3 left-3 w-4 h-4 z-20 pointer-events-none">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-0 left-0 h-px bg-gold/50"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-0 left-0 w-px bg-gold/50"
              />
            </div>
            {/* TOP RIGHT */}
            <div className="absolute top-3 right-3 w-4 h-4 z-20 pointer-events-none">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-0 right-0 h-px bg-gold/50"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-0 right-0 w-px bg-gold/50"
              />
            </div>
            {/* BOTTOM LEFT */}
            <div className="absolute bottom-3 left-3 w-4 h-4 z-20 pointer-events-none">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-0 left-0 h-px bg-gold/50"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-0 left-0 w-px bg-gold/50"
              />
            </div>
            {/* BOTTOM RIGHT */}
            <div className="absolute bottom-3 right-3 w-4 h-4 z-20 pointer-events-none">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-0 right-0 h-px bg-gold/50"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-0 right-0 w-px bg-gold/50"
              />
            </div>

            {/* Static Inner Decoration */}
            <div className="absolute inset-6 border border-gold/10 z-20 pointer-events-none" />
          </div>

          {/* 4. Floating "Since 2012" Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -bottom-8 -right-6 bg-[#141414] border border-gold/20 p-6 hidden lg:block z-30"
          >
            <div className="overline mb-1">Since</div>
            <div className="font-serif font-light text-4xl text-gold tracking-wider">2012</div>
          </motion.div>
        </div>

        {/* Right — Content */}
        <div className="flex flex-col gap-8">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={1}>
            <span className="overline block mb-5">Our Story</span>
            <h2 className="font-serif font-light text-[clamp(38px,5vw,58px)] text-snow leading-[1.15] tracking-[0.04em] text-balance">
              Born from a Passion for{' '}
              <em className="text-gold not-italic">Timeless Beauty</em>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={2}>
            <div className="gold-line mb-8" />
            <p className="font-sans font-light text-grey text-base leading-[1.9] mb-5 tracking-wide">
              LUMAE was born in the heart of Dubai from a singular belief — that beauty is not applied, it is revealed. Our atelier was founded by Master Aesthetician Layla Al-Rashid, whose vision was to create a sanctuary where artistry and science converge.
            </p>
            <p className="font-sans font-light text-grey/70 text-sm leading-[1.9] tracking-wide">
              Every treatment at LUMAE is an intimate ritual, crafted uniquely for your anatomy, your aspirations, and your story. We do not follow trends; we set the standard for understated, enduring elegance.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-gold/10 mt-2"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="font-serif font-light text-[clamp(32px,4vw,48px)] text-gold leading-none tracking-wider">
                  <CountUp target={stat.value} suffix={stat.suffix} isVisible={isInView} />
                </div>
                <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-grey/60 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
