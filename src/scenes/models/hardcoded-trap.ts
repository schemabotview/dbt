import type { Scene } from '@graphlearning/flow'

// §03. The counter-example, drawn as a pair of code cards so the difference is one line of text and
// the consequences are everything below it. The worst consequence is deliberately first and RED:
// a hardcoded name in a dev run reads PRODUCTION, silently, and the model still builds green.
export const hardcodedTrap: Scene = {
  id: 'hardcoded-trap',
  title: 'The same query, one word apart',
  nodes: [
    {
      id: 'pair',
      kind: 'code',
      filename: 'two versions of the same model — both build, both go green',
      label: [
        '-- the one you typed',
        'select order_id, amount from analytics.stg_orders',
        '',
        '-- the one dbt resolves',
        "select order_id, amount from {{ ref('stg_orders') }}",
      ].join('\n'),
    },
    {
      id: 'breaks',
      label: 'What the typed name costs you',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-env', label: 'Dev reads prod', sub: 'silently, and the run goes green', pattern: 'warn', icon: 'skull' },
        { id: 'b-order', label: 'No build order', sub: 'dbt sees no parent to wait for', pattern: 'warn', icon: 'clock' },
        { id: 'b-lineage', label: 'No lineage', sub: 'the docs graph has a hole in it', pattern: 'warn', icon: 'circleslash' },
        { id: 'b-rename', label: 'Renames break it', sub: 'and nothing warns you until it runs', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'rule',
      label: 'The rule',
      sub: 'if the object is built by this project, it is a ref — no exceptions',
      pattern: 'user',
      icon: 'shieldcheck',
    },
  ],
  edges: [
    { source: 'pair', target: 'breaks', label: 'the left one is not wrong SQL — it is SQL with the tool switched off' },
    { source: 'breaks', target: 'rule', label: 'four different failures, one cause' },
  ],
}
