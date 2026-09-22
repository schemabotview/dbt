import type { Section } from '../types'

export const namingAndFolders: Section = {
  id: 'naming-and-folders',
  title: 'Naming and folders',
  scene: 'naming',
  slide: `## Names are the documentation people actually read

A model name is **globally unique** across the project, so it has to carry its own context. The prefix does that work.

- \`stg_\` — one source table, tidied
- \`int_\` — a step, not a deliverable; name it as a verb phrase
- \`fct_\` — a fact: one row per **event**
- \`dim_\` — a dimension: one row per **thing**

### Staging names the system too
\`stg_stripe__payments\` — source, double underscore, entity. Two systems can both have a \`payments\` table; only one can have that name.

### Folders group, prefixes describe
Folder by source in staging, by **business area** in marts (\`marts/finance/\`). The folder also sets config, so the two decisions are the same decision.

### One warning
Renaming a model builds the new name and **leaves the old object behind**. Drop it yourself, or it sits there answering queries.`,
  narration:
    "Naming feels like bikeshedding until a project has eighty models in it, and then it is the difference between a warehouse a new person can read and one they cannot. Start with the constraint that drives everything: a model name is globally unique across the whole project. You cannot have two models called orders in different folders. So the name has to carry its own context, and that is what the prefixes do. Stg underscore means one source table, tidied. Int underscore means a step rather than a deliverable, and these read best as verb phrases — int orders joined to payments — because they describe an operation, not a thing. Fct underscore is a fact table: one row per event, something that happened. Dim underscore is a dimension: one row per thing that exists. Staging goes one step further and names the system as well: stg, stripe, double underscore, payments. That double underscore is a real convention, not decoration, and the reason is simple — two different systems can both have a payments table, and both will end up in your warehouse. Folders and prefixes do different jobs. Folders group; prefixes describe. In staging, group by source system, because that is the unit that changes together. In marts, group by business area — finance, marketing — because that is who owns the models. And remember that a folder also sets configuration, so where a model lives and how it is built are genuinely the same decision. One warning to end on, and it catches people the first time. Renaming a model builds the new name, and leaves the old object sitting in the warehouse. dbt does not drop it — it has no idea the two are related. So that stale table stays there, still queryable, slowly drifting away from the truth. Drop it yourself, as part of the rename.",
}
