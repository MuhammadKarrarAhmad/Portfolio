import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import { usePointerReveal } from '../hooks/usePointerReveal'
import { ease } from '../utils/animations'
import profileImg from '../assets/profile.jpeg'
import heroBaseDesktop from '../assets/hero-bg/hero-base-desktop.webp'
import heroBaseMobile from '../assets/hero-bg/hero-base-mobile.webp'
import heroRevealDesktop from '../assets/hero-bg/hero-reveal-desktop.webp'
import heroRevealMobile from '../assets/hero-bg/hero-reveal-mobile.webp'

const WORDS = ['Muhammad', 'Karrar', 'Ahmad']

const ROLES = [
  'Data Engineer',
  'Full-Stack Developer',
  'Pipeline Builder',
  'AI Systems Builder',
]

const STATS = [
  { value: 400, suffix: '+', label: 'Staff Managed' },
  { value: 60,  suffix: '%', label: 'Work Reduced'  },
  { value: 5,   suffix: '+', label: 'Live Projects'  },
  { value: 3,   suffix: '',  label: 'Real Clients'   },
]

const STACK = ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AI/RAG']

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 8,
  dur: 5 + Math.random() * 8,
}))

function StatItem({ stat, trigger }) {
  const count = useCountUp(stat.value, 1800, trigger)
  return (
    <div className="hero-stat">
      <span className="hero-stat-number">{count}{stat.suffix}</span>
      <span className="hero-stat-label">{stat.label}</span>
    </div>
  )
}

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase,     setPhase]     = useState('typing')
  const [statsRef,  statsInView]  = useInView(0.3, true)
  const timerRef = useRef(null)
  const [cardHidden, setCardHidden] = useState(false)
  const { ref: heroBgRef, handlers: heroBgHandlers } = usePointerReveal({ radius: 260 })

  useEffect(() => {
    const target = ROLES[roleIdx]
    const i = displayed.length
    if (phase === 'typing') {
      if (i < target.length) {
        timerRef.current = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 65)
      } else {
        timerRef.current = setTimeout(() => setPhase('pausing'), 2200)
      }
    } else if (phase === 'pausing') {
      timerRef.current = setTimeout(() => setPhase('deleting'), 400)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => setDisplayed(p => p.slice(0, -1)), 35)
      } else {
        setRoleIdx(p => (p + 1) % ROLES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timerRef.current)
  }, [displayed, phase, roleIdx])

  return (
    <section
      id="hero"
      className="hero section"
      ref={heroBgRef}
      {...heroBgHandlers}
    >
      {/* Background */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh-orb-1" />
        <div className="mesh-orb-2" />
        <div className="mesh-orb-3" />
      </div>
      <div className="hero-photo-bg" aria-hidden="true">
        <img src={heroBaseDesktop} alt="" className="hero-photo-bg-base hero-photo-bg--desktop" />
        <img src={heroBaseMobile} alt="" className="hero-photo-bg-base hero-photo-bg--mobile" />
        <div className="hero-photo-bg-reveal">
          <img src={heroRevealDesktop} alt="" className="hero-photo-bg-reveal-img hero-photo-bg--desktop" />
          <img src={heroRevealMobile} alt="" className="hero-photo-bg-reveal-img hero-photo-bg--mobile" />
        </div>
        <div className="hero-photo-bg-vignette" />
      </div>
      <div className="hero-grid-overlay" aria-hidden="true" />
      {PARTICLES.map(p => (
        <span key={p.id} className="particle" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
        }} />
      ))}

      <div className="container hero-content">
        <div className="hero-layout">

          {/* ── LEFT: text ── */}
          <div className="hero-left">
            {/* Available badge */}
            <motion.div className="hero-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.2, ease }}>
              <span className="badge-dot" />
              Available for opportunities · London, UK
            </motion.div>

            {/* Name */}
            <h1 className="hero-title" aria-label="Muhammad Karrar Ahmad">
              {WORDS.map((word, i) => (
                <motion.span key={word}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.35 + i * 0.08, ease }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Typewriter */}
            <motion.div className="hero-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.6, ease }}>
              <span className="typewriter-text">{displayed}</span>
              <span className="hero-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p className="hero-desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.72, ease }}>
              T-Level student & Data Engineering Intern building production systems for{' '}
              <strong>Heathrow Airport</strong> and real clients — pipelines, SaaS, AI assistants.
            </motion.p>

            {/* CTAs */}
            <motion.div className="hero-ctas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.84, ease }}>
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#booking"  className="btn btn-ghost">Book a Call</a>
            </motion.div>

            {/* Stats */}
            <motion.div ref={statsRef} className="hero-stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.96, ease }}>
              {STATS.map(stat => (
                <StatItem key={stat.label} stat={stat} trigger={statsInView} />
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: profile card ── */}
          <motion.div className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}>

            <div
              className="hero-card-hover-zone"
              onMouseEnter={() => setCardHidden(true)}
              onMouseLeave={() => setCardHidden(false)}
            >
              {/* glow behind card */}
              <div className={`hero-card-glow${cardHidden ? ' is-hidden' : ''}`} aria-hidden="true" />

              <div className={`hero-profile-card${cardHidden ? ' is-hidden' : ''}`}>
                {/* Status chip */}
                <div className="hero-profile-badge">
                  <span className="hero-profile-dot" />
                  Interning @ Ethos Farm
                </div>

                {/* Photo */}
                <div className="hero-photo-wrap">
                  <img src={profileImg} alt="Muhammad Karrar Ahmad" className="hero-photo" />
                  <div className="hero-photo-overlay" />
                </div>

                {/* Bottom info */}
                <div className="hero-profile-footer">
                  <div className="hero-profile-name">Muhammad Karrar Ahmad</div>
                  <div className="hero-profile-role">Data Engineer · Full-Stack</div>
                  <div className="hero-profile-stack">
                    {STACK.map(s => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4, ease }}>
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  )
}
