import { Reveal } from './Reveal'

const ROW_1 = [
  'Python', 'React.js', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'Git', 'Pandas', 'SQL', 'REST APIs', 'ETL',
]
const ROW_2 = [
  'Tailwind CSS', 'Framer Motion', 'LangChain', 'Pinecone', 'Celery',
  'Supabase', 'Vite', 'Linux', 'Airflow', 'Express.js', 'Figma', 'AWS S3',
  'Stripe API', 'Vercel',
]

const GROUPS = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    title: 'Backend & APIs',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'Celery'],
  },
  {
    title: 'Data & AI',
    skills: ['Pandas', 'ETL Pipelines', 'LangChain', 'Pinecone', 'Airflow'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'Linux', 'Vercel', 'AWS S3', 'Figma'],
  },
]

function MarqueeRow({ tags, reverse = false }) {
  const doubled = [...tags, ...tags]
  return (
    <div className="marquee-row">
      <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
        {doubled.map((tag, i) => (
          <span key={`${tag}-${i}`} className="marquee-tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label">Skills</span>
          <h2 className="section-title">What I <span className="gradient-text">Work With</span></h2>
        </Reveal>
      </div>

      {/* Full-width marquee */}
      <div className="marquee-section" style={{ marginBottom: '80px' }}>
        <MarqueeRow tags={ROW_1} />
        <MarqueeRow tags={ROW_2} reverse />
      </div>

      {/* Grouped cards */}
      <div className="container">
        <div className="skills-grid">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="skill-group">
                <h3 className="skill-group-title">{g.title}</h3>
                <div className="skill-tags">
                  {g.skills.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
