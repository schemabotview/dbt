import type { Section } from '../types'

export const defer: Section = {
  id: 'defer',
  title: 'defer — read the rest from prod',
  scene: 'defer-diagram',
  slide: `## Build one model. Point everything else at production.

\`--defer --state ./prod-artifacts\` changes one thing: when a \`ref()\` names a model that is **not being built in this run**, it resolves to the **deferred environment** instead of to your empty schema.

### The same call, two answers, in one run
- \`ref('stg_orders')\` — not built here → \`analytics.stg_orders\` (prod)
- \`ref('fct_orders')\` — built here → \`ci_pr_142.fct_orders\`

### Why this is the unlock
Without it, testing a change to one mart means rebuilding every model beneath it — your whole warehouse, into a scratch schema, before you can look at one number.

With it, you build the thing you changed, it reads production for everything else, and you get a **real** answer against **real** data in minutes.

### It works in dev too
Fresh clone, empty schema, one model to fix? Build just that model with \`--defer\` and read prod for the rest.`,
  narration:
    "Defer is the other half of the technique, and it is the piece that makes it genuinely usable. Here is the problem it solves. You change one mart. To test it, that mart needs its parents — the staging models, the intermediate models, the sources. If you are building into an empty continuous-integration schema, none of those exist, so you have to build the entire warehouse before you can look at one number. That is the forty minutes we want back. Defer changes exactly one thing. When a ref names a model that is not being built in this run, it resolves to the deferred environment — production — instead of to your empty schema. Look at the table. In a single run, ref of stg_orders resolves to production, because you did not build it. And ref of fct_orders resolves to your CI schema, because you did. The same function, two different answers, inside one run, and you did not write a line of logic to make that happen. So the shape becomes: build only what changed and what depends on it, read production for everything else. You get a real test, against real data, in minutes rather than hours. And it is a real test — the model is genuinely built in a warehouse and genuinely queried, not simulated. One thing people miss: this is not only a CI feature. It is just as useful on your laptop. Fresh clone of a repo, empty personal schema, and you need to fix one model? Build that one model with defer, and everything upstream comes from production. You are productive in two minutes instead of after a full build of somebody else's warehouse.",
}
