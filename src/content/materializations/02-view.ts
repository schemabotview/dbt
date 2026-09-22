import type { Section } from '../types'

export const view: Section = {
  id: 'view',
  title: 'view — cheap to build, paid on read',
  scene: 'view-mat',
  slide: `## Nothing is stored but the query

\`\`\`sql
create or replace view … as ( your model );
\`\`\`

Building a view moves no data. What you store is the **definition** — and every query against it runs your SQL again, in full.

### Where the cost went
It did not disappear. It moved **from your run to your readers** — and it is paid once per query, not once per day.

### Right when
- **Staging models** — thin renames and casts over one table
- **Freshness matters** — a view is never stale; it reads whatever is there now
- **Rarely queried** — nobody is paying that read cost very often

### The way it goes wrong
A view on a view on a view. Each read executes the entire stack, and because no layer looks expensive on its own, the cost compounds quietly.`,
  narration:
    "Start with the default. When a model is materialized as a view, dbt sends a create-or-replace-view statement, and that is all. No data moves. Nothing is computed. What gets stored is the definition of your query — the warehouse simply remembers that stg_orders means this select. Which means building is essentially free, and a dbt run over a project of views takes seconds. But the cost did not disappear, it moved. Every time somebody queries that view — an analyst, a dashboard refresh, another model that reads it — your SQL runs again, from scratch, in full. So the cost moved from your run to your readers, and it is paid once per query rather than once per day. That trade is often exactly right. Staging models are the obvious case: they are thin, they rename and cast columns over a single table, and materializing every one of them as a table would double your storage and your run time for almost no benefit. Views are also right when freshness matters, because a view is never stale — it reads whatever is in the underlying table at the moment you ask. And they are right for anything rarely queried, because nobody is paying that read cost very often. Now the way this goes wrong, and it is worth watching for. A view built on a view built on a view. Each read executes the entire stack, every layer, every time. And because no individual layer looks expensive, nothing shows up as a problem — until somebody traces a dashboard that takes ninety seconds back through five levels of nesting. If you find yourself deep in a stack of views, that is the signal that one of them should become a table.",
}
