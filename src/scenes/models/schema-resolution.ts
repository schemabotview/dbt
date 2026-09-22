import type { Scene } from '@graphlearning/flow'

// §10. The surprise is the CONCATENATION, so the table puts the two inputs and the answer in one
// row and lets the reader see the rule rather than be told it. The last row is the one that bites:
// two developers, same custom schema, still isolated — which is exactly why the default behaves
// this way and why overriding it is a decision, not a tidy-up.
export const schemaResolution: Scene = {
  id: 'schema-resolution',
  title: 'Where a model actually lands',
  nodes: [
    {
      id: 'calc',
      label: 'target schema + custom schema = the name dbt builds',
      kind: 'table',
      pattern: 'service',
      headers: ['Target schema', 'Model config', 'Built as'],
      values: [
        ['dbt_alice', '(none)', 'dbt_alice'],
        ['dbt_alice', 'schema: marts', 'dbt_alice_marts'],
        ['analytics', 'schema: marts', 'analytics_marts'],
        ['dbt_bob', 'schema: marts', 'dbt_bob_marts'],
      ],
    },
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'dbt_project.yml',
      label: [
        'models:',
        '  jaffle_shop:',
        '    marts:',
        '      +schema: marts   # a SUFFIX, not the schema name',
      ].join('\n'),
    },
    {
      id: 'note',
      label: 'A suffix, by default',
      sub: 'the rule is a macro, and it can be replaced',
      pattern: 'user',
      icon: 'braces',
    },
  ],
  edges: [
    { source: 'calc', target: 'cfg', label: 'the config that produced the middle two rows' },
    { source: 'cfg', target: 'note', label: 'surprising once, and then never again' },
  ],
}
