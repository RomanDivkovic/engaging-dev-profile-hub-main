import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  useAnimationFrame,
} from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { profileImage } from '@/data/about'

export const SpinningPortrait = () => {
  const reducedMotion = useReducedMotion()
  const rotation = useMotionValue(0)
  const tilt = useMotionValue(0)
  const backgroundPosition = useTransform(rotation, (value) => `${value / 1.8}% 50%`)
  const portraitY = useTransform(tilt, (value) => Math.max(-20, Math.min(20, value)))
  const drag = useRef<{
    pointerId: number
    x: number
    y: number
    rotation: number
    tilt: number
  } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  useAnimationFrame((_, delta) => {
    if (!reducedMotion && !paused && !drag.current) {
      rotation.set(rotation.get() + Math.min(delta, 64) * 0.006)
    }
  })
  const [angle, setAngle] = useState(0)
  useMotionValueEvent(rotation, 'change', (value) => {
    setAngle(Math.round(((value % 360) + 360) % 360))
  })

  const reset = () => {
    rotation.set(0)
    tilt.set(0)
  }

  return (
    <div className="shrink-0 text-center reveal-animation">
      <div className="relative" style={{ perspective: 900 }}>
        <div
          aria-hidden="true"
          className="absolute inset-4 rounded-full bg-secondary/25 blur-2xl translate-y-5"
        />
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Rotate Roman's portrait"
          aria-describedby="portrait-instructions"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={angle}
          aria-valuetext={`${angle} degrees; use arrow keys to rotate, Home to reset`}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full cursor-grab active:cursor-grabbing touch-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          style={{
            overflow: 'hidden',
            boxShadow: 'inset -28px -12px 40px rgba(0,0,0,0.65), 0 12px 32px rgba(0,0,0,0.25)',
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              y: event.clientY,
              rotation: rotation.get(),
              tilt: tilt.get(),
            }
            setDragging(true)
          }}
          onPointerMove={(event) => {
            if (drag.current) {
              rotation.set(drag.current.rotation + (event.clientX - drag.current.x) * 1.2)
              tilt.set(drag.current.tilt - (event.clientY - drag.current.y) * 1.2)
            }
          }}
          onLostPointerCapture={() => {
            drag.current = null
            setDragging(false)
          }}
          onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault()
              rotation.set(rotation.get() + (event.key === 'ArrowRight' ? 30 : -30))
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault()
              tilt.set(tilt.get() + (event.key === 'ArrowDown' ? 30 : -30))
            } else if (event.key === 'Home') {
              event.preventDefault()
              reset()
            }
          }}
        >
          <motion.div
            role="img"
            aria-label="Roman Divković"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: '200% 100%',
              backgroundRepeat: 'repeat-x',
              backgroundPosition,
              y: portraitY,
              scale: 1.2,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.25), transparent 42%, rgba(0,0,0,0.65) 100%)',
              boxShadow: 'inset -20px -8px 32px rgba(0,0,0,0.45)',
            }}
          />
        </motion.div>
      </div>
      <p id="portrait-instructions" className="mt-5 text-xs text-muted-foreground">
        {dragging ? 'Keep dragging to spin' : 'Drag or use arrow keys to rotate the globe'}
      </p>
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="mt-2 mr-4 text-xs text-muted-foreground hover:text-foreground"
        >
          {paused ? 'Resume spin' : 'Pause spin'}
        </button>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        aria-label="Reset portrait rotation"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        Reset
      </button>
    </div>
  )
}
