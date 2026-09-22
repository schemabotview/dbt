import type { Section } from '../types'

export const persistDocsAndMeta: Section = {
  id: 'persist-docs-and-meta',
  title: 'persist_docs and meta',
  scene: 'persist-meta',
  slide: `## Getting the docs to where people already are

Nobody opens your docs site. Two small features fix that from opposite ends.

### \`persist_docs\`
Pushes descriptions into the **warehouse itself**, as comments on tables and columns — where the analyst in a SQL console will actually meet them.

### \`meta\`
Arbitrary key/values on any node, surfacing in the docs **and in \`manifest.json\`** — the point being that \`meta\` is **machine-readable.**

\`\`\`yaml
meta: {owner: finance, contains_pii: true}
\`\`\`

### Why \`meta\` earns its budget
Once PII is a flag rather than a convention, a script can answer **"which columns here are personal data?"** across four hundred models — and prove it.`,
  narration:
    "Here is a complaint you will hear in every company that adopts dbt: nobody opens the docs site. Two small features attack that from opposite ends. Persist docs takes your descriptions and pushes them into the warehouse itself, as comments on the tables and columns. It is two lines of config, and it matters because of who it reaches. The analyst browsing schemas in a SQL console, or in whatever data catalogue your company bought, was never going to open your dbt docs site. Now your description is right there, attached to the object they are already looking at. Support varies a little by platform, but the major warehouses all handle it. Meta is the other direction. It lets you attach arbitrary key-value pairs to any node — a model, a column, a source, an exposure. Owner. Contains PII. Refresh cadence. Maturity. Those show up in the docs site, which is nice, but the real point is that they also land in manifest dot json. Meta is machine-readable. And that is what makes it worth the effort. Once PII is a flag in your project rather than a convention in somebody's head, you can answer the question which columns in this warehouse contain personal data across four hundred models, in a second, from the manifest — and show your working to whoever is asking, which is usually somebody from legal. The same trick works for ownership, for freshness expectations, for anything a script might want to know. Write it down as meta rather than as a convention, and the project becomes queryable.",
}
