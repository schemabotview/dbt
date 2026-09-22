import type { Scene } from '@graphlearning/flow'

// §01. The problem is social before it is technical: four teams each wrote a correct SQL expression
// for "revenue" and no two agree. The scene stays on the symptom — four numbers in one meeting —
// because the fix only makes sense once the cost is felt.
export const metricDrift: Scene = {
  id: 'metric-drift',
  title: 'One word, four numbers',
  nodes: [
    {
      id: 'four',
      label: 'Everyone reports “revenue”',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'r-fin', label: 'Finance', sub: 'net of refunds and tax', pattern: 'service', icon: 'receipt' },
        { id: 'r-sales', label: 'Sales', sub: 'gross, refunds ignored', pattern: 'warn', icon: 'barchart' },
        { id: 'r-board', label: 'The board deck', sub: 'net, minus intercompany', pattern: 'user', icon: 'scroll' },
        { id: 'r-app', label: 'The product app', sub: 'whatever the API returned', pattern: 'external', icon: 'monitor' },
      ],
    },
    {
      id: 'meeting',
      label: 'Nobody is wrong',
      sub: 'four correct queries, four definitions',
      pattern: 'warn',
      icon: 'users',
    },
    {
      id: 'layer',
      label: 'Define it once',
      sub: 'beside the model, in version control',
      pattern: 'service',
      icon: 'sigma',
    },
  ],
  edges: [
    { source: 'four', target: 'meeting', label: 'and all four are in the same meeting' },
    { source: 'meeting', target: 'layer', label: 'the fix is a definition, not a better dashboard' },
  ],
}
