import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useScrollProgress } from './hooks/useScrollProgress'
import Preloader from './components/Preloader'
import FloatingAvatar from './components/FloatingAvatar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Blog from './components/Blog'
import Contact from './components/Contact'
import BookingSection from './components/BookingSection'
import Footer from './components/Footer'

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const progress = useScrollProgress()

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 20 })

  useEffect(() => {
    const onMove = e => {
      mouseX.set(e.clientX - 300)
      mouseY.set(e.clientY - 300)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <motion.div
        className="cursor-glow"
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />

      <Navbar />
      <FloatingAvatar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Blog />
        <Contact />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}
