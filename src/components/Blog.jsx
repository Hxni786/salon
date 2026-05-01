import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

import imgBlog1 from '../assets/BLOG 1 — Hair Care.webp'
import imgBlog2 from '../assets/BLOG 2 — Skin Science.webp'
import imgBlog3 from '../assets/BLOG 3 — Bridal.webp'

const POSTS = [
  { id:1, cat:'Hair Care',     title:'The Ritual of the Perfect Blowout: Technique Over Tools',         date:'March 2025', read:'5 min', img: imgBlog1 },
  { id:2, cat:'Skin Science',  title:'Why Hydration Belongs in Every Skin Protocol, All Year Round',    date:'April 2025',  read:'4 min', img: imgBlog2 },
  { id:3, cat:'Bridal',        title:'Planning a Bridal Timeline: How to Approach Your Wedding Beauty', date:'April 2025',  read:'7 min', img: imgBlog3 },
]

function ArticleModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-6" data-lenis-prevent="true">
      {/* Backdrop Phase 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* Panel Phase 2 */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-[#0D0D0D] border-t border-gold/25 max-h-screen md:max-h-[90vh] overflow-y-auto article-scroll z-10 shadow-2xl"
        data-lenis-prevent="true"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-gold/10">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold">
            {post.cat}
          </span>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 border border-gold/20 text-grey hover:text-gold hover:border-gold transition-colors duration-300 bg-[#0D0D0D]"
          >
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase">Close</span>
            <X size={14} />
          </button>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Hero Image */}
          <div className="w-full h-[320px] overflow-hidden relative">
            <motion.img 
              src={post.img} 
              alt={post.title}
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>

          <div className="px-8 md:px-14 pt-10 pb-16 flex flex-col gap-8">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-grey/40">
                {post.date} &nbsp;·&nbsp; {post.read}
              </div>
              <h1 className="font-serif font-light text-snow text-3xl md:text-4xl tracking-[0.04em] leading-tight">
                {post.title}
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="h-px w-full bg-gold/15" />

            <motion.div variants={fadeUp} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-gold/20 flex items-center justify-center overflow-hidden">
                  <span className="font-serif text-gold/50 text-xs">NK</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs text-snow/90 tracking-wide">By Nadia Khalil</span>
                  <span className="font-sans text-[10px] text-grey/50 uppercase tracking-[0.15em] mt-0.5">Trichology Specialist</span>
                </div>
              </div>
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/40 text-right">
                LUMAE<br/>Dubai
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="font-sans font-light text-grey/75 text-base leading-[2.0] tracking-wide flex flex-col gap-6 mt-4">
              <p>
                A flawless blowout is not born from the heat of the dryer, but from the architectural foundation laid long before the first blast of air. It is a meticulous ritual of prep, tension, and cooling that transforms hair from its natural state into a sculptural form of effortless movement.
              </p>
              <p>
                The most common misconception in styling is that higher heat yields a better hold. In reality, excessive temperature fractures the cuticle, resulting in a brittle finish that collapses within hours. True volume and glassy shine are achieved through the precise manipulation of the hair's hydrogen bonds using controlled heat, followed by an essential, undisturbed cooling phase.
              </p>

              <div className="my-6 pl-6 border-l-2 border-gold py-2">
                <p className="font-serif italic text-gold text-2xl leading-snug">
                  "The brush, not the heat, is where the magic lives."
                </p>
              </div>

              <p>
                Tension is the silent architect. Without consistent, firm tension on the round brush, the cuticle layers remain raised, scattering light rather than reflecting it. The angle of elevation dictates the volume—lifting straight off the scalp creates maximum lift, while rolling under at a low angle smooths and sleekens.
              </p>

              {/* Tip box */}
              <div className="bg-[#111] border border-gold/10 p-6 my-4">
                <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-5">The LUMAE Method</h4>
                <ul className="flex flex-col gap-4">
                  {[
                    "Always rough-dry to 80% before introducing a brush to prevent mechanical damage.",
                    "Apply thermal protectants section by section, not universally, to ensure even distribution.",
                    "Leave hair wrapped around the brush until completely cool to set the bend."
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span className="text-[15px]">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                Finishing requires a light hand. A drop of serum, emulsified completely in the palms and pressed only into the mid-lengths and ends, seals the style without adding weight. The result is hair that moves liquidly, catches the light brilliantly, and endures flawlessly.
              </p>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div variants={fadeUp} className="border-t border-gold/15 pt-12 pb-8 flex flex-col items-center text-center gap-6 mt-4">
              <h4 className="font-serif italic text-snow/90 text-2xl">Ready to experience this in person?</h4>
              <button 
                onClick={() => {
                  onClose();
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 400);
                }}
                className="btn-gold"
              >
                <span>Book a Blowout</span>
              </button>
              
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-4">
                <button 
                  onClick={onClose}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-grey/50 hover:text-gold transition-colors duration-300"
                >
                  ← Back to Articles
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 400);
                  }}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-grey/50 hover:text-gold transition-colors duration-300"
                >
                  Explore Hair Services →
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function BlogCard({ post, index, isInView, onOpen }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    onOpen(post)
    setTimeout(() => setIsClicked(false), 200)
  }

  return (
    <motion.article
      initial={{ opacity:0, y:50 }}
      animate={isInView?{opacity:1,y:0}:{}}
      transition={{ duration:0.8, delay:index*0.12, ease:[0.16,1,0.3,1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden border border-gold/8 group-hover:border-gold/20 transition-colors duration-500 mb-6 aspect-[4/5] bg-[#111]">
        <motion.img 
          src={post.img} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_top]"
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          animate={isInView ? { 
            clipPath: "inset(0% 0% 0% 0%)", 
            opacity: 1,
            y: isHovered ? 0 : [0, -12, 0] 
          } : {}}
          transition={isInView ? {
            clipPath: { duration: 1.2, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 1.4, delay: index * 0.15 },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              paused: isHovered 
            }
          } : {}}
          style={{ scale: isHovered ? 1.08 : 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-40 z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="px-1 flex flex-col flex-1">
        <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold/60 mb-3">{post.cat}</div>
        <h3 className="font-serif font-light text-xl text-snow leading-[1.4] tracking-[0.03em] mb-4 group-hover:text-gold transition-colors duration-500">
          {post.title}
        </h3>
        
        {/* Clickable bottom row with micro-animations */}
        <div className="mt-auto relative overflow-hidden py-2 -mx-2 px-2 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? [0, 0.3, 0] : 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-gold pointer-events-none"
          />
          <div className="flex items-center gap-3 relative z-10">
            <span className="font-sans text-[9px] text-grey/40 tracking-wider">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gold/20" />
            <span className="font-sans text-[9px] text-grey/40 tracking-wider">{post.read} read</span>
          </div>
          <div className="font-sans text-[9px] tracking-[0.2em] uppercase bg-gold text-[#0A0A0A] px-5 py-2.5 flex items-center gap-2 relative z-10 transition-colors duration-400 group-hover:bg-snow">
            <span>Read</span>
            <motion.span
              className="inline-block relative"
              animate={isClicked ? { x: 12, opacity: 0 } : { x: [0, 3, 0], opacity: 1 }}
              transition={isClicked ? { duration: 0.2, ease: "easeIn" } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >→</motion.span>
          </div>
        </div>
        <div className="h-px w-6 bg-gold/15 mt-2 group-hover:w-full transition-all duration-700" />
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activePost, setActivePost] = useState(null)

  return (
    <section id="journal" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.9 }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Journal</span>
            <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none">
              The <em className="text-gold not-italic">Edit</em>
            </h2>
          </div>
          <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/40 border border-gold/10 px-6 py-3 self-start md:self-end mb-1 flex items-center gap-3 cursor-default select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold/50"></span>
            </span>
            More Editions Coming Soon
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} isInView={isInView} onOpen={setActivePost} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePost && <ArticleModal post={activePost} onClose={() => setActivePost(null)} />}
      </AnimatePresence>
    </section>
  )
}
