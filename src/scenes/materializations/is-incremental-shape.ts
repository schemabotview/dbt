import type { Scene } from '@graphlearning/flow'

// §06. One file, two behaviours — so the scene forks the way the target scene in the models course
// does, and for the same reason: the learner has to see that the SAME file produced both. The
// filter is deliberately `> (select max(...) from this)` rather than a date literal, because the
// self-reference is the thing that makes the model restartable.
export const isIncrementalShape: Scene = {
  id: 'is-incremental-shape',
  title: 'One file that behaves two ways',
  nodes: [
    {
      id: 'model',
      kind: 'code',
      hug: true,
      filename: 'models/marts/fct_events.sql',
      label: [
        "{{ config(materialized='incremental', unique_key='event_id') }}",
        '',
        'select *',
        "from {{ ref('stg_events') }}",
        '',
        '{% if is_incremental() %}',
        '  where loaded_at > (select max(loaded_at) from {{ this }})',
        '{% endif %}',
      ].join('\n'),
    },
    {
      id: 'first',
      kind: 'code',
      hug: true,
      filename: 'first run — the table does not exist',
      label: ['create table fct_events as (', '  select * from stg_events   -- no filter', ');'].join('\n'),
    },
    {
      id: 'later',
      kind: 'code',
      hug: true,
      filename: 'every run after — the table exists',
      label: [
        'merge into fct_events using (',
        '  select * from stg_events',
        '  where loaded_at > (select max(loaded_at) from fct_events)',
        ') ...',
      ].join('\n'),
    },
    {
      id: 'true',
      label: 'is_incremental() is true when',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'i-mat', label: 'It is incremental', sub: 'the config says so', pattern: 'service', icon: 'filecode' },
        { id: 'i-exists', label: 'The table exists', sub: 'this is not the first build', pattern: 'storage', icon: 'table' },
        { id: 'i-flag', label: 'No --full-refresh', sub: 'that flag forces the first shape', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'model', target: 'first', label: 'the block is skipped' },
    { source: 'model', target: 'later', label: 'the block applies' },
    { source: 'first', target: 'true' },
    { source: 'later', target: 'true' },
  ],
}
