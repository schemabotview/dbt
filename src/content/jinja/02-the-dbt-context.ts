import type { Section } from '../types'

export const theDbtContext: Section = {
  id: 'the-dbt-context',
  title: 'The dbt context',
  scene: 'dbt-context',
  slide: `## The variables dbt hands you

- **\`ref\` / \`source\`** — a resolved relation. Always
- **\`this\`** — the model being built. Incremental filters, post-hooks
- **\`target\`** — the active connection: \`target.name\`, \`target.schema\`
- **\`model\`** — this node as a dictionary: its tags, config, columns
- **\`run_started_at\`** — the run's timestamp, for audit columns
- **\`execute\`** — \`false\` while dbt is parsing. Guards anything that queries

### \`target\` is useful, and a tempting trap
Limiting a **dev** build to seven days is a good use: it costs less and changes nothing about the answer.

Branching your **logic** on \`target.name\` is not. It means dev and prod run different SQL, so your tests pass against code production never executes. **Use \`target\` for cost, not for meaning.**`,
  narration:
    "Inside any model, macro or test, dbt hands your template a set of variables. Six are worth knowing by name. Ref and source you have used constantly — they resolve to a real relation. This is the model currently being built, which you met in the incremental filter and will meet again in post-hooks; it is how a model refers to itself. Target is the connection you are running against, and it carries the name, the schema and the database. Model is the current node as a dictionary — its tags, its config, its declared columns — which is what lets you write a macro that behaves differently depending on how the model was configured. Run_started_at is the timestamp of the run, and it is the honest way to stamp an audit column: every model in one run gets the same value, which makes them comparable. And execute is a boolean that is false while dbt is parsing, and true while it is actually running — we will spend a whole section on that one shortly, because ignoring it produces a genuinely baffling bug. Now a caution about target, because it is the second thing everybody discovers and the first thing they misuse. Using it for cost is good: limit a development build to the last seven days, so your sandbox is cheap and fast. The answer is the same shape, just smaller. Using it for logic is not. If your model computes revenue one way in dev and another way in prod, then every test you run passes against code that production never executes. You have carefully built a system where the thing you tested and the thing you shipped are different. So: use target for cost, not for meaning.",
}
