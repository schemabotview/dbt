import type { Scene } from '@graphlearning/flow'

// §02. Two small features that answer the same complaint — "nobody reads the docs site". One pushes
// the description to where people already are; the other makes metadata machine-readable. The meta
// example is deliberately PII, because that is the one that earns budget in a real company.
export const persistMeta: Scene = {
  id: 'persist-meta',
  title: 'Getting the docs to where people already are',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'two lines that travel further than the docs site',
      label: [
        '# dbt_project.yml — push descriptions into the warehouse',
        'models:',
        '  +persist_docs:',
        '    relation: true',
        '    columns: true',
        '',
        '# and metadata anything can read',
        '  - name: dim_customers',
        '    config:',
        '      meta:',
        '        owner: "finance-analytics"',
        '        contains_pii: true',
        '        refresh: "hourly"',
      ].join('\n'),
    },
    {
      id: 'where',
      label: 'Where each one shows up',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-wh', label: 'persist_docs', sub: 'as a comment on the table, in the warehouse', pattern: 'storage', icon: 'database' },
        { id: 'p-meta', label: 'meta', sub: 'in the docs site AND in manifest.json', pattern: 'network', icon: 'tag' },
      ],
    },
    {
      id: 'why',
      label: 'meta is the useful one',
      sub: 'a script can find every PII column',
      pattern: 'user',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'code', target: 'where', label: 'the analyst in a SQL console never opens your docs site' },
    { source: 'where', target: 'why', label: 'one is for humans; the other is for tools' },
  ],
}
