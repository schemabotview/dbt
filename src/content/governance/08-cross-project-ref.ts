import type { Section } from '../types'

export const crossProjectRef: Section = {
  id: 'cross-project-ref',
  title: 'Cross-project ref, and dbt Mesh',
  scene: 'cross-project',
  slide: `## A ref with two arguments

Declare the upstream project in \`dependencies.yml\`, then reference its models by project **and** name.

\`\`\`sql
{{ ref('jaffle_finance', 'fct_orders') }}
\`\`\`

The consumer **reads the producer's output** — it does not clone the repo, rebuild those models, or change them.

### What it requires
- **\`access: public\`** — protected models stay home
- **A contract**, so the shape the consumer relies on is enforced
- **The dbt platform** — Core cannot resolve a reference into a project it has never seen

### That last one is a real constraint
Everything else here runs on the CLI; this does not. Core-only alternatives: one project with groups and access, or publish through the warehouse and treat those tables as **sources**.`,
  narration:
    "If you have decided to split, here is how the halves talk to each other. In the downstream project you declare a dependency on the upstream one, in a file called dependencies dot yml. Then you reference its models with two arguments instead of one: the project name, and the model name. That is the entire API. What is happening underneath is worth being precise about. The consumer reads the producer's output — the actual table the producer built, in the producer's warehouse. It does not clone the producer's repository. It does not rebuild those models. It cannot change them. The dependency is on a published result, not on source code, which is exactly the property that lets two teams move at different speeds. Three things have to be true for that reference to work. The model has to be marked public, because protected models stay inside their own project. It should have a contract, so the shape the consumer is relying on is actually enforced rather than merely intended. And — this is the honest bit — it requires the dbt platform. dbt Core on its own has no way to resolve a reference into a project it has never seen; there is no registry, no metadata service, nothing to ask. That constraint is worth stating plainly, because everything else in this concept runs on the command line with nothing but an adapter. This does not. So if you are Core-only and you need this, the honest alternatives are two. Stay as one project and use groups and access, which genuinely covers most cases. Or publish between projects through the warehouse: the producer builds its tables, and the consumer declares them as sources. You lose the cross-project lineage, and you keep everything else.",
}
