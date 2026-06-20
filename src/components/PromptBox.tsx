import { Spinner } from "./Spinner"

/** The "Ask Reevo anything" input — idle loader on the left, send button on the right. */
export function PromptBox({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl ring ring-black/10 bg-white p-2 shadow-md shadow-neutral-900/[0.07]">
      <div className="flex pl-2">
        <Spinner
          color={color}
          // size={16}
          // dotSize={4}
          active={false}
          ariaLabel="Reevo"
        />
      </div>
      <input
        type="text"
        placeholder="Ask Reevo anything"
        className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />
      <button
        type="button"
        aria-label="Send"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 19V5M12 5l-6 6M12 5l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
