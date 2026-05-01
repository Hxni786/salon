import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, Clock, User, Check, ArrowRight } from 'lucide-react'

// Asset Imports
import portfolioHair1 from '../assets/IMAGE 1 — Hair.webp'
import portfolioNails1 from '../assets/IMAGE 2 — Nails.webp'
import portfolioBridal1 from '../assets/IMAGE 4 — Bridal.webp'
import portfolioBridal2 from '../assets/IMAGE 3 — Bridal.webp'
import portfolioHair2 from '../assets/IMAGE 5 — Hair.webp'
import portfolioColor1 from '../assets/IMAGE 7 — Color.webp'
import portfolioColor2 from '../assets/IMAGE 6 — Color.webp'
import portfolioFacial1 from '../assets/IMAGE 8 — Facial.webp'
import portfolioNails2 from '../assets/IMAGE 9 — Nails.webp'

const FILTERS = ['All', 'Hair', 'Color', 'Bridal', 'Nails', 'Facial']

const ITEMS = [
  {
    id: 1,
    cat: 'Hair',
    label: 'Sculptural Cut',
    tall: true,
    img: portfolioHair1,
    pos: 'object-[center_top]',
    detail: {
      heading: 'Sculptural Cut',
      subline: 'Structural Hair Design',
      description: 'A precision cut crafted to work with your natural bone structure. Every angle considered, every line intentional. The result is effortless — the process is anything but.',
      tags: ['Precision Cut', 'Blowout', 'Style Finish'],
      duration: '75 min',
      price: 'From AED 250',
      artist: 'Nadia Khalil',
    }
  },
  {
    id: 2,
    cat: 'Nails',
    label: 'Nail Art Editorial',
    tall: false,
    img: portfolioNails1,
    detail: {
      heading: 'Nail Art Editorial',
      subline: 'Gel Artistry',
      description: 'Immaculate gel application elevated with hand-painted detail. Inspired by high-fashion editorials and built to last. Each set is a wearable artwork.',
      tags: ['Gel', 'Nail Art', 'Extensions'],
      duration: '90 min',
      price: 'From AED 150',
      artist: 'LUMAE Nail Studio',
    }
  },
  {
    id: 3,
    cat: 'Bridal',
    label: 'Bridal Ceremony',
    tall: false,
    img: portfolioBridal1,
    pos: 'object-top',
    detail: {
      heading: 'Bridal Ceremony',
      subline: 'Bridal Hair & Styling',
      description: 'The most important day demands the most considered artistry. Our bridal specialists design looks that photograph beautifully and endure gracefully from ceremony to the final dance.',
      tags: ['Updo', 'Veil Setting', 'Trial Included'],
      duration: '180 min',
      price: 'From AED 1,800',
      artist: 'Aisha Karimov',
    }
  },
  {
    id: 4,
    cat: 'Bridal',
    label: 'Engagement Look',
    tall: false,
    img: portfolioBridal2,
    pos: 'object-top',
    detail: {
      heading: 'Engagement Look',
      subline: 'Bridal Makeup & Glam',
      description: 'Soft, luminous, and completely you. Our engagement looks are built for candlelight, flash photography, and every golden hour moment in between.',
      tags: ['Full Glam', 'Airbrush', 'Lashes'],
      duration: '120 min',
      price: 'From AED 850',
      artist: 'Aisha Karimov',
    }
  },
  {
    id: 5,
    cat: 'Hair',
    label: 'Avant-Garde Updo',
    tall: false,
    img: portfolioHair2,
    pos: 'object-[center_top]',
    detail: {
      heading: 'Avant-Garde Updo',
      subline: 'Editorial Hair Styling',
      description: 'When the occasion calls for something extraordinary. Our editorial stylists create architectural updos that blur the line between hair and sculpture.',
      tags: ['Updo', 'Editorial', 'Event Ready'],
      duration: '90 min',
      price: 'From AED 400',
      artist: 'Nadia Khalil',
    }
  },
  {
    id: 6,
    cat: 'Color',
    label: 'Blonde Balayage',
    tall: true,
    img: portfolioColor1,
    detail: {
      heading: 'Blonde Balayage',
      subline: 'Color Alchemy',
      description: 'Sun-kissed dimension painted freehand by our color specialists. Each balayage is custom-mixed and uniquely blended to complement your skin tone and natural base.',
      tags: ['Balayage', 'Toning', 'Gloss Finish'],
      duration: '180 min',
      price: 'From AED 650',
      artist: 'Sofia Marchetti',
    }
  },
  {
    id: 7,
    cat: 'Color',
    label: 'Brunette Gloss',
    tall: true,
    img: portfolioColor2,
    detail: {
      heading: 'Brunette Gloss',
      subline: 'Tonal Color & Gloss',
      description: 'Rich, dimensional brunette tones enhanced with a high-gloss finish. Depth, warmth, and mirror shine — the quiet confidence of perfect colour.',
      tags: ['Gloss', 'Toning', 'Highlights'],
      duration: '120 min',
      price: 'From AED 450',
      artist: 'Sofia Marchetti',
    }
  },
  {
    id: 8,
    cat: 'Facial',
    label: 'Glow Treatment',
    tall: true,
    img: portfolioFacial1,
    detail: {
      heading: 'Glow Treatment',
      subline: 'Skin Refinement',
      description: 'A clinical approach to luminosity. Our signature glow protocol combines advanced actives with bespoke massage technique to reveal skin that looks rested, refined, and radiant.',
      tags: ['HydraFacial', 'LED Therapy', 'Serum Infusion'],
      duration: '90 min',
      price: 'From AED 350',
      artist: 'LUMAE Skin Clinic',
    }
  },
  {
    id: 9,
    cat: 'Nails',
    label: 'Gel Extensions',
    tall: false,
    img: portfolioNails2,
    detail: {
      heading: 'Gel Extensions',
      subline: 'Nail Extensions & Art',
      description: 'Stiletto, almond, coffin, or square — built to your exact specification and finished with hand-painted artistry. Strong, flexible, and undeniably luxurious.',
      tags: ['Extensions', 'Stiletto', 'Nail Art'],
      duration: '120 min',
      price: 'From AED 280',
      artist: 'LUMAE Nail Studio',
    }
  },
]

function GalleryCard({ item, index, onView }) {
  const cardRef = useRef(null)
  const isVisible = useInView(cardRef, { once: true, margin: "-10% 0px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16,1,0.3,1] }}
      className={`relative group/card overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 break-inside-avoid mb-6 ${item.tall ? 'h-[420px]' : 'h-[250px]'}`}
    >
      <div className="absolute inset-0 bg-[#111] flex items-center justify-center overflow-hidden">
        <motion.img 
          src={item.img} 
          alt={item.label}
          className={`w-full h-full object-cover ${item.pos || 'object-center'}`}
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          animate={isVisible ? { 
            clipPath: "inset(0% 0% 0% 0%)", 
            opacity: 1,
            y: isHovered ? 0 : [0, -12, 0] 
          } : {}}
          transition={isVisible ? {
            clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 1.4 },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              paused: isHovered 
            }
          } : {}}
          style={{ scale: isHovered ? 1.08 : 1 }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
        <div className="space-y-4">
          <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/60">{item.cat}</div>
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-light text-snow text-xl tracking-wider">{item.label}</h4>
            
            {/* Standardized Gold-Fill View Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); onView(item); }}
              className="relative flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-2 border border-gold/20 group/btn transition-all duration-400 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) z-0" />
              <span className="relative z-10 group-hover/btn:text-[#0D0D0D] transition-colors duration-400">View</span>
              <ArrowRight size={12} className="relative z-10 group-hover/btn:text-[#0D0D0D] group-hover/btn:translate-x-[4px] transition-all duration-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PortfolioModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/88 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-full md:h-auto max-h-screen md:max-h-[85vh] bg-[#0D0D0D] border-y md:border border-gold/20 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl z-10"
      >
        <button 
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 md:w-8 md:h-8 border border-gold/20 flex items-center justify-center text-grey hover:text-gold hover:border-gold/50 transition-all duration-300 z-[110] bg-bg/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
        >
          <X size={18} />
        </button>

        <div className="w-full md:w-[45%] h-[320px] md:h-auto relative overflow-hidden bg-card">
          <motion.img 
            src={item.img} 
            alt={item.label}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={`w-full h-full object-cover ${item.pos || 'object-center'}`}
          />
          <motion.div 
            className="absolute inset-0"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={item.img} alt="" className={`w-full h-full object-cover opacity-0 ${item.pos || 'object-center'}`} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 md:opacity-40" />
          <div className="absolute top-6 left-6 font-sans text-[9px] tracking-[0.3em] uppercase text-gold border border-gold/25 px-3 py-1 bg-bg/60 backdrop-blur-sm z-20">
            {item.cat}
          </div>
        </div>

        <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-14 flex flex-col gap-6 md:gap-8 justify-center">
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70">{item.detail.subline}</motion.div>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="font-serif font-light text-snow text-3xl md:text-4xl tracking-[0.06em] leading-tight">{item.detail.heading}</motion.h2>
            <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-px bg-gold/15 w-full origin-left" />
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="font-sans font-light text-grey/70 text-sm md:text-[15px] leading-[1.9] tracking-wide">{item.detail.description}</motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-2 flex-wrap">
              {item.detail.tags.map(tag => (
                <span key={tag} className="font-sans text-[9px] tracking-[0.2em] uppercase border border-gold/20 text-gold/70 px-3 py-1.5 bg-gold/[0.03]">{tag}</span>
              ))}
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] border border-gold/10 p-4">
                <div className="font-sans text-[8px] tracking-[0.3em] uppercase text-grey/40 mb-1">Duration</div>
                <div className="font-sans text-sm text-snow/80 flex items-center gap-2"><Clock size={12} className="text-gold/50" />{item.detail.duration}</div>
              </div>
              <div className="bg-[#111] border border-gold/10 p-4">
                <div className="font-sans text-[8px] tracking-[0.3em] uppercase text-grey/40 mb-1">Investment</div>
                <div className="font-serif text-xl text-gold">{item.detail.price}</div>
              </div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex items-center gap-3 font-sans text-[10px] tracking-[0.25em] uppercase text-grey/40 pt-2"><User size={12} /><span>By {item.detail.artist}</span></motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-3 pt-4">
              <button 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 400);
                }}
                className="w-full bg-gold text-bg py-4 font-sans text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-gold/85 transition-all duration-400 flex items-center justify-center gap-3 group"
              >
                Book This Service
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onClose}
                className="w-full border border-gold/20 text-gold/60 py-4 font-sans text-[11px] uppercase tracking-[0.25em] hover:border-gold/40 hover:text-gold transition-all duration-400"
              >
                View All Services
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PortfolioGallery() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.cat === active)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selected])

  return (
    <section id="portfolio" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0A0A0A] relative">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.9 }} className="text-center mb-14">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Creative Work</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none mb-6">
            Our <em className="text-gold not-italic">Portfolio</em>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-48 mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.7, delay:0.15 }} className="flex items-center justify-center flex-wrap gap-3 mb-14">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`font-sans text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 border transition-all duration-400 ${active===f ? 'border-gold text-bg bg-gold' : 'border-gold/20 text-grey hover:border-gold/50 hover:text-snow'}`}>
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onView={(it) => setSelected(it)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <PortfolioModal 
            item={selected} 
            onClose={() => setSelected(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
