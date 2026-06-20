import { motion } from "motion/react"
import type { CSSProperties } from "react"

/**
 * A smooth, continuously looping text shimmer (à la v0 / ChatGPT "thinking").
 *
 * Two stacked backgrounds: a solid base color for the text, plus a moving
 * highlight band that is transparent on both sides. Because the band sits fully
 * off the text at both ends of the sweep, the loop restart is invisible — no
 * stutter, no snap.
 */
export function ShimmerText({
  children,
  duration = 1.6,
}: {
  children: string
  duration?: number
}) {
  // Band half-width scales with text length so it reads the same at any size.
  const spread = children.length * 2

  return (
    <motion.span
      className="bg-clip-text text-transparent"
      style={
        {
          backgroundImage:
            "var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))",
          backgroundRepeat: "no-repeat, padding-box",
          backgroundSize: "250% 100%, auto",
          "--shimmer-bg":
            "linear-gradient(90deg, transparent calc(50% - var(--spread)), var(--highlight), transparent calc(50% + var(--spread)))",
          "--spread": `${spread}px`,
          "--base-color": "#a3a3a3",
          "--highlight": "#171717",
        } as CSSProperties
      }
      initial={{ backgroundPosition: "100% 50%" }}
      animate={{ backgroundPosition: "0% 50%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}
