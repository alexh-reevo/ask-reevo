import { motion } from "motion/react";

/** The user's submitted prompt. */
export function UserPrompt({ children }: { children?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-neutral-900 px-4 py-2.5 text-sm text-white">
        {children ?? "Summarize the latest sales report and flag any anomalies."}
      </div>
    </motion.div>
  );
}
