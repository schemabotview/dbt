import type { Scene } from '@graphlearning/flow'

// §06. The fallback, and the scene has to show its sharp edge rather than just its config: a column
// you did NOT list can change and the snapshot records nothing. So the table contrasts what each
// choice of check_cols actually watches, including 'all', which is the tempting wrong answer.
export const checkStrategy: Scene = {
  id: 'check-strategy',
  title: 'No timestamp? Compare the columns themselves.',
  nodes: [
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'when there is no updated_at you trust',
      label: [
        'config:',
        '  unique_key: order_id',
        '  strategy: check',
        '  check_cols: [status, amount]',
      ].join('\n'),
    },
    {
      id: 'watch',
      label: 'What each choice watches',
      kind: 'table',
      pattern: 'service',
      headers: ['check_cols', 'Sees a change in', 'Cost'],
      values: [
        ['[status, amount]', 'those two columns only', 'cheap, and explicit'],
        ["'all'", 'every column', 'slow, and breaks on new columns'],
        ['(a column you forgot)', 'nothing — silently', 'free, and wrong'],
      ],
    },
    {
      id: 'pick',
      label: 'Name the columns',
      sub: 'listing them is a decision about what counts as a change',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'cfg', target: 'watch', label: 'dbt compares the listed columns against the current row' },
    { source: 'watch', target: 'pick', label: "'all' looks safer and behaves worse" },
  ],
}
