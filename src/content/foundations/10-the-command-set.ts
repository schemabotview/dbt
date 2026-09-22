import type { Section } from '../types'

export const theCommandSet: Section = {
  id: 'the-command-set',
  title: 'The command set, and the road ahead',
  scene: 'the-arc',
  slide: `## Eight commands cover almost everything

- \`dbt debug\` — can I even reach the warehouse? Run this first, always
- \`dbt deps\` — install the packages in \`packages.yml\`
- \`dbt run\` — build models
- \`dbt test\` — run assertions against what exists
- \`dbt build\` — **run + test + seed + snapshot, interleaved in DAG order** — the one you will use in production
- \`dbt seed\` / \`dbt snapshot\` — the two loaders
- \`dbt compile\` — render, build nothing
- \`dbt docs generate\` — the docs site and the lineage graph

### The flag you will type most
\`\`\`
dbt build --select stg_orders+
\`\`\`
\`--select\` narrows a command to part of the graph. \`+\` means "and everything downstream".

### Where this goes next
Three courses to build things · three to make them trustworthy · three to run them with other people.`,
  narration:
    "Let's close the course with the commands, and then the map. You will spend most of your life in about eight of them. dbt debug is the one to run first and to reach for whenever something is strange — it checks that your profile is valid and that dbt can actually reach the warehouse, and it answers the question is this a connection problem before you start debugging SQL. dbt deps installs the packages your project depends on. dbt run builds your models. dbt test runs your assertions against whatever is already built. dbt build is the one to internalise: it runs your models, their tests, your seeds and your snapshots, interleaved in dependency order — so a model is tested immediately after it is built, and a broken model stops its children from being built on top of bad data. In production, dbt build is almost always what you want rather than run followed by test. Then dbt seed and dbt snapshot, the two loaders, both of which get their own attention later. dbt compile, which we just met. And dbt docs generate, which produces the documentation site and the lineage graph. One flag matters more than all the others, and that is select. It narrows any command to part of the graph — one model, a folder, a tag, or a model plus everything downstream of it, which is what the plus sign is doing in the example. You will type it constantly, and there is a whole section on it later. As for where this goes: three courses to build things — models, then materializations. Three to make them trustworthy — sources, tests, and Jinja. And three to run them alongside other people — deployment, governance, and the semantic layer. You now know what dbt is. From here, we build.",
}
