import type { Scene } from '@graphlearning/flow'

// §03. The escape hatch. The example is deliberately a business rule rather than a data-shape rule,
// because that is the line: generic tests describe COLUMNS, singular tests describe things that are
// only true of your business. The file location is the whole API.
export const singularTest: Scene = {
  id: 'singular-test',
  title: 'When no generic test fits',
  nodes: [
    {
      id: 'sql',
      kind: 'code',
      filename: 'tests/assert_no_refunds_exceed_order.sql',
      label: [
        '-- A refund can never be larger than the order it belongs to.',
        '-- Any row this returns is a violation.',
        '',
        'select',
        '    o.order_id,',
        '    o.amount   as order_amount,',
        '    r.amount   as refund_amount',
        "from {{ ref('fct_orders') }}  as o",
        "join {{ ref('fct_refunds') }} as r using (order_id)",
        'where r.amount > o.amount',
      ].join('\n'),
    },
    {
      id: 'api',
      label: 'The entire API',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-where', label: 'Put it in tests/', sub: 'a .sql file, that is all', pattern: 'service', icon: 'folder' },
        { id: 'a-rows', label: 'Return the bad rows', sub: 'same rule as every other test', pattern: 'service', icon: 'circleslash' },
        { id: 'a-name', label: 'Name it as a claim', sub: 'assert_ what should be true', pattern: 'service', icon: 'tag' },
      ],
    },
    {
      id: 'line',
      label: 'Where the line falls',
      sub: 'columns are generic; your business is not',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'sql', target: 'api', label: 'it can join, aggregate and window — it is just SQL' },
    { source: 'api', target: 'line', label: 'so when should you reach for one?' },
  ],
}
