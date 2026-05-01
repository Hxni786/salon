import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, X, ArrowLeft, Camera, Sparkles, MapPin } from 'lucide-react'
import hairImg from '../assets/service-hair.webp'
import colorImg from '../assets/service-color.webp'
import bridalImg from '../assets/service-bridal.webp'
import nailsImg from '../assets/service-nails.webp'
import facialImg from '../assets/service-facial.webp'
import spaImg from '../assets/service-spa.webp'

const services = [
  {
    id: 1,
    category: 'Hair',
    title: 'Sculptural Hair Design',
    desc: 'Bespoke cuts and structural styling for every face geometry.',
    price: 'From AED 250',
    label: 'HAIR ATELIER',
    image: hairImg,
    duration: '60 min session',
    features: ['Precision cut consultation', 'Blowout & finish included', 'Scalp treatment', 'Complimentary style guide']
  },
  {
    id: 2,
    category: 'Color',
    title: 'Color Alchemy',
    desc: 'Balayage, glossing, and tonal mastery by color specialists.',
    price: 'From AED 450',
    label: 'COLOR STUDIO',
    image: colorImg,
    duration: '120 min session',
    features: ['Advanced color consultation', 'Bond-building treatment', 'Glossing & tonal refinement', 'Post-color care ritual']
  },
  {
    id: 3,
    category: 'Bridal',
    title: 'Bridal Couture',
    desc: 'Complete bridal artistry — from the rehearsal to the final vow.',
    price: 'From AED 1,800',
    label: 'BRIDAL SUITE',
    image: bridalImg,
    duration: 'Customized Timeline',
    subline: 'Every detail. Every moment. Yours.',
    features: ['Trial session included', 'On-site styling available', 'Bridal party coordination', 'Veil & accessory placement', 'Makeup artistry fusion', 'Luxury bridal kit']
  },
  {
    id: 4,
    category: 'Nails',
    title: 'Nail Artistry',
    desc: 'Precision manicures, bespoke nail art, and luxury extensions.',
    price: 'From AED 150',
    label: 'NAIL SALON',
    image: nailsImg,
    duration: '90 min session',
    features: ['Precision manicure & shaping', 'Bespoke nail art design', 'Luxury gel extensions', 'Anti-aging hand treatment']
  },
  {
    id: 5,
    category: 'Facial',
    title: 'Skin Refinement',
    desc: 'Clinical facials fusing European techniques with modern science.',
    price: 'From AED 350',
    label: 'SKIN CLINIC',
    image: facialImg,
    duration: '60 min session',
    features: ['Advanced HydraFacial', 'Clinical chemical peel', 'LED light therapy fusion', 'Skin barrier repair ritual']
  },
  {
    id: 6,
    category: 'Spa',
    title: 'Body Ritual',
    desc: 'Full-body treatments designed for deep restoration and renewal.',
    price: 'From AED 550',
    label: 'SPA SANCTUM',
    image: spaImg,
    duration: '90 min ritual',
    features: ['Aromatic welcome journey', 'Deep tissue restoration', 'Signature ambient Oud scent', 'Post-ritual recovery tea']
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function ServiceCard({ service, onExplore }) {
  const cardRef = useRef(null)
  const isVisible = useInView(cardRef, { once: true, margin: "-10% 0px" })
  const [isHovered, setIsHovered] = useState(false)

  // Parallax Logic
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    if (service.id !== 6) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * -16) 
    mouseY.set(y * -12) 
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (service.id === 6) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={service.id !== 3 ? `card-${service.id}` : undefined}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExplore(service.id)}
      className={`group relative bg-card border border-gold/10 hover:border-gold/30 transition-all duration-500 overflow-hidden cursor-pointer`}
      style={{ transform: 'translateZ(0)' }}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="aspect-[4/3] bg-[#111111] relative flex items-center justify-center overflow-hidden">
        {service.id === 1 && (
          <motion.img src={service.image} alt={service.title} initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }} animate={isVisible ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: isHovered ? -8 : 0 } : {}} transition={{ clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }, opacity: { duration: 1.4 }, y: { duration: 1.0, ease: "easeOut" } }} className="w-full h-full object-cover object-[center_top]" />
        )}
        {service.id === 2 && (
          <motion.img src={service.image} alt={service.title} initial={{ filter: "grayscale(100%) brightness(0.5)", opacity: 0 }} animate={isVisible ? { filter: "grayscale(0%) brightness(1.0)", opacity: 1, x: isHovered ? 6 : 0 } : {}} transition={{ filter: { duration: 1.6, delay: 0.12, ease: "easeOut" }, opacity: { duration: 1.0, delay: 0.1 }, x: { duration: 0.6, ease: "easeOut" } }} className="w-full h-full object-cover object-center" />
        )}
        {service.id === 3 && (
          <>
            <motion.img src={service.image} alt={service.title} initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1, scale: isHovered ? 1.04 : 1 } : {}} transition={{ opacity: { duration: 1.0, delay: 0.5 }, scale: { duration: 1.0, ease: "easeOut" } }} className="w-full h-full object-cover object-center" />
            <motion.div initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} animate={isVisible ? { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" } : {}} transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 z-10 bg-[#FAFAFA] pointer-events-none" />
          </>
        )}
        {service.id === 4 && (
          <>
            <motion.img src={service.image} alt={service.title} initial={{ scale: 1.15, filter: "blur(14px)", opacity: 0 }} animate={isVisible ? { scale: isHovered ? 1.05 : 1.0, filter: "blur(0px)", opacity: 1 } : {}} transition={{ scale: isHovered ? { duration: 0.8, ease: "easeOut" } : { duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }, filter: { duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 1.1, delay: 0.15 } }} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 border border-gold/40 transition-opacity duration-300 pointer-events-none z-20" style={{ opacity: isHovered ? 1 : 0 }} />
          </>
        )}
        {service.id === 5 && (
          <div className="relative w-full h-full overflow-hidden">
            <motion.img src={service.image} alt={service.title} initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ opacity: { duration: 0.8, delay: 0.6 } }} className="w-full h-full object-cover object-center" style={{ filter: isHovered ? 'brightness(1)' : 'brightness(0.92)' }} />
            <motion.div initial={{ x: 0 }} animate={isVisible ? { x: "-101%" } : { x: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0D0D0D] z-10" />
            <motion.div initial={{ x: 0 }} animate={isVisible ? { x: "101%" } : { x: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0D0D0D] z-10" />
          </div>
        )}
        {service.id === 6 && (
          <motion.div style={{ x: springX, y: springY }} className="relative w-full h-full">
            <motion.img src={service.image} alt={service.title} initial={{ opacity: 0, filter: "sepia(90%) brightness(0.5)" }} animate={isVisible ? { opacity: 1, filter: "sepia(0%) brightness(1.0)" } : {}} transition={{ duration: 1.8, delay: 0.2 }} className="w-full h-full object-cover object-center scale-110" />
          </motion.div>
        )}
        <div className="absolute top-4 left-4 font-sans text-[9px] tracking-[0.3em] uppercase text-gold/60 border border-gold/20 px-3 py-1 bg-bg/60 backdrop-blur-sm z-30">{service.category}</div>
      </div>

      <div className="p-7 flex flex-col gap-3 relative z-10">
        <h3 className="font-serif font-light text-snow text-xl tracking-[0.06em] leading-tight group-hover:text-gold transition-colors duration-500">{service.title}</h3>
        <p className="font-sans font-light text-grey/70 text-sm leading-relaxed">{service.desc}</p>
        <div className="flex items-center justify-between mt-3 pt-4 border-t border-gold/8">
          <span className="font-sans text-[11px] tracking-[0.15em] text-gold">{service.price}</span>
          <ExploreButton id={service.id} isHovered={isHovered} onClick={() => onExplore(service.id)} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold/30 transition-all duration-700" />
    </motion.div>
  )
}

function ExploreButton({ id, isHovered, onClick }) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
      onClick()
    }, 300)
  }

  return (
    <motion.button
      animate={isClicked ? { scale: 0.94 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="relative flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-2 border border-gold/20 group/btn transition-all duration-400 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gold scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) z-0" />
      <span className="relative z-10 group-hover/btn:text-[#0D0D0D] transition-colors duration-400">Explore</span>
      <div className="relative z-10 group-hover/btn:text-[#0D0D0D] transition-colors duration-400 flex items-center">
        {id === 3 && isHovered && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] mx-1">◆</motion.span>}
        <ArrowRight size={12} className={id === 1 ? 'group-hover/btn:translate-x-[6px] transition-transform duration-300' : ''} />
      </div>
    </motion.button>
  )
}

export default function Services() {
  const [expandedId, setExpandedId] = useState(null)
  const [showFlash, setShowFlash] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setExpandedId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleExplore = (id) => {
    if (id === 3) {
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 300)
    }
    setExpandedId(id)
  }

  const handleBooking = () => {
    setExpandedId(null)
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const expandedService = services.find(s => s.id === expandedId)

  return (
    <section id="services" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#080808] relative overflow-hidden">
      <AnimatePresence>
        {showFlash && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-white z-[200] pointer-events-none" />
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-20">
          <span className="overline block mb-6">What We Offer</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none">Our <em className="text-gold not-italic">Craft</em></h2>
          <div className="gold-line max-w-48 mx-auto mt-8" />
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onExplore={handleExplore} />
          ))}
        </motion.div>
      </div>

      {/* Standardized Expansion Overlay — CARDS 1, 2, 4, 5, 6 */}
      <AnimatePresence>
        {expandedId !== null && expandedId !== 3 && expandedService && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExpandedId(null)} />
            <motion.div layoutId={`card-${expandedId}`} className="relative w-full max-w-[1200px] h-full max-h-[800px] bg-[#0D0D0D] border border-gold/20 flex flex-col md:flex-row overflow-hidden shadow-2xl" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="w-full md:w-1/2 h-[300px] md:h-full relative overflow-hidden bg-card">
                <motion.img src={expandedService.image} alt={expandedService.title} initial={{ scale: 1 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D0D0D] hidden md:block" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center gap-8">
                <div><span className="overline text-gold mb-4 block">{expandedService.label}</span><h2 className="font-serif font-light text-[clamp(32px,4vw,52px)] text-snow leading-tight tracking-wide mb-6">{expandedService.title}</h2><p className="font-sans font-light text-grey/80 text-lg leading-relaxed max-w-[480px]">{expandedService.desc}</p></div>
                <div className="flex gap-12 border-y border-gold/10 py-6"><div><div className="text-[10px] uppercase tracking-widest text-grey/50 mb-1">Price</div><div className="text-gold font-sans text-xl">{expandedService.price}</div></div><div><div className="text-[10px] uppercase tracking-widest text-grey/50 mb-1">Duration</div><div className="text-gold font-sans text-xl">{expandedService.duration || '60 min'}</div></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">{expandedService.features?.map((feature, i) => (<div key={i} className="flex items-center gap-3"><div className="w-4 h-4 rounded-full border border-gold/30 flex items-center justify-center"><Check size={10} className="text-gold" /></div><span className="font-sans text-xs tracking-wide text-grey/70">{feature}</span></div>))}</div>
                <div className="flex flex-wrap items-center gap-6 mt-4"><button onClick={handleBooking} className="bg-gold text-[#0D0D0D] px-10 py-4 font-sans text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-snow transition-colors duration-300">Book This Service</button><button onClick={() => setExpandedId(null)} className="flex items-center gap-2 text-grey/60 hover:text-snow transition-colors duration-300 font-sans text-[10px] uppercase tracking-[0.2em]"><X size={14} />Close</button></div>
              </div>
              <button onClick={() => setExpandedId(null)} className="absolute top-6 right-6 p-2 bg-white/5 md:hidden"><X size={20} className="text-gold" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Modal Overlay — CARD 3 (Bridal) */}
      <AnimatePresence>
        {expandedId === 3 && expandedService && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExpandedId(null)} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-3xl bg-[#0F0F0F] border border-gold/20 flex flex-col md:flex-row overflow-hidden shadow-2xl">
              <div className="w-full md:w-[45%] h-[280px] md:h-auto relative overflow-hidden">
                <motion.img src={expandedService.image} alt={expandedService.title} initial={{ scale: 1 }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0F0F] hidden md:block" />
              </div>
              <div className="w-full md:w-[55%] p-10 flex flex-col gap-6">
                <div><span className="text-[#B76E79] font-sans text-[10px] tracking-[0.3em] uppercase block mb-3">#B76E79 — BRIDAL SUITE</span><h2 className="font-serif font-light text-4xl text-snow leading-tight mb-2">Bridal Couture</h2><p className="font-serif italic text-gold/60 text-base mb-4">{expandedService.subline}</p><div className="w-12 h-px bg-gold/30" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">{expandedService.features?.map((feature, i) => (<div key={i} className="flex items-center gap-2"><Check size={12} className="text-gold/80" /><span className="font-sans text-[11px] tracking-wide text-grey/60">{feature}</span></div>))}</div>
                <div className="pt-6 border-t border-gold/10 flex items-end justify-between"><div><div className="text-[9px] uppercase tracking-widest text-grey/40 mb-1">Investment</div><div className="text-gold font-sans text-xl">{expandedService.price}</div></div><div className="text-right"><div className="text-[9px] uppercase tracking-widest text-grey/40 mb-1">Timeframe</div><div className="text-grey/80 font-sans text-sm">{expandedService.duration}</div></div></div>
                <div className="flex flex-col gap-4 mt-2"><button onClick={handleBooking} className="bg-gold text-[#0D0D0D] py-4 font-sans text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-snow transition-all duration-300">Enquire for Bridal Package</button><button onClick={() => setExpandedId(null)} className="flex items-center gap-2 text-grey/40 hover:text-snow transition-colors duration-300 font-sans text-[10px] uppercase tracking-[0.15em] mx-auto"><ArrowLeft size={12} />View All Services</button></div>
              </div>
              <button onClick={() => setExpandedId(null)} className="absolute top-5 right-5 p-2 text-grey/40 hover:text-gold z-20"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
