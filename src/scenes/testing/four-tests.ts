import type { Scene } from '@graphlearning/flow'

// §02. The four built-ins as a board, because the useful question is not what each one is called
// but what each actually catches — and `relationships` is the one people skip, which is exactly
// the one that catches a broken join before it silently drops rows in a mart.
export const fourTests: Scene = {
  id: 'four-tests',
  title: 'Four tests, and what each really catches',
  nodes: [
    {
      id: 'board',
      label: 'The built-ins',
      kind: 'table',
      pattern: 'service',
      headers: ['Test', 'Fails when', 'The bug it catches'],
      values: [
        ['unique', 'a value appears twice', 'a join that fans out and doubles revenue'],
        ['not_null', 'a value is missing', 'rows dropped by an inner join later'],
        ['accepted_values', 'a value is off the list', 'a new status nobody told you about'],
        ['relationships', 'a key has no parent', 'orphans — the classic silent row loss'],
      ],
    },
    {
      id: 'yml',
      kind: 'code',
      filename: 'models/staging/_models.yml',
      label: [
        'models:',
        '  - name: stg_orders',
        '    columns:',
        '      - name: order_id',
        '        data_tests: [unique, not_null]',
        '',
        '      - name: status',
        '        data_tests:',
        '          - accepted_values:',
        '              values: [pending, shipped, returned]',
        '',
        '      - name: customer_id',
        '        data_tests:',
        '          - relationships:',
        "              to: ref('stg_customers')",
        '              field: customer_id',
      ].join('\n'),
    },
    {
      id: 'start',
      label: 'The starting set',
      sub: 'unique + not_null on every key, day one',
      pattern: 'user',
      icon: 'shieldcheck',
    },
  ],
  edges: [
    { source: 'board', target: 'yml', label: 'two are bare names; two take arguments' },
    { source: 'yml', target: 'start', label: 'and if you only ever adopt one habit from this course' },
  ],
}
