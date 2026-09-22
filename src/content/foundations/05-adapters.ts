import type { Section } from '../types'

export const adaptersSection: Section = {
  id: 'adapters',
  title: 'Adapters — one project, many warehouses',
  scene: 'adapters',
  slide: `## The warehouse is a plugin

dbt itself knows nothing about Snowflake. An **adapter** — a separate Python package — opens the connection and knows the dialect.

### What the adapter decides
- How to spell \`CREATE\`, \`MERGE\` and \`DROP\` here
- Which incremental strategies exist
- What a "schema" even means on this platform

### Installing one is a line
\`\`\`
pip install dbt-snowflake
\`\`\`
…and one \`type:\` in \`profiles.yml\` picks it.

### Portable, not identical
Your \`SELECT\`s, \`ref()\`s and tests move between warehouses untouched. Types, incremental strategies and cost behaviour do **not** — a migration is edits, not a rewrite.

### In this concept
Where a platform must be named, it is **Snowflake**.`,
  narration:
    "One thing that surprises people: dbt itself knows nothing about any particular warehouse. There is no Snowflake code inside dbt. What connects the two is an adapter — a separate Python package you install alongside dbt, one per warehouse. dbt-snowflake, dbt-bigquery, dbt-databricks, dbt-postgres, dbt-duckdb, and a long tail of community ones. The adapter is responsible for two things. It opens the connection and manages the session. And it knows the dialect — how to spell a create statement on this engine, whether a merge is supported and what its syntax is, which incremental strategies are available, and what the word schema means here, because that varies more than you would like between vendors. Installing an adapter is a pip install, and choosing it is one line in your profile: type, colon, snowflake. That is the entire wiring. Now, how portable is this really? Your SELECT statements, your ref calls, your tests, your documentation and your project structure move between warehouses untouched — that part is genuine. What does not move cleanly is the edges: data types have different names, incremental strategies differ in which ones exist and how they behave, and the cost model is completely different, which changes what a sensible design even looks like. So it is fair to call a dbt project portable, as long as you hear portable as a migration with edits, rather than a copy. For this concept, wherever something has to name a platform — a merge statement, a connection profile, a claim about cost — it will be Snowflake, so that what you see on screen is something you can actually run.",
}
