import type { Scene } from '@graphlearning/flow'

// §07. The strategy IS the answer to "what if a row I already loaded changed?", so the table is
// organised around that question rather than around the strategy names. The closing card is the
// failure people actually hit: merge with a unique_key that is not unique silently duplicates or
// picks a row at random, depending on the warehouse.
export const appendVsMerge: Scene = {
  id: 'append-vs-merge',
  title: 'What happens to a row you have already loaded?',
  nodes: [
    {
      id: 'cmp',
      label: 'The two strategies you will use most',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'append', 'merge'],
      values: [
        ['Needs unique_key', 'no', 'yes'],
        ['A changed row', 'lands twice', 'updates in place'],
        ['A re-run', 'duplicates rows', 'is safe to repeat'],
        ['Speed', 'fastest there is', 'slower — it matches rows'],
        ['Suits', 'immutable events', 'anything that can change'],
      ],
    },
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'choosing one',
      label: [
        '{{ config(',
        "    materialized='incremental',",
        "    incremental_strategy='merge',",
        "    unique_key='order_id'",
        ') }}',
      ].join('\n'),
    },
    {
      id: 'idem',
      label: 'merge is idempotent',
      sub: 'run it twice on the same rows and the table is unchanged',
      pattern: 'user',
      icon: 'repeat',
    },
    {
      id: 'trap',
      label: 'The one condition',
      sub: 'nobody checks that the key is unique',
      pattern: 'warn',
      icon: 'skull',
    },
  ],
  edges: [
    { source: 'cmp', target: 'cfg', label: 'the strategy and its key are both config, not SQL' },
    { source: 'cfg', target: 'idem', label: 'and this property is why merge is the usual default' },
    { source: 'idem', target: 'trap', label: 'on one condition, which nothing checks for you' },
  ],
}
