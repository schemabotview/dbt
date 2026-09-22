import type { Section } from '../types'

export const compiledSql: Section = {
  id: 'compiled-sql',
  title: 'One file, two environments',
  scene: 'two-targets',
  slide: `## The same \`ref\` resolves differently

One committed file. Run it against \`dev\` and against \`prod\`, and the statement dbt sends is **not the same statement**.

\`\`\`sql
-- dev:  analytics_dev.dbt_alice.stg_orders
-- prod: analytics.analytics.stg_orders
\`\`\`

### Why this is the payoff
- **A dev run cannot touch production** — every \`ref\` lands inside the target you chose
- **No branching in your code** — no \`if target.name == 'dev'\` anywhere in a model
- **CI gets a throwaway schema** — same models, a fresh place, dropped afterwards

### The mental model
A model does not describe *a table*. It describes **a shape**, and the target decides where that shape gets built.

### Seeing it
\`dbt compile --target prod\` renders the whole project as production would run it, and builds nothing.`,
  narration:
    "Here is where ref pays for itself. On the left is one model file, committed once, unchanged. Run it against the dev target and ref resolves to your sandbox schema. Run the same file against production and the same ref resolves to production. Two different statements, from one file, with no branching logic anywhere in it. Think about what that buys. A development run physically cannot touch production, because every ref in the project lands inside whatever target you selected. You are not relying on discipline or on remembering which environment you are in — the resolution does it. You also never write environment logic into a model. There is no if-the-target-is-dev anywhere; models describe what the data should look like, and the target decides where that gets built. And continuous integration gets this for free: point a CI run at a throwaway schema, build the whole project into it, test it, drop it. Same models, fresh place, no contamination. That is the mental model worth carrying. A dbt model does not describe a table. It describes a shape — and the target decides where the shape is built. If you want to see it rather than take my word for it, compile the project with the production target selected. That renders every model exactly as production would run it, writes it all to the target directory, and builds absolutely nothing. It is completely safe, and it is the fastest way to answer the question what would this actually do in prod.",
}
