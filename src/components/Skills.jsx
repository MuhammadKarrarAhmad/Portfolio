import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const SKILL_GROUPS = [
  {
    label: 'Data Engineering',
    color: '#22d3ee',
    skills: ['Python', 'Pandas', 'SQL', 'ETL Pipelines', 'Data Cleaning', 'Data Modelling', 'Excel Migration'],
  },
  {
    label: 'Software Development',
    color: '#3b82f6',
    skills: ['React.js', 'JavaScript', 'TypeScript', 'FastAPI', 'MongoDB', 'HTML', 'CSS', 'REST APIs', 'Git'],
  },
  {
    label: 'Analytical',
    color: '#a78bfa',
    skills: ['Exploratory Data Analysis', 'Process Optimisation', 'Data Quality', 'Stakeholder Reporting'],
  },
  {
    label: 'Visualisation',
    color: '#f59e0b',
    skills: ['Matplotlib', 'Seaborn', 'Dashboard Design'],
  },
  {
    label: 'Leadership & Soft Skills',
    color: '#10b981',
    skills: ['Project Management', 'Stakeholder Communication', 'Team Leadership', 'Pitching & Presentation'],
  },
  {
    label: 'Other Technical',
    color: '#f43f5e',
    skills: ['Cybersecurity Fundamentals', 'Networking Basics', 'System Architecture'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">Technical <span>Skills</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              className={styles.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupDot} style={{ background: group.color }} />
                <h3 className={styles.groupLabel}>{group.label}</h3>
              </div>
              <div className={styles.tags}>
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className={styles.skillTag}
                    style={{ '--skill-color': group.color }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.languages}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className={styles.langTitle}>Languages</h3>
          <div className={styles.langList}>
            {[
              { lang: 'English', level: 'Professional Proficiency' },
              { lang: 'Urdu', level: 'Native' },
              { lang: 'Punjabi', level: 'Native' },
            ].map(({ lang, level }) => (
              <div key={lang} className={styles.langItem}>
                <span className={styles.langName}>{lang}</span>
                <span className={styles.langLevel}>{level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
