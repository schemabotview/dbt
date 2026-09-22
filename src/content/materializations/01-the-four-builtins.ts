import type { Section } from '../types'

export const theFourBuiltins: Section = {
  id: 'the-four-builtins',
  title: 'The four built-ins',
  scene: 'four-builtins',
  slide: `## The same SELECT, four different objects

A **materialization** is how dbt turns your query into something in the warehouse. The SQL does not change — only what dbt builds from it.

- **view** — a stored definition. Free to build, re-runs on every read
- **table** — rows on disk, rebuilt whole on every run
- **ephemeral** — no object at all; pasted into its children as a CTE
- **incremental** — a table that only adds the rows that are new

### One line chooses
\`\`\`yaml
+materialized: table        # a whole folder
\`\`\`
\`\`\`sql
{{ config(materialized='incremental') }}   -- one model
\`\`\`

### The default is \`view\`
Say nothing anywhere, and every model is a view. That is a deliberate default: it is the cheapest thing to build and it is never stale.`,
  narration:
    "Every model you have written so far became a view, and you did not choose that — it is just the default. This course is about that choice. A materialization is how dbt turns your query into something that exists in the warehouse. Crucially, your SQL does not change. The same select can be built four different ways, and switching between them is one line of configuration. Here are the four that ship with dbt. A view is a stored definition. Building it is nearly free, because no data moves — but every single query against it re-runs your SQL underneath. A table is rows written to disk. Building it costs a full computation, every run, and reading it is then just reading rows. Ephemeral is the odd one: it builds nothing at all. The model is pasted into whichever models reference it, as a common table expression, and disappears. And incremental is a table that does not get rebuilt from scratch — each run adds only the rows that are new, which is the answer to the rebuild that got too slow. You choose with one line, either on a whole folder in the project file, or on a single model in a config block at the top of it. And if you never say anything, you get a view. That default is not arbitrary. A view is the cheapest thing to build and it is never stale, so it is the right answer until you have a specific reason for something else — which is the thread running through the rest of this course. Start simple; change it when something actually hurts.",
}
