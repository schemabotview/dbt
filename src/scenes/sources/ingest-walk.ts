import type { Scene } from '@graphlearning/flow'

// §09. One table, followed the whole way, with the snapshot branching off the source rather than
// sitting in the line — that branch is the thing to see, because it is what people draw wrongly.
// Four across is the ceiling for a legible LR row, so the snapshot hangs below rather than beside.
export const ingestWalk: Scene = {
  id: 'ingest-walk',
  title: 'orders, from landing to dashboard',
  nodes: [
    {
      id: 'line',
      label: 'The main line',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'w-src', label: 'source: jaffle', sub: 'raw.orders, declared in yml', pattern: 'external', icon: 'cloud' },
        { id: 'w-stg', label: 'stg_orders', sub: 'renamed and cast, a view', pattern: 'service', icon: 'filecode' },
        { id: 'w-fct', label: 'fct_orders', sub: 'a mart, a table', pattern: 'storage', icon: 'table' },
        { id: 'w-bi', label: 'The dashboard', sub: 'what somebody actually asked for', pattern: 'user', icon: 'barchart' },
      ],
      edges: [
        { source: 'w-src', target: 'w-stg' },
        { source: 'w-stg', target: 'w-fct' },
        { source: 'w-fct', target: 'w-bi' },
      ],
    },
    {
      id: 'branch',
      label: 'And the branch that runs on its own clock',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'w-snap', label: 'The snapshot', sub: 'orders_snapshot — off the SOURCE', pattern: 'storage', icon: 'history' },
        { id: 'w-hist', label: 'A history mart', sub: 'built on the snapshot', pattern: 'storage', icon: 'table' },
      ],
      edges: [{ source: 'w-snap', target: 'w-hist' }],
    },
    {
      id: 'order',
      label: 'The order a job runs in',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'o-fresh', label: '1 · freshness', sub: 'is the raw data even current?', pattern: 'network', icon: 'clock' },
        { id: 'o-snap', label: '2 · snapshot', sub: 'capture today before transforming', pattern: 'network', icon: 'history' },
        { id: 'o-build', label: '3 · build', sub: 'seeds, models and their tests', pattern: 'network', icon: 'gears' },
      ],
    },
  ],
  edges: [
    { source: 'line', target: 'branch', label: 'a snapshot always hangs off the raw table' },
    { source: 'branch', target: 'order', label: 'which is why it runs before the models, not with them' },
  ],
}
