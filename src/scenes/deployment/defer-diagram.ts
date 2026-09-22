import type { Scene } from '@graphlearning/flow'

// §05. Defer is a resolution rule, so the scene shows one ref resolving two different ways inside a
// single run — the built model reads the CI copy, the untouched parent reads production. That split
// is the whole feature, and it is invisible in any list of flags.
export const deferDiagram: Scene = {
  id: 'defer-diagram',
  title: 'Build one model. Read the rest from prod.',
  nodes: [
    {
      id: 'graph',
      label: 'You changed fct_orders, and nothing else',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'd-stg', label: 'stg_orders', sub: 'unchanged — not built here', pattern: 'external', icon: 'filecode' },
        { id: 'd-fct', label: 'fct_orders', sub: 'changed — built into the CI schema', pattern: 'service', icon: 'gears' },
        { id: 'd-rpt', label: 'rpt_revenue', sub: 'downstream — built too', pattern: 'service', icon: 'barchart' },
      ],
      edges: [
        { source: 'd-stg', target: 'd-fct' },
        { source: 'd-fct', target: 'd-rpt' },
      ],
    },
    {
      id: 'resolve',
      label: 'The same ref, two answers, in one run',
      kind: 'table',
      pattern: 'service',
      headers: ['The call', 'Built in this run?', 'Resolves to'],
      values: [
        ["ref('stg_orders')", 'no', 'analytics.stg_orders  (prod)'],
        ["ref('fct_orders')", 'yes', 'ci_pr_142.fct_orders'],
      ],
    },
    {
      id: 'buy',
      label: 'What it buys',
      sub: 'a real test without a full rebuild',
      pattern: 'user',
      icon: 'zap',
    },
  ],
  edges: [
    { source: 'graph', target: 'resolve', label: '--defer --state prod-artifacts' },
    { source: 'resolve', target: 'buy', label: 'unbuilt nodes fall back to the deferred environment' },
  ],
}
