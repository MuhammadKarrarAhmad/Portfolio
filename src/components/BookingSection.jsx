import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { ease } from '../utils/animations'

const SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
]

export default function BookingSection() {
  const [selected, setSelected] = useState(null)
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    const subject = encodeURIComponent('30-Minute Discovery Call Request')
    const body = encodeURIComponent(
      `Hi Muhammad,\n\nI'd like to schedule a free 30-minute discovery call${selected ? ` — my preferred time is ${selected}` : ''}.\n\nLooking forward to connecting!\n\nBest regards`
    )
    window.open(`mailto:professersheikh84@gmail.com?subject=${subject}&body=${body}`)
    setBooked(true)
    setTimeout(() => setBooked(false), 4000)
  }

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        <Reveal>
          <div className="booking-head">
            <span className="section-label">Let's Talk</span>
            <h2 className="section-title">
              Book a <span className="gradient-text">Discovery Call</span>
            </h2>
            <p className="section-sub">
              Free 30-minute call to discuss your project, ideas, or opportunities.
            </p>
          </div>
        </Reveal>

        <div className="booking-layout">
          {/* ── Left info card ── */}
          <Reveal delay={0.1}>
            <div className="booking-info-card glass-card">
              <div className="booking-status-pill">
                <span className="booking-pulse" />
                Available for new projects
              </div>

              <h3 className="booking-title">30-Minute Discovery Call</h3>

              <ul className="booking-meta">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Free, no commitment
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  30 minutes
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
                  Google Meet · Zoom · Teams
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Remote · Any timezone
                </li>
              </ul>

              <p className="booking-note">
                Pick a time slot and I'll confirm within 24 hours. We can discuss your project,
                potential collaboration, or anything you'd like to build.
              </p>

              <div className="booking-response">
                <span className="booking-dot-sm" />
                Typically responds within 24 h
              </div>
            </div>
          </Reveal>

          {/* ── Right slot picker ── */}
          <Reveal delay={0.2}>
            <div className="booking-picker-card glass-card">
              <p className="booking-picker-label">Pick a preferred time</p>
              <div className="booking-slots-grid">
                {SLOTS.map(slot => (
                  <motion.button
                    key={slot}
                    className={`booking-slot${selected === slot ? ' selected' : ''}`}
                    onClick={() => setSelected(s => s === slot ? null : slot)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.14, ease }}
                  >
                    {slot}
                  </motion.button>
                ))}
              </div>

              <div className="booking-tz">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Times shown in your local timezone
              </div>

              <motion.button
                className="booking-cta btn-primary"
                onClick={handleBook}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease }}
              >
                {booked
                  ? '✓ Email opened — see you soon!'
                  : selected
                  ? `Book ${selected} →`
                  : 'Book a Free Call →'}
              </motion.button>

              <p className="booking-hint">Opens your email client</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
