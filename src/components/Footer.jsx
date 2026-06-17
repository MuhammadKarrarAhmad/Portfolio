import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { icon: <FaGithub size={16} />, href: 'https://github.com/MuhammadKarrarAhmad', label: 'GitHub' },
  { icon: <FaLinkedin size={16} />, href: 'https://linkedin.com/in/muhammadkarrarahmad', label: 'LinkedIn' },
  { icon: <Mail size={16} />, href: 'mailto:professersheikh84@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">
            MKA<span className="nav-logo-dot">.</span>
          </a>
          <p className="footer-tagline">
            Data Engineering Intern · Full-Stack Developer · London, UK
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {LINKS.map(l => (
            <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
          ))}
        </nav>

        <div className="footer-socials">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="icon-btn"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>Built with React + Vite</span>
        <span className="footer-dot">·</span>
        <span>© 2026 Muhammad Karrar Ahmad</span>
      </div>
    </footer>
  )
}
