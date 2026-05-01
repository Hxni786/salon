import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = {
  'Quick Links': ['About Us','Services','Gallery','The Team','Journal'],
  'Services':    ['Hair Design','Color Studio','Bridal Suite','Nail Artistry','Skin & Facial','Spa Wellness'],
}

const SOCIALS = [
  { label:'Instagram', d:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label:'TikTok',    d:'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z' },
  { label:'WhatsApp',  d:'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer ref={ref} id="contact-footer" className="bg-[#050505]">
      {/* Map placeholder */}
      <div className="w-full h-48 bg-[#080808] border-b border-gold/8 flex items-center justify-center">
        <div className="text-center">
          <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold/30 mb-1">Google Maps Embed</div>
          <div className="font-sans text-[8px] text-snow/10 tracking-widest">DIFC, Gate Avenue, Dubai</div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

          {/* Col 1 — Brand */}
          <motion.div initial={{ opacity:0, y:20 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="flex flex-col gap-5">
            <div className="font-serif font-light text-3xl tracking-[0.5em] text-gold">LUMAE</div>
            <div className="h-px bg-gradient-to-r from-gold/30 to-transparent w-24" />
            <p className="font-sans font-light text-[#9A8F8A]/45 text-sm leading-[1.9]">
              Dubai's premier beauty sanctuary. Where artistry meets science in quiet luxury.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ label, d }) => (
                <button key={label} title={label}
                  className="w-9 h-9 border border-gold/12 flex items-center justify-center text-[#9A8F8A]/40 hover:text-gold hover:border-gold/40 transition-all duration-400">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cols 2 & 3 — Links */}
          {Object.entries(LINKS).map(([heading, links], gi) => (
            <motion.div key={heading} initial={{ opacity:0, y:20 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.8, delay:0.1*(gi+1) }} className="flex flex-col gap-5">
              <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold/55">{heading}</div>
              {links.map(l => (
                <button key={l} className="font-sans text-xs text-[#9A8F8A]/40 hover:text-snow/70 transition-colors duration-300 text-left tracking-wide">{l}</button>
              ))}
            </motion.div>
          ))}

          {/* Col 4 — Contact */}
          <motion.div initial={{ opacity:0, y:20 }} animate={isInView?{opacity:1,y:0}:{}} transition={{ duration:0.8, delay:0.3 }} className="flex flex-col gap-5">
            <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold/55">Find Us</div>
            {[
              { label:'Address', val:'Gate Avenue, DIFC, Dubai, UAE' },
              { label:'Phone',   val:'+92 301 5102649' },
              { label:'Email',   val:'atelier@lumae.ae' },
              { label:'Hours',   val:'Daily 9:00 AM – 10:00 PM' },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="font-sans text-[8px] tracking-[0.3em] uppercase text-gold/30 mb-0.5">{label}</div>
                <div className="font-sans text-xs text-[#9A8F8A]/55">{val}</div>
              </div>
            ))}
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/923015102649"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2.5 font-sans text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/25 px-5 py-3 hover:bg-gold hover:text-bg transition-all duration-400 w-fit"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#9A8F8A]/20">
            © 2025 LUMAE Beauty Atelier LLC. All rights reserved.
          </span>
          <div className="flex items-center gap-8">
            {['Privacy','Terms','Cookies'].map(l => (
              <button key={l} className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9A8F8A]/20 hover:text-[#9A8F8A]/50 transition-colors duration-300">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
