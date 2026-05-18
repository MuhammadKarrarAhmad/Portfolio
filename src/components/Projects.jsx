import { motion } from 'framer-motion'
import { ExternalLink, Database, ShoppingCart, BarChart3 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    icon: <Database size={24} />,
    title: 'Shift Management System',
    company: 'Ethos Farm × Heathrow Airport',
    description:
      'Full-stack shift management system replacing manual Excel-based scheduling for 400+ airport terminal staff across multiple locations. Features three-tier role architecture — Admin, Manager, and Supervisor.',
    highlights: [
      'Three-tier role architecture (Admin / Manager / Supervisor)',
      'Real-time absence tracking & Return to Work notifications',
      'Eliminated manual Excel roster uploads entirely',
      '400+ staff across multiple terminal locations',
    ],
    tags: ['React.js', 'JavaScript', 'SQL', 'HTML', 'CSS'],
    color: '#22d3ee',
    github: 'https://github.com/MuhammadKarrarAhmad',
  },
  {
    icon: <ShoppingCart size={24} />,
    title: 'Local Farmer E-Commerce',
    company: 'T-Level Exam Project',
    description:
      'Full-stack e-commerce platform connecting local farmers directly with buyers, eliminating intermediaries and supporting community agriculture. Built end-to-end as a T-Level Digital Production exam project.',
    highlights: [
      'Product listings, search & filter, order management',
      'Farmer profile pages with inventory management',
      'React.js frontend + Python/MongoDB backend',
      'Data-driven UX for varying technical literacy',
    ],
    tags: ['React.js', 'JavaScript', 'MongoDB', 'Python', 'FastAPI'],
    color: '#3b82f6',
    github: 'https://github.com/MuhammadKarrarAhmad',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Data Pipeline Automation',
    company: 'Ethos Farm',
    description:
      'Automated ETL pipelines collecting, processing and cleaning operational data from multiple sources. Significantly increased data accuracy and reduced reporting cycle time across 3 operational functions.',
    highlights: [
      'Automated ETL pipelines from multiple data sources',
      '~60% reduction in manual data entry time',
      'Increased accuracy across 3 operational functions',
      'Replaced legacy Excel-based reporting workflows',
    ],
    tags: ['Python', 'Pandas', 'SQL', 'ETL', 'Data Cleaning'],
    color: '#a78bfa',
    github: 'https://github.com/MuhammadKarrarAhmad',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Key <span>Projects</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              className={styles.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ '--card-accent': project.color }}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} style={{ color: project.color, background: `${project.color}18` }}>
                  {project.icon}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.githubLink}
                  aria-label="View on GitHub"
                >
                  <FaGithub size={18} />
                </a>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.company}>{project.company}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>

                <ul className={styles.highlights}>
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <span className={styles.bullet} style={{ background: project.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
