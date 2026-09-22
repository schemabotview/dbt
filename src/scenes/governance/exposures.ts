import type { Scene } from '@graphlearning/flow'

// §03. The DAG stops at the warehouse edge and the consequences of that are all downstream — so the
// scene draws the missing half and then fills it in. The selection line is the payoff: once the
// dashboard is a node, "what breaks if I change this" finally has an answer.
export const exposures: Scene = {
  id: 'exposures',
  title: 'The DAG usually stops too early',
  nodes: [
    {
      id: 'line',
      label: 'Without an exposure, this is where dbt’s knowledge ends',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'x-stg', label: 'stg_orders', sub: 'dbt knows this', pattern: 'service', icon: 'filecode' },
        { id: 'x-fct', label: 'fct_orders', sub: 'and this', pattern: 'service', icon: 'table' },
        { id: 'x-dash', label: 'The CFO dashboard', sub: 'and nothing at all about this', pattern: 'warn', icon: 'barchart' },
      ],
      edges: [
        { source: 'x-stg', target: 'x-fct' },
        { source: 'x-fct', target: 'x-dash' },
      ],
    },
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'declaring it makes it a node',
      label: [
        'exposures:',
        '  - name: exec_revenue',
        '    type: dashboard',
        '    maturity: high',
        '    url: https://bi.acme.com/d/17',
        '    owner:',
        '      name: Priya Nair',
        '      email: priya@acme.com',
        '    depends_on:',
        "      - ref('fct_orders')",
      ].join('\n'),
    },
    {
      id: 'buys',
      label: 'What it buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-impact', label: 'Impact analysis', sub: 'what breaks if I change this?', pattern: 'user', icon: 'search' },
        { id: 'e-select', label: 'A selector', sub: 'build everything it depends on', pattern: 'user', icon: 'funnel' },
        { id: 'e-owner', label: 'A person to ask', sub: 'named, with an email', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'line', target: 'yml', label: 'the most important node in the graph is the one outside it' },
    { source: 'yml', target: 'buys', label: 'it builds nothing — it only records a dependency' },
  ],
}
