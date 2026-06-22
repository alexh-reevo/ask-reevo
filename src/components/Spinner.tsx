"use client"

import { motion } from "motion/react"
import { usePrefersReducedMotion } from "./dotmatrix-hooks"

export interface SpinnerProps {
  /** Overall width/height of the 3×3 grid, in px. */
  size?: number
  /** Diameter of each dot, in px. */
  dotSize?: number
  /** Dot color. */
  color?: string
  /** Animation speed multiplier — higher is faster. */
  speed?: number
  /** When false, the dots hold a static bloom instead of animating. */
  active?: boolean
  ariaLabel?: string
  className?: string
}

// 3×3 grid, indexed row-major. Ring = Manhattan distance from the center dot
// (1,1): center = 0, edges = 1, corners = 2 → the pulse ripples outward.
const DOTS = Array.from({ length: 9 }, (_, i) => {
  const row = Math.floor(i / 3)
  const col = i % 3
  return { row, col, ring: Math.abs(row - 1) + Math.abs(col - 1) }
})

// Original `dmx-ripple-echo` keyframe (opacity only), with base 0.16 / mid 0.32
// / peak 1 substituted in. Times match the CSS stops at 0/28/56/78/100%.
const OPACITY_KEYFRAMES = [0.1, 0.98, 0.32, 0.7824, 0.1]
const OPACITY_TIMES = [0, 0.28, 0.56, 0.78, 1]
const CYCLE = 1.5 // seconds (--dmx-cycle: 1500ms)

// Idle "breathing" shimmer: a slow, low-amplitude opacity wave so the static
// mark still feels alive. Sweeps diagonally (delay by row + col).
const IDLE_CYCLE = 2.8

// Static "cross": the center + edge dots (Manhattan ring < 2) form a plus at full
// opacity; the corners (ring 2) stay dim.
const crossOpacity = (ring: number) => (ring < 2 ? 1 : 0.3)

/** A compact 3×3 dot-matrix spinner — ripples while `active`, a static bloom otherwise. */
export function Spinner({
  size = 16,
  dotSize = 3,
  color = "#F472B6",
  speed = 1,
  active = true,
  ariaLabel = "Loading",
  className,
}: SpinnerProps) {
  const reducedMotion = usePrefersReducedMotion()

  // Fixed dot size; the gap absorbs the remainder so the grid stays `size` wide.
  const dot = dotSize
  const gap = Math.max(0, (size - dot * 3) / 2)
  const duration = CYCLE / speed

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={className}
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(3, ${dot}px)`,
        gap,
        color,
        verticalAlign: "middle",
      }}
    >
      {DOTS.map(({ row, col, ring }, i) => {
        const dotStyle = {
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: "currentColor",
        } as const

        // Reduced motion → fully static cross, no animation.
        if (reducedMotion) {
          return (
            <span
              key={i}
              aria-hidden="true"
              style={{ ...dotStyle, opacity: crossOpacity(ring) }}
            />
          )
        }

        if (active) {
          // Matches `.dmx-ripple-echo`: delay = (ring·0.14 + parity·0.03)·cycle.
          const delay = (ring * 0.14 + (ring % 2) * 0.03) * duration
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              style={dotStyle}
              initial={{ opacity: OPACITY_KEYFRAMES[0] }}
              animate={{ opacity: OPACITY_KEYFRAMES }}
              transition={{
                duration,
                times: OPACITY_TIMES,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            />
          )
        }

        // Idle: hold the cross shape, but breathe with a slow diagonal shimmer.
        const base = crossOpacity(ring)
        const idleDelay = ((row + col) / 4) * 0.66 * IDLE_CYCLE
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            style={dotStyle}
            initial={{ opacity: base }}
            animate={{ opacity: [base, base * 0.5, base] }}
            transition={{
              duration: IDLE_CYCLE,
              times: [0, 0.5, 1],
              repeat: Infinity,
              ease: "easeInOut",
              delay: idleDelay,
            }}
          />
        )
      })}
    </span>
  )
}
