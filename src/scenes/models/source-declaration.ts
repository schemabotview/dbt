import type { Scene } from '@graphlearning/flow'

// §04. Sources are yml, not SQL, so the scene leads with the yml and lets the call trail it. The
// closing band is deliberately about what the DECLARATION buys — people read `source()` as a
// verbose way of typing a table name until they see that list.
export const sourceDeclaration: Scene = {
  id: 'source-declaration',
  title: 'Where the graph starts',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'models/staging/_sources.yml',
      label: [
        'version: 2',
        '',
        'sources:',
        '  - name: raw                  # the name you use in source()',
        '    database: raw_landing      # where it really lives',
        '    schema: public',
        '    tables:',
        '      - name: orders',
        '      - name: customers',
        '      - name: payments',
      ].join('\n'),
    },
    {
      id: 'call',
      kind: 'code',
      hug: true,
      filename: 'models/staging/stg_orders.sql',
      label: ["select * from {{ source('raw', 'orders') }}"].join('\n'),
    },
    {
      id: 'buys',
      label: 'What declaring it buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-lineage', label: 'Lineage starts here', sub: 'the graph reaches past your own models', pattern: 'network', icon: 'gitbranch' },
        { id: 's-rename', label: 'One place to change', sub: 'the loader moves, you edit one file', pattern: 'service', icon: 'pencil' },
        { id: 's-fresh', label: 'Freshness and tests', sub: 'raw data gets checked too', pattern: 'storage', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'yml', target: 'call', label: 'two arguments: the source name, then the table name' },
    { source: 'call', target: 'buys', label: 'and this is why it is worth the extra file' },
  ],
}
