import type { Scene } from '@graphlearning/flow'

// §02. ref does two jobs at once and learners usually only notice one, so the scene forks: the same
// call, two arrows, two consequences. The edge from the pair back down to `both` is what makes the
// point that they are inseparable — you cannot take the name resolution without the edge.
export const refResolution: Scene = {
  id: 'ref-resolution',
  title: 'One function, two jobs',
  nodes: [
    {
      id: 'call',
      kind: 'code',
      hug: true,
      filename: 'models/marts/fct_orders.sql',
      label: [
        'select',
        '    o.order_id,',
        '    c.customer_id,',
        '    o.amount',
        "from {{ ref('stg_orders') }}    as o",
        "join {{ ref('stg_customers') }} as c using (customer_id)",
      ].join('\n'),
    },
    {
      id: 'jobs',
      label: 'What that call does',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'j-dep', label: 'Declares a dependency', sub: 'stg_orders must be built first', pattern: 'network', icon: 'gitbranch' },
        { id: 'j-name', label: 'Resolves a name', sub: 'to a real, fully-qualified table', pattern: 'service', icon: 'tag' },
      ],
    },
    {
      id: 'both',
      label: 'Inseparable',
      sub: 'no name without the edge — that is the design',
      pattern: 'user',
      icon: 'link',
    },
  ],
  edges: [
    { source: 'call', target: 'jobs', label: 'two refs, so this model has two parents' },
    { source: 'jobs', target: 'both', label: 'one function, so the graph cannot drift from the SQL' },
  ],
}
