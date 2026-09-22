import type { Scene } from '@graphlearning/flow'

// §08. A table, because the content IS a rule per layer and a diagram would only redraw the DAG
// from §05. The "may not" column is the useful half: every one of those is a rule a project breaks
// first, and each break is what turns a warehouse into a pile of models nobody can reason about.
export const theLayers: Scene = {
  id: 'the-layers',
  title: 'Three layers, and what each is allowed to do',
  nodes: [
    {
      id: 'rules',
      label: 'staging → intermediate → marts',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'staging', 'intermediate', 'marts'],
      values: [
        ['One per', 'source table', 'a piece of logic', 'a business concept'],
        ['Reads', 'a source, once', 'staging + intermediate', 'anything upstream'],
        ['May do', 'rename, cast, tidy', 'join, pivot, aggregate', 'join, shape for reading'],
        ['May not', 'join, aggregate', 'be read by a dashboard', 'read a source directly'],
        ['Usually', 'a view', 'ephemeral or a view', 'a table'],
        ['Named', 'stg_orders', 'int_orders_joined', 'fct_orders, dim_customers'],
      ],
    },
    {
      id: 'why',
      label: 'Why staging may not join',
      sub: 'it is where everyone agrees what a column is called',
      pattern: 'user',
      icon: 'layers',
    },
    {
      id: 'one',
      label: 'One per source table',
      sub: 'even when it feels like a passthrough',
      pattern: 'service',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'rules', target: 'why', label: 'the row people argue with' },
    { source: 'why', target: 'one', label: 'and the rule that makes the whole layer worth having' },
  ],
}
