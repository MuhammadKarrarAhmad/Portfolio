import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import { ease } from '../utils/animations'

const PEEK    = 56    // px each compressed card peeks above the card in front
const CARD_H  = 300   // fixed card height in px — must match --exp-card-h in CSS
const N_CARDS = 3
// Total height of the card stack area: tallest card + peek strips for the rest
const STACK_H = CARD_H + PEEK * (N_CARDS - 1)   // 300 + 112 = 412px
const SECTION_H = '400vh'

// Progress ranges for each card entering  [start, end]
// 0 = section top at viewport top | 1 = section bottom at viewport bottom
const ENTER_RANGES = [
  [0.04, 0.17],
  [0.33, 0.47],
  [0.60, 0.75],
]

const ETHOS_TABS = [
  {
    id: 'workforge',
    label: 'WorkForge',
    role: 'Multi-Tenant SaaS Platform',
    desc: 'Built a comprehensive workforce management platform for a major UK shopping centre. Multi-tenant architecture supporting 400+ staff, real-time scheduling, shift management, and automated reporting dashboards.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'mall-ai',
    label: 'Mall AI Assistant',
    role: 'RAG-Powered Chat',
    desc: 'Developed an intelligent visitor assistant using RAG architecture and vector embeddings. Handles store queries, navigation, event info, and personalised recommendations at scale.',
    stack: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'React'],
  },
  {
    id: 'heathrow',
    label: 'Heathrow Pass Tracker',
    role: 'Airside Access Management',
    desc: 'Engineered a pass management system for Heathrow Airport. Tracks pass expiry, automates renewal workflows, and provides compliance reporting for security-sensitive access control.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'React'],
  },
]

const EXPERIENCE = [
  {
    id: 'ethos',
    num: '01',
    role: 'Data Engineering Intern',
    company: 'Ethos Farm',
    period: 'Jun 2025 – Present',
    type: 'Internship · Part-time',
    location: 'London, UK',
    colorHex: '#2563EB',
    bullets: [
      'Building 3 production systems for real enterprise clients',
      'Reduced manual workforce admin by 60% via automation',
      'Managing data pipelines processing 400+ employee records',
    ],
    hasTabs: true,
  },
  {
    id: 'ecom',
    num: '02',
    role: 'E-Commerce Founder',
    company: 'Independent Business',
    period: 'Jan 2024 – Present',
    type: 'Self-employed',
    location: 'Remote',
    colorHex: '#7C3AED',
    bullets: [
      'Founded and operated a product-based online business',
      'Managed product sourcing, marketing, and fulfilment end-to-end',
      'Built custom tooling to automate order tracking and inventory',
    ],
    hasTabs: false,
  },
  {
    id: 'hackathon',
    num: '03',
    role: '2nd Place — Sustainability Hackathon',
    company: 'Fujitsu',
    period: 'Mar 2025',
    type: 'Competition',
    location: 'London, UK',
    colorHex: '#059669',
    bullets: [
      'Led a cross-functional team to design a sustainability platform',
      'Pitched to Fujitsu judges against university-level competitors',
      'Delivered a functional prototype in under 24 hours',
    ],
    hasTabs: false,
  },
]

function EthosTabs() {
  const [activeTab, setActiveTab] = useState('workforge')
  const tab = ETHOS_TABS.find(t => t.id === activeTab)

  return (
    <div className="ethos-tabs">
      <div className="tab-list">
        {ETHOS_TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="tab-panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease }}
        >
          <p className="tab-role">{tab.role}</p>
          <p className="tab-desc">{tab.desc}</p>
          <div className="tag-list">
            {tab.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CardContent({ exp }) {
  return (
    <div className="exp-stack-card">
      {/* Ping dot */}
      <div className="exp-ping-wrap">
        <span className="exp-ping-dot" style={{ background: exp.colorHex }} />
        <span className="exp-ping-ring" style={{ borderColor: exp.colorHex }} />
        <span className="exp-ping-ring exp-ping-ring--2" style={{ borderColor: exp.colorHex }} />
      </div>

      {/* Ghost number */}
      <span className="exp-num" style={{ color: exp.colorHex }}>{exp.num}</span>

      <div className="exp-stack-body">
        <div className="exp-stack-header">
          <div>
            <h3 className="exp-role">{exp.role}</h3>
            <div className="exp-meta">
              <span className="exp-company">{exp.company}</span>
              <span className="exp-period">{exp.period}</span>
              <span className="tag" style={{ fontSize: '0.72rem' }}>{exp.type}</span>
            </div>
          </div>
          <span
            className="exp-location-tag"
            style={{
              background: `${exp.colorHex}15`,
              color: exp.colorHex,
              border: `1px solid ${exp.colorHex}30`,
            }}
          >
            {exp.location}
          </span>
        </div>

        <ul className="exp-bullets">
          {exp.bullets.map(b => (
            <li key={b}>
              <span className="exp-bullet-mark" style={{ background: exp.colorHex }} />
              {b}
            </li>
          ))}
        </ul>

        {exp.hasTabs && <EthosTabs />}
      </div>
    </div>
  )
}

function StackCard({ exp, index, progress }) {
  const [enterStart, enterEnd] = ENTER_RANGES[index]

  // Start at STACK_H px below the top of the card's natural position so it's
  // fully hidden below the clipping container, then settle to 0.
  const y = useTransform(progress, [enterStart, enterEnd], [`${STACK_H}px`, '0px'])

  return (
    <motion.div
      className="exp-abs-card"
      style={{
        top: index * PEEK,   // final resting position in the peek stack
        zIndex: index + 1,
        y,
      }}
    >
      <CardContent exp={exp} />
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ height: SECTION_H, position: 'relative' }}
    >
      <div className="exp-sticky-pin">
        {/* Heading — sticks here the entire time */}
        <div className="container">
          <div className="exp-pin-head">
            <Reveal>
              <span className="section-label">Experience</span>
              <h2 className="section-title">
                Where I&apos;ve <span className="gradient-text">Worked</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="section-sub">
                Real internships, real clients, real products shipped to production.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Card stack — fills remaining space */}
        <div className="exp-cards-outer">
          <div className="exp-cards-area">
            {EXPERIENCE.map((exp, i) => (
              <StackCard
                key={exp.id}
                exp={exp}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
