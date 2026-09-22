import type { Section } from '../types'

export const layers: Section = {
  id: 'layers',
  title: 'Staging, intermediate, marts',
  scene: 'the-layers',
  slide: `## Three layers, three jobs

### staging — one model per source table
Rename, cast, tidy. **No joins, no aggregates.** This is the one place raw column names are translated, so everything downstream agrees on what a column is called.

### intermediate — the messy middle
Joins, pivots, the multi-step calculation nobody wants inside a mart. Often ephemeral. **Nothing outside dbt reads these.**

### marts — what people query
One model per business concept, shaped for reading. Usually tables. **Never reads a source directly** — it reads staging and intermediate.

### The rule people argue with
**One staging model per source table, even when it feels pointless.** The day that source adds a column, renames one, or starts sending nulls, you have exactly one file to fix.`,
  narration:
    "Left to itself, a dbt project turns into a hundred models with no obvious shape. The convention that prevents that is three layers, and it is worth adopting even on a small project. Staging is the bottom layer, and the rule is one staging model per source table. Its job is narrow: rename columns to your house conventions, cast types, tidy up. Explicitly not allowed: joins and aggregates. That sounds restrictive until you see what it buys — staging is the one and only place where a raw column name is translated into the name your business actually uses, so everything downstream can agree on what a column is called. Intermediate is the messy middle. Joins, pivots, the four-step calculation you do not want sitting inside a mart making it unreadable. These models are often ephemeral, which means they never become an object at all. The defining property is that nothing outside dbt reads an intermediate model — no dashboard, no analyst, no reverse ETL job. Marts are what people actually query. One model per business concept, shaped for reading rather than for computing. Usually materialized as tables, because they are read constantly. And a mart never reads a source directly; it reads staging and intermediate models. Now the rule people argue with, every time: one staging model per source table, even when that model does nothing but select star and rename two columns. It feels like a pointless passthrough — right up to the day that source table adds a column, or renames one, or starts sending nulls where it never did. Then the difference between fixing one file and auditing forty is the whole value of the layer.",
}
