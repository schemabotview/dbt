import type { Section } from '../types'

export const runQuerySection: Section = {
  id: 'run-query',
  title: 'run_query and execute',
  scene: 'run-query',
  slide: `## Asking the warehouse while compiling

\`run_query()\` queries **during compilation**, so a template can build itself from live data.

\`\`\`sql
{% if execute %}
  {% set res = run_query(sql) %}
  {% set methods = res.columns[0].values() %}
{% endif %}
\`\`\`

### Why the guard
dbt **parses** the project before running anything, and during parsing \`execute\` is \`false\` and \`run_query\` returns nothing. Without the guard your list is empty and nothing says why.

### Price it honestly
- **A query on every parse** — every compile and CI job, not just builds
- **The SQL is not deterministic** — the model changes when the data does
- **Compiling now needs a warehouse**

Reach for it when a hardcoded list would genuinely go stale.`,
  narration:
    "This is the most powerful thing in Jinja and the one to be most careful with. Run_query sends a query to your warehouse during compilation, and hands you the result as a table object you can loop over. So a template can genuinely build itself from live data: read the distinct payment methods, generate a column for each. First, the guard, because without it you will lose an afternoon. dbt parses your entire project before it runs anything — it needs the graph before it can decide what to build. During that parse phase, execute is false and run_query returns nothing at all. So if your macro calls run_query unguarded, then during parsing your list is empty, your loop produces zero columns, and the error you eventually get is something unhelpful about a syntax problem, with nothing pointing at parsing. Wrap anything that queries in an if-execute block and set a sensible empty default outside it. Now price the feature honestly, because it is easy to adopt for a small win. You are adding a query to every parse — not every build, every parse. That is every compile, every docs generate, every CI job, every time somebody's editor extension refreshes the project. Second, your SQL is no longer deterministic: the same commit produces different models depending on what is in the warehouse at that moment, which makes reviewing a diff genuinely harder. And third, compiling now requires a warehouse connection, which complicates continuous integration for everybody. There are real uses. If the list would genuinely go stale — a set of countries that grows monthly, a set of event types you do not control — this is the right tool. If you are avoiding typing five strings that have not changed in two years, it is not.",
}
