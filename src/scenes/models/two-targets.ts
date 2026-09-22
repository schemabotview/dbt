import type { Scene } from '@graphlearning/flow'

// §06. A fan-out from one source file to two compiled statements. The earlier course showed WHERE
// the compiled SQL lives; this shows that its content DEPENDS ON THE TARGET, which is the actual
// payoff of ref. Both compiled cards hug, so the scene's width is set by the longest line rather
// than by the standalone-card floor.
export const twoTargets: Scene = {
  id: 'two-targets',
  title: 'One file. Two targets. Two different statements.',
  nodes: [
    {
      id: 'src',
      kind: 'code',
      hug: true,
      filename: 'models/marts/fct_orders.sql — committed once',
      label: ["select * from {{ ref('stg_orders') }}"].join('\n'),
    },
    {
      id: 'dev',
      kind: 'code',
      hug: true,
      filename: 'compiled with --target dev',
      label: ['select * from analytics_dev.dbt_alice.stg_orders'].join('\n'),
    },
    {
      id: 'prod',
      kind: 'code',
      hug: true,
      filename: 'compiled with --target prod',
      label: ['select * from analytics.analytics.stg_orders'].join('\n'),
    },
    {
      id: 'why',
      label: 'Why this matters',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-sandbox', label: 'Dev stays in dev', sub: 'a dev run cannot read prod by accident', pattern: 'user', icon: 'shieldcheck' },
        { id: 'w-copy', label: 'No branching code', sub: 'no if-dev-then in any model', pattern: 'user', icon: 'gitbranch' },
        { id: 'w-ci', label: 'CI gets its own', sub: 'a throwaway schema per pull request', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'src', target: 'dev', label: 'ref resolves against the target' },
    { source: 'src', target: 'prod', label: 'same call, different answer' },
    { source: 'dev', target: 'why' },
    { source: 'prod', target: 'why' },
  ],
}
