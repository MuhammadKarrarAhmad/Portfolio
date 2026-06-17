import { ExternalLink } from 'lucide-react'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const CERTS = [
  {
    title: 'Google Data Analytics',
    issuer: 'Google · Coursera',
    date: '2024',
    desc: 'Data cleaning, analysis, visualisation, and R programming fundamentals.',
    color: '#4285F4',
  },
  {
    title: 'Python for Data Science',
    issuer: 'IBM · Coursera',
    date: '2024',
    desc: 'NumPy, Pandas, Matplotlib, and applied data science workflows.',
    color: '#054ADA',
  },
  {
    title: 'SQL & Database Design',
    issuer: 'Meta · Coursera',
    date: '2024',
    desc: 'Advanced SQL queries, indexing, normalisation, and relational design.',
    color: '#0082FB',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023',
    desc: 'HTML5, CSS3, Flexbox, Grid, and accessibility best practices.',
    color: '#0A0A23',
  },
  {
    title: 'JavaScript Algorithms & DS',
    issuer: 'freeCodeCamp',
    date: '2023',
    desc: 'Data structures, algorithms, and functional programming patterns in JS.',
    color: '#F7DF1E',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2025',
    desc: 'Cloud concepts, core AWS services, security, and billing fundamentals.',
    color: '#FF9900',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">Certifications</span>
          <h2 className="section-title">Credentials & <span className="gradient-text">Learning</span></h2>
        </Reveal>

        <RevealStagger stagger={0.07} className="certs-grid">
          {CERTS.map(cert => (
            <RevealItem key={cert.title}>
              <div className="cert-card">
                <div
                  className="cert-accent"
                  style={{ background: `${cert.color}22`, borderColor: `${cert.color}40` }}
                >
                  <span className="cert-initial" style={{ color: cert.color }}>
                    {cert.issuer.charAt(0)}
                  </span>
                </div>
                <div className="cert-body">
                  <div className="cert-top">
                    <h3 className="cert-title">{cert.title}</h3>
                    <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                  <p className="cert-issuer">{cert.issuer} · {cert.date}</p>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
