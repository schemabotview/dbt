import type { Scene } from '@graphlearning/flow'

// §04. Ephemeral is only comprehensible as BEFORE and AFTER compile, so the scene is the child
// model and the statement it becomes — the ephemeral model reappears as a CTE with its own name.
// The warn card is the cost nobody mentions: three children means the same SQL computed three times.
export const ephemeralMat: Scene = {
  id: 'ephemeral-mat',
  title: 'A model that never becomes an object',
  nodes: [
    {
      id: 'pair',
      kind: 'code',
      filename: 'int_order_items.sql is ephemeral — so this is what its child compiles to',
      label: [
        '-- you wrote:',
        "select * from {{ ref('int_order_items') }} where amount > 0",
        '',
        '-- dbt sent:',
        'with int_order_items as (',
        '    select ...        -- the ephemeral model, pasted in',
        ')',
        'select * from int_order_items where amount > 0',
      ].join('\n'),
    },
    {
      id: 'props',
      label: 'What that means',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-none', label: 'No object exists', sub: 'nothing to query, nothing to inspect', pattern: 'warn', icon: 'ban' },
        { id: 'e-free', label: 'Nothing to rebuild', sub: 'it has no build of its own', pattern: 'service', icon: 'zap' },
        { id: 'e-hide', label: 'It hides a step', sub: 'the DAG keeps it, the warehouse does not', pattern: 'network', icon: 'gitbranch' },
      ],
    },
    {
      id: 'cost',
      label: 'Three refs, three runs',
      sub: 'the CTE is pasted into each',
      pattern: 'warn',
      icon: 'copy',
    },
  ],
  edges: [
    { source: 'pair', target: 'props', label: 'the ephemeral model survives only as a CTE inside its children' },
    { source: 'props', target: 'cost', label: 'which is also the reason to use it sparingly' },
  ],
}
