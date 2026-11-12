/** Seconds in each unit, largest first. Parts must appear in this order, each at most once. */
const UNITS = [
  ["h", 3600],
  ["m", 60],
  ["s", 1],
] as const;

export class DurationError extends Error {
  constructor(input: string, reason: string) {
    super(`Invalid duration "${input}": ${reason}`);
    this.name = "DurationError";
  }
}

/**
 * Parse a duration like "1h30m", "90m" or "1h 30m" into whole seconds.
 * Each part is a whole number followed by a unit (h, m, s). Spaces between parts are allowed.
 * Throws DurationError on anything else.
 */
export function parseDuration(input: string): number {
  const text = input.trim();
  if (text === "") throw new DurationError(input, "empty");

  const part = /(\d+)([a-z]+)\s*/y;
  let total = 0;
  let next = 0; // index into UNITS: the smallest unit still allowed
  let match: RegExpExecArray | null;
  let pos = 0;
  while (pos < text.length) {
    part.lastIndex = pos;
    match = part.exec(text);
    if (!match) throw new DurationError(input, `unexpected "${text.slice(pos)}"`);
    const [, digits, unit] = match;
    const index = UNITS.findIndex(([u]) => u === unit);
    if (index === -1) throw new DurationError(input, `unknown unit "${unit}"`);
    if (index < next) throw new DurationError(input, `"${unit}" out of order or repeated`);
    total += Number(digits) * UNITS[index]![1];
    next = index + 1;
    pos = part.lastIndex;
  }
  return total;
}
