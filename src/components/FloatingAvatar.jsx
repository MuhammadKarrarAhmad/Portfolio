import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const spring = { type: 'spring', stiffness: 340, damping: 28, mass: 0.8 }

export default function FloatingAvatar() {
  const [show, setShow] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    // Wait for DOM to be ready, then watch the avatar wrap
    const attach = () => {
      const target = document.querySelector('.about-avatar-wrap')
      if (!target) return false

      const observer = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting),
        { rootMargin: '-72px 0px 0px 0px' }
      )
      observer.observe(target)
      return () => observer.disconnect()
    }

    // Retry in case About hasn't mounted yet
    const cleanup = attach()
    if (cleanup) return cleanup

    const timer = setTimeout(() => {
      const c = attach()
      return () => c && c()
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="floating-avatar"
          onClick={scrollToAbout}
          aria-label="Scroll to About section"
          initial={{ opacity: 0, scale: 0.4, y: -24, x: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: -24, x: 16 }}
          transition={spring}
          whileHover={{ scale: 1.1, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.92 }}
        >
          {!imgError ? (
            <img
              src="/src/assets/profile.jpeg"
              alt="Muhammad Karrar Ahmad"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="floating-avatar-initials">MKA</span>
          )}
          <span className="floating-avatar-ring" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
