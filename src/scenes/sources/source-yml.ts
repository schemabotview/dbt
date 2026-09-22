import type { Scene } from '@graphlearning/flow'

// §01. The models course introduced source() as a function; this is the FILE. So the scene is the
// yml in full, and the band under it names the three keys people do not discover on their own —
// identifier, the inherited block, and tests on raw data. `identifier` earns its place because it
// is the one that makes a rename survivable.
export const sourceYml: Scene = {
  id: 'source-yml',
  title: 'The whole declaration, key by key',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      filename: 'models/staging/_sources.yml',
      label: [
        'sources:',
        '  - name: jaffle              # what source() calls it',
        '    database: raw_landing     # where it really lives',
        '    schema: public',
        '    description: "Loaded hourly by Fivetran."',
        '',
        '    freshness:                # inherited by every table below',
        '      warn_after: {count: 6, period: hour}',
        '    loaded_at_field: _synced_at',
        '',
        '    tables:',
        '      - name: orders',
        '        identifier: ORDERS_V2   # the real table name',
        '        columns:',
        '          - name: id',
        '            data_tests: [unique, not_null]',
        '',
        '      - name: customers',
        '        freshness: null         # this one opts out',
      ].join('\n'),
    },
    {
      id: 'keys',
      label: 'The three keys people miss',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-id', label: 'identifier', sub: 'the ugly real name, hidden here', pattern: 'service', icon: 'tag' },
        { id: 'k-inherit', label: 'Source-level config', sub: 'set once, every table inherits', pattern: 'network', icon: 'layers' },
        { id: 'k-tests', label: 'Tests on raw data', sub: 'catch it before a model runs', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'rename',
      label: 'A rename is one line',
      sub: 'ORDERS_V2 becomes ORDERS_V3 and no model changes',
      pattern: 'user',
      icon: 'pencil',
    },
  ],
  edges: [
    { source: 'yml', target: 'keys', label: 'the name you use in source() and the name in the warehouse are separate' },
    { source: 'keys', target: 'rename', label: 'which is what the whole file buys you' },
  ],
}
