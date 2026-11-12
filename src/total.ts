import { parseDuration } from "./duration";

/** Sum of several durations, in seconds. Throws if any of them is invalid. */
export function totalDuration(inputs: readonly string[]): number {
  return inputs.reduce((sum, input) => sum + parseDuration(input), 0);
}
