import type { Section } from '../types'

export const declaringSources: Section = {
  id: 'declaring-sources',
  title: 'The source declaration, in full',
  scene: 'source-yml',
  slide: `## One yml file, and what each key is for

You have met \`source()\`. This is the file behind it, and three of its keys do more than they look like.

### \`identifier\`
The **real** table name in the warehouse. The \`name\` is what your project calls it. Keep the ugly, versioned, upper-case reality here and your models never see it — a rename becomes one line.

### Config set on the source
\`freshness\`, \`database\`, \`schema\`, \`tags\` and \`meta\` set at source level are **inherited by every table under it**. A table can override, or opt out with \`null\`.

### Tests on raw data
Sources take tests just like models do. A \`not_null\` on a raw primary key fails **before** your models run on top of it — which is much better than a mart quietly going wrong.

### Where the file goes
Next to the staging models that read it, named \`_sources.yml\`. One per source system.`,
  narration:
    "You already know what source does — it reaches a table you did not build. This section is about the file behind it, because three of its keys do a lot more work than they look like. Start with identifier. The name key is what your project calls this table: something short and clean, like orders. Identifier is the real name in the warehouse — which, in the real world, is frequently something like ORDERS underscore V2, in capitals, in a schema named after a project that was cancelled. Put that reality here, once, and every model in your project just says orders. When the loading team renames it to V3, you change one line, and nothing else in the project knows anything happened. Second, config set at source level is inherited by every table under it. Freshness thresholds, the database, the schema, tags, ownership metadata — set them once on the source, and all twenty tables pick them up. An individual table can override any of them, or opt out entirely by setting it to null, which is how you handle the one table that legitimately updates once a month. Third, and this one is underused: sources take tests, exactly like models do. You can assert that the raw primary key is unique and not null. And because sources sit at the very top of the graph, those tests fail before a single model has been built on top of the problem. Catching bad data at the front door is dramatically cheaper than tracing a wrong number back down through four layers of models. Conventionally the file lives next to the staging models that read it, named underscore sources dot yml, one per source system.",
}
