import { AgentRow } from "./AgentRow"

/** The agent is running a tool / taking an action. */
export function ToolCallState({
  tool = "search_reports",
  detail = "Querying Q2 sales data",
  done = false,
}: {
  tool?: string
  detail?: string
  done?: boolean
}) {
  return (
    <AgentRow active={!done}>
      <div className="inline-flex items-center gap-2.5 rounded-lg ring ring-black/10 bg-white px-3 py-2 text-sm">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-100 text-neutral-500">
          {done ? "✓" : "⚙"}
        </span>
        <code className="font-mono text-xs text-neutral-800">{tool}</code>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-500">{detail}</span>
      </div>
    </AgentRow>
  )
}
