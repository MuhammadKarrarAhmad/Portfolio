import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Reveal } from './Reveal'
import { ease } from '../utils/animations'

const PROJECTS = [
  {
    id: 'workforge',
    title: 'WorkForge',
    tagline: 'Multi-tenant workforce management SaaS',
    desc: 'Production workforce management platform for a major UK shopping centre. Handles scheduling, shift management, and automated reporting for 400+ staff across multiple tenants.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    tag: 'Client Project',
    tagColor: 'var(--accent)',
    live: null,
    github: null,
    featured: true,
  },
  {
    id: 'mall-ai',
    title: 'Mall AI Assistant',
    tagline: 'RAG-powered visitor intelligence',
    desc: 'AI-powered chatbot for a UK shopping centre using RAG and vector embeddings. Handles store queries, navigation, events, and personalised recommendations at scale.',
    stack: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'React'],
    tag: 'Client Project',
    tagColor: 'var(--accent)',
    live: null,
    github: null,
    featured: false,
  },
  {
    id: 'local-farmer',
    title: 'Local Farmer',
    tagline: 'Farm-to-consumer marketplace',
    desc: 'Full-stack marketplace connecting local UK farmers directly to consumers. Built for T-Level industry project with real product listings, cart, and order management.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    tag: 'T-Level Project',
    tagColor: '#7C3AED',
    live: null,
    github: null,
    featured: false,
  },
  {
    id: 'posperity',
    title: 'POSperity',
    tagline: 'E-commerce admin + POS system',
    desc: 'Full-featured point-of-sale and inventory management system. Tracks stock levels, generates sales reports, and integrates with payment gateways.',
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    tag: 'Personal Project',
    tagColor: '#059669',
    live: null,
    github: null,
    featured: false,
  },
  {
    id: 'heathrow',
    title: 'Heathrow Pass Tracker',
    tagline: 'Airside access pass management',
    desc: 'Security-sensitive pass management system for Heathrow Airport. Automates pass renewal workflows, tracks expiry dates, and generates compliance reports for airside access control.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'React'],
    tag: 'Client Project',
    tagColor: 'var(--accent)',
    live: null,
    github: null,
    featured: false,
  },
  {
    id: 'pipeline',
    title: 'Data Pipeline Automation',
    tagline: 'ETL orchestration toolkit',
    desc: 'Automated ETL pipeline system reducing manual data processing by 60%. Includes scheduled ingestion, transformation, validation, and delivery to downstream systems.',
    stack: ['Python', 'Pandas', 'Airflow', 'PostgreSQL', 'Docker'],
    tag: 'Internship',
    tagColor: '#D97706',
    live: null,
    github: null,
    featured: false,
  },
]

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: '-25% 0px -60% 0px' }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const active = PROJECTS[activeIdx]

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I&apos;ve <span className="gradient-text">Built</span></h2>
        </Reveal>

        <div className="projects-sticky-wrap">
          {/* Sticky left panel */}
          <div className="projects-sticky-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <span
                  className="tag"
                  style={{ background: `${active.tagColor}20`, color: active.tagColor, borderColor: `${active.tagColor}40`, marginBottom: 14, display: 'inline-block' }}
                >
                  {active.tag}
                </span>
                <h3 className="projects-sticky-heading">{active.title}</h3>
                <p className="projects-sticky-desc">{active.desc}</p>
                <div className="tag-list" style={{ marginBottom: 20 }}>
                  {active.stack.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
                <p className="projects-sticky-count">
                  <span>{activeIdx + 1}</span> / {PROJECTS.length}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scrolling right cards */}
          <div className="projects-scroll-right">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                ref={el => (cardRefs.current[i] = el)}
              >
                <motion.div
                  className="project-card-full"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {/* Gradient image placeholder */}
                  <div
                    className="project-img"
                    style={{
                      background: `linear-gradient(135deg, ${p.tagColor}22 0%, #0A1628 100%)`,
                      border: `1px solid ${p.tagColor}25`,
                    }}
                  >
                    <span className="project-img-label">{p.tagline}</span>
                  </div>

                  <div className="project-info">
                    <div className="project-header">
                      <h3 className="project-title">{p.title}</h3>
                      <div className="project-links">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                            <FaGithub size={16} />
                          </a>
                        )}
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {!p.github && !p.live && (
                          <span className="tag" style={{ fontSize: '0.7rem', opacity: 0.6 }}>Private</span>
                        )}
                      </div>
                    </div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="tag-list">
                      {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
