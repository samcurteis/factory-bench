# factory-bench

A tiny TypeScript library for parsing durations ("1h30m" → 5400 seconds). No runtime dependencies, no UI, no network.

## Commands

- Install: `pnpm install`
- Verify (must pass before done): `pnpm verify` (tsc + vitest)
- Full gate (what the factory's Stop hook and CI run): `pnpm verify:all`. Same as `pnpm verify` here.
- One test file: `pnpm vitest run src/duration.test.ts`

## Layout

- `src/duration.ts`: `parseDuration` and `DurationError`.
- `src/total.ts`: `totalDuration`, built on `parseDuration`.
- `src/index.ts`: the public API. Anything exported elsewhere is internal.
- Tests sit next to the code as `*.test.ts`.

## Rules

- Behaviour is pinned by tests: every change to what a function accepts or returns comes with a test case for it.
- No new dependencies unless the issue says one is already installed.
