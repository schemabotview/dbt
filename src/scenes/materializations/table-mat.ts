import type { Scene } from '@graphlearning/flow'

// §03. The mirror of §02 — same two moments, opposite answers — so it is drawn with the same shape
// on purpose. `create or replace` is the detail worth showing: the swap is atomic, which is why a
// rebuild does not leave readers staring at a half-built table.
export const tableMat: Scene = {
  id: 'table-mat',
  title: 'Pay once, at build time',
  nodes: [
    {
      id: 'ddl',
      kind: 'code',
      hug: true,
      filename: 'what dbt sends',
      label: [
        'create or replace table analytics.dbt_alice.fct_orders as (',
        '    select ...   -- your model, unchanged',
        ');',
      ].join('\n'),
    },
    {
      id: 'when',
      label: 'Two moments',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-build', label: 'At dbt run', sub: 'the whole query runs and rows are written', pattern: 'service', icon: 'gears' },
        { id: 't-read', label: 'At every query', sub: 'rows are read — no recomputation', pattern: 'storage', icon: 'zap' },
      ],
    },
    {
      id: 'facts',
      label: 'Two things that follow',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-atomic', label: 'The swap is atomic', sub: 'readers never see it half built', pattern: 'user', icon: 'shieldcheck' },
        { id: 'f-stale', label: 'It is as old as the run', sub: 'fresh at 6am, six hours old by noon', pattern: 'warn', icon: 'clock' },
      ],
    },
    {
      id: 'use',
      label: 'The default for a mart',
      sub: 'read constantly, by people who will not wait',
      pattern: 'user',
      icon: 'barchart',
    },
  ],
  edges: [
    { source: 'ddl', target: 'when', label: 'every run recomputes the entire table' },
    { source: 'when', target: 'facts', label: 'the cost is paid once, by the run, not by the reader' },
    { source: 'facts', target: 'use', label: 'which is the trade a mart usually wants' },
  ],
}
