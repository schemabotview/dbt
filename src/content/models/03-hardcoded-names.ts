import type { Section } from '../types'

export const hardcodedNames: Section = {
  id: 'hardcoded-names',
  title: 'What a hardcoded name costs',
  scene: 'hardcoded-trap',
  slide: `## Both queries build. One is a trap.

Writing \`from analytics.stg_orders\` instead of \`from {{ ref('stg_orders') }}\` is not a syntax error. It compiles, it runs, it goes green. Here is what you lost.

### Your dev run now reads production
The typed name is absolute. It does not change with \`--target\`, so a model you are developing quietly reads live production data — and nothing warns you.

### dbt has no parent to wait for
No \`ref\`, no edge. dbt may build this model **before** the table it reads, against yesterday's data, or in parallel with the job rebuilding it.

### The lineage graph has a hole
The docs show this model with no upstream. Impact analysis silently stops being true.

### Renaming breaks it, later
Rename the parent and nothing complains until the next run fails — or worse, until it does not.`,
  narration:
    "It is worth seeing what the alternative actually costs, because nothing stops you writing the table name yourself. Both of the queries on screen are valid SQL. Both compile. Both build. Both go green. So here is what the typed name quietly took away. First, and worst: your development run now reads production. A hardcoded name is absolute — it says analytics dot stg_orders, and it says that regardless of which target you are running against. So you sit in your own sandbox schema, working on a model, and that model is reading live production data. It will not error. You may not notice for weeks. Second, dbt has no parent to wait for. Without a ref there is no edge, so as far as the graph is concerned this model depends on nothing. dbt is free to build it first, in parallel with the very job that is rebuilding its input — so you get yesterday's numbers, or half of today's, and the failure is intermittent, which is the worst kind. Third, the lineage graph now has a hole in it. The documentation site shows this model with no upstream at all. Every impact analysis anybody does — what breaks if I change this column — is silently wrong from here on. And fourth, renaming. Rename the parent model, and nothing anywhere complains. The project compiles, the docs build, the tests pass. You find out at the next run, when a query fails against a table that no longer exists — or you do not find out, because an old, stale copy of that table is still sitting there answering queries. So: one rule, no exceptions. If this project builds it, you reach it with ref.",
}
