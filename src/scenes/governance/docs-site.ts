import type { Scene } from '@graphlearning/flow'

// §01. Docs are generated, not written — so the scene shows the two inputs (yml descriptions, and
// the warehouse's own catalog) meeting in one artefact. The doc block is on screen because a
// description repeated on fifteen models is the first thing that goes stale.
export const docsSite: Scene = {
  id: 'docs-site',
  title: 'Documentation you cannot forget to update',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'models/marts/_models.yml',
      label: [
        'models:',
        '  - name: fct_orders',
        '    description: "One row per order. {{ doc(\'order_grain\') }}"',
        '    columns:',
        '      - name: order_id',
        '        description: "The order’s natural key from Stripe."',
        '        data_tests: [unique, not_null]',
      ].join('\n'),
    },
    {
      id: 'gen',
      label: 'dbt docs generate',
      sub: 'parses the project, then queries the warehouse',
      pattern: 'service',
      icon: 'gears',
    },
    {
      id: 'site',
      label: 'What the site gives you',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'd-lineage', label: 'The lineage graph', sub: 'clickable, and always true', pattern: 'storage', icon: 'gitbranch' },
        { id: 'd-cols', label: 'Columns and types', sub: 'read from the warehouse itself', pattern: 'storage', icon: 'table' },
        { id: 'd-tests', label: 'The tests', sub: 'what is guaranteed about this', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'd-sql', label: 'The compiled SQL', sub: 'what actually ran', pattern: 'storage', icon: 'filecode' },
      ],
    },
    {
      id: 'blocks',
      label: 'Define it once',
      sub: 'a doc block, reused by name',
      pattern: 'user',
      icon: 'copy',
    },
  ],
  edges: [
    { source: 'yml', target: 'gen', label: 'descriptions live beside the model they describe' },
    { source: 'gen', target: 'site', label: 'generated from the project — so it cannot drift from it' },
    { source: 'site', target: 'blocks', label: 'and the trick that keeps definitions consistent' },
  ],
}
