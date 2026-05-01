import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Camera } from 'lucide-react'

import imgLayla from '../assets/Layla Al-Rashid.webp'
import imgSofia from '../assets/Sofia Marchetti.webp'
import imgAisha from '../assets/Aisha Karimov.webp'
import imgNadia from '../assets/Nadia Khalil.webp'

const team = [
  {
    id: 1,
    name: 'Layla Al-Rashid',
    title: 'Founder & Master Aesthetician',
    specialty: 'Facial Architecture',
    stars: 5,
    ig: '@layla.lumae',
    img: imgLayla
  },
  {
    id: 2,
    name: 'Sofia Marchetti',
    title: 'Senior Color Specialist',
    specialty: 'Color Alchemy',
    stars: 5,
    ig: '@sofia.lumae',
    img: imgSofia
  },
  {
    id: 3,
    name: 'Aisha Karimov',
    title: 'Bridal Artistry Director',
    specialty: 'Bridal & Editorial',
    stars: 5,
    ig: '@aisha.lumae',
    img: imgAisha
  },
  {
    id: 4,
    name: 'Nadia Khalil',
    title: 'Trichology & Hair Sculptor',
    specialty: 'Structural Hair Design',
    stars: 5,
    ig: '@nadia.lumae',
    img: imgNadia
  },
]

function TeamCard({ member, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col gap-5"
    >
      <div className="relative aspect-[3/4] bg-card border border-gold/10 group-hover:border-gold/25 transition-colors duration-500 overflow-hidden flex items-end justify-center">
        {/* Animated Image */}
        <div className="absolute inset-0 bg-[#111] flex items-center justify-center overflow-hidden">
          <motion.img 
            src={member.img} 
            alt={member.name}
            className="w-full h-full object-cover object-[center_top]"
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
        </div>

        {/* Gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />

        {/* Corner accents */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-3 h-3 z-20`}>
            <div className={`absolute w-full h-px bg-gold/20 ${i < 2 ? 'top-0' : 'bottom-0'}`} />
            <div className={`absolute h-full w-px bg-gold/20 ${i % 2 === 0 ? 'left-0' : 'right-0'}`} />
          </div>
        ))}

        {/* Instagram link */}
        <div className="relative z-20 w-full p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <button className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-gold/80 font-sans">
            <Camera size={10} />
            {member.ig}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-serif font-light text-snow text-lg tracking-[0.06em] group-hover:text-gold transition-colors duration-500">
          {member.name}
        </h3>
        <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-gold/60">
          {member.specialty}
        </div>
        <div className="font-sans text-[10px] text-grey/50 mt-0.5">
          {member.title}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array.from({ length: member.stars }).map((_, i) => (
            <Star
              key={i}
              size={9}
              className="text-gold fill-gold"
            />
          ))}
        </div>

        <div className="h-px w-5 bg-gold/15 mt-2 group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#080808] relative overflow-hidden">
      {/* Decorative line right */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent hidden md:block" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8"
        >
          <div>
            <span className="overline block mb-5">The Talent</span>
            <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none">
              Meet the <em className="text-gold not-italic">Artists</em>
            </h2>
          </div>
          <p className="font-sans font-light text-grey/60 text-sm leading-relaxed max-w-xs lg:pb-3">
            Each specialist brings a decade of mastery and an unwavering eye for beauty's finest nuances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
