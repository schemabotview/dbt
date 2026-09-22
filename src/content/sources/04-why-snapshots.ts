import type { Section } from '../types'

export const whySnapshots: Section = {
  id: 'why-snapshots',
  title: 'Why snapshots exist',
  scene: 'snapshot-why',
  slide: `## The raw table overwrote yesterday

Most source systems hold **one row per thing, updated in place.** Order 1001 was \`pending\` on Monday and \`shipped\` on Tuesday — and on Tuesday, Monday's value is simply gone.

### What you can no longer answer
- **When did it ship?** That timestamp was never stored anywhere
- **How long was it pending?** Both ends of the interval are gone
- **What did last Tuesday's report say?** It cannot be reproduced

### Nothing else in dbt can recover this
Models rebuild from the source, so they can only ever show what the source shows *now*. Incremental models keep rows, not **versions** of rows. This is the one gap snapshots fill.

### And it is a race
A snapshot records what it sees **when it runs**. Two changes between runs and you capture the second one only. History starts the day you start — which is the real reason to set one up early.`,
  narration:
    "Now the most consequential thing in this course, and the one with the shortest window to act on. Most source systems hold one row per thing, and they update it in place. An order row has a status column. On Monday it says pending. On Tuesday the warehouse loader runs, the row is updated, and now it says shipped. Monday's value is not in a history table. It is not in an archive. It was overwritten, and it is gone. Think about what you have just lost. When did that order ship? The system never stored a shipped-at timestamp, so the only evidence was the status column changing, and you were not watching. How long did it sit in pending? Both ends of that interval are gone. And what did last Tuesday's report actually say? You cannot reproduce it, which matters enormously the first time somebody asks why a number changed retrospectively. Nothing else in dbt recovers this. Models rebuild from the source, so however clever the model, it can only ever show what the source shows right now. Incremental models help with rows that are added, not with values that are overwritten — they keep rows, not versions of rows. This one gap is the entire reason snapshots exist. And here is the part to take seriously: it is a race. A snapshot records what it sees at the moment it runs. If a value changes twice between two runs, you capture the second change and the first one never existed as far as you are concerned. Which means the history you have starts on the day you start capturing it — and every day you delay is a day you can never get back. If you suspect you will ever want this, set it up now, not when somebody asks.",
}
