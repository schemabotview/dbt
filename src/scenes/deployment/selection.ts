import type { Scene } from '@graphlearning/flow'

// §03. The flag people type most, so the scene is a cheat sheet rather than an argument. The
// operators are shown against ONE named model so the reader can hold the graph in their head; the
// set operators row is last because it is the part that is genuinely non-obvious (space = union,
// comma = intersection, which is backwards from most tools).
export const selection: Scene = {
  id: 'selection',
  title: 'Saying which part of the graph',
  nodes: [
    {
      id: 'ops',
      label: 'Graph operators, around fct_orders',
      kind: 'table',
      pattern: 'service',
      headers: ['You type', 'You get'],
      values: [
        ['fct_orders', 'that model, alone'],
        ['fct_orders+', 'it and everything downstream'],
        ['+fct_orders', 'it and everything upstream'],
        ['+fct_orders+', 'the whole line through it'],
        ['2+fct_orders', 'two generations upstream only'],
        ['@fct_orders', 'it, its children, and their parents'],
      ],
    },
    {
      id: 'methods',
      kind: 'code',
      hug: true,
      filename: 'and you can select by something other than a name',
      label: [
        'dbt build --select tag:nightly',
        'dbt build --select path:models/marts',
        'dbt build --select config.materialized:incremental',
        'dbt test  --select test_type:unit',
        '',
        'dbt build --select tag:finance tag:marketing   # union (space)',
        'dbt build --select tag:finance,tag:nightly     # intersection (comma)',
      ].join('\n'),
    },
    {
      id: 'excl',
      label: 'And --exclude too',
      sub: 'the same vocabulary, inverted',
      pattern: 'user',
      icon: 'funnel',
    },
  ],
  edges: [
    { source: 'ops', target: 'methods', label: 'the plus sign is a direction, and a number limits how far' },
    { source: 'methods', target: 'excl', label: 'note the comma: intersection, not union' },
  ],
}
