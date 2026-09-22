import type { Scene } from '@graphlearning/flow'

// §08. The distinction is the whole section, so the scene leads with the example and closes with
// the contrast table. The chosen logic — a CASE that misclassifies a zero — is one no data test can
// catch, because every row is present, unique and not null. It is simply the wrong answer.
export const unitTest: Scene = {
  id: 'unit-test',
  title: 'Testing the logic, not the data',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      filename: 'models/marts/_unit_tests.yml',
      label: [
        'unit_tests:',
        '  - name: refunds_are_negative_amounts',
        '    model: fct_order_totals',
        '    given:',
        "      - input: ref('stg_payments')",
        '        rows:',
        '          - {order_id: 1, kind: sale,   amount: 100}',
        '          - {order_id: 1, kind: refund, amount: 30}',
        '    expect:',
        '      rows:',
        '          - {order_id: 1, net_total: 70}',
      ].join('\n'),
    },
    {
      id: 'diff',
      label: 'Two different questions',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'data test', 'unit test'],
      values: [
        ['Asks', 'is the data right?', 'is the logic right?'],
        ['Runs against', 'real rows, after building', 'rows you wrote, before building'],
        ['Catches', 'a bad load, a broken join', 'an edge case you got wrong'],
        ['Needs data', 'yes — real, current data', 'no — it invents its own'],
        ['Runs', 'every production run', 'mostly in CI'],
      ],
    },
    {
      id: 'when',
      label: 'When the SQL is clever',
      sub: 'a five-branch CASE, a date boundary',
      pattern: 'user',
      icon: 'brain',
    },
  ],
  edges: [
    { source: 'yml', target: 'diff', label: 'fixed inputs in, one expected output — and no warehouse data involved' },
    { source: 'diff', target: 'when', label: 'they do not replace each other; they miss different bugs' },
  ],
}
