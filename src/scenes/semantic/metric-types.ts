import type { Scene } from '@graphlearning/flow'

// §03. Four kinds, and the useful split is "what does it build ON": a simple metric sits on a
// measure, the other three sit on other metrics. The board is the point of the section; the yml is
// there so `type:` and `type_params:` are not abstract.
export const metricTypes: Scene = {
  id: 'metric-types',
  title: 'Four kinds of metric',
  nodes: [
    {
      id: 'board',
      label: 'Each one builds on the row above',
      kind: 'table',
      pattern: 'service',
      headers: ['type', 'Built on', 'Answers'],
      values: [
        ['simple', 'one measure', 'how much revenue?'],
        ['ratio', 'two metrics', 'what share was refunded?'],
        ['derived', 'metrics + arithmetic', 'what was revenue net of cost?'],
        ['cumulative', 'one metric over a window', 'what is revenue to date?'],
      ],
    },
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'a metric is a definition, not a table',
      label: [
        'metrics:',
        '  - name: revenue',
        '    type: simple',
        '    type_params: {measure: order_amount}',
        '',
        '  - name: refund_rate',
        '    type: ratio',
        '    type_params:',
        '      numerator: refunds',
        '      denominator: revenue',
      ].join('\n'),
    },
    {
      id: 'once',
      label: 'Refunds are subtracted',
      sub: 'in one place, for every consumer',
      pattern: 'storage',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'board', target: 'yml', label: 'and none of them is a table' },
    { source: 'yml', target: 'once', label: 'which is what ends the four-numbers meeting' },
  ],
}
