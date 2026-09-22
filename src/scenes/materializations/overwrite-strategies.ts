import type { Scene } from '@graphlearning/flow'

// §08. Both strategies here are "replace a REGION, not a row", so the scene draws the region: a
// table split into partitions with one of them swapped out. Drawn as a group of days rather than
// abstract blocks, because the region is almost always a day in practice.
export const overwriteStrategies: Scene = {
  id: 'overwrite-strategies',
  title: 'Replacing a slice, not a row',
  nodes: [
    {
      id: 'days',
      label: 'The table, by day — only one of these changed',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'd-1', label: 'Mon', sub: 'untouched', pattern: 'storage', icon: 'calendar' },
        { id: 'd-2', label: 'Tue', sub: 'untouched', pattern: 'storage', icon: 'calendar' },
        { id: 'd-3', label: 'Wed', sub: 'untouched', pattern: 'storage', icon: 'calendar' },
        { id: 'd-4', label: 'Thu', sub: 'deleted, then rewritten whole', pattern: 'warn', icon: 'repeat' },
      ],
    },
    {
      id: 'how',
      label: 'Two ways to say it',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'delete+insert', 'insert_overwrite'],
      values: [
        ['Deletes by', 'unique_key match', 'partition'],
        ['Then', 'inserts the new rows', 'writes the new partitions'],
        ['Needs partitioning', 'no', 'yes'],
        ['Common on', 'Snowflake, Postgres', 'BigQuery, Spark'],
      ],
    },
    {
      id: 'why',
      label: 'Why a whole day',
      sub: 'late rows and corrections land in it',
      pattern: 'user',
      icon: 'history',
    },
  ],
  edges: [
    { source: 'days', target: 'how', label: 'the unit of replacement is a slice you choose' },
    { source: 'how', target: 'why', label: 'and the reason you would want that over a row-by-row merge' },
  ],
}
