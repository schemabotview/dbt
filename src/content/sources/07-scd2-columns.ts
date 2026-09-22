import type { Section } from '../types'

export const scd2ColumnsSection: Section = {
  id: 'scd2-columns',
  title: 'The columns dbt adds',
  scene: 'scd2-columns',
  slide: `## One row per version

A snapshot is a **slowly changing dimension, type 2**: the same \`order_id\` appears once per version of itself, and four columns dbt adds say which version is which.

- **\`dbt_valid_from\`** — when this version appeared
- **\`dbt_valid_to\`** — when it stopped being true. **\`null\` means it is the current one**
- **\`dbt_updated_at\`** — the source value the snapshot saw
- **\`dbt_scd_id\`** — a unique key for this version, since \`order_id\` no longer is

### Any point in the past is a \`where\` clause
\`\`\`sql
where dbt_valid_from <= '2026-03-02'
  and (dbt_valid_to > '2026-03-02'
       or dbt_valid_to is null)
\`\`\`

### The two queries you will write most
\`dbt_valid_to is null\` for "as it is now". The clause above for "as it was then". Everything else is a variation on those.`,
  narration:
    "Let's look at what a snapshot actually produces, because once you have seen the table, the idea is obvious. A snapshot is a slowly changing dimension of type two, which is a formal name for a simple shape: one row per version of a thing. Order 1001 appears twice — once as pending, once as shipped. Order 1002 appears once, because it has not changed yet. Four columns dbt adds tell you which version is which. Dbt valid from is when this version came into existence. Dbt valid to is when it stopped being true — and for the current version, it is null. That null is the thing to remember, because it is how you find the present. Dbt updated at records the source value the snapshot compared against, and dbt scd id is a unique identifier for this specific version, which you need because order id is no longer unique in this table — that is rather the point. Now the payoff, and it is small enough to memorise. Any moment in the past becomes a where clause: keep the rows whose valid-from is at or before your date, and whose valid-to is either after your date or null. That gives you exactly one row per order, as it stood on that date. You can now rebuild last Tuesday's report, today, and get last Tuesday's numbers. In practice you will write two queries over and over. Valid-to is null, for how things are now. And the clause on screen, for how things were then. Almost everything else you do with a snapshot is a variation on one of those two.",
}
