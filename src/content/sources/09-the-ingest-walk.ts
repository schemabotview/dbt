import type { Section } from '../types'

export const theIngestWalk: Section = {
  id: 'the-ingest-walk',
  title: 'One table, the whole way',
  scene: 'ingest-walk',
  slide: `## Following \`orders\` from landing to dashboard

- **source** — \`raw.orders\`, declared in yml, checked for freshness
- **snapshot** — reads the **source**, captures today's version of each row
- **staging** — renames and casts, one model, a view
- **mart** — \`fct_orders\`, a table, shaped for reading
- **dashboard** — what somebody actually asked for

### The snapshot hangs off the source
Not off staging. It is a **branch**, not a step in the line — so it survives every refactor you ever do to the models beside it.

### The order a job runs in
1. \`dbt source freshness\` — is there new data at all?
2. \`dbt snapshot\` — capture today before anything transforms it
3. \`dbt build\` — seeds, models, and their tests

Snapshots run **before** models, and on their own schedule: capture frequency is about how fast the source changes, not about when the dashboard refreshes.`,
  narration:
    "Let's put the whole course together by following one table the entire way. Orders lands in the warehouse from your loader. You declare it as a source, with freshness thresholds, so you know whether it is current. A snapshot reads that source directly and captures the current version of every row, writing a new version whenever one changes. A staging model reads the source, renames the columns to your conventions and casts the types — one model, materialized as a view. A mart reads staging, joins it to other things, and becomes a table that people query. And a dashboard reads the mart. Now look at where the snapshot sits, because this is the part people draw wrongly. It hangs off the source. It is a branch, not a step in the line. Staging does not read the snapshot, and the snapshot does not read staging. The reason is the rule from a moment ago: the snapshot must capture raw reality, so that when you inevitably refactor your staging model — and you will — the history is untouched. If you want a history-aware mart, build a separate model on top of the snapshot; that is the second branch on screen. Finally, the order a job runs in. Freshness first: is there new data at all, and should we even continue? Then snapshot: capture today's state before anything transforms it, because if the build fails halfway you still want the history. Then build, which covers seeds, models and their tests together. And one nuance worth carrying: a snapshot's schedule is about how fast the source changes, not about when the dashboard refreshes. A column that flips several times a day needs capturing several times a day, whatever your reporting cadence is.",
}
