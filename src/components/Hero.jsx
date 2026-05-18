import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Hero.module.css'

const TITLES = [
  'Data Engineering Intern',
  'Full-Stack Developer',
  'T-Level Digital Student',
  'Pipeline Automation Builder',
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = TITLES[titleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex((i) => (i + 1) % TITLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, titleIndex])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className={styles.greeting}>Hi, I&apos;m</span>
          <h1 className={styles.name}>
            Muhammad<br />
            <span className="gradient-text">Karrar Ahmad</span>
          </h1>

          <p className={styles.typewriter}>
            <span className={styles.typedText}>{displayed}</span>
            <span className={styles.cursor}>|</span>
          </p>

          <p className={styles.tagline}>
            Building scalable data pipelines &amp; full-stack systems that solve real problems.
            Currently interning at <span>Ethos Farm</span>, serving Heathrow Airport.
          </p>

          <div className={styles.ctas}>
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>

          <div className={styles.socials}>
            <a
              href="https://github.com/MuhammadKarrarAhmad"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammadkarrarahmad"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:muhammadkarrar.ahmad@icloud.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.stats}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {[
          { value: '400+', label: 'Staff Managed' },
          { value: '60%', label: 'Manual Work Reduced' },
          { value: '3', label: 'Key Projects' },
          { value: '2nd', label: 'Hackathon Place' },
        ].map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <a href="#about" className={styles.scrollDown} aria-label="Scroll down">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </a>
    </section>
  )
}
