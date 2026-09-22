import type { Section } from '../types'

export const refSection: Section = {
  id: 'ref',
  title: 'ref() — the function it is all built on',
  scene: 'ref-resolution',
  slide: `## Two jobs, one call

\`\`\`sql
from {{ ref('stg_orders') }}
\`\`\`

### It declares a dependency
dbt now knows this model has a parent. That single fact produces the build order, the lineage graph, and the ability to say "build this model and everything below it".

### It resolves a name
At compile time \`ref()\` becomes a real, fully-qualified table name — **the right one for the target you are running against**.

### And they cannot be separated
You cannot get the name resolution without also getting the edge. That is deliberate: it is what makes the graph impossible to forget to update.

### The one rule
**If an object is built by this project, you reach it with \`ref()\`.** Raw tables you did not build are \`source()\` — that is next.`,
  narration:
    "If dbt has a single load-bearing idea, this is it. Inside a model, you never write the name of another model. You call ref, with the other model's name as a string. It looks like a small convenience — a slightly verbose way of typing a table name. It is not. That one call does two entirely different jobs at the same time. The first job is that it declares a dependency. By calling ref stg_orders, this model has told dbt that stg_orders is its parent and must exist first. From that one fact you get the build order, you get the lineage graph on the docs site, and you get the ability to say build this model and everything downstream of it, because dbt can walk the edges. The second job is that it resolves a name. At compile time, ref is replaced by a real, fully qualified table name — database, schema, table — and crucially, the correct one for the target you are running against. Run against dev, and it resolves to your personal sandbox schema. Run against production, and the same file resolves to production. You will see exactly that in a moment. Now, the design point. You cannot take one of those jobs without the other. There is no way to get the name resolved without also creating the edge in the graph. And that is precisely why dbt's lineage is trustworthy in a way that hand-maintained documentation never is: the graph is not a description of the project that somebody has to remember to update. It is derived from the same SQL that does the work. If the SQL changed, the graph changed. So the rule is short. If an object is built by this project, you reach it with ref. Raw tables that you did not build have their own function, and that is what we look at shortly.",
}
