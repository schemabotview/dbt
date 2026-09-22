import type { Section } from '../types'

export const theDagSection: Section = {
  id: 'the-dag',
  title: 'The DAG',
  scene: 'the-dag',
  slide: `## The graph is your \`ref\` calls, read back

dbt parses every model, collects every \`ref()\` and \`source()\`, and builds a directed acyclic graph. **That is the only input.**

### What falls out of it
- **Build order** — parents before children, guaranteed
- **Parallelism** — models with no path between them run at the same time, up to \`threads\`
- **Selection** — \`--select fct_orders+\` means "this model and everything downstream"; \`+fct_orders\` means upstream

### What the graph is *not* built from
Your folder structure. Your filenames. A run-order file somewhere. **None of those exist in dbt.** Folders configure; they do not order.

### Acyclic, and enforced
Two models that \`ref\` each other are a cycle. dbt refuses to run and names the loop.`,
  narration:
    "Put every ref call in the project together and you have a graph. dbt parses every model, collects every ref and every source, and assembles a directed acyclic graph out of them. That graph is not a nice extra feature — it is the thing dbt runs. And notice what the input is: only the refs. Nothing else. Look at the picture. A raw source feeds a staging model, and that staging model feeds two different marts. Three things fall straight out of that shape. Build order: parents before children, always, and you never write it down. Parallelism: those two marts have no path between them, so dbt builds them at the same time, up to your threads setting. That is where a dbt run gets its speed — not from dbt being fast, but from dbt knowing which models cannot possibly affect each other. And selection: because the edges exist, you can say build fct_orders and everything downstream of it, by putting a plus after the name. Put the plus in front instead and you get everything upstream. That one flag is most of day-to-day dbt. Now the three things the graph is not built from, because every one of them is a guess people make. It is not built from your folder structure — folders configure models, they do not order them. It is not built from filenames; alphabetical order means nothing here. And there is no run-order file anywhere in a dbt project, no list you maintain. If you find yourself wanting one, what you actually want is a ref. One last word — the A in DAG is acyclic, and dbt enforces it. If two models ref each other, directly or around a long loop, dbt refuses to run and tells you which models form the cycle.",
}
