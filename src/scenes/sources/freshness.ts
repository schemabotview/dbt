import type { Scene } from '@graphlearning/flow'

// §02. Freshness is a threshold, so the scene draws the axis: how old is the newest row, and which
// band does that land in. Three bands left to right, then what you do with the answer. The last
// card is the point of the whole section — freshness is worth having only if something acts on it.
export const freshness: Scene = {
  id: 'freshness',
  title: 'How old is the newest row?',
  nodes: [
    {
      id: 'bands',
      label: 'max(_synced_at) against now',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'fr-ok', label: 'Under 6 hours', sub: 'pass — nothing is printed', pattern: 'storage', icon: 'circlecheck' },
        { id: 'fr-warn', label: '6 to 24 hours', sub: 'warn — loud, but the run continues', pattern: 'warn', icon: 'bell' },
        { id: 'fr-err', label: 'Over 24 hours', sub: 'error — this job should stop', pattern: 'warn', icon: 'skull' },
      ],
      edges: [
        { source: 'fr-ok', target: 'fr-warn' },
        { source: 'fr-warn', target: 'fr-err' },
      ],
    },
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'the config, and the command',
      label: [
        'freshness:',
        '  warn_after:  {count: 6,  period: hour}',
        '  error_after: {count: 24, period: hour}',
        'loaded_at_field: _synced_at',
        '',
        '$ dbt source freshness',
      ].join('\n'),
    },
    {
      id: 'use',
      label: 'Run it first',
      sub: 'stale raw data just republishes yesterday',
      pattern: 'user',
      icon: 'power',
    },
  ],
  edges: [
    { source: 'bands', target: 'cfg', label: 'two thresholds, and which column carries the load time' },
    { source: 'cfg', target: 'use', label: 'it is a separate command, so something has to run it' },
  ],
}
