"use client"

import { motion } from "motion/react"
import { usePrefersReducedMotion } from "./dotmatrix-hooks"
import type { SpinnerProps } from "./Spinner"

// 5×5 halftone grid. Each dot's *size* encodes intensity (the halftone idea):
// a radial wave ripples outward from the center when active; when idle the dots
// grade from large at the center to small at the edges — a soft bloom sphere.
const N = 5
const CENTER = (N - 1) / 2
const MAX_DIST = Math.hypot(CENTER, CENTER)

const CELLS = Array.from({ length: N * N }, (_, i) => {
  const row = Math.floor(i / N)
  const col = i % N
  // Normalized 0 (center) → 1 (corner).
  const dist = Math.hypot(row - CENTER, col - CENTER) / MAX_DIST
  return { row, col, dist }
})

const CYCLE = 1.8 // seconds
// Idle "breathing" shimmer: a slow radial opacity wave over the static bloom,
// so the resting mark still feels alive.
const IDLE_CYCLE = 3

/** A 5×5 halftone loader — a radial size-wave while `active`, a graded bloom otherwise. */
export function HalftoneSpinner({
  size = 16,
  color = "#F472B6",
  speed = 1,
  active = true,
  ariaLabel = "Loading",
  className,
}: SpinnerProps) {
  const reducedMotion = usePrefersReducedMotion()

  const cell = size / N
  const maxDot = cell * 0.92
  const duration = CYCLE / speed

  const dotBase = {
    width: maxDot,
    height: maxDot,
    borderRadius: "50%",
    background: "currentColor",
  } as const

  const cellStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: cell,
    height: cell,
  } as const

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={className}
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(${N}, ${cell}px)`,
        color,
        verticalAlign: "middle",
      }}
    >
      {CELLS.map(({ dist }, i) => {
        // Halftone bloom: big at the center, shrinking outward.
        const scale = Math.max(0.12, 1 - dist)
        const baseOpacity = 0.25 + scale * 0.75

        // Reduced motion → fully static bloom, no animation.
        if (reducedMotion) {
          return (
            <span key={i} aria-hidden="true" style={cellStyle}>
              <span
                style={{
                  ...dotBase,
                  transform: `scale(${scale})`,
                  opacity: baseOpacity,
                }}
              />
            </span>
          )
        }

        if (active) {
          // Same period for every dot, phase-shifted by distance → an outward ripple.
          const delay = dist * 0.9 * duration
          return (
            <span key={i} aria-hidden="true" style={cellStyle}>
              <motion.span
                style={dotBase}
                initial={{ scale: 0.15, opacity: 0.2 }}
                animate={{ scale: [0.15, 1, 0.15], opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration,
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            </span>
          )
        }

        // Idle: hold the bloom's sizes, but breathe with a slow radial shimmer.
        const idleDelay = dist * 0.66 * IDLE_CYCLE
        return (
          <span key={i} aria-hidden="true" style={cellStyle}>
            <motion.span
              style={{ ...dotBase, transform: `scale(${scale})` }}
              initial={{ opacity: baseOpacity }}
              animate={{ opacity: [baseOpacity, baseOpacity * 0.4, baseOpacity] }}
              transition={{
                duration: IDLE_CYCLE,
                times: [0, 0.5, 1],
                repeat: Infinity,
                ease: "easeInOut",
                delay: idleDelay,
              }}
            />
          </span>
        )
      })}
    </span>
  )
}
