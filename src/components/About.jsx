import { useState } from 'react'
import { Briefcase, MapPin, GraduationCap, Award, Code2, Database, Layers, Zap } from 'lucide-react'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const HIGHLIGHTS = [
  { icon: <Briefcase size={15} />, text: 'Data Engineering Intern @ Ethos Farm' },
  { icon: <MapPin size={15} />, text: 'Southall, London, UK' },
  { icon: <GraduationCap size={15} />, text: 'T-Level Digital Production @ Uxbridge College' },
  { icon: <Award size={15} />, text: '2nd Place — Fujitsu Sustainability Hackathon' },
]

const BRINGS = [
  { icon: <Code2 size={18} />, title: 'Full-Stack', body: 'React, FastAPI, Node — end-to-end delivery' },
  { icon: <Database size={18} />, title: 'Data Engineering', body: 'ETL pipelines, SQL, Pandas, cloud data flows' },
  { icon: <Layers size={18} />, title: 'Real Clients', body: 'Heathrow, Mall — production systems, not demos' },
  { icon: <Zap size={18} />, title: 'Fast Delivery', body: 'Shipped 5+ live projects alongside college' },
]

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I <span className="gradient-text">Am</span></h2>
        </Reveal>

        <div className="about-grid">
          {/* Left — avatar + highlights */}
          <Reveal delay={0.1}>
            <div className="about-left">
              <div className="about-avatar-wrap">
                <div className="about-avatar-ring" aria-hidden="true" />
                <div className="about-avatar">
                  {!imgError ? (
                    <img
                      src="/src/assets/profile.jpeg"
                      alt="Muhammad Karrar Ahmad"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="about-avatar-initials">MKA</span>
                  )}
                </div>
              </div>

              <RevealStagger stagger={0.08} delay={0.15} className="about-highlights">
                {HIGHLIGHTS.map(h => (
                  <RevealItem key={h.text} className="about-highlight">
                    <span className="about-highlight-icon">{h.icon}</span>
                    <span>{h.text}</span>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </Reveal>

          {/* Right — bio + what-I-bring */}
          <Reveal delay={0.2}>
            <div className="about-right">
              <p className="about-bio-text">
                I&apos;m a driven <strong>T-Level Digital Production student</strong> and{' '}
                <strong>Data Engineering Intern</strong> passionate about turning complex business
                problems into elegant, data-driven solutions. I build things that actually work in
                the real world — not just in demo environments.
              </p>
              <p className="about-bio-text">
                At <strong>Ethos Farm</strong>, I build production-grade systems for clients
                including a major UK shopping centre and <strong>Heathrow Airport</strong> —
                from multi-tenant SaaS platforms to AI-powered visitor assistants.
              </p>
              <p className="about-bio-text">
                Beyond my internship, I independently built a full-stack e-commerce platform,
                founded an online business, and led a team to <strong>2nd place</strong> at the
                Fujitsu Sustainability Hackathon.
              </p>

              <div className="brings-grid">
                {BRINGS.map(b => (
                  <div key={b.title} className="brings-card">
                    <span className="brings-icon">{b.icon}</span>
                    <strong className="brings-title">{b.title}</strong>
                    <p className="brings-body">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
