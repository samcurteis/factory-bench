import { describe, expect, it } from "vitest";
import { DurationError, parseDuration } from "./duration";

describe("parseDuration", () => {
  it.each([
    ["1h30m", 5400],
    ["90m", 5400],
    ["45s", 45],
    ["2h", 7200],
    ["1h2m3s", 3723],
    ["0s", 0],
    ["1h 30m", 5400],
    ["1h  30m  15s", 5415],
    ["  2h  ", 7200],
    ["1d", 86400],
    ["1d12h30m", 131400],
  ])("parses %j as %i seconds", (input, seconds) => {
    expect(parseDuration(input)).toBe(seconds);
  });

  it.each([
    ["", "empty"],
    ["   ", "empty"],
    ["1x", "unknown unit"],
    ["h", "unexpected"],
    ["1.5h", "unexpected"],
    ["-1h", "unexpected"],
    ["30m1h", "out of order"],
    ["1h1h", "repeated"],
    ["1 h", "unexpected"],
    ["1H", "unexpected"],
    ["12h1d", "out of order"],
  ])("rejects %j (%s)", (input, reason) => {
    expect(() => parseDuration(input)).toThrow(DurationError);
    expect(() => parseDuration(input)).toThrow(reason);
  });
});
