import { describe, expect, it } from "vitest";
import { DurationError } from "./duration";
import { totalDuration } from "./total";

describe("totalDuration", () => {
  it("sums durations", () => {
    expect(totalDuration(["1h", "30m", "45s"])).toBe(5445);
  });

  it("is 0 for no durations", () => {
    expect(totalDuration([])).toBe(0);
  });

  it("throws if any duration is invalid", () => {
    expect(() => totalDuration(["1h", "nope"])).toThrow(DurationError);
  });
});
