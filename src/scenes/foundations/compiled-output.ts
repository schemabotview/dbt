import type { Scene } from '@graphlearning/flow'

// §09. The habit, not the feature. The pair of cards is the same model before and after compile —
// and the warn card is the sentence that saves the most time in a learner's first month: the error
// message points at a line number in the COMPILED file, which is not the file you edited.
export const compiledOutput: Scene = {
  id: 'compiled-output',
  title: 'Read what it actually sent',
  nodes: [
    {
      id: 'wrote',
      kind: 'code',
      hug: true,
      filename: 'models/staging/stg_orders.sql (what you wrote)',
      label: [
        '{{ config(materialized="view") }}',
        '',
        'select',
        '    id as order_id,',
        '    user_id as customer_id,',
        '    status',
        "from {{ source('raw', 'orders') }}",
        "where status != 'deleted'",
      ].join('\n'),
    },
    {
      id: 'sent',
      kind: 'code',
      hug: true,
      filename: 'target/compiled/.../stg_orders.sql (what ran)',
      label: [
        'select',
        '    id as order_id,',
        '    user_id as customer_id,',
        '    status',
        'from raw.public.orders',
        "where status != 'deleted'",
      ].join('\n'),
    },
    {
      id: 'how',
      label: 'How to see it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-compile', label: 'dbt compile', sub: 'builds nothing, writes target/', pattern: 'service', icon: 'braces' },
        { id: 'h-run', label: 'target/run/', sub: 'the full DDL, wrapper and all', pattern: 'service', icon: 'file' },
        { id: 'h-log', label: 'logs/dbt.log', sub: 'the statement, as sent, with timing', pattern: 'service', icon: 'scroll' },
      ],
    },
    {
      id: 'trap',
      label: 'The line number lies',
      sub: 'count lines in target/, not yours',
      pattern: 'warn',
      icon: 'bug',
    },
  ],
  edges: [
    { source: 'wrote', target: 'sent', label: 'the config became a wrapper; the source became a real name' },
    { source: 'sent', target: 'how', label: 'this file is on your disk after every compile or run' },
    { source: 'how', target: 'trap', label: 'and this is why you will need it sooner than you think' },
  ],
}
