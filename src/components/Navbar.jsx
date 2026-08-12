import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { ease } from '../utils/animations'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const IDS = LINKS.map(l => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(IDS, 80)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
      >
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={() => setOpen(false)}>
            MKA<span className="nav-logo-dot">.</span>
          </a>

          <ul className="nav-links">
            {LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link${activeId === link.href.slice(1) ? ' active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/cv.pdf"
            download
            className="btn btn-primary navbar-cv-btn"
            style={{ fontSize: '0.82rem', padding: '8px 18px' }}
          >
            Download CV
          </a>

          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {LINKS.map(link => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                  }}
                >
                  <a
                    href={link.href}
                    className="drawer-link"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a href="/cv.pdf" download className="btn btn-primary" style={{ marginTop: 40 }}>
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
