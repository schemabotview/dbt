import type { Section } from '../types'

export const microbatch: Section = {
  id: 'microbatch',
  title: 'microbatch — one query per period',
  scene: 'microbatch-slices',
  slide: `## The model becomes a series of batches

Declare the time column and batch size, and dbt splits one run into **one query per period**, writing the filters itself.

\`\`\`sql
incremental_strategy='microbatch',
event_time='occurred_at',
batch_size='day', lookback=2, begin='2024-01-01'
\`\`\`

### Note what is missing
No \`is_incremental()\` block, no \`max()\` subquery. dbt derives each batch's filter from \`event_time\` — the hand-rolled part disappears.

### What the shape buys
- **Batches are independent** — one fails, the rest still land, and you retry that one
- **Reprocessing is a range** — rebuild one bad Tuesday, nothing else
- **\`lookback\`** re-runs recent batches, catching late-arriving rows
- **The requirement:** \`event_time\` must be declared here **and upstream**`,
  narration:
    "The newest of the strategies, and the first one that changes how you think rather than adding an option. With microbatch, you declare the time column your data is organised by, and how big a batch should be — an hour, a day, a month — and dbt splits a single run into one query per period. Four days of data is four separate statements, not one big one. Look at what is missing from that model. There is no is_incremental block. There is no max-of-loaded-at subquery against this. dbt derives each batch's filter from the event time column itself, so the hand-rolled part of an incremental model — the part everyone gets subtly wrong the first few times — simply is not there. What does the shape buy you? Three things, and they are all about failure. Batches are independent, so if Wednesday's query fails, Monday, Tuesday and Thursday still land, and you retry Wednesday on its own rather than rerunning the lot. Reprocessing becomes a range rather than an event: discovered that last Tuesday loaded badly? Rebuild Tuesday. Not the table, not three years, just Tuesday. And lookback automatically re-runs the most recent few batches every time, which is how late-arriving rows get picked up without you writing any logic for it — set lookback to two and yesterday and the day before are always reconsidered. There is a requirement. The event time column has to be declared on this model and on the models it reads from, because dbt needs to slice the inputs as well as the output. If an upstream model has no event time, dbt cannot narrow it, and every batch reads the whole thing — which is slower than the incremental model you started with.",
}
