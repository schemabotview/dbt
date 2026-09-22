import type { Section } from '../types'

export const ephemeral: Section = {
  id: 'ephemeral',
  title: 'ephemeral — a model with no object',
  scene: 'ephemeral-mat',
  slide: `## It becomes a CTE, not a table

An ephemeral model is never built. dbt takes its SQL and **pastes it into every model that refs it**, as a common table expression named after the model.

### What that gives you
- **The DAG keeps it** — lineage, docs and \`ref()\` all work normally
- **The warehouse never sees it** — no object, no storage, no clutter in the schema
- **Nothing to rebuild** — it has no build step of its own

### What it costs
- **You cannot query it.** There is no object to \`select\` from, so debugging means compiling a child and reading the CTE
- **It is recomputed per child.** Three models ref it, the warehouse runs that SQL three times
- **Compiled SQL gets long**, and a chain of ephemerals gets very long

### Reach for it
A step that exists only to keep a mart readable, and that exactly one model reads.`,
  narration:
    "The third one is genuinely odd, and it takes a moment to click. An ephemeral model is never built at all. Nothing appears in your warehouse. Instead, dbt takes the model's SQL and pastes it into every model that references it, as a common table expression named after the model. Look at the screen: the child model says select-star-from-ref-int-order-items, and the statement dbt actually sends has a with-clause at the top called int_order_items, containing that model's entire query. The reference has been inlined. What do you get for that? The DAG keeps it — lineage works, the docs show it, ref works exactly as normal, so from the perspective of writing models, nothing is different. But the warehouse never sees it. No object, no storage, no clutter in a schema that people browse. And it has no build step at all, so it costs nothing in your run. What does it cost? Three things. You cannot query it — there is no object to select from, so when the numbers look wrong, you cannot just look at the intermediate result. You have to compile a child model and read the CTE inside it. Second, it is recomputed once per child. If three models reference an ephemeral model, that SQL runs three times, in three different statements, and the warehouse has no idea they are related. And third, compiled SQL gets long — an ephemeral model that references another ephemeral model produces nested with-clauses that are genuinely hard to read at three in the morning. So reach for it in one situation: a step that exists purely to keep a mart readable, which exactly one model reads. Beyond that, a view costs almost nothing and you can actually look at it.",
}
