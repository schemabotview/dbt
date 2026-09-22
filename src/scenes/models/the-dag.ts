import type { Scene } from '@graphlearning/flow'

// §05. The one scene in this course that IS the graph, so it is drawn wide and shallow: sources on
// the left, marts on the right, exactly as the docs site draws lineage. Two models hang off one
// staging model on purpose — that fork is what makes "unrelated branches run at once" visible
// rather than asserted.
export const theDag: Scene = {
  id: 'the-dag',
  title: 'The graph is your refs, read back to you',
  nodes: [
    {
      id: 'graph',
      label: 'Derived from ref() calls — nothing else',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'd-src', label: 'raw.orders', sub: 'a source', pattern: 'external', icon: 'cloud' },
        { id: 'd-stg', label: 'stg_orders', sub: 'one ref away', pattern: 'service', icon: 'filecode' },
        { id: 'd-fct', label: 'fct_orders', sub: 'refs stg_orders', pattern: 'storage', icon: 'table' },
        { id: 'd-rev', label: 'rpt_revenue', sub: 'refs stg_orders too', pattern: 'storage', icon: 'barchart' },
      ],
      edges: [
        { source: 'd-src', target: 'd-stg' },
        { source: 'd-stg', target: 'd-fct' },
        { source: 'd-stg', target: 'd-rev' },
      ],
    },
    {
      id: 'falls',
      label: 'What falls out of it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-order', label: 'Build order', sub: 'parents first, always', pattern: 'user', icon: 'sortarrows' },
        { id: 'f-par', label: 'Parallelism', sub: 'the two marts run together', pattern: 'user', icon: 'workflow' },
        { id: 'f-sel', label: 'Selection', sub: '--select fct_orders+ walks it', pattern: 'user', icon: 'funnel' },
      ],
    },
    {
      id: 'not',
      label: 'What the graph is NOT built from',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'x-folder', label: 'Your folders', sub: 'they configure, they do not order', pattern: 'warn', icon: 'folder' },
        { id: 'x-alpha', label: 'Filenames', sub: 'alphabetical order means nothing', pattern: 'warn', icon: 'ban' },
        { id: 'x-list', label: 'A list you keep', sub: 'there is no run-order file', pattern: 'warn', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'graph', target: 'falls', label: 'one model with two children — so those two children are independent' },
    { source: 'falls', target: 'not', label: 'and three things people expect to matter, which do not' },
  ],
}
