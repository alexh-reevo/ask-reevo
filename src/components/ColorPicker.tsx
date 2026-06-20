import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export interface ColorOption {
  name: string
  hex: string
}

/** A small dropdown of color swatches that drives the page's spinner color. */
export function ColorPicker({
  colors,
  value,
  onChange,
}: {
  colors: ColorOption[]
  value: string
  onChange: (hex: string) => void
}) {
  const [open, setOpen] = useState(false)
  const current = colors.find((c) => c.hex === value) ?? colors[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg ring ring-black/10 bg-white pr-3 pl-2.5 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
      >
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/10"
          style={{ background: current.hex }}
        />
        {current.name}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-xl ring ring-black/10 bg-white p-1 shadow-lg shadow-neutral-900/10"
            >
              {colors.map((c) => (
                <li key={c.hex}>
                  <button
                    onClick={() => {
                      onChange(c.hex)
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/10"
                      style={{ background: c.hex }}
                    />
                    <span className="flex-1 text-left">{c.name}</span>
                    <span className="font-mono text-xs text-neutral-400">
                      {c.hex}
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
