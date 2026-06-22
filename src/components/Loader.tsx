import { Spinner } from "./Spinner"
import type { SpinnerProps } from "./Spinner"
import { HalftoneSpinner } from "./HalftoneSpinner"

export type SpinnerVariant = "matrix" | "halftone"

/** Renders the chosen loader variant with a shared prop shape. */
export function Loader({
  variant,
  ...props
}: SpinnerProps & { variant: SpinnerVariant }) {
  return variant === "halftone" ? (
    <HalftoneSpinner {...props} />
  ) : (
    <Spinner {...props} />
  )
}
