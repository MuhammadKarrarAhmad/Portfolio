import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// SETUP:
//   1. Deploy /api/spotify.js to Vercel (free)
//   2. Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
//      to your Vercel project environment variables
//   3. Add VITE_SPOTIFY_URL=https://your-app.vercel.app/api/spotify
//      to your .env file
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_SPOTIFY_URL ?? null
const POLL_MS = 30_000

function EqBars({ playing }) {
  return (
    <div className="sp-eq" aria-hidden="true">
      {[0, 1, 2, 3].map(i => (
        <span key={i} className={`sp-eq-bar${playing ? ' active' : ''}`} style={{ animationDelay: `${i * 0.13}s` }} />
      ))}
    </div>
  )
}

export default function SpotifyWidget() {
  const [track, setTrack]     = useState(null)   // null = not playing
  const [ready, setReady]     = useState(false)
  const [open,  setOpen]      = useState(false)
  const timer = useRef(null)

  const poll = async () => {
    if (!API_URL) return
    try {
      const res  = await fetch(API_URL)
      const data = await res.json()
      setTrack(data.isPlaying ? data : null)
    } catch {
      setTrack(null)
    } finally {
      setReady(true)
    }
  }

  useEffect(() => {
    poll()
    timer.current = setInterval(poll, POLL_MS)
    return () => clearInterval(timer.current)
  }, [])

  // Don't render if no API configured
  if (!API_URL || !ready) return null

  return (
    <motion.div
      className={`sp-widget${open ? ' open' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className="sp-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Collapse Spotify widget' : 'Expand Spotify widget'}
      >
        {/* Spotify logo */}
        <svg className="sp-logo" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>

        <AnimatePresence mode="wait">
          {track ? (
            <motion.span
              key="playing"
              className="sp-track-mini"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
            >
              {track.title}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="sp-idle-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? 'Not playing' : 'Spotify'}
            </motion.span>
          )}
        </AnimatePresence>

        <EqBars playing={!!track} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="sp-panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {track ? (
              <>
                <div className="sp-panel-top">
                  {track.albumArt ? (
                    <img className="sp-album-art" src={track.albumArt} alt={track.album} />
                  ) : (
                    <div className="sp-album-art sp-album-placeholder">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                  )}
                  <div className="sp-panel-info">
                    <span className="sp-panel-label">Now Playing</span>
                    <a
                      className="sp-panel-track"
                      href={track.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                    >
                      {track.title}
                    </a>
                    <span className="sp-panel-artist">{track.artist}</span>
                  </div>
                </div>
                <div className="sp-panel-bars">
                  <EqBars playing />
                  <span className="sp-panel-live">LIVE</span>
                </div>
              </>
            ) : (
              <div className="sp-panel-offline">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" opacity="0.3">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <p>Not playing anything right now</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
