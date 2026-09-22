import type { Scene } from '@graphlearning/flow'

// §09. A tree, because naming is only legible as a set — one good name proves nothing, a folder of
// them proves the convention. The warn card is the thing nobody tells you: renaming a model does
// not drop the old object, so a careless rename leaves a stale table that still answers queries.
export const naming: Scene = {
  id: 'naming',
  title: 'A stranger should be able to read this',
  nodes: [
    {
      id: 'tree',
      kind: 'code',
      hug: true,
      filename: 'models/',
      label: [
        'staging/',
        '  stripe/',
        '    _stripe__sources.yml',
        '    stg_stripe__payments.sql   # source__entity, plural',
        '  jaffle/',
        '    _jaffle__sources.yml',
        '    stg_jaffle__orders.sql',
        '    stg_jaffle__customers.sql',
        'intermediate/',
        '  int_orders_joined_to_payments.sql   # verb phrase, not a noun',
        'marts/',
        '  finance/',
        '    fct_orders.sql      # a fact: one row per event',
        '    dim_customers.sql   # a dimension: one row per thing',
      ].join('\n'),
    },
    {
      id: 'prefix',
      label: 'The prefixes carry meaning',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'pf-stg', label: 'stg_', sub: 'one source table, tidied', pattern: 'service', icon: 'filecode' },
        { id: 'pf-int', label: 'int_', sub: 'a step, not a deliverable', pattern: 'network', icon: 'workflow' },
        { id: 'pf-fct', label: 'fct_', sub: 'one row per event', pattern: 'storage', icon: 'sigma' },
        { id: 'pf-dim', label: 'dim_', sub: 'one row per thing', pattern: 'storage', icon: 'tag' },
      ],
    },
    {
      id: 'rename',
      label: 'Renames leave litter',
      sub: 'the old object stays — drop it',
      pattern: 'warn',
      icon: 'trash',
    },
  ],
  edges: [
    { source: 'tree', target: 'prefix', label: 'a model name is globally unique, so it carries its own context' },
    { source: 'prefix', target: 'rename', label: 'one warning before you start renaming things' },
  ],
}
