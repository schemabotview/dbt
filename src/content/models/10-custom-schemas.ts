import type { Section } from '../types'

export const customSchemas: Section = {
  id: 'custom-schemas',
  title: 'Where a model actually lands',
  scene: 'schema-resolution',
  slide: `## \`schema:\` is a suffix, not a schema

Set \`+schema: marts\` on a folder and dbt does **not** build into a schema called \`marts\`. It appends:

\`\`\`
target schema + _ + custom schema
dbt_alice   + _ + marts  =  dbt_alice_marts
analytics   + _ + marts  =  analytics_marts
\`\`\`

### Why it works that way
Because isolation has to survive it. If \`schema: marts\` meant *the* schema called \`marts\`, every developer's run would land in the same place and overwrite each other's work. The suffix keeps ten people separate while still grouping their models.

### It is a macro, and you can replace it
The rule lives in \`generate_schema_name\`, which dbt ships and a project can override — a common one is "concatenate in dev, use the bare name in prod". Overriding dbt's own macros gets its own treatment later.

### Until then
Take the default. Surprising once, then never again.`,
  narration:
    "Last one in this course, and it is the piece of dbt that surprises absolutely everybody exactly once. You want your mart models to sit in their own schema, so you set schema colon marts on the marts folder. You run it. And the models land somewhere called dbt underscore alice underscore marts. That is not a bug. The schema config is a suffix, not a schema name. dbt takes the schema from your target — your sandbox in development, the analytics schema in production — and appends the custom one to it. Dbt_alice plus marts gives dbt_alice_marts. In production, analytics plus marts gives analytics_marts. Look at the table and you can read the rule off the rows directly. Now, why on earth would it work that way? Because isolation has to survive it. If schema colon marts meant literally the schema called marts, then every developer on the team would build their mart models into the same schema and overwrite each other's work constantly — and the whole sandbox-per-person arrangement we set up earlier would quietly stop protecting anything. The suffix keeps ten people separate while still letting each of them group their own models sensibly. Here is the useful part: this rule is not hardcoded in dbt. It lives in a macro called generate_schema_name, which dbt ships and your project can override. A very common override is concatenate in development, but use the bare custom schema name in production, so production ends up with clean schema names while developers stay isolated. Overriding dbt's own macros is a real technique with real trade-offs, and it gets proper treatment when we come to macros. Until then, take the default. It is surprising once, and then never again.",
}
