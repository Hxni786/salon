import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q:'How do I book an appointment at LUMAE?',              a:'You can book via our website booking flow, by calling +92 301 5102649, or by messaging us on WhatsApp. We recommend booking at least 5–7 days in advance for standard appointments, and 4–6 weeks for bridal packages.' },
  { q:'What should I expect on my first visit?',              a:'New guests begin with a complimentary 20-minute consultation with your assigned specialist. We assess your hair type, skin condition, lifestyle, and aesthetic goals before any treatment begins. Expect honesty, precision, and champagne.' },
  { q:'Do you offer bridal hair and makeup packages?',        a:'Yes. Our bridal suite offers fully tailored packages covering hair, makeup, nail artistry, and skin preparation. Packages are designed for both the wedding day and pre-wedding events. Contact us at least 6 months ahead for peak-season dates.' },
  { q:'What products do you use?',                           a:'We work exclusively with premium global brands: Kérastase, Oribe, La Mer Skincare, Davines, and Caudalie. All products are cruelty-free and we maintain a fully curated selection in our atelier retail space.' },
  { q:'Is parking available at the DIFC location?',           a:'Yes — complimentary valet parking is available for all LUMAE guests during their appointment. Simply notify our team upon booking and your space will be reserved.' },
  { q:'What is your cancellation policy?',                    a:'We require 24-hour notice for standard cancellations. Bridal and VIP bookings require 72-hour notice. Late cancellations without notice may incur a 50% service charge. We understand emergencies — please call us directly.' },
  { q:'Do you accommodate walk-in clients?',                  a:'LUMAE operates exclusively by appointment to ensure every guest receives our full attention. Occasionally same-day slots become available — we recommend calling directly or checking our online booking calendar.' },
  { q:'What languages do your specialists speak?',            a:'Our team is multilingual. We speak English, Arabic, French, Italian, and Russian. If you have a language preference, please let us know when booking and we will match you with the right specialist.' },
]

function FAQItem({ item, index, isInView }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={isInView?{opacity:1,y:0}:{}}
      transition={{ duration:0.6, delay:index*0.07, ease:[0.16,1,0.3,1] }}
      className="border-b border-gold/10 last:border-b-0"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`font-sans font-light text-base leading-snug tracking-wide transition-colors duration-400 pr-8 ${open ? 'text-gold' : 'text-snow/85 group-hover:text-snow'}`}>
          {item.q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-400
          ${open ? 'border-gold bg-gold text-bg rotate-45' : 'border-gold/25 text-gold/60 group-hover:border-gold/50'}`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
            style={{ overflow:'hidden' }}
          >
            <p className="font-sans font-light text-[#9A8F8A]/70 text-sm leading-[2] pb-6 pr-12 tracking-wide">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-[140px] px-8 md:px-12 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

        {/* Left sticky heading */}
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.9 }} className="lg:col-span-2">
          <div className="lg:sticky lg:top-32">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Knowledge</span>
            <h2 className="font-serif font-light text-[clamp(38px,5vw,56px)] text-snow tracking-[0.05em] leading-[1.15] mb-6">
              Your Questions <em className="text-gold not-italic">Answered</em>
            </h2>
            <div className="h-px bg-gradient-to-r from-gold/30 to-transparent mb-8" />
            <p className="font-sans font-light text-[#9A8F8A]/60 text-sm leading-[2]">
              Can't find what you're looking for? Our team is available daily from 9AM–10PM.
            </p>
            <div className="mt-8">
              <button className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 px-7 py-3.5 hover:bg-gold hover:text-bg transition-all duration-400">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: accordion */}
        <div className="lg:col-span-3">
          {FAQS.map((item, i) => <FAQItem key={i} item={item} index={i} isInView={isInView} />)}
        </div>
      </div>
    </section>
  )
}
