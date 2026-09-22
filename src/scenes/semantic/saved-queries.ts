import type { Scene } from '@graphlearning/flow'

// §04. The consumption story: a metric nobody can reach is worth nothing, so this scene is about the
// exits. A saved query is the pre-agreed question shape; the three consumers all go through one
// compile step, which is the part worth remembering.
export const savedQueries: Scene = {
  id: 'saved-queries',
  title: 'How a metric reaches a person',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'the question, declared once',
      label: [
        'saved_queries:',
        '  - name: weekly_revenue',
        '    query_params:',
        '      metrics: [revenue, refund_rate]',
        '      group_by: ["metric_time__week"]',
      ].join('\n'),
    },
    {
      id: 'exits',
      label: 'Who asks for it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-bi', label: 'A BI tool', sub: 'the semantic layer, as a source', pattern: 'service', icon: 'barchart' },
        { id: 'e-nb', label: 'A notebook', sub: 'the Python or JDBC client', pattern: 'user', icon: 'terminal' },
        { id: 'e-api', label: 'Anything else', sub: 'the GraphQL API', pattern: 'external', icon: 'plug' },
      ],
    },
    {
      id: 'compile',
      label: 'All three compile',
      sub: 'to one SQL query, against your warehouse',
      pattern: 'storage',
      icon: 'gears',
    },
  ],
  edges: [
    { source: 'yml', target: 'exits', label: 'a pre-agreed question shape' },
    { source: 'exits', target: 'compile', label: 'and none of them re-implements the metric' },
  ],
}
