import type { Section } from '../types'

export const whatDbtIs: Section = {
  id: 'what-dbt-is',
  title: 'What dbt actually is',
  scene: 'sql-in-ddl-out',
  slide: `## A compiler and a runner

You write a \`SELECT\`. dbt turns it into the \`CREATE\` statement your warehouse needs, and runs those statements **in the right order**.

### That is the whole mechanism
- You never write \`CREATE TABLE\`, \`DROP\`, or an \`INSERT\` wrapper
- You never hardcode a table name — \`ref()\` does it, and that is where the order comes from
- The same file builds to your sandbox or to production, depending on one flag

### What it adds, for free
- **Dependencies** — a graph derived from your SQL, not maintained by hand
- **Tests** — assertions that live beside the model they protect
- **Docs and lineage** — generated from the project, so they cannot go stale
- **Environments** — dev, CI and prod from one codebase

### The mental model
dbt is **software engineering habits, applied to analytics SQL**.`,
  narration:
    "So what is dbt? Strip away everything written about it and you are left with two jobs: it is a compiler, and it is a runner. Here is the compiler half. You write a file containing a single SELECT statement — no CREATE, no DROP, no insert wrapper, just the query that describes the table you want. dbt takes that file and produces the statement your warehouse actually needs: create or replace table, in this database, in this schema, as your query. Notice what you did not have to decide. Whether the object is a table or a view, which schema it lands in, whether it is replaced or merged into — all of that is configuration, and all of it can change without touching the SELECT. Now the runner half. Look at the model on the left and find the two ref calls. Each one names another model in the project. dbt reads those calls across every file, builds a graph out of them, and runs your models in an order that respects it — parents before children, unrelated branches in parallel. You never write that order down, and it cannot drift out of date, because it is derived from the same SQL that does the work. Everything else dbt is famous for hangs off those two jobs. Because it parses your project, it can generate documentation and a lineage graph. Because it knows the dependency order, it can run your tests in the right place. Because the table names are resolved at compile time rather than typed by you, the same file can build into your personal sandbox this morning and into production tonight. One sentence, if you want one: dbt brings software engineering habits to analytics SQL.",
}
