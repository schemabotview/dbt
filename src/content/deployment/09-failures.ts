import type { Section } from '../types'

export const failures: Section = {
  id: 'failures',
  title: 'Reading a failed run',
  scene: 'failure-triage',
  slide: `## Four kinds of red, four responses

- **A model errored** — the warehouse rejected the SQL. Read the **compiled** file, not your model
- **A test failed** — the SQL ran fine, the **data** is wrong. Look at the failing rows
- **A model was skipped** — a parent failed, so this never ran. Nothing is wrong with it; fix the parent
- **Freshness errored** — the **loader** is broken, not dbt. Go and find the loader

### Read the summary line first
\`PASS=41 WARN=2 ERROR=1 SKIP=6\` tells you the shape of the failure before any log does. One error and six skips is **one problem**, not seven.

### \`dbt retry\`
Re-runs from the point of failure, using the last \`run_results.json\` — everything that already succeeded is left alone. On a long job that is an hour saved.

### \`--fail-fast\`
Stop at the first error. Good in CI, where you want the answer quickly; usually wrong in production, where you want as much built as possible.`,
  narration:
    "At some point the job goes red at three in the morning, and the difference between a five-minute fix and a lost hour is knowing how to read it. Four kinds of failure, and they want four different responses. A model errored: the warehouse rejected the SQL. Go and read the compiled file, not your model — remember the line numbers refer to the compiled version. A test failed: the SQL ran perfectly well, and the data is wrong. Go and look at the failing rows, which is exactly what store failures was for. A model was skipped: nothing is wrong with it at all; a parent failed, so dbt never ran it. Do not investigate a skipped model, it is noise. And a freshness error means the loader is broken, not dbt — the fix is in somebody else's system entirely. Before you open the log at all, read the summary line. Pass forty-one, warn two, error one, skip six. That tells you the shape immediately: one error and six skips is one problem with six consequences, not seven problems. People routinely start debugging a skipped model because it is red in the output. Then, dbt retry. It re-runs from the point of failure, using the previous run results, so everything that already succeeded is left alone. On a job with ninety models where the eighty-fourth failed, that is the difference between a two-minute fix and another full hour. And fail-fast, which stops at the first error rather than continuing with everything unaffected. That is usually right in CI, where you want a fast answer. It is usually wrong in production, where you would rather have as much of the warehouse correctly built as possible while you fix the one broken branch.",
}
