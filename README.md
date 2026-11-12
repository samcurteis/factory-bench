# factory-bench

A fixed, replayable target for measuring the [factory](../factory): a tiny duration-parsing library.

- `main` stays at the `baseline` tag. Factory PRs here are never merged: they are closed and the issues recreated (`factory/bin/bench-reset.sh`).
- Changes to the baseline itself go through a PR, and mean bench results before and after aren't comparable.
- The issues and their expected outcomes live in the factory repo (`factory/bench/`), not here, so agents working in this repo can't read them.
