import type { Scene } from '@graphlearning/flow'

// §09. The mental shift is one run becoming MANY queries, so the scene shows the fan: one model,
// four batches, four independent statements. The reprocessing card is the payoff — a bad day is a
// re-run of one batch, not a full refresh of three years.
export const microbatchSlices: Scene = {
  id: 'microbatch-slices',
  title: 'A model as a series of time slices',
  nodes: [
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'models/marts/fct_events.sql',
      label: [
        '{{ config(',
        "    materialized='incremental',",
        "    incremental_strategy='microbatch',",
        "    event_time='occurred_at',",
        "    batch_size='day',",
        '    lookback=2,',
        "    begin='2024-01-01'",
        ') }}',
        '',
        "select * from {{ ref('stg_events') }}   -- no is_incremental block",
      ].join('\n'),
    },
    {
      id: 'batches',
      label: 'One run, one query per batch',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'b-1', label: 'Mon', sub: 'its own statement', pattern: 'service', icon: 'calendar' },
        { id: 'b-2', label: 'Tue', sub: 'its own statement', pattern: 'service', icon: 'calendar' },
        { id: 'b-3', label: 'Wed', sub: 'failed — the rest still ran', pattern: 'warn', icon: 'bug' },
        { id: 'b-4', label: 'Thu', sub: 'its own statement', pattern: 'service', icon: 'calendar' },
      ],
    },
    {
      id: 'wins',
      label: 'What the shape buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-filter', label: 'dbt writes the filter', sub: 'no hand-rolled max() subquery', pattern: 'user', icon: 'braces' },
        { id: 'm-retry', label: 'Retry one batch', sub: 'not the whole model', pattern: 'user', icon: 'repeat' },
        { id: 'm-back', label: 'Reprocess a range', sub: 'a bad Tuesday, fixed on its own', pattern: 'user', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'cfg', target: 'batches', label: 'event_time and batch_size are what split the run up' },
    { source: 'batches', target: 'wins', label: 'each batch succeeds or fails by itself' },
  ],
}
