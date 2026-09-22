import type { Section } from '../types'

export const docs: Section = {
  id: 'docs',
  title: 'Documentation that cannot go stale',
  scene: 'docs-site',
  slide: `## Generated, not written

Descriptions live in yml, **beside the model they describe.** \`dbt docs generate\` parses the project, queries the warehouse for columns and types, and produces a site.

### What the site actually gives people
- **The lineage graph** — clickable, and true by construction
- **Columns and types** — read from the warehouse, not from your yml
- **The tests** — which is the honest answer to "can I trust this?"
- **The compiled SQL** — what actually ran

### Why this beats a wiki
A wiki describes the warehouse on the day somebody wrote it. This is **derived from the project**, so it cannot drift.

### Doc blocks
A definition written fifteen times goes stale fourteen times. Put it in a \`.md\` file as a \`{% docs %}\` block and reference it by name from every model that needs it.`,
  narration:
    "Documentation in dbt is generated rather than written, and that distinction is the whole value. You write descriptions in yml, right beside the model they describe — same file as the tests, same pull request as the change. Then dbt docs generate parses the project, queries the warehouse for the actual columns and types, and produces a browsable site. What does that site give people? Four things. The lineage graph, clickable, showing every model and where it came from — and true by construction, because it is derived from your ref calls. The columns and their types, read from the warehouse itself rather than from what somebody typed in yml, so it reflects reality. The tests attached to each model, which is genuinely the honest answer when somebody asks can I trust this number. And the compiled SQL, so a curious analyst can see exactly what ran without asking you. Now, why is this better than a wiki page? Because a wiki describes what the warehouse looked like on the day somebody wrote it, and it starts decaying immediately. This is derived from the project, in the same commit as the code, reviewed in the same pull request. It cannot drift, in the same way and for the same reason that the lineage graph cannot drift. One technique that makes a real difference. If you find yourself writing the same definition of, say, an active customer on fifteen different models, it will go stale on fourteen of them. Put it in a markdown file as a docs block, and reference it by name from every model that needs it. One definition, fifteen places, one edit when the business changes its mind.",
}
