import type { Section } from '../types'

export const appendAndMerge: Section = {
  id: 'append-and-merge',
  title: 'append and merge',
  scene: 'append-vs-merge',
  slide: `## What happens to a row you already loaded?

The **incremental strategy** answers that, and it is config, not SQL.

\`\`\`sql
materialized='incremental',
incremental_strategy='merge',
unique_key='order_id'
\`\`\`

### append
Insert the new rows — nothing matched, nothing updated. **Fastest there is**, and re-running duplicates every row. Correct only for immutable events.

### merge
Match on \`unique_key\`: update where they match, insert where they do not. Slower, and **idempotent** — run it twice and the table is unchanged.

### The condition nothing checks
If \`unique_key\` is not actually unique, merge does not error — it duplicates or picks arbitrarily. You find out much later.`,
  narration:
    "So you have computed a batch of new rows. What does dbt do with them? That is the incremental strategy, and it is configuration rather than something you write in SQL. The simplest is append. Insert the new rows, and that is it. Nothing is matched against what is already there, nothing is updated. It is the fastest thing available, because the warehouse does no work beyond writing rows. And it has one sharp edge: it is not idempotent. Run the same batch twice — because a job retried, because somebody ran it by hand, because a failure happened after the insert but before the commit was recorded — and you now have every one of those rows twice, with no error anywhere. So append is correct only for genuinely immutable events. Log lines. Clicks. Things that happened and cannot change. Merge is the one you will use most. You give it a unique key, and dbt matches incoming rows against the rows already in the table: where a key matches, the row is updated; where it does not, the row is inserted. That costs more — the warehouse has to do the matching — but it buys idempotence. Run the same batch twice and the table is identical afterwards. That property is worth a great deal in production, because it means a retry is always safe, and safe retries are the difference between a pipeline you trust and one you babysit. Now the condition that nothing checks for you. If the column you named as unique_key is not actually unique in the incoming data, merge does not error. Depending on the warehouse, you get duplicated rows or an arbitrary winner — and because it looks fine, you find out weeks later when two numbers disagree. Test that key. There is a whole course on exactly that coming.",
}
