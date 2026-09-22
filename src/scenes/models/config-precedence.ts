import type { Scene } from '@graphlearning/flow'

// §07. Three places, one winner. The code card shows all three at once — separating them into three
// cards made the scene wide and the comparison harder, since the point is that they are the SAME
// setting written three ways. The ladder runs LR, least specific to most: drawn BT it stacked three
// cards vertically, which made the scene tall and narrow and shrank the code card's type below
// every other scene in the course — fitView scales by whichever axis binds.
export const configPrecedence: Scene = {
  id: 'config-precedence',
  title: 'Three places to say it, one that wins',
  nodes: [
    {
      id: 'three',
      kind: 'code',
      filename: 'the same setting, written three ways',
      label: [
        '# 1. dbt_project.yml — a whole folder',
        'models:',
        '  jaffle_shop:',
        '    marts:',
        '      +materialized: table',
        '',
        '# 2. models/marts/_models.yml — one model',
        'models:',
        '  - name: fct_orders',
        '    config:',
        '      materialized: incremental',
        '',
        '-- 3. models/marts/fct_orders.sql — in the file itself',
        "{{ config(materialized='table') }}",
      ].join('\n'),
    },
    {
      id: 'ladder',
      label: 'Most specific wins',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'l-proj', label: 'The project file', sub: 'dbt_project.yml — a folder default', pattern: 'external', icon: 'folder' },
        { id: 'l-yml', label: 'The model yml', sub: 'names one model', pattern: 'network', icon: 'file' },
        { id: 'l-file', label: 'The config block', sub: 'in the model itself — this one wins', pattern: 'service', icon: 'filecode' },
      ],
      edges: [
        { source: 'l-proj', target: 'l-yml' },
        { source: 'l-yml', target: 'l-file' },
      ],
    },
    {
      id: 'where',
      label: 'Where to put it',
      sub: 'defaults in the folder, exceptions in the model',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'three', target: 'ladder', label: 'all three are legal, and they can disagree' },
    { source: 'ladder', target: 'where', label: 'so the habit that keeps a project readable' },
  ],
}
