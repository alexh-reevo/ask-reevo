import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export interface SelectOption {
  value: string
  label: string
}

/** A small generic dropdown, styled to match ColorPicker. */
export function Select({
  options,
  value,
  onChange,
}: {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value) ?? options[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg ring ring-black/10 bg-white pr-3 pl-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
      >
        {current.label}
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
              className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-xl ring ring-black/10 bg-white p-1 shadow-lg shadow-neutral-900/10"
            >
              {options.map((o) => (
                <li key={o.value}>
                  <button
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                  >
                    <span className="flex-1 text-left">{o.label}</span>
                    {o.value === value && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-neutral-500">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
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
