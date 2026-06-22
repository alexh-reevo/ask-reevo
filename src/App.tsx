import { useState } from "react"
import { ColorPicker } from "./components/ColorPicker"
import type { ColorOption } from "./components/ColorPicker"
import { Select } from "./components/Select"
import { PromptBox } from "./components/PromptBox"
import { Loader } from "./components/Loader"
import type { SpinnerVariant } from "./components/Loader"
import { ShimmerText } from "./components/ShimmerText"

const COLORS: ColorOption[] = [
  { name: "Pink", hex: "#F472B6" },
  { name: "Blue", hex: "#3896FA" },
  { name: "Green", hex: "#38A373" },
  { name: "Black", hex: "#121212" },
]

const VARIANTS = [
  { value: "matrix", label: "Matrix 3×3" },
  { value: "halftone", label: "Halftone 5×5" },
]

// The "active" agent states — what a CRM assistant does while working.
const STATUSES = [
  "Searching your contacts…",
  "Analyzing the pipeline…",
  "Drafting a follow-up…",
  "Updating the record…",
]

// Static spinners at increasing sizes, to preview how it scales.
const SIZES = [16, 24, 32, 40]

function StatusRow({
  variant,
  color,
  label,
}: {
  variant: SpinnerVariant
  color: string
  label: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Loader variant={variant} color={color} active />
      <span className="text-sm">
        <ShimmerText>{label}</ShimmerText>
      </span>
    </div>
  )
}

export default function App() {
  const [color, setColor] = useState(COLORS[0].hex)
  const [variant, setVariant] = useState<SpinnerVariant>("matrix")

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <div className="flex items-start justify-between gap-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Ask Reevo
          </h1>
        </header>
        <div className="flex items-center gap-2">
          <Select
            options={VARIANTS}
            value={variant}
            onChange={(v) => setVariant(v as SpinnerVariant)}
          />
          <ColorPicker colors={COLORS} value={color} onChange={setColor} />
        </div>
      </div>

      <div className="mt-10">
        <PromptBox color={color} variant={variant} />
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {STATUSES.map((label) => (
          <StatusRow key={label} variant={variant} color={color} label={label} />
        ))}
      </div>

      <div className="mt-14 flex items-end gap-10">
        {SIZES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2.5">
            <Loader
              variant={variant}
              color={color}
              size={s}
              dotSize={s / 5}
              active={false}
            />
            <span className="font-mono text-xs text-neutral-400">{s}px</span>
          </div>
        ))}
      </div>
    </main>
  )
}
