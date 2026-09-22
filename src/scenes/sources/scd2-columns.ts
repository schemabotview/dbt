import type { Scene } from '@graphlearning/flow'

// §07. The output, finally. Two rows for one order is the whole idea, so the table shows exactly
// that, with the open row's dbt_valid_to null. The as-of query below is the payoff — it is the
// reason anybody runs a snapshot at all, and it is three lines.
export const scd2Columns: Scene = {
  id: 'scd2-columns',
  title: 'Two rows, one order',
  nodes: [
    {
      id: 'rows',
      label: 'orders_snapshot',
      kind: 'table',
      pattern: 'storage',
      headers: ['order_id', 'status', 'dbt_valid_from', 'dbt_valid_to'],
      values: [
        ['1001', 'pending', '2026-03-01', '2026-03-04'],
        ['1001', 'shipped', '2026-03-04', '(null)'],
        ['1002', 'pending', '2026-03-03', '(null)'],
      ],
    },
    {
      id: 'cols',
      label: 'The columns dbt adds',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'c-from', label: 'valid_from', sub: 'when this version appeared', pattern: 'service', icon: 'clock' },
        { id: 'c-to', label: 'valid_to', sub: 'null means it is current', pattern: 'service', icon: 'clock' },
        { id: 'c-upd', label: 'updated_at', sub: 'the source value it saw', pattern: 'external', icon: 'history' },
        { id: 'c-id', label: 'scd_id', sub: 'a key for this version', pattern: 'external', icon: 'fingerprint' },
      ],
    },
    {
      id: 'asof',
      kind: 'code',
      hug: true,
      filename: 'what did it look like on 2 March?',
      label: [
        'select * from orders_snapshot',
        "where dbt_valid_from <= '2026-03-02'",
        "  and (dbt_valid_to > '2026-03-02' or dbt_valid_to is null)",
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'rows', target: 'cols', label: 'one row per version, and the open one has no end date' },
    { source: 'cols', target: 'asof', label: 'which makes any point in the past a where clause' },
  ],
}
