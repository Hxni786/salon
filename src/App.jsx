import { useState } from 'react'
import Navbar from './components/Navbar'
import PageIntro from './components/PageIntro'
import HeroCanvas from './components/hero/HeroCanvas'
import Sequence2Canvas from './components/sequence2/Sequence2Canvas'
import About from './components/About'
import Services from './components/Services'
import PortfolioGallery from './components/PortfolioGallery'
import BeforeAfter from './components/BeforeAfter'
import Booking from './components/Booking'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Offers from './components/Offers'
import Loyalty from './components/Loyalty'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import ContactCanvas from './components/contact-canvas/ContactCanvas'
import Team from './components/Team'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  return (
    <>
      <PageIntro onDone={() => setIntroComplete(true)} />
      <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <main>
          <HeroCanvas />
          <Sequence2Canvas />
          <About />
          <Services />
          <PortfolioGallery />
          <BeforeAfter />
          <Booking />
          <Testimonials />
          <Pricing />
          <Offers />
          <Loyalty />
          <Team />
          <Blog />
          <FAQ />
          <ContactCanvas>
            <Contact />
          </ContactCanvas>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
