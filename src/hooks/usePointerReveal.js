import { useEffect, useRef, useCallback } from 'react'

const POSITION_EASE = 0.16
const RADIUS_EASE = 0.14

// Tracks pointer position over an element and eases it into CSS vars
// (--reveal-x, --reveal-y, --reveal-radius) that a masked overlay can read.
// Mouse/pen only — touch is left alone so it doesn't fight page scrolling.
export function usePointerReveal({ radius = 110 } = {}) {
  const elRef = useRef(null)
  const raw = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const currentRadius = useRef(0)
  const targetRadius = useRef(0)
  const frame = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const tick = () => {
      const posEase = reducedMotion.matches ? 1 : POSITION_EASE
      const radiusEase = reducedMotion.matches ? 1 : RADIUS_EASE

      smooth.current.x += (raw.current.x - smooth.current.x) * posEase
      smooth.current.y += (raw.current.y - smooth.current.y) * posEase
      currentRadius.current += (targetRadius.current - currentRadius.current) * radiusEase

      const el = elRef.current
      if (el) {
        el.style.setProperty('--reveal-x', `${smooth.current.x}px`)
        el.style.setProperty('--reveal-y', `${smooth.current.y}px`)
        el.style.setProperty('--reveal-radius', `${Math.max(currentRadius.current, 0)}px`)
      }
      frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [])

  const setPointFromEvent = e => {
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    raw.current.x = e.clientX - rect.left
    raw.current.y = e.clientY - rect.top
  }

  const onPointerEnter = useCallback(e => {
    if (e.pointerType === 'touch') return
    setPointFromEvent(e)
    targetRadius.current = radius
  }, [radius])

  const onPointerMove = useCallback(e => {
    if (e.pointerType === 'touch') return
    setPointFromEvent(e)
  }, [])

  const onPointerLeave = useCallback(e => {
    if (e.pointerType === 'touch') return
    targetRadius.current = 0
  }, [])

  return {
    ref: elRef,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  }
}
