import type { Scene } from '@graphlearning/flow'

// §09. A contract moves the failure EARLIER, so the scene is drawn as two timelines: without it the
// break reaches the consumer, with it the build refuses. The enforcement table is the honest part —
// most warehouses enforce not_null and quietly ignore the rest, and a project that does not know
// that believes it has guarantees it does not have.
export const contracts: Scene = {
  id: 'contracts',
  title: 'Promising a shape, and having it checked',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'models/marts/_models.yml',
      label: [
        'models:',
        '  - name: fct_orders',
        '    config:',
        '      contract: {enforced: true}',
        '    columns:',
        '      - name: order_id',
        '        data_type: integer',
        '        constraints: [{type: not_null}]',
        '      - name: amount',
        '        data_type: numeric(12,2)',
      ].join('\n'),
    },
    {
      id: 'when',
      label: 'What changes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-off', label: 'Without a contract', sub: 'the column type drifts, and a dashboard breaks', pattern: 'warn', icon: 'bug' },
        { id: 'c-on', label: 'With one', sub: 'the build fails, before anything is replaced', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'real',
      label: 'What is actually enforced',
      kind: 'table',
      pattern: 'service',
      headers: ['Constraint', 'Who enforces it'],
      values: [
        ['data_type', 'dbt, at build time — everywhere'],
        ['not_null', 'the warehouse, on most platforms'],
        ['primary_key, unique', 'declared, and often not enforced'],
        ['check', 'depends entirely on the platform'],
      ],
    },
  ],
  edges: [
    { source: 'yml', target: 'when', label: 'every column must be declared, with its type' },
    { source: 'when', target: 'real', label: 'but be precise about what the guarantee covers' },
  ],
}
