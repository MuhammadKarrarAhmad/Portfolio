import { motion } from 'framer-motion'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Contact.module.css'

const LINKS = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'muhammadkarrar.ahmad@icloud.com',
    href: 'mailto:muhammadkarrar.ahmad@icloud.com',
    color: '#22d3ee',
  },
  {
    icon: <FaGithub size={22} />,
    label: 'GitHub',
    value: 'MuhammadKarrarAhmad',
    href: 'https://github.com/MuhammadKarrarAhmad',
    color: '#f0f4ff',
  },
  {
    icon: <FaLinkedin size={22} />,
    label: 'LinkedIn',
    value: 'Muhammad Karrar Ahmad',
    href: 'https://www.linkedin.com/in/muhammadkarrarahmad',
    color: '#3b82f6',
  },
  {
    icon: <MapPin size={22} />,
    label: 'Location',
    value: 'Southall, London, UK',
    href: null,
    color: '#a78bfa',
  },
]

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Let&apos;s Connect</span>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p className={styles.subtitle}>
            Open to junior data engineering or software engineering roles. Feel free to reach out!
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.linksCol}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {LINKS.map((link) => (
              <div key={link.label} className={styles.linkCard}>
                <span className={styles.linkIcon} style={{ color: link.color, background: `${link.color}15` }}>
                  {link.icon}
                </span>
                <div>
                  <p className={styles.linkLabel}>{link.label}</p>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className={styles.linkValue}
                    >
                      {link.value}
                      {link.href.startsWith('http') && <ExternalLink size={13} />}
                    </a>
                  ) : (
                    <span className={styles.linkValueStatic}>{link.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.ctaCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h3 className={styles.ctaTitle}>Looking for a Junior Role</h3>
              <p className={styles.ctaText}>
                I&apos;m actively seeking junior data or software engineering opportunities where
                I can bring immediate impact through my hands-on experience in data pipelines,
                full-stack development, and stakeholder-facing projects.
              </p>
              <div className={styles.ctaBadges}>
                <span className="tag">Open to Work</span>
                <span className="tag">London / Remote</span>
                <span className="tag">Junior Data Eng</span>
                <span className="tag">Junior Dev</span>
              </div>
              <div className={styles.ctaActions}>
                <a
                  href="mailto:muhammadkarrar.ahmad@icloud.com"
                  className="btn-primary"
                >
                  <Mail size={16} />
                  Send an Email
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="btn-outline"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className={styles.footer}>
          <p>Built with React + Vite · &copy; {new Date().getFullYear()} Muhammad Karrar Ahmad</p>
        </div>
      </div>
    </section>
  )
}
