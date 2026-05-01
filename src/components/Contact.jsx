import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'DIFC, Gate Avenue, Dubai, UAE' },
  { icon: Phone, label: 'Phone', value: '+92 301 5102649' },
  { icon: Mail, label: 'Email', value: 'atelier@lumae.ae' },
  { icon: Clock, label: 'Hours', value: 'Daily 9:00 AM – 10:00 PM' },
]

const services = ['Hair Design', 'Color & Glossing', 'Bridal Package', 'Nail Artistry', 'Skin Refinement', 'Body Ritual']

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.service) return
    setLoading(true)
    
    const message = encodeURIComponent(
      `Hello LUMAE,\n\n` +
      `I would like to schedule a consultation.\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}\n\n` +
      `Please confirm my appointment. Thank you.`
    )
    
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setTimeout(() => {
        window.open(`https://wa.me/923015102649?text=${message}`, '_blank')
      }, 1200)
    }, 1400)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(201,169,110,0.35)',
    borderRadius: '2px',
    padding: '14px 18px',
    fontSize: '14px',
    color: '#FAFAFA',
    letterSpacing: '0.03em',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontWeight: 300,
  }

  const handleFocus = (e) => {
    e.target.style.border = '1px solid rgba(201,169,110,0.75)'
    e.target.style.background = 'rgba(255,255,255,0.10)'
    e.target.style.boxShadow = '0 0 0 1px rgba(201,169,110,0.20), 0 4px 20px rgba(0,0,0,0.4)'
  }

  const handleBlur = (e) => {
    e.target.style.border = '1px solid rgba(201,169,110,0.35)'
    e.target.style.background = 'rgba(255,255,255,0.07)'
    e.target.style.boxShadow = 'none'
  }

  const labelClass = 'font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium block mb-2 opacity-100'

  return (
    <section id="contact" ref={ref} className="py-2 px-8 md:px-12 bg-[#0D0D0D] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-4"
        >
          <span className="overline block mb-2">Begin Your Journey</span>
          <h2 className="font-serif font-light text-[clamp(32px,4vw,56px)] text-snow tracking-[0.06em] leading-none mb-4">
            Schedule a{' '}
            <em className="text-gold not-italic">Consultation</em>
          </h2>
          <div className="gold-line max-w-48 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-sans font-medium text-snow text-sm leading-[1.8] mb-4">
                Every journey begins with a conversation. Our team will craft a bespoke treatment plan tailored to your vision, schedule, and aspirations. Contact us to secure your private consultation.
              </p>
              <div className="font-serif italic text-gold text-lg tracking-widest">
                "Beauty is the harmony of purpose and form."
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-8 h-8 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-gold/70" />
                  </div>
                  <div>
                    <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-snow mb-1 font-medium">{label}</div>
                    <div className="font-sans text-sm text-snow font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="border-t border-gold/10 pt-6">
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-snow mb-4 font-medium">Atelier Experience</div>
              <p className="font-sans font-medium text-snow text-xs leading-relaxed">
                Private suites available for VIP clients. Complimentary champagne on arrival. Discretion guaranteed.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-6 text-center border border-gold/15 p-16"
              >
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9L7 13L15 5" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-serif font-light text-2xl text-snow tracking-widest">Request Received</h3>
                <p className="font-sans text-sm text-snow font-medium leading-relaxed">
                  We will be in touch within 24 hours to confirm your appointment.
                </p>
                <div className="overline mt-2">LUMAE Beauty Atelier</div>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} className="contact-input" />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} className="contact-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+92 301 5102649" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} className="contact-input" />
                  </div>
                  <div>
                    <label className={labelClass}>Service *</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="contact-input"
                      style={{
                        ...inputStyle,
                        background: 'rgba(30,20,10,0.92)',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A96E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: '40px',
                      }}
                    >
                      <option value="" style={{ background: '#1A1A1A', color: '#FAFAFA' }}>Select a service</option>
                      {services.map(s => (
                        <option key={s} value={s} style={{ background: '#1A1A1A', color: '#FAFAFA' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your vision..."
                    rows={4}
                    className="contact-input"
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{ paddingTop: '16px', paddingBottom: '16px', fontSize: '11px', marginTop: '4px' }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-3 h-3 border border-current border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Request Private Consultation</span>
                  )}
                </button>

                <p className="font-sans text-[9px] tracking-[0.2em] text-snow text-center uppercase font-medium mt-0">
                  Your details remain strictly confidential
                </p>

                {/* Alternative contact options */}
                <div style={{
                  marginTop: '0px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(201,169,110,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}>
                  <a href="https://wa.me/923015102649" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-snow text-xs tracking-wider hover:text-gold transition-colors duration-300 font-medium" style={{ textDecoration: 'none' }}>
                    <span style={{ color: '#25D366' }}>✆</span> WhatsApp Us
                  </a>
                  <span className="text-gold/30 text-[8px]">✦</span>
                  <a href="mailto:atelier@lumae.ae" className="flex items-center gap-2 text-snow text-xs tracking-wider hover:text-gold transition-colors duration-300 font-medium" style={{ textDecoration: 'none' }}>
                    <span className="text-gold">✉</span> atelier@lumae.ae
                  </a>
                  <span className="text-gold/30 text-[8px]">✦</span>
                  <a href="tel:+923015102649" className="flex items-center gap-2 text-snow text-xs tracking-wider hover:text-gold transition-colors duration-300 font-medium" style={{ textDecoration: 'none' }}>
                    <span className="text-gold">☏</span> +92 301 5102649
                  </a>
                </div>

                <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.90)', letterSpacing: '0.08em', fontWeight: 500 }}>
                  LUMAE Beauty Atelier · Dubai, UAE
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
