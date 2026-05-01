import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import hairBefore from '../assets/Hair before.webp'
import hairAfter from '../assets/Hair after.webp'
import facialBefore from '../assets/Ficial Before.webp'
import facialAfter from '../assets/Ficial After.webp'
import hBefore from '../assets/H before.webp'
import hAfter from '../assets/H after.webp'

const SLIDERS = [
  { 
    id: 1, 
    title: 'Hair Transformation', 
    sub: 'Precision Cut & Styling Excellence',
    beforeSrc: hairBefore,
    afterSrc: hairAfter,
    beforePos: 'object-top',
    beforeObjPos: 'center 4px',
    afterPos: 'object-top',
    beforeScale: 1.07 
  },
  { 
    id: 2, 
    title: 'Facial Transformation', 
    sub: 'Skin Refinement & Glow',
    beforeSrc: facialBefore,
    afterSrc: facialAfter,
    beforePos: 'object-top',
    afterPos: 'object-top'
  },
  { 
    id: 3, 
    title: 'Hair Color Artistry', 
    sub: 'Rich Tone & Dimension',
    beforeSrc: hBefore,
    afterSrc: hAfter,
    beforePos: 'object-top',
    afterPos: 'object-top'
  },
]

function Slider({ item, index, isInView }) {
  const [pct, setPct] = useState(50)
  const [active, setActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const boxRef = useRef(null)

  const calc = (clientX) => {
    if (!boxRef.current) return
    const r = boxRef.current.getBoundingClientRect()
    setPct(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  const onMouse = (e) => { if (active) calc(e.clientX) }
  const onTouch = (e) => calc(e.touches[0].clientX)
  const onLeave = () => {
    setActive(false)
    setIsHovered(false)
    setTimeout(() => setPct(50), 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-5"
    >
      <div
        ref={boxRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onLeave}
        className="relative overflow-hidden aspect-[3/4] border border-gold/10 group-hover:border-gold/25 transition-all duration-500 select-none bg-[#111]"
        style={{ cursor: 'ew-resize' }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onMouseMove={onMouse}
        onTouchMove={onTouch}
        onTouchEnd={() => setPct(50)}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          animate={isInView ? { 
            clipPath: "inset(0% 0% 0% 0%)", 
            opacity: 1,
            y: (isHovered || active) ? 0 : [0, -12, 0] 
          } : {}}
          transition={isInView ? {
            clipPath: { duration: 1.2, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 1.4, delay: index * 0.15 },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              paused: isHovered || active 
            }
          } : {}}
        >
          <img 
            src={item.afterSrc} 
            alt="after" 
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover ${item.afterPos || item.pos || 'object-center'}`}
            style={{ 
              filter: 'contrast(1.05) brightness(0.92)',
              transform: `scale(${item.afterScale || 1})`,
              ...(item.afterObjPos && { objectPosition: item.afterObjPos })
            }} 
          />
          
          <div className="absolute top-0 left-0 h-full overflow-hidden z-10" style={{ width: `${pct}%` }}>
            <img 
              src={item.beforeSrc} 
              alt="before" 
              draggable={false}
              className={`absolute top-0 left-0 h-full object-cover ${item.beforePos || item.pos || 'object-center'}`}
              style={{ 
                width: `${10000 / Math.max(pct, 0.1)}%`, 
                maxWidth: 'none', 
                filter: 'contrast(1.05) brightness(0.92)',
                transform: `scale(${item.beforeScale || 1})`,
                ...(item.beforeObjPos && { objectPosition: item.beforeObjPos })
              }} 
            />
          </div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none z-20" />
        
        <motion.div 
          className="absolute top-0 bottom-0 z-30 flex flex-col items-center" 
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 1.2 }}
        >
          <div className="w-px h-full bg-gold/40" />
          <div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg border border-gold/60 flex items-center justify-center shadow-lg">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 7H10M4 7L2 5M4 7L2 9M10 7L12 5M10 7L12 9" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        <div className="absolute bottom-5 left-5 z-30 font-serif italic text-[11px] text-gold/60 tracking-widest pointer-events-none">Before</div>
        <div className="absolute bottom-5 right-5 z-30 font-serif italic text-[11px] text-gold tracking-widest pointer-events-none">After</div>
      </div>
      
      <div className="px-1">
        <h3 className="font-serif font-light text-xl text-snow tracking-[0.08em] mb-1 group-hover:text-gold transition-colors duration-500">{item.title}</h3>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-grey/40">{item.sub}</p>
        
        <div className="relative mt-3 h-px w-full bg-gold/10 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gold origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="h-full w-6 bg-gold/30 group-hover:w-full transition-all duration-700" />
        </div>
      </div>
    </motion.div>
  )
}

export default function BeforeAfter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="transformations" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.9 }} 
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Results</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none mb-6">
            The <em className="text-gold not-italic">Transformation</em>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
          <p className="font-sans font-light text-grey/50 text-sm leading-relaxed italic">
            Drag the divider to reveal each transformation. Every case a unique study in subtle elevation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {SLIDERS.map((s, i) => <Slider key={s.id} item={s} index={i} isInView={isInView} />)}
        </div>
      </div>
    </section>
  )
}
