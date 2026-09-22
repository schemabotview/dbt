import type { Scene } from '@graphlearning/flow'

// §02. The whole tool in one picture: a file on the left, a statement on the right, and the claim
// that the only difference is mechanical. Both cards are `hug` because they sit in a flow — the
// standalone-card width floor would otherwise blow the scene up and shrink everything in it.
export const sqlInDdlOut: Scene = {
  id: 'sql-in-ddl-out',
  title: 'You write the SELECT. dbt writes the rest.',
  nodes: [
    {
      id: 'model',
      kind: 'code',
      hug: true,
      filename: 'models/marts/fct_orders.sql',
      label: [
        'select',
        '    o.order_id,',
        '    o.customer_id,',
        '    sum(i.amount) as order_total',
        "from {{ ref('stg_orders') }} as o",
        "left join {{ ref('stg_order_items') }} as i",
        '    using (order_id)',
        'group by 1, 2',
      ].join('\n'),
    },
    {
      id: 'run',
      label: 'dbt run',
      sub: 'parse, compile, execute',
      pattern: 'service',
      icon: 'gears',
    },
    {
      id: 'ddl',
      kind: 'code',
      hug: true,
      filename: 'what the warehouse receives',
      label: [
        'create or replace table analytics.marts.fct_orders as (',
        '  select',
        '      o.order_id,',
        '      o.customer_id,',
        '      sum(i.amount) as order_total',
        '  from analytics.marts.stg_orders as o',
        '  left join analytics.marts.stg_order_items as i',
        '      using (order_id)',
        '  group by 1, 2',
        ');',
      ].join('\n'),
    },
    {
      id: 'free',
      label: 'What you get for free',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'f-dag', label: 'Run order', sub: 'from the refs, not a config', pattern: 'user', icon: 'gitbranch' },
        { id: 'f-env', label: 'Environments', sub: 'one flag picks the schema', pattern: 'user', icon: 'swap' },
        { id: 'f-test', label: 'Tests', sub: 'assertions beside the model', pattern: 'user', icon: 'shieldcheck' },
        { id: 'f-doc', label: 'Docs + lineage', sub: 'generated, never stale', pattern: 'user', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'model', target: 'run', label: 'a file with no DDL in it' },
    { source: 'run', target: 'ddl', label: 'one statement, built for this target' },
    { source: 'ddl', target: 'free', label: 'the interesting part is what else that file now supports' },
  ],
}
