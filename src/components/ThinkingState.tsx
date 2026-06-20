import { AgentRow } from "./AgentRow"
import { ShimmerText } from "./ShimmerText"

/** The agent is reasoning before it acts — the spinner avatar runs, the label shimmers. */
export function ThinkingState({ label = "Thinking…" }: { label?: string }) {
  return (
    <AgentRow active>
      <span className="text-sm">
        <ShimmerText>{label}</ShimmerText>
      </span>
    </AgentRow>
  )
}
