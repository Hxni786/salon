import { useScroll, useTransform, motion } from 'framer-motion'

const textShadow = '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)'

export default function ContactOverlay({ scrollRef }) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end']
  })

  // ── OVERLAY 1 — Scroll 0% → 20% ──
  const o1Opacity = useTransform(scrollYProgress, [0.0, 0.06, 0.15, 0.20], [0, 1, 1, 0])
  const o1Y = useTransform(scrollYProgress, [0.0, 0.20], [40, -20])

  // ── OVERLAY 2 & 3 — Scroll 22% → 43% ──
  const o23Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.43], [0, 1, 1, 0])
  const o2Y = useTransform(scrollYProgress, [0.22, 0.43], [50, 0])
  const o3X = useTransform(scrollYProgress, [0.22, 0.43], [40, 0])

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">

      {/* OVERLAY 1 — Center screen */}
      <motion.div
        style={{ opacity: o1Opacity, y: o1Y }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <span
          className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#C9A96E] mb-6 block"
          style={{ textShadow }}
        >
          LUMAE · DUBAI
        </span>

        <h2
          className="font-serif font-light text-[clamp(48px,8vw,120px)] text-[#FAFAFA] leading-none tracking-[0.04em] mb-2"
          style={{ textShadow }}
        >
          Begin Your
        </h2>

        <h2
          className="font-serif font-medium italic text-[clamp(48px,8vw,120px)] text-[#C9A96E] leading-none tracking-[0.04em] mb-8"
          style={{ textShadow }}
        >
          Journey.
        </h2>

        <div
          className="mx-auto"
          style={{
            width: '100px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
          }}
        />

        <p
          className="font-sans font-light text-white/60 text-sm tracking-wider mt-6"
          style={{ textShadow }}
        >
          A sanctuary of beauty awaits you.
        </p>
      </motion.div>

      {/* OVERLAY 2 — Bottom-left */}
      <motion.div
        style={{ opacity: o23Opacity, y: o2Y }}
        className="absolute inset-0 flex flex-col justify-end pb-[8vh] pl-[8vw] pr-4 max-w-2xl text-left"
      >
        <span
          className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A96E] mb-5 block"
          style={{ textShadow }}
        >
          RESERVE YOUR SESSION
        </span>

        <h3
          className="font-serif font-light text-[clamp(28px,4vw,48px)] text-[#FAFAFA] leading-[1.1] mb-2"
          style={{ textShadow }}
        >
          Every appointment is
        </h3>

        <h3
          className="font-serif font-medium italic text-[clamp(28px,4vw,48px)] text-[#C9A96E] leading-[1.1] mb-6"
          style={{ textShadow }}
        >
          an experience.
        </h3>

        <p
          className="font-sans font-light text-[#FAFAFA]/60 text-sm leading-relaxed mb-8 max-w-[340px]"
          style={{ textShadow }}
        >
          Private suites. Expert stylists.<br/>Moments crafted entirely for you.
        </p>

        <div className="flex flex-col gap-3">
          {[
            'Complimentary consultation included',
            'Premium international products only',
            'Private suite available on request'
          ].map(feature => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" style={{ boxShadow: '0 0 10px rgba(201,169,110,0.5)' }} />
              <span className="font-sans font-light text-white/80 text-sm" style={{ textShadow }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* OVERLAY 3 — Bottom-right */}
      <motion.div
        style={{ opacity: o23Opacity, x: o3X }}
        className="absolute inset-0 flex flex-col justify-end items-end pb-[8vh] pr-[8vw] pl-4 text-right"
      >
        <div className="flex flex-col gap-8">
          {[
            { num: '12+', label: 'Years of Excellence' },
            { num: '4800+', label: 'Happy Clients' },
            { num: '22', label: 'Awards Won' }
          ].map(stat => (
            <div key={stat.label}>
              <div
                className="font-serif font-medium text-[clamp(36px,5vw,56px)] text-[#C9A96E] leading-none mb-1"
                style={{ textShadow }}
              >
                {stat.num}
              </div>
              <div
                className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/60"
                style={{ textShadow }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 mb-4"
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6))',
          }}
        />

        <div className="font-sans font-medium text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]" style={{ textShadow }}>
          Dubai · UAE
        </div>
      </motion.div>

    </div>
  )
}
