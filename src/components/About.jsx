import { motion } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'
import styles from './About.module.css'

const HIGHLIGHTS = [
  { icon: <Briefcase size={18} />, text: 'Data Engineering Intern @ Ethos Farm' },
  { icon: <MapPin size={18} />, text: 'Southall, London, UK' },
  { icon: <GraduationCap size={18} />, text: 'T-Level Digital Production @ Uxbridge College' },
  { icon: <Award size={18} />, text: '2nd Place — Fujitsu Sustainability Hackathon' },
]

export default function About() {
  return (
    <section id="about">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I <span>Am</span></h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.avatarCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>MKA</div>
              <div className={styles.avatarRing} aria-hidden="true" />
            </div>

            <div className={styles.highlights}>
              {HIGHLIGHTS.map((h) => (
                <div key={h.text} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.bio}>
              I&apos;m a driven T-Level Digital Production student and Data Engineering Intern
              passionate about turning complex business problems into elegant, data-driven
              solutions. I build things that actually work in the real world — not just in
              demo environments.
            </p>
            <p className={styles.bio}>
              At <strong>Ethos Farm</strong>, I replaced legacy Excel-based workflows with
              automated pipelines and built a real-time shift management system supporting
              over 400 airport terminal staff. I also led data collection and analysis for
              a live feasibility study with <strong>Heathrow Airport</strong>, producing
              structured analysis used in real infrastructure decisions.
            </p>
            <p className={styles.bio}>
              Beyond my internship, I independently built a full-stack e-commerce platform
              for my T-Level exam project, founded an e-commerce business, and led a
              cross-functional team to 2nd place at the Fujitsu Sustainability Hackathon.
            </p>

            <div className={styles.tags}>
              {['Python', 'React.js', 'SQL', 'FastAPI', 'MongoDB', 'TypeScript', 'Pandas', 'ETL Pipelines'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
