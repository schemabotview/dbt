import type { Section } from '../types'

export const timestampStrategySection: Section = {
  id: 'timestamp-strategy',
  title: 'The timestamp strategy',
  scene: 'timestamp-strategy',
  slide: `## Compare one column. Write two rows.

\`\`\`yaml
- name: orders_snapshot
  relation: source('jaffle', 'orders')
  config:
    unique_key: order_id
    strategy: timestamp
    updated_at: updated_at
\`\`\`

### What dbt does per incoming row
- **Key not seen before** → insert it
- **\`updated_at\` unchanged** → do nothing
- **\`updated_at\` is newer** → close the existing row, insert a new one

Two columns drive the whole thing: one to match on, one to compare.

### Cheap, and exactly correct — on one assumption
Everything rests on the source **bumping \`updated_at\` whenever anything changes.** If it forgets on one column, the snapshot misses those changes entirely and nothing errors.`,
  narration:
    "Two strategies decide how a snapshot detects a change, and this is the one to use whenever you can. Give dbt a unique key to match rows on, and a column that the source updates whenever a row changes — typically called updated_at. Then, for each incoming row, dbt does one of three things. If the key has never been seen, insert it: a new record. If the key exists and updated_at is unchanged, do nothing at all — no write, no work. And if updated_at is newer than what is recorded, close the existing row by stamping an end date on it, and insert a new row with the new values. That is the entire mechanism. Two columns drive it: one to match on, one to compare. It is cheap, because comparing one timestamp is trivial, and it is exactly correct — on one assumption. And that assumption is worth saying out loud, because it is where this goes wrong. Everything rests on the source system actually bumping updated_at whenever anything changes. Plenty of systems do, reliably. Plenty of others bump it on some updates and not others — a status change from an admin panel updates it, but a nightly batch job that corrects amounts does not. When that happens, your snapshot silently misses those changes. There is no error. The rows just quietly do not appear, and you discover it much later when a history that should have four versions has two. So before you trust the timestamp strategy, test the assumption: check that updated_at actually moves when the columns you care about move. If it does not, the next section is your answer.",
}
