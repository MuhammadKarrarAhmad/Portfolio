import { motion } from 'framer-motion'
import styles from './Experience.module.css'

const EXPERIENCE = [
  {
    role: 'Data Engineering Intern',
    company: 'Ethos Farm',
    period: 'Sep 2024 – Present',
    type: 'Internship',
    color: '#22d3ee',
    bullets: [
      'Designed & delivered a digital data management system, reducing manual data entry by ~60% across operational teams',
      'Engineered automated ETL pipelines using Python, Pandas & SQL across 3 operational functions',
      'Built a real-time shift management system for 400+ airport terminal staff with three-tier role architecture',
      'Led data collection, pipeline design & stakeholder reporting for a live Heathrow Airport feasibility study',
      'Collaborated with stakeholders to translate business requirements into scalable, production-ready solutions',
    ],
  },
  {
    role: 'Project Lead',
    company: 'Fujitsu Sustainability Hackathon – Heathrow',
    period: 'Jan 2025',
    type: 'Hackathon',
    color: '#3b82f6',
    bullets: [
      'Led a cross-functional team of 5 to design a data-driven waste management solution for Heathrow Airport',
      'Secured 2nd place in the competition',
      'Presented findings to industry judges using data visualisation and structured analysis',
    ],
  },
  {
    role: 'Pathways Work Experience',
    company: 'Cisco – Remote',
    period: 'Feb 2025',
    type: 'Work Experience',
    color: '#a78bfa',
    bullets: [
      'Completed Cisco\'s Virtual Work Experience Programme',
      'Gained practical skills in networking, cybersecurity fundamentals and collaborative problem-solving',
    ],
  },
  {
    role: 'Crew Member',
    company: 'McDonald\'s – Hayes',
    period: 'Nov 2024 – Present',
    type: 'Part-Time',
    color: '#f59e0b',
    bullets: [
      'Analysed shift-based operational data to identify service bottlenecks, improving peak-hour order speed by 15%',
      'Awarded Employee of the Month and Star of the Shift on 10 separate occasions',
    ],
  },
  {
    role: 'Founder & Operator',
    company: 'E-Commerce Business – Pakistan',
    period: '2023 – Present',
    type: 'Entrepreneurial',
    color: '#10b981',
    bullets: [
      'Founded and operate an e-commerce business selling fashion, perfumes, jewellery and handbags',
      'Applied data-driven strategies to automate inventory reconciliation & digital marketing optimisation',
      'Built a scalable business model with a roadmap for international expansion and worldwide shipping',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Career</span>
          <h2 className="section-title">Work <span>Experience</span></h2>
        </motion.div>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              className={styles.item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.lineCol}>
                <div className={styles.dot} style={{ background: exp.color }} />
                {i < EXPERIENCE.length - 1 && <div className={styles.line} />}
              </div>

              <div className={styles.content}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>{exp.period}</span>
                    <span className={styles.typeBadge} style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}10` }}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul className={styles.bullets}>
                  {exp.bullets.map((b) => (
                    <li key={b}>
                      <span className={styles.bulletDot} style={{ background: exp.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
