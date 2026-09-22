import type { Scene } from '@graphlearning/flow'

// §06. Small feature, large effect: without it a failure is a number in a log that scrolls away.
// The scene contrasts the two experiences directly — 43 in a terminal versus a table you can join
// back to the source — because that contrast is the entire argument for switching it on.
export const storeFailures: Scene = {
  id: 'store-failures',
  title: 'Keep the failing rows',
  nodes: [
    {
      id: 'without',
      label: 'Without it',
      sub: 'FAIL 43 — and the 43 rows are gone when the log scrolls',
      pattern: 'warn',
      icon: 'ban',
    },
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'turn it on',
      label: [
        '# one test, or a whole folder in dbt_project.yml',
        'config:',
        '  store_failures: true',
        '',
        '$ dbt test --store-failures',
      ].join('\n'),
    },
    {
      id: 'with',
      label: 'With it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-tbl', label: 'A real table', sub: 'in a dbt_test__audit schema', pattern: 'storage', icon: 'table' },
        { id: 'w-join', label: 'Joinable', sub: 'back to the model, to see context', pattern: 'service', icon: 'merge' },
        { id: 'w-time', label: 'Still there tomorrow', sub: 'overwritten on the next run', pattern: 'network', icon: 'clock' },
      ],
    },
    {
      id: 'use',
      label: 'Switch it on deliberately',
      sub: 'a table per failing test is a real cost',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'without', target: 'cfg', label: 'the count tells you there is a problem, not which rows' },
    { source: 'cfg', target: 'with', label: 'one config, and the failures become an object' },
    { source: 'with', target: 'use', label: 'a table per failing test, so switch it on deliberately' },
  ],
}
