import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import styles from './Education.module.css'

const EDUCATION = [
  {
    degree: 'T-Level — Digital Production, Design & Development',
    institution: 'Uxbridge College, Hillingdon',
    period: 'Sep 2024 – Present',
    note: 'Equivalent to 168 UCAS points (3 A-Levels) | Grade B in First Year',
    detail: 'Exam Project: Local Farmer E-Commerce Platform — full-stack web application built independently using React.js, MongoDB and Python',
  },
  {
    degree: 'GCSE: Maths (4) · English (5) · BTech Level 2 ICT (Double Merit)',
    institution: 'West London College, Ealing',
    period: 'Jun 2024',
    note: null,
    detail: null,
  },
  {
    degree: 'Google Data Analytics Professional Certificate',
    institution: 'Google / Coursera',
    period: 'In Progress',
    note: 'Foundations: Data, Data, Everywhere (Dec 2025) | Ask Questions to Make Data-Driven Decisions (Dec 2025)',
    detail: null,
  },
  {
    degree: 'Professional Certificate in Data Analysis',
    institution: 'Udemy',
    period: 'Jun 2025',
    note: null,
    detail: null,
  },
]

const CERTIFICATIONS = [
  {
    name: 'IT Work Experience Programme',
    issuer: 'Heathrow Airport',
    date: 'Apr 2024',
    color: '#22d3ee',
  },
  {
    name: 'Pathways Virtual Work Experience',
    issuer: 'Cisco',
    date: 'Feb 2025',
    color: '#3b82f6',
  },
  {
    name: 'Professional Certificate in Data Analysis',
    issuer: 'Udemy',
    date: 'Jun 2025',
    color: '#a78bfa',
  },
  {
    name: 'Foundations: Data, Data, Everywhere',
    issuer: 'Google / Coursera',
    date: 'Dec 2025',
    color: '#f59e0b',
  },
  {
    name: 'Ask Questions to Make Data-Driven Decisions',
    issuer: 'Google / Coursera',
    date: 'Dec 2025',
    color: '#10b981',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Background</span>
          <h2 className="section-title">Education & <span>Certifications</span></h2>
        </motion.div>

        <div className={styles.columns}>
          <div>
            <h3 className={styles.colTitle}>
              <GraduationCap size={18} />
              Education
            </h3>
            <div className={styles.eduList}>
              {EDUCATION.map((ed, i) => (
                <motion.div
                  key={ed.degree}
                  className={styles.eduItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={styles.eduHeader}>
                    <h4 className={styles.eduDegree}>{ed.degree}</h4>
                    <span className={styles.eduPeriod}>{ed.period}</span>
                  </div>
                  <p className={styles.eduInstitution}>{ed.institution}</p>
                  {ed.note && <p className={styles.eduNote}>{ed.note}</p>}
                  {ed.detail && <p className={styles.eduDetail}>{ed.detail}</p>}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.colTitle}>
              <Award size={18} />
              Certifications
            </h3>
            <div className={styles.certList}>
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  className={styles.certItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={styles.certBadge} style={{ background: `${cert.color}18`, borderColor: `${cert.color}30` }}>
                    <Award size={16} style={{ color: cert.color }} />
                  </div>
                  <div>
                    <p className={styles.certName}>{cert.name}</p>
                    <p className={styles.certMeta}>
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
