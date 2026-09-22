import type { Scene } from '@graphlearning/flow'

// §02. A semantic model is a layer of meaning declared OVER a mart that already exists — it builds
// nothing. The three parts are the whole idea, so they get the group; the yml is on screen because
// the words (entity/dimension/measure) mean nothing until you see where they sit.
export const semanticModelAnatomy: Scene = {
  id: 'semantic-model-anatomy',
  title: 'Three parts, declared over a mart',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'models/semantic/_semantic.yml',
      label: [
        'semantic_models:',
        '  - name: orders',
        "    model: ref('fct_orders')",
        '    entities:',
        '      - {name: order_id, type: primary}',
        '      - {name: customer_id, type: foreign}',
        '    dimensions:',
        '      - {name: ordered_at, type: time}',
        '      - {name: channel, type: categorical}',
        '    measures:',
        '      - name: order_amount',
        '        agg: sum',
      ].join('\n'),
    },
    {
      id: 'parts',
      label: 'What each part is for',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-ent', label: 'Entities', sub: 'the join keys — how models meet', pattern: 'storage', icon: 'key' },
        { id: 'p-dim', label: 'Dimensions', sub: 'the group-by — time and category', pattern: 'service', icon: 'layers' },
        { id: 'p-meas', label: 'Measures', sub: 'the aggregate — sum, count, avg', pattern: 'user', icon: 'sigma' },
      ],
    },
    {
      id: 'nothing',
      label: 'It builds nothing',
      sub: 'no object, no SQL — meaning only',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'yml', target: 'parts', label: 'declared over a mart that already exists' },
    { source: 'parts', target: 'nothing', label: 'and the thing people get wrong first' },
  ],
}
