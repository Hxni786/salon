import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const SERVICES_LIST = [
  { name:'Hair Design', price:250 },
  { name:'Color & Gloss', price:450 },
  { name:'Bridal Package', price:1800 },
  { name:'Nail Artistry', price:150 },
  { name:'Skin Refinement', price:350 },
  { name:'Body Ritual', price:550 },
]
const STYLISTS = [
  { name:'Layla', title:'Founder' },
  { name:'Sofia', title:'Color' },
  { name:'Aisha', title:'Bridal' },
  { name:'Nadia', title:'Hair' },
]
const TIMES = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM']
const STEPS = ['Service','Stylist','Date','Time']

function CalendarPicker({ selected, onSelect }) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' })
  const availableDays = [2,3,5,7,9,10,12,14,16,17,19,21,23,24,26,28]

  return (
    <div className="bg-[#111] border border-gold/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { if(month===0){setMonth(11);setYear(y=>y-1)}else setMonth(m=>m-1) }}
          className="text-grey hover:text-gold transition-colors p-1">‹</button>
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-snow/70">{monthName} {year}</span>
        <button onClick={() => { if(month===11){setMonth(0);setYear(y=>y+1)}else setMonth(m=>m+1) }}
          className="text-grey hover:text-gold transition-colors p-1">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="text-center font-sans text-[9px] tracking-widest text-grey/40 pb-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`} />)}
        {Array.from({length: daysInMonth}).map((_,i) => {
          const day = i + 1
          const isAvail = availableDays.includes(day)
          const isSel = selected === `${year}-${month+1}-${day}`
          const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          return (
            <button
              key={day}
              disabled={!isAvail || isPast}
              onClick={() => isAvail && !isPast && onSelect(`${year}-${month+1}-${day}`)}
              className={`
                relative aspect-square flex items-center justify-center font-sans text-[11px] transition-all duration-200
                ${isSel ? 'bg-gold text-bg' : ''}
                ${isAvail && !isPast && !isSel ? 'text-snow hover:text-gold' : ''}
                ${!isAvail || isPast ? 'text-snow/15 cursor-not-allowed' : ''}
              `}
            >
              {day}
              {isAvail && !isPast && !isSel && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold/50" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Booking() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState({ service: null, stylist: null, date: null, time: null })
  const [confirmed, setConfirmed] = useState(false)

  const set = (key, val) => setSel(s => ({ ...s, [key]: val }))
  const canNext = [sel.service, sel.stylist, sel.date, sel.time][step] !== null

  const stepContent = [
    // Step 0 — Service
    <div key="s0" className="flex flex-wrap gap-3">
      {SERVICES_LIST.map(s => (
        <button key={s.name} onClick={() => set('service', s)}
          className={`font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-3 border transition-all duration-300
            ${sel.service?.name === s.name ? 'bg-gold border-gold text-bg' : 'border-gold/20 text-grey hover:border-gold/50 hover:text-snow'}`}>
          {s.name}
        </button>
      ))}
    </div>,
    // Step 1 — Stylist
    <div key="s1" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {STYLISTS.map(st => (
        <button key={st.name} onClick={() => set('stylist', st.name)}
          className="flex flex-col items-center gap-3 p-4 border border-gold/10 hover:border-gold/30 transition-all duration-300 group">
          <div className={`w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#181818]
            ${sel.stylist===st.name ? 'border-gold shadow-[0_0_20px_rgba(201,169,110,0.3)]' : 'border-gold/15 group-hover:border-gold/40'}`}>
            <span className="font-serif font-light text-lg text-snow/50">{st.name[0]}</span>
          </div>
          <div className="text-center">
            <div className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${sel.stylist===st.name?'text-gold':'text-snow/70'}`}>{st.name}</div>
            <div className="font-sans text-[9px] text-grey/40 tracking-wider mt-0.5">{st.title}</div>
          </div>
        </button>
      ))}
    </div>,
    // Step 2 — Date
    <CalendarPicker key="s2" selected={sel.date} onSelect={d => set('date', d)} />,
    // Step 3 — Time
    <div key="s3" className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {TIMES.map(t => (
        <button key={t} onClick={() => set('time', t)}
          className={`font-sans text-[10px] tracking-[0.15em] px-3 py-2.5 border transition-all duration-300
            ${sel.time===t ? 'bg-gold border-gold text-bg' : 'border-gold/15 text-grey hover:border-gold/40 hover:text-snow'}`}>
          {t}
        </button>
      ))}
    </div>,
  ]

  if (confirmed) return (
    <section className="py-[140px] px-8 md:px-12 bg-[#080808] flex items-center justify-center min-h-[60vh]">
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="text-center max-w-md">
        <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-8">
          <Check size={22} className="text-gold" />
        </div>
        <div className="font-sans text-[9px] tracking-[0.4em] uppercase text-gold/60 mb-4">Confirmed</div>
        <h3 className="font-serif font-light text-3xl text-snow tracking-widest mb-4">Reservation Secured</h3>
        <p className="font-sans text-sm text-grey/60 leading-relaxed mb-8">
          A confirmation has been sent. We look forward to welcoming you to LUMAE.
        </p>
        <button onClick={() => { setConfirmed(false); setStep(0); setSel({service:null,stylist:null,date:null,time:null}) }}
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 px-8 py-3 hover:bg-gold hover:text-bg transition-all duration-400">
          Book Again
        </button>
      </motion.div>
    </section>
  )

  return (
    <section id="booking" ref={ref} className="py-[140px] px-8 md:px-12 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.9 }} className="mb-16">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 block mb-5">Schedule</span>
          <h2 className="font-serif font-light text-[clamp(44px,6vw,72px)] text-snow tracking-[0.06em] leading-none">
            Reserve Your <em className="text-gold not-italic">Experience</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Steps */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={isInView?{opacity:1,x:0}:{}} transition={{ duration:0.9, delay:0.1 }} className="lg:col-span-2">
            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-12">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center">
                  <button onClick={() => i < step && setStep(i)}
                    className={`flex items-center gap-2.5 ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}>
                    <div className={`w-7 h-7 border flex items-center justify-center font-sans text-[9px] transition-all duration-400
                      ${i < step ? 'bg-gold border-gold text-bg' : i===step ? 'border-gold text-gold' : 'border-gold/15 text-grey/30'}`}>
                      {i < step ? <Check size={10}/> : i+1}
                    </div>
                    <span className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-400 hidden sm:block
                      ${i===step ? 'text-gold' : i < step ? 'text-snow/50' : 'text-grey/25'}`}>{s}</span>
                  </button>
                  {i < STEPS.length-1 && (
                    <div className={`w-8 sm:w-16 h-px mx-3 transition-all duration-500 ${i < step ? 'bg-gold/50' : 'bg-gold/10'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="mb-10 min-h-[200px]">
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/50 mb-5">
                Step {step+1} — {STEPS[step]}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-15 }} transition={{ duration:0.4 }}>
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-4">
              {step > 0 && (
                <button onClick={() => setStep(s => s-1)}
                  className="font-sans text-[10px] tracking-[0.3em] uppercase text-grey border border-gold/15 px-6 py-3 hover:border-gold/40 hover:text-snow transition-all duration-300">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => canNext && setStep(s => s+1)} disabled={!canNext}
                  className={`font-sans text-[10px] tracking-[0.3em] uppercase px-8 py-3 border transition-all duration-400
                    ${canNext ? 'border-gold text-bg bg-gold hover:bg-gold/90' : 'border-gold/10 text-grey/30 cursor-not-allowed'}`}>
                  Continue
                </button>
              ) : (
                <button onClick={() => sel.time && setConfirmed(true)} disabled={!sel.time}
                  className={`font-sans text-[10px] tracking-[0.3em] uppercase px-8 py-3 border transition-all duration-400
                    ${sel.time ? 'border-gold text-bg bg-gold hover:bg-gold/90' : 'border-gold/10 text-grey/30 cursor-not-allowed'}`}>
                  Confirm Reservation
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Summary Card */}
          <motion.div initial={{ opacity:0, x:30 }} animate={isInView?{opacity:1,x:0}:{}} transition={{ duration:0.9, delay:0.2 }}>
            <div className="bg-card border border-gold/15 p-8 sticky top-28">
              <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold/60 mb-6">Your Selection</div>
              <div className="flex flex-col gap-5 mb-8">
                {[
                  { label:'Service', val: sel.service?.name },
                  { label:'Stylist', val: sel.stylist },
                  { label:'Date',    val: sel.date?.replace(/-/g,' / ') },
                  { label:'Time',    val: sel.time },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start border-b border-gold/8 pb-4">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-grey/40">{row.label}</span>
                    <span className={`font-sans text-sm text-right max-w-[60%] ${row.val ? 'text-snow/80' : 'text-grey/20 italic text-xs'}`}>
                      {row.val || '—'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-8 pt-2">
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-grey/50">Total</span>
                <span className="font-serif font-light text-2xl text-gold">
                  {sel.service ? `AED ${sel.service.price.toLocaleString()}` : 'AED —'}
                </span>
              </div>
              <button
                onClick={() => { if(sel.service && sel.stylist && sel.date && sel.time) setConfirmed(true) }}
                className={`w-full font-sans text-[10px] tracking-[0.3em] uppercase py-4 border transition-all duration-400
                  ${sel.service && sel.stylist && sel.date && sel.time
                    ? 'bg-gold border-gold text-bg hover:bg-gold/90'
                    : 'border-gold/10 text-grey/20 cursor-not-allowed'}`}>
                Confirm Reservation
              </button>
              <p className="font-sans text-[8px] tracking-[0.2em] text-grey/25 text-center mt-4 uppercase">Free cancellation up to 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
