import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const PLANS = [
  {
    tier: 'Essential',
    price: 'AED 350',
    duration: '60 min',
    desc: 'The refined starting point for new guests.',
    featured: false,
    features: ['One signature treatment','Consultation included','Complimentary hand ritual','Product recommendation','Priority rebooking','Loyalty points earned'],
    cta: 'Book Essential',
  },
  {
    tier: 'Signature',
    price: 'AED 890',
    duration: '120 min',
    desc: 'Our most celebrated full-atelier experience.',
    featured: true,
    badge: 'Most Popular',
    features: ['Two premium treatments','Personal style consultation','Glass of champagne on arrival','Scalp & hand ritual included','10% retail discount','Double loyalty points'],
    cta: 'Book Signature',
  },
  {
    tier: 'Black Card VIP',
    price: 'AED 2,400',
    duration: '180 min',
    desc: 'Reserved for those who accept nothing less.',
    featured: false,
    features: ['Unlimited treatment access','Dedicated private suite','Private airport transfer','Full wardrobe consultation','25% retail discount','VIP tier status — lifetime'],
    cta: 'Enquire Privately',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.9 }} className="text-center mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Investment</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none mb-6">
            Our <em className="text-gold not-italic">Packages</em>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-48 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity:0, y:50 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.8, delay:i*0.12, ease:[0.16,1,0.3,1] }}
              className={`relative flex flex-col border transition-all duration-500
                ${plan.featured
                  ? 'border-gold/50 bg-[#141414] scale-105 shadow-[0_0_60px_rgba(201,169,110,0.08)] z-10 py-12 px-8'
                  : 'border-gold/10 hover:border-gold/25 bg-card py-10 px-7'}`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-bg font-sans text-[8px] tracking-[0.3em] uppercase px-4 py-1.5 whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/70 mb-3">{plan.tier}</div>
                <div className="font-serif font-light text-4xl text-gold tracking-wider mb-1">{plan.price}</div>
                <div className="font-sans text-[10px] tracking-[0.2em] text-grey/40 uppercase">{plan.duration} session</div>
                <p className="font-sans font-light text-grey/60 text-sm leading-relaxed mt-4">{plan.desc}</p>
              </div>

              <div className="h-px bg-gold/10 mb-7" />

              <ul className="flex flex-col gap-3.5 mb-10 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={12} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="font-sans font-light text-grey/70 text-sm leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full font-sans text-[10px] tracking-[0.3em] uppercase py-4 border transition-all duration-500 relative overflow-hidden group
                  ${plan.featured ? 'bg-gold border-gold text-bg hover:bg-gold/85' : 'border-gold/30 text-gold hover:bg-gold hover:text-bg'}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
