import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const transformations = [
  {
    id: 1,
    title: 'Structural Jawline',
    subtitle: 'Precision Sculpting',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqZN1bRk53oJyBIlMaVVM3J3Q9gjSwjTfutb2krADgkyiPdkCMitOLg6-xMW0j4gPNGM0ID-29BmWU6sRpCZMq7HDACyU-snRxvyHMGGyPznTteaRoFMY7EO3I2nlXdjrR9d1re6vH3erH15uIYSRMcd47SC-V2Y8Uq-d7hecbyKIkf4dyR6JPPYcU_WDsl9R5JJqtlW0x0FUwg_uBgMtXui-GOH6rp-DHbB50DmBVoS7_T1nc5SpeG',
    afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr4dQ9uU1gKxLgc5iv_Q8PlNqecxsaUqLNkYBXwmYBfbhg8UI-AJl7GKwHMocwjlgBPhVSi4jpHJ2dz6lw8IfWyCygSvtC4__fYvrqMVrCZMq7HDACyU-snRxvyHMGGyPznTteaRoFMY7EO3I2nlXdjrR9d1re6vH3erH15uIYSRMcd47SC-V2Y8Uq-d7hecbyKIkf4dyR6JPPYcU_WDsl9R5JJqtlW0x0FUwg_uBgMtXui-GOH6rp-DHbB50DmBVoS7_T1nc5SpeG',
  },
  {
    id: 2,
    title: 'Cheekbone Lift',
    subtitle: 'Volume & Contour',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSwTkLYRg7nmA2CkoaZq1o6EMh8bIo-5JqVyf4Or-a7UN9VQvXG2gR5lDoFm2KspsIYNCeD2BKwVeHLu-2pq5MCBCzuhf6HkrDI7MUq32IzehmxoQhSu_uC-Unf5iKWrgjR5JW76RF0W25uhPBoWCWkwM7eJJNQiSyHrWCfX6U74M9sIRVEgPi3FFMzM-DVLcuHl9AUNCraOCfT2QVz-CeoQQuJFKaowxO1TuEKG9e9Sj6UgaoijdM5cGwYAFWHDsMvsTksL1Ty6E',
    afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxFRh44alK0F4enOWWIRX8vYrhlOdVv0ZeCJK-dWmLYlPD11hOs74QcmtVL8TEauR46FEKyN5YjD9dmcGKBYi69duouoP8Q0fv6Nkj0jDhgun6HLUfLTSzyGh2ITS95G6KUPr9g8PHoBe9R15cmQO2S0kAQ37shb4BW1fBKOPXTHT0JOVt8fLMpj25SW9wWI2WnxxETF-adRBD8AkbNTyU4a4m78If4fC_VH7gEoBs_gV2CdqxL-gII8ifQTG36rJQ47i7f46zNzR1',
  },
  {
    id: 3,
    title: 'Ethereal Symmetry',
    subtitle: 'Total Facial Balance',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADynQ5WQJ-DUoCDDntHALuA6NYyNCnowcqvaH7f1d-FMZMbtpnVk6-_i0ljmS5LZqDrC1euSZbiGd8ZMZu7x4ZpI_toN9kasuOpE1q_iPjBkEhlEzxCificGrPZLmdzj25yzhJs210AyT7581crcBPGfD_ziTtmhIXy5_I1taPFgBHiv4MTSWkSVUXvg6_p44cfupv5_73hr2fTz4pNLcpabaFkKS9fi11ZVOVUrg35sld5h7vyzzr9TaYrGmgdTbvhfI5y1qNhYHJ',
    afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU6sJ6ZLTxyd_e5XQrTKCTrHeVBYKYa-R0jgutuPsheBWbNWO45YYPTPn3YVhlNgjNZlOrYC5m_tqAJz30F0UHuKdl10m3mJNEBG3R1qL_lQEyI4x0WHGZpSaqU2TNv4DFCnwhBsUnyIMQ_eWBJPmT9Arwn66fwEO5gYtoz6Pcv15t4HqUIVe95V8VKf3vchlCYpIh3ZMdDocOgxr6QWVeaiqCBj0MlaPjvJ7F6LjV75NZjCVIm0pqKcYVBFCfEfB0OY2CAgepB9EE',
  },
]

function SliderCard({ item, index, isInView }) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const updateSlider = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }

  const handleMouseMove = (e) => { if (isDragging) updateSlider(e.clientX) }
  const handleTouchMove = (e) => { updateSlider(e.touches[0].clientX) }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setSliderPos(50)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-6"
    >
      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden aspect-[3/4] select-none border border-gold/10 group-hover:border-gold/20 transition-colors duration-500"
        style={{ cursor: 'ew-resize' }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setSliderPos(50)}
      >
        {/* After Image (base) */}
        <img
          src={item.afterImg}
          alt={`${item.title} after`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'contrast(1.05) brightness(0.92)' }}
          draggable={false}
        />

        {/* Before Image (clipped) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden z-10"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={item.beforeImg}
            alt={`${item.title} before`}
            className="absolute top-0 left-0 h-full object-cover"
            style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none', filter: 'contrast(1.05) brightness(0.92)' }}
            draggable={false}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none z-20" />

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 z-30 flex flex-col items-center"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-px h-full bg-gold/30" />
          <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg border border-gold/50 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 6H8M4 6L2 4M4 6L2 8M8 6L10 4M8 6L10 8" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-5 left-5 z-30 font-serif italic text-xs text-gold/70 tracking-widest pointer-events-none">Before</div>
        <div className="absolute bottom-5 right-5 z-30 font-serif italic text-xs text-gold tracking-widest pointer-events-none">After</div>
      </div>

      {/* Caption */}
      <div className="px-1">
        <h3 className="font-serif font-light text-xl text-snow tracking-[0.08em] mb-1 group-hover:text-gold transition-colors duration-500">
          {item.title}
        </h3>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted">
          {item.subtitle}
        </p>
        <div className="h-px w-6 bg-gold/20 mt-3 group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0D0D0D] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="overline block mb-6">The Portfolio</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none mb-6">
            The <em className="text-gold not-italic">Transformation</em>
          </h2>
          <div className="gold-line mb-8" />
          <p className="font-sans font-light text-grey/70 text-sm leading-relaxed italic">
            A showcase of structural refinement and ethereal balance. Each case is a unique study in subtle elevation.
          </p>
        </motion.div>

        {/* Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {transformations.map((item, i) => (
            <SliderCard key={item.id} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
