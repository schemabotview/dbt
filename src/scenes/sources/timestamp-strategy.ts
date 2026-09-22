import type { Scene } from '@graphlearning/flow'

// §05. The mechanism is a comparison and then two writes, so the scene shows the decision and both
// writes. The trust card exists because the strategy is only as good as the column: a source that
// forgets to bump updated_at produces a snapshot that is silently missing changes.
export const timestampStrategy: Scene = {
  id: 'timestamp-strategy',
  title: 'Compare one column, write two rows',
  nodes: [
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'snapshots/_snapshots.yml',
      label: [
        'snapshots:',
        '  - name: orders_snapshot',
        "    relation: source('jaffle', 'orders')",
        '    config:',
        '      unique_key: order_id',
        '      strategy: timestamp',
        '      updated_at: updated_at',
      ].join('\n'),
    },
    {
      id: 'decide',
      label: 'For each incoming row',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-new', label: 'Key not seen', sub: 'insert it — a new record', pattern: 'service', icon: 'circlecheck' },
        { id: 't-same', label: 'updated_at unchanged', sub: 'do nothing at all', pattern: 'external', icon: 'ban' },
        { id: 't-moved', label: 'updated_at is newer', sub: 'close the old row, insert a new one', pattern: 'storage', icon: 'history' },
      ],
    },
    {
      id: 'trust',
      label: 'Trust the column',
      sub: 'a missed bump leaves a hole, silently',
      pattern: 'warn',
      icon: 'skull',
    },
  ],
  edges: [
    { source: 'cfg', target: 'decide', label: 'one key to match on, one column to compare' },
    { source: 'decide', target: 'trust', label: 'cheap and exactly correct — on one assumption' },
  ],
}
