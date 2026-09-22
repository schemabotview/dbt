import type { Scene } from '@graphlearning/flow'

// §01. The whole mental model in one card: a test is a SELECT, and the rows it returns are the
// failures. Showing the COMPILED query rather than the yml is deliberate — people write `not_null`
// for a year without ever seeing that it is four lines of SQL, and the mystery is what makes
// testing feel like a separate system instead of more of the same.
export const testSelect: Scene = {
  id: 'test-select',
  title: 'A test is a query that should return nothing',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'you write this',
      label: [
        'models:',
        '  - name: stg_orders',
        '    columns:',
        '      - name: order_id',
        '        data_tests: [not_null]',
      ].join('\n'),
    },
    {
      id: 'sql',
      kind: 'code',
      hug: true,
      filename: 'dbt compiles and runs this',
      label: [
        'select order_id',
        'from analytics.dbt_alice.stg_orders',
        'where order_id is null',
      ].join('\n'),
    },
    {
      id: 'rule',
      label: 'The rule, in both directions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-pass', label: '0 rows returned', sub: 'PASS — there is nothing wrong', pattern: 'storage', icon: 'circlecheck' },
        { id: 'r-fail', label: 'n rows returned', sub: 'FAIL — and those rows ARE the problem', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'why',
      label: 'Why failures help',
      sub: 'it hands you the exact rows',
      pattern: 'user',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'yml', target: 'sql', label: 'the name in yml resolves to a macro that returns SQL' },
    { source: 'sql', target: 'rule', label: 'dbt runs it and counts the rows' },
    { source: 'rule', target: 'why', label: 'no separate assertion language, no separate runtime' },
  ],
}
