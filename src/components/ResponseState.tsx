import { motion } from "motion/react";
import { AgentRow } from "./AgentRow";

/** The agent's final answer. Set streaming to show a blinking caret. */
export function ResponseState({
  streaming = false,
  children,
}: {
  streaming?: boolean;
  children?: string;
}) {
  const text =
    children ??
    "Q2 revenue came in at $1.24M, up 8% over Q1. One anomaly: refunds spiked 3× in the final week — likely tied to the checkout bug fixed on the 18th.";

  return (
    <AgentRow active={streaming}>
      <p className="text-sm leading-relaxed text-neutral-800">
        {text}
        {streaming && (
          <motion.span
            className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-neutral-800 align-middle"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </p>
    </AgentRow>
  );
}
