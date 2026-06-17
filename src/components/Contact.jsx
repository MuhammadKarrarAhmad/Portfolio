import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Reveal } from './Reveal'
import { ease } from '../utils/animations'

const SOCIALS = [
  { icon: <Mail size={18} />, label: 'Email', href: 'mailto:professersheikh84@gmail.com' },
  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/in/muhammadkarrarahmad' },
  { icon: <FaGithub size={18} />, label: 'GitHub', href: 'https://github.com/MuhammadKarrarAhmad' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, message } = form
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:professersheikh84@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let&apos;s <span className="gradient-text">Connect</span></h2>
          <p className="section-sub">
            Open to internships, freelance projects, and collaboration. I reply within 24 hours.
          </p>
        </Reveal>

        <div className="contact-grid">
          {/* Left — info */}
          <Reveal delay={0.1}>
            <div className="contact-info">
              <div className="open-to-work">
                <span className="badge-dot" />
                Open to Work
              </div>

              <h3 className="contact-info-heading">
                Have a project in mind?
              </h3>
              <p className="contact-info-body">
                Whether you need a data pipeline, a full-stack web app, or just want to talk
                tech — I&apos;m always happy to chat. Based in London, available remotely.
              </p>

              <div className="contact-socials">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.2}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="cf-msg">Message</label>
                <textarea
                  id="cf-msg"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', gap: 8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease }}
              >
                {sent ? 'Opening Mail App...' : (
                  <><Send size={15} /> Send Message</>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
