import type { Section } from '../types'

export const checkStrategySection: Section = {
  id: 'check-strategy',
  title: 'The check strategy',
  scene: 'check-strategy',
  slide: `## No timestamp? Compare the values.

\`\`\`yaml
config:
  unique_key: order_id
  strategy: check
  check_cols: [status, amount]
\`\`\`

dbt compares the listed columns against the current version of the row. Any difference is a change: close the old row, insert a new one.

### Listing columns is a decision
\`check_cols\` is a statement about **what counts as a change**. A column you leave out can change forever and the snapshot records nothing.

### Why not just use \`'all'\`?
Slower on wide tables, and **brittle**: add a column upstream and every row looks changed, so the next run writes a new version of everything.

### The honest summary
The timestamp strategy asks the source when it changed. This one asks **you** what changing means.`,
  narration:
    "When there is no timestamp you trust, you compare values instead. Set the strategy to check, and give dbt a list of columns. On each run it compares those columns against the current version of the row, and any difference counts as a change — close the old row, insert a new one. Simple enough. But the interesting part is the list, because listing columns is not a configuration detail, it is a statement about what counts as a change. Say you list status and amount. From then on, if the shipping address changes, or the customer note changes, or the discount code changes, your snapshot sees nothing. Not an error — nothing. Those changes simply never happened as far as your history is concerned. So the list deserves a conversation, not a guess. The obvious response is to avoid the problem by setting check columns to all. Resist that, for two reasons. It is slower, because every column of every row gets compared on every run, and on a wide table that is real money. More importantly it is brittle: the moment somebody adds a column upstream, every row looks different, and your next run writes a brand new version of every single record — a fake history event affecting your whole table, which you cannot cleanly undo. It also means a meaningless audit column, bumped by some internal process, creates a version in your history that says nothing happened. So here is the honest summary of the two strategies. The timestamp strategy asks the source when the row changed. The check strategy asks you what changing means. Prefer the first when the source is trustworthy, and use the second deliberately, with a list you actually thought about.",
}
