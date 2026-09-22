import type { Section } from '../types'

export const selectionSyntax: Section = {
  id: 'selection-syntax',
  title: 'Selection syntax',
  scene: 'selection',
  slide: `## Saying which part of the graph

- \`fct_orders\` — that model alone
- \`fct_orders+\` — it and **everything downstream**
- \`+fct_orders\` — it and everything **upstream**
- \`+fct_orders+\` — the whole line through it
- \`2+fct_orders\` — two generations upstream only
- \`@fct_orders\` — it, its children, and **their** parents (everything needed to rebuild its children)

### Select by something other than a name
\`tag:nightly\` · \`path:models/marts\` · \`config.materialized:incremental\` · \`source:jaffle\` · \`test_type:unit\` · \`result:error\`

### The set operators are backwards from most tools
A **space** is union. A **comma** is intersection.
\`\`\`
--select tag:finance tag:marketing   # either
--select tag:finance,tag:nightly     # both
\`\`\`

### \`--exclude\` takes the same vocabulary
Build everything except the one enormous model: \`--exclude fct_events\`.`,
  narration:
    "This is the flag you will type more than any other, so it is worth learning properly rather than by trial and error. The basic unit is a model name, and around it you put a plus sign to mean direction. A plus after the name means this model and everything downstream of it — everything that depends on it. A plus before means everything upstream — everything it depends on. Plus on both sides gives you the whole line through it. Put a number in front of the plus and you limit how far it walks: two-plus-fct-orders means two generations upstream and no further, which is handy in a deep project. And the at sign is the one people meet late: it selects the model, its children, and the parents of those children — in other words everything you would need to correctly rebuild everything downstream. That is the right selector when you are testing a change properly. You can also select by things other than names. Tag, which you set in config and is the main way teams group models for scheduling. Path, for a folder. Config, so you can select every incremental model in the project. Source, test type, and result, which selects nodes by how they did last time. Now the part that catches everybody, because it is backwards from most tools. A space between two selectors means union — either one. A comma means intersection — both. So tag colon finance, space, tag colon marketing gives you everything in either group. Tag colon finance, comma, tag colon nightly gives you only the models that are in both. Read that carefully the first few times. And exclude takes exactly the same vocabulary, which is how you say build everything except the one enormous model that takes forty minutes.",
}
