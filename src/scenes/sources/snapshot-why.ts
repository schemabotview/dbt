import type { Scene } from '@graphlearning/flow'

// §04. The motivating loss, drawn as one row over three days. The middle column is the whole point:
// on Tuesday the value was 'shipped', and on Wednesday there is no way left to know that — the
// warehouse holds one row and it has been overwritten in place. Nothing else in dbt recovers it.
export const snapshotWhy: Scene = {
  id: 'snapshot-why',
  title: 'The value that was there yesterday',
  nodes: [
    {
      id: 'raw',
      label: 'raw.orders — one row, overwritten in place',
      kind: 'table',
      pattern: 'warn',
      headers: ['When you look', 'order_id', 'status'],
      values: [
        ['Monday', '1001', 'pending'],
        ['Tuesday', '1001', 'shipped'],
        ['Wednesday', '1001', 'returned'],
      ],
    },
    {
      id: 'gone',
      label: 'What you cannot answer',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-when', label: 'When did it ship?', sub: 'the timestamp was never stored', pattern: 'warn', icon: 'clock' },
        { id: 'g-long', label: 'How long pending?', sub: 'both ends of that are gone', pattern: 'warn', icon: 'history' },
        { id: 'g-asof', label: 'What did we report?', sub: 'last Tuesday cannot be reproduced', pattern: 'warn', icon: 'barchart' },
      ],
    },
    {
      id: 'fix',
      label: 'A row per change',
      sub: 'but only from the day you start running it',
      pattern: 'service',
      icon: 'history',
    },
  ],
  edges: [
    { source: 'raw', target: 'gone', label: 'the loader updated the row; the old value was not kept anywhere' },
    { source: 'gone', target: 'fix', label: 'no model, no test and no rebuild can recover this' },
  ],
}
