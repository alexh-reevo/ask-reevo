import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Spinner } from "./Spinner";

/** Shared scaffold for an agent message: the spinner avatar + content column. */
export function AgentRow({
  children,
  active = false,
}: {
  children: ReactNode
  /** Whether the agent is mid-action — drives the avatar's ripple animation. */
  active?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-3"
    >
      <div className="shrink-0 pt-1">
        <Spinner size={15} active={active} ariaLabel="Agent" />
      </div>
      <div className="min-w-0 flex-1 pt-1">{children}</div>
    </motion.div>
  );
}
