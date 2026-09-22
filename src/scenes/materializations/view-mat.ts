import type { Scene } from '@graphlearning/flow'

// §02. A view moves the cost from build time to read time, so the scene is drawn as two clocks:
// what happens at `dbt run` and what happens at every SELECT afterwards. The warn card is the
// failure mode people meet in practice — a stack of views on views, each re-running the one below.
export const viewMat: Scene = {
  id: 'view-mat',
  title: 'Cheap to build, paid for on every read',
  nodes: [
    {
      id: 'ddl',
      kind: 'code',
      hug: true,
      filename: 'what dbt sends',
      label: [
        'create or replace view analytics.dbt_alice.stg_orders as (',
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
        { id: 'v-build', label: 'At dbt run', sub: 'a definition is stored — no data moves', pattern: 'service', icon: 'zap' },
        { id: 'v-read', label: 'At every query', sub: 'your SQL runs again, in full', pattern: 'storage', icon: 'repeat' },
      ],
    },
    {
      id: 'good',
      label: 'Right when',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-stg', label: 'Staging models', sub: 'thin renames over one table', pattern: 'user', icon: 'filecode' },
        { id: 'g-fresh', label: 'Freshness matters', sub: 'a view is never stale', pattern: 'user', icon: 'clock' },
        { id: 'g-rare', label: 'Rarely queried', sub: 'nobody pays the read cost', pattern: 'user', icon: 'ban' },
      ],
    },
    {
      id: 'trap',
      label: 'Views on views',
      sub: 'each read runs the whole stack',
      pattern: 'warn',
      icon: 'layers',
    },
  ],
  edges: [
    { source: 'ddl', target: 'when', label: 'no rows are written, ever' },
    { source: 'when', target: 'good', label: 'so the cost lands on whoever queries it' },
    { source: 'good', target: 'trap', label: 'and the one way this goes wrong at scale' },
  ],
}
