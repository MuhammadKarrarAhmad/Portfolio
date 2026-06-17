import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease     = [0.16, 1, 0.3, 1]
const fallEase = [0.4, 0, 0.9, 1]

const WORDS = [
  { text: 'Innovating,', bold: false },
  { text: 'Empowering,', bold: false },
  { text: 'Delivering.',  bold: true  },
]

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <>
          {/* Layer 1 — dark background, plain fade AFTER text leaves */}
          <motion.div
            key="preloader-bg"
            className="preloader-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.42, ease: 'easeIn' }}
          />

          {/* Layer 2 — text only, tilts left-side-down and falls */}
          <motion.div
            key="preloader-text"
            className="preloader-text-layer"
            exit={{
              rotate: -8,
              y: 260,
              opacity: 0,
            }}
            style={{ transformOrigin: '75% center' }}
            transition={{ duration: 0.55, ease: fallEase }}
          >
            <div className="preloader-line">
              {WORDS.map((w, i) => (
                <motion.span
                  key={w.text}
                  className={`preloader-word${w.bold ? ' preloader-word--bold' : ''}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.42, ease }}
                >
                  {w.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
