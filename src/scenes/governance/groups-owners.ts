import type { Scene } from '@graphlearning/flow'

// §04. Groups are the first governance primitive that is about PEOPLE, so the scene shows a project
// cut into owned regions rather than a config listing. The closing card is the honest caveat: a
// group is a label until access is set, which is the next section.
export const groupsOwners: Scene = {
  id: 'groups-owners',
  title: 'Cutting a project into owned regions',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'models/_groups.yml',
      label: [
        'groups:',
        '  - name: finance',
        '    owner:',
        '      name: Finance Analytics',
        '      email: fin-analytics@acme.com',
        '',
        'models:',
        '  - name: fct_orders',
        '    config:',
        '      group: finance',
      ].join('\n'),
    },
    {
      id: 'regions',
      label: 'One project, three owned regions',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-fin', label: 'finance', sub: 'orders, revenue, invoices', pattern: 'service', icon: 'receipt' },
        { id: 'g-mkt', label: 'marketing', sub: 'campaigns, attribution', pattern: 'network', icon: 'barchart' },
        { id: 'g-core', label: 'core', sub: 'staging everyone depends on', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'note',
      label: 'A label, so far',
      sub: 'what a group ENFORCES is access, next',
      pattern: 'user',
      icon: 'tag',
    },
  ],
  edges: [
    { source: 'yml', target: 'regions', label: 'every model belongs to at most one group' },
    { source: 'regions', target: 'note', label: 'and now the question of what a boundary means' },
  ],
}
