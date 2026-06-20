import { useState } from "react"
import { ColorPicker } from "./components/ColorPicker"
import type { ColorOption } from "./components/ColorPicker"
import { PromptBox } from "./components/PromptBox"
import { Spinner } from "./components/Spinner"
import { ShimmerText } from "./components/ShimmerText"

const COLORS: ColorOption[] = [
  { name: "Pink", hex: "#F472B6" },
  { name: "Blue", hex: "#3896FA" },
  { name: "Green", hex: "#38A373" },
  { name: "Black", hex: "#121212" },
]

// The "active" agent states — what a CRM assistant does while working.
const STATUSES = [
  "Searching your contacts…",
  "Analyzing the pipeline…",
  "Drafting a follow-up…",
  "Updating the record…",
]

// Static spinners at increasing sizes, to preview how it scales.
const SIZES = [15, 24, 32, 40]

function StatusRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Spinner color={color} active />
      <span className="text-sm">
        <ShimmerText>{label}</ShimmerText>
      </span>
    </div>
  )
}

export default function App() {
  const [color, setColor] = useState(COLORS[0].hex)

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <div className="flex items-start justify-between gap-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Ask Reevo
          </h1>
        </header>
        <ColorPicker colors={COLORS} value={color} onChange={setColor} />
      </div>

      <div className="mt-10">
        <PromptBox color={color} />
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {STATUSES.map((label) => (
          <StatusRow key={label} color={color} label={label} />
        ))}
      </div>

      <div className="mt-14 flex items-end gap-10">
        {SIZES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2.5">
            <Spinner color={color} size={s} dotSize={s / 5} active={false} />
            <span className="font-mono text-xs text-neutral-400">{s}px</span>
          </div>
        ))}
      </div>
    </main>
  )
}
